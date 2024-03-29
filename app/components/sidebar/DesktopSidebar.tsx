"use client";
import useRoutes from "@/app/hooks/useRoutes";
import { useState } from 'react';
import DesktopItem from './DesktopItem';
import Image from "next/image";
import { User } from "@prisma/client"; //available after prisma push 
import { useRouter } from "next/navigation";

interface DesktopSidebarProps {
    currentUser?: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {

    const router = useRouter();
    const { mainRoutes, secondaryRoutes } = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    const handleHomeClick = () => {
        router.push("/")
    }
    // console.log(currentUser) 

    return (
        <div className="hidden pt-6 lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-40 xl:px-6 lg:overflow-y-auto cursor-pointer lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
            
            <Image width={300} height={100} src="/images/capture_socialify.png" alt="logo" onClick={handleHomeClick}/>
            <nav className="mt-4 flex flex-col justify-between">
                <ul role="list" className="flex flex-col items-center space-y-1">
                    {mainRoutes.map((item) => 
                        <DesktopItem key={item.label} href={item.href} label={item.label} icon={item.icon} active={item.active}/>
                    )}
                </ul>
            </nav>
            <div className="mt-auto">
                <nav>
                    <ul role="list" className="flex flex-col items-center space-y-1">
                        {secondaryRoutes.map((item) => (
                            <DesktopItem key={item.label} href={item.href} label={item.label} icon={item.icon} active={item.active} onClick={item.onClick} />
                        ))}
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default DesktopSidebar;