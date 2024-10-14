import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'; 

interface CampaignCreateData {
  userEmail: string;

  campaignName: string;
  campaignMessage: string;
  biography: string;
  campaignKeyWords: string[];
  followersMin?: number;
  followersMax?: number;
  campaignDuration: number;
  campaignPrice: number;
  nbMessages: number;
}

export async function POST(request: Request) {

  const body: CampaignCreateData = await request.json();

  try {
    // Tentative de recherche de l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email: body.userEmail },
      select: { id: true }, // Seulement récupérer l'ID de l'utilisateur
    });

    // Créer la campagne, associée à l'utilisateur si trouvé, sinon sans utilisateur
    const newCampaign = await prisma.campaign.create({
      data: {
        campaignName: body.campaignName,
        bio: body.biography,
        message: body.campaignMessage,
        keyWords: body.campaignKeyWords,
        followersMin: body.followersMin,
        followersMax: body.followersMax,
        duration: body.campaignDuration,
        price: body.campaignPrice,
        nbMessages: body.nbMessages,
        userIds: user ? [user.id] : [], // Ajoute l'ID de l'utilisateur s'il est trouvé
      },
    });

    // Si un utilisateur est associé à la campagne, mettre à jour son champ campaignIds
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          campaignIds: {
            push: newCampaign.id, // Ajoute l'ID de la nouvelle campagne à la liste des campagnes de l'utilisateur
          },
        },
      });
    }

    return NextResponse.json(newCampaign);
  } catch (error) {
    console.error('Error creating campaign', error);
    return new NextResponse('Error', { status: 500 });
  }
}
