import getCampaigns from "../actions/getCampaigns";
import Sidebar from "../components/sidebar/Sidebar";
import { CampaignsWrapper } from "../context/CampaignsContext";

export default async function SettingsLayout({
    children
}: {
    children: React.ReactNode;
})  {
    const campaigns = await getCampaigns();
    return (
        <Sidebar>
                <CampaignsWrapper campaigns={campaigns || []}>
                    {children}
                </CampaignsWrapper>
        </Sidebar> 
    )
};  