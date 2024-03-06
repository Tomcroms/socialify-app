import { useMemo } from "react";
import { usePathname } from 'next/navigation';
import { HiChat } from "react-icons/hi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import useConversation from './useConversation';


const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();

    const mainRoutes = useMemo(() => [
        {
            label: "Users",
            href: "/dashboard",
            icon: MdOutlineDashboardCustomize,
            active: pathname == "/dashboard"
        },
        {
            label: "Chat",
            href: "/conversations",
            icon: HiChat,
            active: pathname == "/conversations" || !!conversationId
        },
        {
            label: "Settings",
            href: "/settings",
            icon: IoSettingsOutline,
            active: pathname == "/settings"
        },
        {
            label: "Create a campaign",
            href: "/newCampaign",
            icon: FaRegSquarePlus,
            active: pathname == "/newCampaign"
        },
    ], [pathname, conversationId]);

    const secondaryRoutes = useMemo(() => [
        {
            label: "Contact Support",
            href: "/support",
            icon: BiSupport, // Assurez-vous d'avoir un icône approprié
            active: pathname == "/support",
        },
        {
            label: "Logout",
            href: "#",
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle,
        },
    ], [pathname]);

    return { mainRoutes, secondaryRoutes };
};

export default useRoutes;

