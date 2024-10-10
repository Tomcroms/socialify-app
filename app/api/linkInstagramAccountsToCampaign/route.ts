import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    console.log('Received POST request to /api/linkInstagramAccountsToCampaign');
    try {
        const { campaignId } = await request.json();

        if (!campaignId) {
            return new NextResponse('Campaign ID not provided', { status: 400 });
        }

        // Fetch the campaign details
        const campaign = await prisma.campaign.findUnique({
            where: { id: campaignId },
            select: {
                campaignName: true,
                nbMessages: true,
                duration: true,
            },
        });

        if (!campaign) {
            return new NextResponse('Campaign not found', { status: 404 });
        }

        const { campaignName, nbMessages, duration } = campaign;

        if (nbMessages == null || duration == null) {
            return new NextResponse('Campaign nbMessages or duration is missing', { status: 400 });
        }

        // Parse duration to a number
        const durationNumber = duration;

        if (isNaN(durationNumber) || durationNumber <= 0) {
            return new NextResponse('Invalid campaign duration', { status: 400 });
        }

        // Calculate the desired total number of accounts to link
        const desiredTotalAccounts = Math.round(nbMessages / 500);

        if (desiredTotalAccounts <= 0) {
            return new NextResponse('Desired number of accounts to link is zero or negative', { status: 400 });
        }

        // Fetch all accounts linked to the campaign
        const linkedAccounts = await prisma.instagramAccount.findMany({
            where: { campaignId: campaignId },
            select: { id: true, status: true },
        });

        // Filter out 'banned' accounts
        const bannedAccounts = linkedAccounts.filter(
            account => account.status?.toLowerCase() === 'banned'
        );

        // Unlink 'banned' accounts
        if (bannedAccounts.length > 0) {
            const unlinkPromises = bannedAccounts.map(account => {
                return prisma.instagramAccount.update({
                    where: { id: account.id },
                    data: {
                        campaignId: null,
                        campaignName: null,
                    },
                });
            });
            await Promise.all(unlinkPromises);
        }

        // Filter 'working' accounts
        const workingAccounts = linkedAccounts.filter(
            account => account.status?.toLowerCase() === 'working'
        );
        const existingLinkedAccountsCount = workingAccounts.length;

        // Calculate the number of additional accounts needed
        const accountsNeeded = desiredTotalAccounts - existingLinkedAccountsCount;

        if (accountsNeeded <= 0) {
            return NextResponse.json({
                message: 'Campaign already has enough linked Instagram accounts',
                linkedAccounts: existingLinkedAccountsCount,
            });
        }

        // Fetch unlinked accounts with status 'Working'
        const unlinkedAccounts = await prisma.instagramAccount.findMany({
            where: {
                campaignId: null,
                status: 'Working',
            },
        });

        if (unlinkedAccounts.length === 0) {
            return new NextResponse('No unlinked Instagram accounts available', { status: 200 });
        }

        // Randomly shuffle the unlinked accounts
        const shuffledAccounts = unlinkedAccounts.sort(() => 0.5 - Math.random());

        // Determine the number of accounts to link
        const totalAvailable = unlinkedAccounts.length;
        const numberToLink = Math.min(accountsNeeded, totalAvailable);

        // Select the accounts to link
        const accountsToLink = shuffledAccounts.slice(0, numberToLink);

        // Update selected Instagram accounts
        const updatePromises = accountsToLink.map(account => {
            return prisma.instagramAccount.update({
                where: { id: account.id },
                data: {
                    campaignId: campaignId,
                    campaignName: campaignName,
                },
            });
        });

        await Promise.all(updatePromises);

        const totalLinkedAccounts = existingLinkedAccountsCount + accountsToLink.length;

        return NextResponse.json({
            message: 'Instagram accounts linked successfully',
            newlyLinkedAccounts: accountsToLink.length,
            totalLinkedAccounts: totalLinkedAccounts,
            desiredTotalAccounts: desiredTotalAccounts,
        });
    } catch (error) {
        console.error('Error linking Instagram accounts', error);
        return new NextResponse('Error linking Instagram accounts', { status: 500 });
    }
}