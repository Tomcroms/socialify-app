import prisma from "@/app/libs/prismadb";
import { subDays, startOfDay, endOfDay } from 'date-fns';

const getLast7DaysSentMessages = async (currentCampaignId?: string): Promise<number[] | null> => {
  try {
    const messagesSentPerDay: number[] = [];

    for (let i = 6; i >= 0; i--) {
      const dayStart = startOfDay(subDays(new Date(), i));
      const dayEnd = endOfDay(subDays(new Date(), i));

      const dailyMessagesCount = await prisma.sentMessage.count({
        where: {
          campaignId: currentCampaignId,
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
        },
      });

      messagesSentPerDay.push(dailyMessagesCount);
    }

    return messagesSentPerDay;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR');
    return null;
  }
};

export default getLast7DaysSentMessages;
