import prisma from "@/app/libs/prismadb";
import getCurrentUser from '@/app/actions/getCurrentUser';

// Function to get a specific campaign by its ID
const getCampaignById = async (campaignId: string) => {
    try {

        const campaign = await prisma.campaign.findFirst({
            where: {
                id: campaignId, 
            },
            include: {
                users: false,
            }
        });

        return campaign;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR');
        return null;
    }
};

export default getCampaignById;
