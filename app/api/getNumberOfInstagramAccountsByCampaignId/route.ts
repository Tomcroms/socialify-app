import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    try {
        const { campaignId } = await request.json();

        if (campaignId) {
            const instagramAccountCount = await prisma.instagramAccount.count({
                where: {
                    campaignId: campaignId,
                },
            });

            return NextResponse.json({ count: instagramAccountCount });
        } else {
            return new NextResponse('Campaign ID not provided', { status: 400 });
        }
    } catch (error) {
        console.error('Error fetching number of Instagram accounts', error);
        return new NextResponse('Error fetching number of Instagram accounts', { status: 500 });
    }
}
