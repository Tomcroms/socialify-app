import { SlPeople } from "react-icons/sl";
import { HiOutlineDownload } from "react-icons/hi";
import { Campaign } from "@prisma/client";
import { useRouter } from "next/navigation";

interface AudienceProps {
    currentCampaign: Campaign | null;
}

const Audience: React.FC<AudienceProps> = ({ currentCampaign }) => {
    
    const router = useRouter();
    const totalTargets = currentCampaign?.nbMessages;



    const handleClickToSpreadsheet = () => {
        if(currentCampaign){
            router.push(currentCampaign.link)
        }
    }

    return ( 
        <div 
        className=" 
            h-full
            w-full
            bg-white
            rounded-xl
            relative
            p-4
            shadow-md
        "
        >
            <div className="flex w-full items-center">
                <div style={{ backgroundColor: "#FDF4ED" }} className="rounded p-2">
                    <SlPeople  className="h-6 w-6 text-black"/>
                </div>
                <div className="ml-2">
                    <h4>My audience</h4>
                    <h5>This month</h5>
                </div>
            </div>
            <h3 className="mt-3">{totalTargets}</h3>
            <p>Business profiles</p>
            <div className="absolute right-10 top-4 w-5/12 flex flex-col items-end gap-2">
                <div className="rounded-lg w-full bg-customGray px-3 py-1 flex justify-end">
                    <p className="text-black text-8px">
                        @janedoe
                    </p>
                </div>
                <div className="rounded-lg w-full bg-customGray px-3 py-1 flex justify-end">
                    <p className="text-black text-8px">
                        @edwardbirrof
                    </p>
                </div>
                <div className="rounded-lg w-full bg-customGray px-3 py-1 flex justify-end">
                    <p className="text-black text-8px">
                        @emmagypson
                    </p>
                </div>
                <div className="flex items-center w-auto" onClick={handleClickToSpreadsheet}>
                    <p className="underline cursor-pointer">Link to spreadsheet</p>
                </div>
            </div>
        </div>
    );
}

export default Audience;