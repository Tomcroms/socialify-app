import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Filters {
    id?: string;
    username?: string;
    campaignName?: string;
}

export async function POST(request: Request) {
    try {
        const { id, username, campaignName } = await request.json() as Filters;

        const whereCondition: any = {};

        if (id) {
            whereCondition.id = id;
        }

        if (username) {
            whereCondition.username = {
                contains: username,
                mode: "insensitive",
            };
        }

        if (campaignName) {
            whereCondition.campaignName = {
                contains: campaignName,
                mode: "insensitive",
            };
        }

        const accounts = await prisma.instagramAccount.findMany({
            where: whereCondition,
            select: {
                id: true,
                username: true,
                campaignName: true,
                followers: true,
                following: true,
                image: true,
            }
        });

        return NextResponse.json(accounts);
    } catch (error) {
        console.error('Error fetching Instagram accounts', error);
        return new NextResponse('Error fetching Instagram accounts', { status: 500 });
    }
}
