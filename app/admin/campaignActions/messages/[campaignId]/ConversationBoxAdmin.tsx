'use client';

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types"; 

interface ConversationBoxProps {
    conversation: FullConversationType,
    selected?: boolean;
    campaignId?: string
}

const ConversationBoxAdmin: React.FC<ConversationBoxProps> = ({ 
    conversation, 
    selected,
    campaignId 
}) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/admin/campaignActions/messages/${campaignId}/conversations/${conversation.id}`);
    }, [conversation, router]);

    const lastMessage = useMemo(() => {
        const messages = conversation.messages || [];

        return messages[messages.length - 1];
    }, [conversation.messages]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
        return 'Sent an image';
        }

        if (lastMessage?.body) {
        return lastMessage?.body
        }

        return 'Started a conversation';
    }, [lastMessage]);

    return ( 
        <div
            onClick={handleClick}
            className={clsx(`
                w-full 
                relative 
                flex 
                items-center 
                space-x-3 
                p-3 
                hover:bg-neutral-100
                transition
                cursor-pointer
                border-b
                border-gray-200
                `,
                selected ? 'bg-neutral-100' : 'bg-white'
            )}
            >
            <Avatar user={lastMessage.sender} /> 
            <div className="flex justify-between items-center mb-1">
                {lastMessage?.createdAt && (
                    <p className="text-xs text-gray-400 font-light">
                        {format(new Date(lastMessage.createdAt), 'p')}
                    </p>
                )}
            </div>
            <p className='truncate text-sm text-black font-medium'>
                {lastMessageText}
            </p>
        </div>
    );
}
 
export default ConversationBoxAdmin;