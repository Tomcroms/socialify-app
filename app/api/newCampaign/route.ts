import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { getSession } from 'next-auth/react';
import prisma from '@/app/libs/prismadb'; // Assurez-vous que le chemin d'importation est correct

interface CampaignCreateData {
  campaignName: string;
  status: string;
  message: string;
  bio: string;
  nbMessages: number;
  nbMessagesSent: number;
  link?: string;
}

export async function POST(
  request: Request,
){
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId: string = currentUser.id; // Adaptez selon la structure de votre objet session
    const body:CampaignCreateData = await request.json();

    try {
      const newCampaign = await prisma.campaign.create({
        data: {
          ...body,
          users: {
            connect: [{ id: userId }],
          },
        },
      });

      return NextResponse.json(newCampaign)
    } catch (error) {
      console.error('Error creating campaign', error);
      return new NextResponse('Error', { status: 500 });
    }
}
