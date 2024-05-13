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
        <div onClick={selectCampaign} className={`bg-gray-100 h-10 border-gray-100 rounded-xl w-full flex items-center justify-center cursor-pointer p-2`}>
            <p className={campaign.selected === true ? 'font-black' : ''}>{campaign.campaignName}</p>
        </div>
    );
};
  
export default CampaignBlock;
  