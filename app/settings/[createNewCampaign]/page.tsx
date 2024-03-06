"use client";
import NewCampaignForm from "./components/NewCampaignForm";
import CampaignForm from "./components/CampaignForm";
import CampaignPreview from "./components/CampaignPreview";
import { useState } from "react";

const createNewCampaign = () => {

    const [newCampaignData, setNewCampaignData] = useState({ message: '' });
    const handleNewCampaignDataChange = (newData: { message: string }) => {
        setNewCampaignData(newData);
    }

    return (
        <main className="h-full pl-40 flex flex-col items-center bg-gray-200">
            <header className="bg-white relative w-full h-20 flex items-center justify-center p-4">
                <h2>New Campaign</h2>
            </header>
            <div className="w-full flex gap-6">
                <CampaignForm onCampaignDataChange={handleNewCampaignDataChange} />
                <CampaignPreview data={newCampaignData}  />
            </div>

        </main>
    );
} 


export default createNewCampaign;