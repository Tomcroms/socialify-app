import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const { instagramAccountId } = await request.json();

    if (!instagramAccountId) {
      return NextResponse.json(
        { error: 'Instagram Account ID is required' },
        { status: 400 }
      );
    }

    // Calculer la date des 7 derniers jours
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    // Récupérer les messages des 7 derniers jours pour cet account Instagram
    const messages = await prisma.sentMessage.findMany({
      where: {
        instagramAccountId: instagramAccountId,
        createdAt: {
          gte: last7Days,
        },
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
