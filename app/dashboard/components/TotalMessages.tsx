"use client";

import { AiOutlinePieChart } from "react-icons/ai";
import ProgressBar from "./ProgressBar";
import { Campaign } from "@prisma/client";

interface TotalMessagesProps {
    totalMessagesSent: number;
    currentCampaign: Campaign | null;
}

const TotalMessages: React.FC<TotalMessagesProps> = ({ totalMessagesSent, currentCampaign }) => {

    const nbMessagesSent = currentCampaign ? totalMessagesSent / currentCampaign.nbMessages * 100 : 0; 
    const nbMessages = currentCampaign ? currentCampaign.nbMessages : 0;

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
                <div style={{ backgroundColor: "#eceefc" }} className="rounded p-2">
                    <AiOutlinePieChart className="h-6 w-6 text-customBlue"/>
                </div>
                <div className="ml-2">
                    <h4>Total Messages Sent</h4>
                    <h5>This month</h5>
                </div>
            </div>
            <div className="flex items-center mt-3">
                <ProgressBar progress={nbMessagesSent}/>
                <h3 className="ml-4">{ totalMessagesSent }</h3>
            </div>
            <p>{nbMessagesSent}% completed</p>
        </div>
    );
}

export default TotalMessages;   