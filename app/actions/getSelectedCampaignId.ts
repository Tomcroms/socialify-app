import prisma from "@/app/libs/prismadb";
import getCurrentUser from '@/app/actions/getCurrentUser';

const getSelectedCampaignId = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser?.id) {
        return null;
    }

    try{
        const selectedCampaign = await prisma.campaign.findFirst({
            where: {
                userIds: {
                    has: currentUser.id
                },
                selected: true
            },
        })

        return selectedCampaign ? selectedCampaign.id : null;
        
    } catch (error: any) {
        console.error("Erreur lors de la recherche de la campagne sélectionnée:", error);
        return null;
    }
}

export default getSelectedCampaignId;