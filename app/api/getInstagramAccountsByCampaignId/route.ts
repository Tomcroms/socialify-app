import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Filters {
    id?: string;
    username?: string;
    campaignName?: string;
}

export async function POST(request: Request) {
    try {
        const { campaignId } = await request.json();
    
        if (!campaignId) {
          return NextResponse.json(
            { error: 'Campaign ID is required' },
            { status: 400 }
          );
        }
    
        const instagramAccounts = await prisma.instagramAccount.findMany({
          where: {
            campaignId: campaignId,
          },
        });
    
        return NextResponse.json(instagramAccounts);
      } catch (error) {
        console.error('Error fetching Instagram accounts:', error);
        return NextResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 }
        );
      }
}
