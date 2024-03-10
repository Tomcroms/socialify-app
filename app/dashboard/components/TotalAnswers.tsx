import { AiOutlineMessage } from "react-icons/ai";
import { Campaign } from "@prisma/client";

interface TotalAnswersProps{
    currentCampaign?: Campaign | null;
}

const TotalAnswers: React.FC<TotalAnswersProps> = ({ currentCampaign }) => {

    const nbAnswers = currentCampaign? currentCampaign.conversationIds.length : 0;

    // A CHANGER !!!!!
    const conversionRate = currentCampaign? (currentCampaign.conversationIds.length / currentCampaign?.nbMessages) : 0;

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
                    <AiOutlineMessage  className="h-6 w-6 text-black"/>
                </div>
                <div className="ml-2">
                    <h4>Total messages sent</h4>
                    <h5>This month</h5>
                </div>
            </div>
            <h3 className="mt-3">{nbAnswers}</h3>
            <p>{conversionRate}% conversion rate</p>
            <div className="bg-customGray h-20 w-3 rounded-2xl absolute bottom-4 right-[116px]">
                <div className="bg-customBlue h-12 w-3 rounded-2xl absolute bottom-2 right-0"></div>
            </div>
            <div className="bg-customGray h-24 w-3 rounded-2xl absolute bottom-4 right-[98px]">
                <div className="bg-customBlue h-14 w-3 rounded-2xl absolute bottom-7 right-0"></div>
            </div>
            <div className="bg-customGray h-24 w-3 rounded-2xl absolute bottom-4 right-[80px]">
                <div className="bg-customBlue h-16 w-3 rounded-2xl absolute bottom-5 right-0"></div>
            </div>
        </div>
    );
}

export default TotalAnswers;