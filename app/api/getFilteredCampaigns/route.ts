import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface filters{
  email?: string;
  id?: string;
  name?: string;
}

export async function POST(request: Request) {
  try {
      const { email, id, name } = await request.json() as filters;

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

      if (name) {
          whereCondition.campaignName = {
              contains: name,
              mode: "insensitive",
          };
      }

      const campaigns = await prisma.campaign.findMany({
          where: whereCondition,
          include: {
              users: true, // Assurez-vous que ceci est approprié selon vos relations Prisma
          }
      });

      return NextResponse.json(campaigns);
  } catch (error) {
      console.error('Error fetching campaigns', error);
      return new NextResponse('Error fetching campaigns', { status: 500 });
  }
}