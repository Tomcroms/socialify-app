'use client';

import { Campaign, InstagramAccount } from '@prisma/client';
import TotalAnswers from '@/app/dashboard/components/TotalAnswers';
import TotalMessages from '@/app/dashboard/components/TotalMessages';
import Audience from '@/app/dashboard/components/Audience';
import Summary from '@/app/dashboard/components/Summary';
import axios from "axios";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';

const Dashboard = () =>{

    const router = useRouter();

    const pathname = usePathname();
    const [id, setId] = useState<string | null>(null);
    

    const [currentCampaign, setCurrentCampaign] = useState(null);
    const [totalMessagesSent, setTotalMessageSent] = useState(0);
    const [last7DaysSentMessages, setLast7DaysSentMessages] = useState([0,0,0,0,0,0,0]);
    const [last7DaysConversations, setLast7DaysConversations] = useState([0,0,0,0,0,0,0]);

    useEffect(() => {
        const pathParts = pathname.split('/');
        const pathId = pathParts[pathParts.length - 1];
        setId(pathId);
        
    }, [pathname]);


    useEffect(() => {
        if (id) {
            fetchCampaign();
            fetchTotalMessagesSent(id);
            fetchLast7DaysSentMessages(id);
            fetchLast7DaysConversations(id);
        }
    }, [id]);

    const fetchCampaign = async () => {
        try {
            const response = await axios.post('/api/getCampaignById', {
                campaignId: id,
            });

            if (response.status === 200) {
                setCurrentCampaign(response.data);
            } else {
                setCurrentCampaign(null);
            }
        } catch (error) {
            console.error('Error fetching campaign', error);
            setCurrentCampaign(null);
        }
    };

    const fetchTotalMessagesSent = async (campaignId: string) => {
        try {
            const response = await axios.post('/api/getTotalMessagesSent', {
                currentCampaignId: campaignId,
            });

            if (response.status === 200) {
                setTotalMessageSent(response.data);
            }
        } catch (error) {
            console.error('Error fetching total messages sent', error);
        }
    };

    const fetchLast7DaysSentMessages = async (campaignId: string) => {
        try {
            const response = await axios.post('/api/getLast7DaysSentMessages', {
                currentCampaignId: campaignId,
            });

            if (response.status === 200) {
                setLast7DaysSentMessages(response.data);
            }
        } catch (error) {
            console.error('Error fetching last 7 days sent messages', error);
        }
    };

    const fetchLast7DaysConversations = async (campaignId: string) => {
        try {
            const response = await axios.post('/api/getLast7DaysConversations', {
                currentCampaignId: campaignId,
            });

            if (response.status === 200) {
                setLast7DaysConversations(response.data);
            }
        } catch (error) {
            console.error('Error fetching last 7 days conversations', error);
        }
    };

    const handleClickRedirection = (endUrl: string) => {
        if (id) {
            router.push(`/admin/campaignActions/${endUrl}/${id}`);
        } else {
            alert("Please choose a campaign first");
        }
    };



    return (
        <section className='w-full pt-4'>
            <nav className="flex items-center gap-4 w-full justify-center">
                <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("")}>Campaign actions</div>
                <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("accounts")}>Accounts</div>
                <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("dashboard")}>Dashboard</div>
                <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("messages")}>Messages</div>
            </nav>
            <div className="w-full pl-40 h-screen flex flex-col overflow-hidden bg-customLightGray">
                <section className="w-full flex gap-3 h-min p-6">
                    <TotalMessages totalMessagesSent={ totalMessagesSent } currentCampaign={currentCampaign}/>
                    <TotalAnswers totalMessagesSent={ totalMessagesSent } currentCampaign={ currentCampaign } />
                    <Audience currentCampaign={ currentCampaign }/>
                </section>
                <main className="flex-1 w-full flex overflow-hidden gap-4 px-6 pb-4">
                    <Summary last7DaysSentMessages={last7DaysSentMessages} last7DaysConversations={last7DaysConversations} />
                    {/* <Accounts instagramAccounts={instagramAccounts}/> */}
                </main>
            </div>
        </section>
    )
};

export default Dashboard;
