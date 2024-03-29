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
        <div className="w-full pl-40">
            <header className="flex items-center px-6 h-20 bg-white w-[calc(100%-160px)] z-10">
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
                <Link className="ml-20" href="/settings/createNewCampaign">
                    <div className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-center">
                        Create New Campaign
                    </div>
                </Link>
            </header>
            <section className="h-full relative">
                {!currentCampaign && (
                    <div className="box-border absolute h-full w-full bg-gray-500 z-10 opacity-50 cursor-not-allowed">
                        <CiLock className="text-customGray h-20 w-20 m-auto mt-40"/>
                        <h3 className="text-white w-full text-center mt-4">Please select a campaign to display</h3>
                    </div>
                )}
                <div className="p-4 bg-customGray2 pb-6 h-full">
                    <section className="w-full mb-8 flex gap-3">
                        <TotalMessages totalMessagesSent={ totalMessagesSent } currentCampaign={currentCampaign}/>
                        <TotalAnswers totalMessagesSent={ totalMessagesSent } currentCampaign={ currentCampaign } />
                        <Audience />
                    </section>
                    <main className="w-full flex gap-4">
                        <section className="w-2/3 flex flex-col gap-4">
                            <Summary last7DaysSentMessages={last7DaysSentMessages} last7DaysConversations={last7DaysConversations} />
                            <Accounts instagramAccounts={instagramAccounts}/>
                        </section>
                        <section className="w-1/3 flex flex-col flex-grow rounded-xl p-4 bg-white">
                            <h4 className="absolute">My favorite conversations</h4>
                        </section>
                    </main>
                </div>
            </section>

        </div>
    );
}


export default Dashboard;