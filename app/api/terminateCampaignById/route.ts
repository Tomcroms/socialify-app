import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    // Récupérer le campaignId du corps de la requête
    const { campaignId } = await request.json();

    if (!campaignId) {
      return new NextResponse('Campaign ID is required', { status: 400 });
    }

    // Vérifier si la campagne existe
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return new NextResponse('Campaign not found', { status: 404 });
    }

    // Mettre à jour le statut de la campagne en 'finished'
    await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: 'finished' },
    });

    // Mettre à jour les comptes Instagram liés
    await prisma.instagramAccount.updateMany({
      where: { campaignId: campaignId },
      data: {
        campaignId: null,
        campaignName: null,
      },
    });

    return new NextResponse('Campaign status updated to finished successfully', { status: 200 });
  } catch (error) {
    console.error('Error updating campaign status', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
