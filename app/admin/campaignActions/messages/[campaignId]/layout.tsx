import getSelectedCampaignId from '@/app/actions/getSelectedCampaignId';
import ConversationListAdmin from './ConversationListAdmin';
import getConversationsByCampaignId from '@/app/actions/getConversationByCampaignId';
import getUsers from '@/app/actions/getUsers';


export default async function ConversationsLayout({
    params,
    children,
}: {
    params: { campaignId: string };
    children: React.ReactNode;
}) {
    // Récupération de l'ID de la campagne depuis l'URL
    const selectedCampaignId = params.campaignId;

    const users = await getUsers();
    const conversations = await getConversationsByCampaignId(selectedCampaignId);

    console.log("Length of conversations:")
    console.log(conversations.length)



    // Rendu du composant
    return (
        <main className='flex flex-col'>
            <section>
                {children}
            </section>
            <section>
                <ConversationListAdmin
                    users={users}
                    title="Messages"
                    initialItems={conversations}
                    campaignId={selectedCampaignId}
                />
            </section>
        </main>
    );
}
