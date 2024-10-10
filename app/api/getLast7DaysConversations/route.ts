import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { subDays, startOfDay, endOfDay } from 'date-fns';

export async function POST(request: Request) {
  try {
    const { currentCampaignId } = await request.json();

    if (!currentCampaignId) {
      return new NextResponse('Campaign ID is required', { status: 400 });
    }

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

    return NextResponse.json(conversationsCountPerDay);
  } catch (error) {
    console.error('Error fetching last 7 days conversations', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
