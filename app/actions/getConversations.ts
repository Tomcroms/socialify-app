import prisma from "@/app/libs/prismadb";
import getCurrentUser from '@/app/actions/getCurrentUser';

const getConversations = async (selectedCampaignId: string | null) => {
    // const currentUser = await getCurrentUser();
    // if(!currentUser?.id) {
    //     return [];
    // }

    if(!selectedCampaignId){
        return []
    }

    try{
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc"
            },
            where: {
                // userIds: {
                //     has: currentUser.id
                // },
                campaignId: selectedCampaignId
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        })

        return conversations;
        
    } catch (error: any) {
        return [];
    }
}

export default getConversations;