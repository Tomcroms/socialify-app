import prisma from "@/app/libs/prismadb";
import getCurrentUser from '@/app/actions/getCurrentUser';


const getCampaigns = async () => {
    try {
      const currentUser = await getCurrentUser();
  
      if (!currentUser?.email) {
        return null;
      }
    
      const campaign = await prisma.campaign.findMany({
        where: {
          userIds: {
            has: currentUser.id
          }
        },
        include: {
          users: false,
        },
        orderBy: {
          selected: 'desc' // 'desc' will ensure true values come before false
        }
      });
  
      return campaign;
    } catch (error: any) {
      console.log(error, 'SERVER_ERROR')
      return null;
    }
};

export default getCampaigns;