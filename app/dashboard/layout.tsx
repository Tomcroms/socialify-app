import Sidebar from "../components/sidebar/Sidebar";
import { CurrentCampaignWrapper } from "../context/CurrentCampaignWrapper";
import { InstagramAccount } from "@prisma/client";
import getCampaigns from "../actions/getCampaigns";
import getInstagramAccounts from "../actions/getInstagramAccounts";
import getLast7DaysConversations from "@/app/actions/getLast7DaysConversations";
import getLast7DaysSentMessages from "../actions/getLast7DaysSentMessages";
import TotalMessages from "./components/TotalMessages";
import getTotalMessagesSent from "../actions/getTotalMessagesSent";
import { CampaignsWrapper } from "../context/CampaignsContext";

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
})  { 
    
    const campaigns = await getCampaigns();
    const currentCampaign = campaigns?.find(campaign => campaign.selected === true);

    let totalMessagesSent = 0;
    if (currentCampaign) {
        const result = await getTotalMessagesSent(currentCampaign.id);
        totalMessagesSent = result || totalMessagesSent;
    }

    let instagramAccounts: InstagramAccount[] = [];
    if (currentCampaign) {
        const result = await getInstagramAccounts(currentCampaign.id);
        instagramAccounts = result || [];
    }

    let last7DaysConversations = [0,0,0,0,0,0,0];
    if (currentCampaign) {
        const result = await getLast7DaysConversations(currentCampaign.id);
        last7DaysConversations = result || last7DaysConversations;
    }

    let last7DaysSentMessages = [0,0,0,0,0,0,0];
    if (currentCampaign) {
        const result = await getLast7DaysSentMessages(currentCampaign.id);
        last7DaysSentMessages = result || last7DaysSentMessages;
    }


    return (
        <Sidebar>
            <CampaignsWrapper campaigns={campaigns || []}>
                    <CurrentCampaignWrapper 
                        currentCampaign={currentCampaign || null}
                        totalMessagesSent={totalMessagesSent} 
                        instagramAccounts={instagramAccounts} 
                        last7DaysConversations={last7DaysConversations} 
                        last7DaysSentMessages={last7DaysSentMessages}
                    >
                        {children}
                    </CurrentCampaignWrapper>
            </CampaignsWrapper>
        </Sidebar>
    )
}; 