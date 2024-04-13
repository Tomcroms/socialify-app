import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { getSession } from 'next-auth/react';
import prisma from '@/app/libs/prismadb'; // Assurez-vous que le chemin d'importation est correct

interface CampaignCreateData {
  campaignName: string;
  campaignMessage: string;
  campaignDescription: string;
  campaignKeyWords: string[];
  followersMin?: number;
  followersMax?: number;
  campaignDuration: string;
  campaignPrice: number;
  contact: string;
  company?: string;
}

export async function POST(request: Request){
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body: CampaignCreateData = await request.json();

    //validation logic here to do

    try {
      const newCampaign = await prisma.campaignRequest.create({
        data: {
          campaignName: body.campaignName,
          campaignMessage: body.campaignMessage,
          campaignDescription: body.campaignDescription,
          campaignKeyWords: body.campaignKeyWords,
          followersMin: body.followersMin,
          followersMax: body.followersMax,
          campaignDuration: body.campaignDuration,
          campaignPrice: body.campaignPrice,
          contact: body.contact,
          company: body.company,
        },
      });

      return NextResponse.json(newCampaign);
    } catch (error) {
      console.error('Error creating campaign', error);
      return new NextResponse('Error', { status: 500 });
    }
}
