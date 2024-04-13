"use client";
import Summary from "./components/Summary";
import Accounts from "./components/Accounts";
import TotalMessages from "./components/TotalMessages";
import TotalAnswers from "./components/TotalAnswers";
import Audience from "./components/Audience";
import { useCurrentCampaignContext } from "../context/CurrentCampaignWrapper";
import { CiLock } from "react-icons/ci";
import CampaignSelection from "./components/CampaignSelection";
import Link from "next/link";

const Dashboard = () => {

    const { currentCampaign, totalMessagesSent, instagramAccounts, last7DaysConversations, last7DaysSentMessages } = useCurrentCampaignContext();

    return (
        <div className="w-full pl-40 h-screen flex flex-col overflow-hidden bg-customLightGray">
            <header className="flex items-center px-6 h-20 bg-white w-full z-10">
                <div>
                    {currentCampaign ? (
                        <div className="flex items-center">
                            <h3>Dashboard: </h3>
                            <CampaignSelection />
                        </div>

                    ) : (
                        <CampaignSelection />
                    )}

                </div>
                <Link className="ml-20" href="/campaignRequest">
                    <div className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-center">
                        Create New Campaign
                    </div>
                </Link>
            </header>
            <section className="w-full flex gap-3 h-min p-6">
                <TotalMessages totalMessagesSent={ totalMessagesSent } currentCampaign={currentCampaign}/>
                <TotalAnswers totalMessagesSent={ totalMessagesSent } currentCampaign={ currentCampaign } />
                <Audience />
            </section>
            <main className="flex-1 w-full flex overflow-hidden gap-4 px-6 pb-4">
                <Summary last7DaysSentMessages={last7DaysSentMessages} last7DaysConversations={last7DaysConversations} />
                <Accounts instagramAccounts={instagramAccounts}/>
            </main>
        </div>
                
                    // {!currentCampaign && (
                    //     <div className="box-border absolute h-full w-full bg-gray-500 z-10 opacity-50 cursor-not-allowed">
                    //         <CiLock className="text-customGray h-20 w-20 m-auto mt-40"/>
                    //         <h3 className="text-white w-full text-center mt-4">Please select a campaign to display</h3>
                    //     </div>
                    // )}
                    //<section className="w-1/3 flex flex-col flex-grow rounded-xl p-4 bg-white">
    );
}


export default Dashboard;