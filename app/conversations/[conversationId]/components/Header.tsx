"use client";

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';

import { useMemo, useState } from "react";
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from '@/app/components/Avatar';


interface HeaderProps { //permet de définir ce qu'on va passer à l'élément Header, ici <Header conversation = {...} />
    conversation: Conversation & {
        users: User[]
    }
};

const Header: React.FC<HeaderProps> = ({ conversation }) => {

    const otherUser = useOtherUser(conversation);

    return (
        <div 
        className="
            bg-white 
            w-full 
            flex 
            border-b-[1px] 
            sm:px-4 
            py-3 
            px-4 
            lg:px-6 
            justify-between 
            items-center 
            shadow-sm
        "
        >
            <div className="flex gap-3 items-center">
                <Link
                    href="/conversations" 
                    className="
                    lg:hidden 
                    block 
                    text-sky-500 
                    hover:text-sky-600 
                    transition 
                    cursor-pointer
                    "
                >
                <HiChevronLeft size={32} />
                </Link>
                {/* {conversation.isGroup ? (
                    <AvatarGroup users={conversation.users} />
                ) : (
                    <Avatar user={otherUser} />
                )} */}
                <div className="flex">
                    <Avatar user={otherUser} />
                    <div className='ml-8'>
                        <div>{conversation.name || otherUser.name}</div>
                        <div className="text-sm font-light text-neutral-500">
                            Instagram user
                        </div>
                    </div>

                </div>
            </div>
            <HiEllipsisHorizontal
              size={32}
              className="
                text-sky-500
                cursor-pointer
                hover:text-sky-600
                transition
              "
            />
        </div>
    );
};

export default Header;