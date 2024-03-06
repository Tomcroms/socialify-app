"use client";

import { useState, useEffect } from "react";
import AccountBlock from "./AccountBlock";
import getAccounts from "@/app/actions/getInstagramAccounts";
import { InstagramAccount } from "@prisma/client";



interface TotalAnswersProps{
    instagramAccounts: InstagramAccount[];
}

const Accounts: React.FC<TotalAnswersProps> = ( {instagramAccounts }) => {

    const [accounts, setAccounts] = useState<InstagramAccount[]>([]);

    return ( 
        <div 
        className="
            container
            relative
            h-40
            w-full
            bg-white
            rounded-xl
            px-4
            pt-12
            pb-4
            gap-4
            grid
            grid-cols-2
            auto-rows-max
            overflow-auto
        "
        >
            <h4 className="absolute top-4 left-4">My "sales" accounts</h4>
            {instagramAccounts.map((account) => (
                <AccountBlock key={account.id} account={account} />
            ))}
        </div>
    );
}

export default Accounts;