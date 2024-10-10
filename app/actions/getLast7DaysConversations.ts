import prisma from "@/app/libs/prismadb";
import { subDays, startOfDay, endOfDay } from 'date-fns';



const getLast7DaysConversations = async (currentCampaignId?: string): Promise<number[] | null> => {

  const sevenDaysAgo = subDays(new Date(), 7);

    try {
    
      const conversationsCountPerDay: number[] = [];

      for (let i = 6; i >= 0; i--) {
        const dayStart = startOfDay(subDays(new Date(), i));
        const dayEnd = endOfDay(subDays(new Date(), i));
  
        const conversationsCount = await prisma.conversation.count({
          where: {
            campaignId: currentCampaignId,
            createdAt: {
              gte: dayStart,
              lte: dayEnd,
            },
          },
        });
  
        conversationsCountPerDay.push(conversationsCount);
      }
  
      return conversationsCountPerDay;
    } catch (error: any) {
      console.log(error, 'SERVER_ERROR')
      return null;
    }
};

export default getLast7DaysConversations;