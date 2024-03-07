import Sidebar from "../components/sidebar/Sidebar";
import getUsers from '../actions/getUsers';
import UserList from './components/UserList';
import { CampaignsWrapper } from "../context/CampaignContext";
import getCampaigns from "../actions/getCampaigns";

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode;
})  {
    const users = await getUsers();
    const campaigns = await getCampaigns();
    console.log((users.length))

    return (
        <Sidebar>
            <div className="h-full">
                <UserList items={users} />
                <CampaignsWrapper campaigns={campaigns || []}>
                    {children}
                </CampaignsWrapper>
                
            </div>
        </Sidebar>
    )
};