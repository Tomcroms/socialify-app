"use client";
import Summary from "./components/Summary";
import Accounts from "./components/Accounts";
import TotalMessages from "./components/TotalMessages";
import TotalAnswers from "./components/TotalAnswers";
import Audience from "./components/Audience";
import { useCurrentCampaignContext } from "../context/CurrentCampaignWrapper";
import getLast7DaysConversations from "@/app/actions/getLast7DaysConversations";
import { useEffect, useState } from "react";
import getLast7DaysMessagesSent from "../actions/getLast7DaysSentMessages";
import axios from "axios";
import { InstagramAccount } from "@prisma/client";

const Dashboard = () => {

    const { currentCampaign, totalMessagesSent, instagramAccounts, last7DaysConversations, last7DaysSentMessages } = useCurrentCampaignContext();
    
    return (
        <>
            <header className="flex items-center justify-center h-20 bg-white ml-40 absolute w-[calc(100%-160px)] z-10">
                <div>
                    {currentCampaign ? (
                        <h2>Dashboard: { currentCampaign.campaignName }</h2>
                    ) : (
                        <h2>Dashboard: Please create a campaign</h2>
                    )}

                </div>
            </header>
            <div className="ml-40 p-4 bg-customGray2 pb-6 pt-24 h-screen">
                <section className="w-full mb-8 flex gap-3">
                    <TotalMessages totalMessagesSent={ totalMessagesSent } currentCampaign={currentCampaign}/>
                    <TotalAnswers currentCampaign={ currentCampaign } />
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
        </>
    );
}


export default Dashboard;