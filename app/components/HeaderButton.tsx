"use client"; 
import { User } from "@prisma/client"; //available after prisma push 
import { useRouter } from "next/navigation";
// import { signIn, useSession } from "next-auth/react";
// import { useEffect } from "react";

interface HeaderButtonProps {
    currentUser?: User
}


const HeaderButton:React.FC<HeaderButtonProps> = ({currentUser}) => {
    const router = useRouter();

    const handleMyCampaignsClick = () => {
        router.push("/dashboard")
    }

    const handleSignInClick = () => {
        router.push("/auth")
    }

    return (
        <>
            {currentUser?.email ? (
                <button onClick={handleMyCampaignsClick} className="bg-white rounded-[40px] py-4 px-10 font-semibold cursor-pointer">My campaigns</button>
            ) : (
                <button onClick={handleSignInClick} className="bg-white rounded-[40px] py-4 px-10 font-semibold cursor-pointer">Sign In</button>
            )}
        </>
    )
}

export default HeaderButton;