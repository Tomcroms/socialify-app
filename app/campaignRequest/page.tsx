"use client";
import CampaignForm from "./components/CampaignForm";
import CampaignPreview from "./components/CampaignPreview";
import { useState } from "react";

const CreateNewCampaign = () => {

    const [newCampaignData, setNewCampaignData] = useState({ message: '', nbMessages: 0 });

    const handleNewCampaignDataChange = (newData: { message: string; nbMessages: number }) => {
        setNewCampaignData(newData);
    }

    return (
        <main className="pl-40 flex flex-col items-center bg-gray-200">
            {/* <header className="bg-white relative w-full h-20 flex items-center justify-center p-4">
                <h2>New Campaign</h2>
            </header> */}
            <div className="w-full h-full flex gap-6">
                <CampaignForm onCampaignDataChange={handleNewCampaignDataChange} />
                <CampaignPreview data={newCampaignData}  />
            </div>

        </main>
    );
} 


export default CreateNewCampaign;