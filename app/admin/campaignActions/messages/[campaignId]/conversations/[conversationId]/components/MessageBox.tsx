'use client';

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
  isFirst?: boolean;
  currentUser: User | null;
}

const MessageBox: React.FC<MessageBoxProps> = ({ 
  data, 
  isLast,
  isFirst,
  currentUser
}) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);


  const isOwn = currentUser ? (currentUser.id === data?.sender?.id || isFirst || data.isSent) : false;  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden max-w-[80%]', 
    isOwn ? 'bg-customBlue text-white' : 'bg-gray-100', 
    data.image ? 'rounded-md p-0' : 'rounded-3xl py-2 px-3'
  );

  return ( 
    <div className={container}>
        <div className={avatar}>
            {isFirst || data.isSent ? (
                <Avatar user={null} />
            ) : 
            (
                <Avatar user={data.sender} />
            )}
        </div>

        <div className={body}>
            <div className="flex items-center gap-1">
                {isFirst? (
                    <div></div>
                ):(
                    <div className="text-sm text-gray-500">
                        {data.sender?.name}
                    </div>
                )}

                <div className="text-xs text-gray-400">
                    {format(new Date(data.createdAt), 'p')}
                </div>
            </div>
            <div className={message}>
                {/* <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} /> */}
                {data.image ? (
                    <Image
                    alt="Image"
                    height="288"
                    width="288"
                    onClick={() => setImageModalOpen(true)} 
                    src={data.image} 
                    className="
                        object-cover 
                        cursor-pointer 
                        hover:scale-110 
                        transition 
                        translate
                    "
                    />
                ) : (
                    <div className="px-6 py-2">{data.body}</div>
                )}
            </div>
            {isLast && isOwn && seenList.length > 0 && (
                <div 
                    className="
                    text-xs 
                    font-light 
                    text-gray-500
                    "
                >
                    {`Seen by ${seenList}`}
                </div>
            )}
        </div>
    </div>
   );
}
 
export default MessageBox;