"use client";
import getCampaigns from "../actions/getCampaigns";
import CampaignBlock from "./components/CampaignBlock";
import Link from "next/link";
import { useCampaignsContext } from "../context/CampaignsContext";


interface SettingsProps {
    currentCampaignId: string; // Optional since not all pages might use it
}

const Settings = () => {
    const { campaigns } = useCampaignsContext();

    return (
        <main className="h-full pl-40">
            <header className="h-20 flex items-center justify-center p-4 bg-white">
                <h2>My campaigns</h2>
                <Link className="ml-20" href="/settings/createNewCampaign">
                    <div className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-center">
                        Create New Campaign
                    </div>
                </Link>
            </header>
            <section className="h-full pt-10 bg-gray-100 w-full flex flex-col items-center gap-4">
                {campaigns?.map((item) => (
                    <CampaignBlock
                        key={item.id}
                        campaign={item}
                    />
                ))}
            </section>
        </main>
    );
} 


export default Settings;