import getSelectedCampaignId from '@/app/actions/getSelectedCampaignId';
import getConversations from '@/app/actions/getConversationByCampaign';
import getUsers from '@/app/actions/getUsers';
import ConversationListAdmin from './ConversationListAdmin';


export default async function ConversationsLayout({
    params,
    children,
}: {
    params: { messages: string };
    children: React.ReactNode;
}) {
    // Récupération de l'ID de la campagne depuis l'URL
    const selectedCampaignId = params.messages;

    const users = await getUsers();
    const conversations = await getConversations(selectedCampaignId);

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
                />
            </section>
        </main>
    );
}
