import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Filters {
  email?: string;
  id?: string;
  campaignName?: string;
}

const statusOrder = ['ongoing', 'ready', 'pending', 'upcoming', 'finished']; // L'ordre de tri des statuts

export async function POST(request: Request) {
  try {
    const { email, id, campaignName } = (await request.json()) as Filters;

    const whereCondition: any = {};

    if (email) {
      whereCondition.users = {
        some: {
          email: {
            contains: email,
            mode: "insensitive",
          },
        },
      };
    }

    if (id) {
      whereCondition.id = id;
    }

    if (campaignName) {
      whereCondition.campaignName = {
        contains: campaignName,
        mode: "insensitive",
      };
    }

    // Récupérer les campagnes avec les conditions
    const campaigns = await prisma.campaign.findMany({
      where: whereCondition,
      include: {
        users: true,
        _count: {
          select: { instagramAccounts: true }, // Inclure le nombre de comptes Instagram
        },
      },
    });

    // Trier les campagnes selon l'ordre du statut
    const sortedCampaigns = campaigns.sort((a, b) => {
      const statusA = a.status.toLowerCase();
      const statusB = b.status.toLowerCase();
      
      // Utiliser l'ordre défini dans statusOrder
      return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
    });

    return NextResponse.json(sortedCampaigns);
  } catch (error) {
    console.error("Error fetching campaigns", error);
    return new NextResponse("Error fetching campaigns", { status: 500 });
  }
}
