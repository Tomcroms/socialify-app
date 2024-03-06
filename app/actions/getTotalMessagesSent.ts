import prisma from "@/app/libs/prismadb";


const getTotalMessagesSent = async (currentCampaignId: string) => {
    try {
        const totalMessagesSent = await prisma.sentMessage.count({
            where: {
                campaignId: currentCampaignId
            }
        });
    
        return totalMessagesSent;
        
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR');
        return null;
    }
}

export default getTotalMessagesSent;