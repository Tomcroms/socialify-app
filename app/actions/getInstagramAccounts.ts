import prisma from "@/app/libs/prismadb";

const getInstagramAccounts = async (currentCampaignId: string) => {
    try {
      const accounts = await prisma.instagramAccount.findMany({
        where: {
          campaignId: currentCampaignId
        },
      });

      return accounts;

    } catch (error: any) {
      console.log(error, 'SERVER_ERROR')
      return null;
    }
};

export default getInstagramAccounts;