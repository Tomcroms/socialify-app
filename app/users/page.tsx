"use client";

import { useCampaignContext } from "../context/CampaignContext";

const Test = () => {
    const { campaigns, setCampaignId, campaignId } = useCampaignContext();
    return (
        <div className="hidden lg:block lg:pl-80 h-full">
            <h1>CampaignId:  { campaignId }</h1>
            <button className="p-2 bg-black text-white" onClick={() => setCampaignId("Nouvelle campaign")}>Change name</button>
        </div>
    ); 
}


export default Test;

