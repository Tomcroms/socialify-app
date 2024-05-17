import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from '@/app/libs/pusher';
import prisma from "@/app/libs/prismadb";
import getSelectedCampaignId from "@/app/actions/getSelectedCampaignId";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const selectedCampaignId = await getSelectedCampaignId();

    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true
      },
      data: {
        body: message,
        image: image,
        onInstagram: false,
        campaignId: selectedCampaignId,
        conversation: {
          connect: { id: conversationId }
        },
        sender: {
          connect: { id: currentUser.id }
        },
        seen: {
          connect: {
            id: currentUser.id
          }
        },
      }
    });

    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: { id: newMessage.id }
        }
      },
      include: {
        users: true,
        messages: {
          include: { seen: true }
        }
      }
    });

    const simplifiedMessage = {
      id: newMessage.id,
      body: newMessage.body,
      image: newMessage.image,
      createdAt: newMessage.createdAt,
      senderId: newMessage.senderId,
      seenIds: newMessage.seen.map(seenUser => seenUser.id)
    };

    console.log('Sending to Pusher - messages:new:', simplifiedMessage);
    await pusherServer.trigger(conversationId, 'messages:new', simplifiedMessage)
    .then(() => {
      console.log('Pusher trigger successful'); // Log en cas de succès
    })
    .catch(error => {
      console.error('Pusher trigger error:', error); // Log en cas d'erreur
    });

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.forEach(user => {
      const payload = {
        id: conversationId,
        messages: [{
          id: lastMessage.id,
          body: lastMessage.body,
          createdAt: lastMessage.createdAt,
          senderId: lastMessage.senderId,
          seenIds: lastMessage.seen.map(seenUser => seenUser.id)
        }]
      };
      // console.log(`Sending to Pusher - conversation:update for user ${user.email}:`, payload);
      pusherServer.trigger(user.email!, 'conversation:update', payload);
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES');
    return new NextResponse('Error', { status: 500 });
  }
}
