'use client';

import { User } from "@prisma/client";
import { useState, useMemo, useEffect } from 'react';
import useConversation from '@/app/hooks/useConversation';
import { useRouter } from 'next/navigation';
import ConversationBoxAdmin from './ConversationBoxAdmin';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { FullConversationType } from "@/app/types";

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
    title?: string;
    campaignId?: string;
}

const ConversationListAdmin: React.FC<ConversationListProps> = ({ 
  initialItems, 
  campaignId
}) => {


    const [conversations, setConversations] = useState(initialItems);
    const router = useRouter();
    const session = useSession();

    const { conversationId, isOpen } = useConversation();

    return (
        <aside className={clsx(`
            fixed 
            inset-y-0 
            pb-20
            lg:pb-0
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
            {conversations.map((item) => (
                <ConversationBoxAdmin
                    key={item.id}
                    conversation={item}
                    selected={conversationId === item.id}
                    campaignId={campaignId}
                />
            ))}
            </div>
        </aside>
    );
}
  
export default ConversationListAdmin;