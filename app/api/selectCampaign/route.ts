import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'; 


export async function POST(
  request: Request,
){
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId: string = currentUser.id; 
    const body = await request.json();

    const { campaignId } = body;

    try {
      
        await prisma.$transaction(async (prisma) => {
        
            await prisma.campaign.updateMany({
            where: {
                userIds: {
                has: userId
                },
                selected: true,
            },
            data: {
                selected: false,
            },
            });
    
            const updatedCampaign = await prisma.campaign.update({
                where: {
                    id: campaignId,
                },
                data: {
                    selected: true,
                },
            });
        
            return updatedCampaign;
        });
  
        return new NextResponse(JSON.stringify({ message: 'Campaign updated successfully' }), { status: 200 });
  
    } catch (error) {
      console.error('Error creating campaign', error);
      return new NextResponse('Error', { status: 500 });
    }
}
