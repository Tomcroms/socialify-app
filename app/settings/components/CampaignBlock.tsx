"use client";

import { Campaign } from "@prisma/client";
import axios from "axios";

interface CampaignBlockProps {
    campaign: Campaign;
}

const CampaignBlock: React.FC<CampaignBlockProps> = ({ campaign }) => {
    const selectCampaign = async () => {
        try {
            await axios.post('/api/selectCampaign', {
                campaignId: campaign.id
            });
            window.location.reload();
        } catch (error) {
            console.error('Failed to select campaign', error);
        }
    };
    
    return (
        <div onClick={selectCampaign} className={`cursor-pointer p-4 rounded-lg ${campaign.selected === true ? 'bg-blue-500' : 'bg-white'} flex items-center justify-center`}>
            <h3>{campaign.campaignName}</h3>
            <p className="ml-8">NbMessages: { campaign.nbMessages}</p>
            <p className="ml-8">{campaign.id}</p>
        </div>
    );
};
  
export default CampaignBlock;
  