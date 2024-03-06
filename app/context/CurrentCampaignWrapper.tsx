"use client";

import { Campaign, InstagramAccount } from '@prisma/client'; 
import { createContext, useContext, useState, useEffect } from 'react';

type CurrentCampaignContextType = {
    currentCampaign: Campaign | null;
    instagramAccounts: InstagramAccount[];
    totalMessagesSent: number;
    last7DaysConversations: number[];
    last7DaysSentMessages: number[];
};


const CurrentCampaignContext = createContext<CurrentCampaignContextType>({currentCampaign: null, totalMessagesSent: 0, instagramAccounts: [], last7DaysConversations: [], last7DaysSentMessages: [] });

export function CurrentCampaignWrapper({ children, currentCampaign, totalMessagesSent, instagramAccounts, last7DaysConversations, last7DaysSentMessages }: {
    children: React.ReactNode ,
    currentCampaign: Campaign | null,
    totalMessagesSent: number,
    instagramAccounts: InstagramAccount[],
    last7DaysConversations: number[],
    last7DaysSentMessages: number[],
}) {

    return (
      <CurrentCampaignContext.Provider value={{ currentCampaign, totalMessagesSent, instagramAccounts, last7DaysConversations, last7DaysSentMessages }}>
          { children }
      </CurrentCampaignContext.Provider>
    )
};

export const useCurrentCampaignContext = () => {
    return useContext(CurrentCampaignContext)
};