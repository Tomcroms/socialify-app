import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const { currentCampaignId } = await request.json();

    if (!currentCampaignId) {
      return new NextResponse('Campaign ID is required', { status: 400 });
    }

    const totalMessagesSent = await prisma.sentMessage.count({
      where: {
        campaignId: currentCampaignId,
      },
    });

    return NextResponse.json(totalMessagesSent);
  } catch (error) {
    console.error('Error fetching total messages sent', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
