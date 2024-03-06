'use client';

import { find } from 'lodash';
import { User } from "@prisma/client";
import { useState, useMemo, useEffect } from 'react';
import { MdOutlineGroupAdd } from "react-icons/md";
import useConversation from '@/app/hooks/useConversation';
import { useRouter } from 'next/navigation';
import ConversationBox from "./ConversationBox";
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/libs/pusher';
import PusherClient from 'pusher-js';
import { FullConversationType } from "@/app/types";
import { useCampaignContext } from '@/app/context/CampaignContext';

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
    title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  initialItems, 
  users
}) => {


    const [items, setItems] = useState(initialItems);

    // useEffect(() => {
    //     const filteredItems = initialItems.filter(item => 
    //         item.campaignId === campaignId
    //     );
    //     setItems(filteredItems);
    // }, [initialItems, campaignId]);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    const session = useSession();

    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    useEffect(() => {
        if (!pusherKey) {
        return;
        }

        pusherClient.subscribe(pusherKey);

        const updateHandler = (conversation: FullConversationType) => {
        setItems((current) => current.map((currentConversation) => {
            if (currentConversation.id === conversation.id) {
            return {
                ...currentConversation,
                messages: conversation.messages
            };
            }

            return currentConversation;
        }));
        }

        const newHandler = (conversation: FullConversationType) => {
        setItems((current) => {
            if (find(current, { id: conversation.id })) {
            return current;
            }

            return [conversation, ...current]
        });
        }

        const removeHandler = (conversation: FullConversationType) => {
        setItems((current) => {
            return [...current.filter((convo) => convo.id !== conversation.id)]
        });
        }
    
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:remove', removeHandler)
    }, [pusherKey, router]);

    return (
        <aside className={clsx(`
            fixed 
            inset-y-0 
            pb-20
            lg:pb-0
            lg:left-40 
            lg:w-96 
            lg:block
            overflow-y-auto 
            bg-white
            border-r 
            border-gray-200 
        `, isOpen ? 'hidden' : 'block w-full left-0')}>
            <div className="px-5">
            <div className="flex justify-between mb-4 pt-4">
                <div className="text-2xl font-bold text-neutral-800">
                Messages
                </div>
            </div>
            {items.map((item) => (
                <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
                />
            ))}
            </div>
        </aside>
    );
}
  
export default ConversationList;