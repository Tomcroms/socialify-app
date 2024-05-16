import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'; 

export async function POST(request: Request) {
  try {
    const { campaignId, message } = await request.json();

    if (!campaignId || !message) {
      return new NextResponse('Campaign ID and message are required', { status: 400 });
    }

    const updatedCampaign = await prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        message: message,
      },
    });

    if (!updatedCampaign) {
      return new NextResponse('Campaign not found', { status: 404 });
    }

    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.error('Error updating campaign message', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
