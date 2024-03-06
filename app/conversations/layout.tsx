import getSelectedCampaignId from '../actions/getSelectedCampaignId';
import getConversations from '../actions/getConversations';
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";


export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {

    const selectedCampaignId = await getSelectedCampaignId();
    const conversations = await getConversations();
    const users = await getUsers();

    const filteredConversations = conversations.filter(item => 
        item.campaignId === selectedCampaignId
    );
    
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList 
                    users={users} 
                    title="Messages" 
                    initialItems={filteredConversations}
                />
                {children}
            </div>
        </Sidebar>
    );
}