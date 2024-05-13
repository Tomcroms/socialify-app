import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'; 

export async function POST(request: Request) {
  try {
    // Récupérer le corps de la requête
    const { campaignId } = await request.json();

    if (!campaignId) {
      return new NextResponse('Campaign ID is required', { status: 400 });
    }

    // Récupérer les détails de la campagne en utilisant Prisma
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
      include: {
        users: true, // Assurez-vous que les relations sont bien définies pour inclure les utilisateurs liés
      },
    });

    if (!campaign) {
      return new NextResponse('Campaign not found', { status: 404 });
    }

    // Retourner les données de la campagne sous forme de réponse JSON
    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
