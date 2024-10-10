import { NextResponse } from 'next/server';
import { Conversation } from '@prisma/client';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { pusherServer } from '@/app/libs/pusher';
import prisma from "@/app/libs/prismadb";

interface IParams {
    conversationId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        // Log params for debugging
        console.log("Params received:", params);

        const { conversationId } = params;

        if (!conversationId) {
            return new NextResponse("Conversation ID is missing", { status: 400 });
        }
        
        const currentUser = await getCurrentUser();
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Find existing conversation
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true,
            }
        });

        if (!conversation) {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        // Find last message
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        
        if (!lastMessage) {
            return NextResponse.json(conversation);
        }

        // Update seen of last message
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        const minimalUpdatedMessage = {
            id: updatedMessage.id,
            seenIds: updatedMessage.seen.map(user => user.id),
            senderId: updatedMessage.sender.id,
            body: updatedMessage.body,
            createdAt: updatedMessage.createdAt,
        };

        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [minimalUpdatedMessage]
        });

        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return NextResponse.json(conversation);
        }

        await pusherServer.trigger(conversationId!, 'message:update', minimalUpdatedMessage);

        return NextResponse.json(minimalUpdatedMessage);

    } catch (error: any) {
        console.error("ERROR_MESSAGES_SEEN:", error.message, error.stack);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
