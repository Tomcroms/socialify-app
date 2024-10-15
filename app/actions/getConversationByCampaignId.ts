import prisma from "@/app/libs/prismadb";
import getCurrentUser from '@/app/actions/getCurrentUser';

const getConversationsByCampaignId = async (currentCampaignId: string) => {
    try{
        console.log(currentCampaignId)
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc"
            },
            where: {
                campaignId: currentCampaignId
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        //seen: true
                    }
                }
            }
        })
        
        return conversations;
        
    } catch (error: any) {
        console.log(error)
        return [];
    }
}

export default getConversationsByCampaignId;