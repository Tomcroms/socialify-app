"use client";

import { Campaign } from '@prisma/client';
import { createContext, useContext, useState, useEffect } from 'react';

type CampaignsContextType = {
    campaigns: Campaign[];
};

const defaultState: CampaignsContextType = {
    campaigns: []
};

const CampaignsContext = createContext<CampaignsContextType>(defaultState);

export function CampaignsWrapper({ children, campaigns }: {
    children: React.ReactNode ,
    campaigns: Campaign[]
}) {

    return (
      <CampaignsContext.Provider value={{ campaigns }}>
          { children }
      </CampaignsContext.Provider>
    )
};

export const useCampaignsContext = () => {
    return useContext(CampaignsContext)
};


// useEffect(() => {
//     if (campaignId === "initalCampaignId" && campaigns.length > 0) {
//         setCampaignId(campaigns[0].id);
//     }
// }, [campaigns, campaignId]);