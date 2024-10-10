import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { subDays, startOfDay, endOfDay } from 'date-fns';

export async function POST(request: Request) {
  try {
    const { currentCampaignId } = await request.json();

    if (!currentCampaignId) {
      return new NextResponse('Campaign ID is required', { status: 400 });
    }

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

    return NextResponse.json(messagesSentPerDay);
  } catch (error) {
    console.error('Error fetching last 7 days sent messages', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
