"use clients";
import { FaInstagram } from "react-icons/fa";
import { User } from "@prisma/client";
import Image from "next/image";
import InstagramLogo from "../../public/images/instagram_logo.svg";

interface AvatarProps {
    user?: User;
}
                                    //envoyer User à ce component
const Avatar: React.FC<AvatarProps> = ({ user }) => {

    const handleInstagramRedirection = () => {
        if(user?.username){
            window.open(`https://instagram.com/${user.username}`, '_blank');
        }
    }


    return (
        <div className="relative">
            <div className="inline-block relative rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
            {user?.image ? (
                    <Image alt="Avatar" src={ user.image } fill onClick={handleInstagramRedirection} className="cursor-pointer"/>
                    // <Image src="/images/user_profile.png" alt="Instagram Logo" fill />
                ) : (
                    //<FaInstagram className="w-full h-full" onClick={ handleInstagramRedirection } />
                    <Image src="/images/user_profile.png" alt="Instagram Logo" fill />
            )}
                

                
            </div>
            <div className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3"></div>
        </div>
    );
}


export default Avatar;