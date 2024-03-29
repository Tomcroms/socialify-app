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
            w-full
            bg-white
            rounded-xl
            px-4
            pt-12
            pb-4
            gap-4
            grid
            grid-cols-2
            overflow-hidden
        "
        >
            <h4 className="absolute top-4 left-4">My &apos;sales&apos; accounts</h4>
            {instagramAccounts.map((account) => (
                <AccountBlock key={account.id} account={account} />
            ))}
        </div>
    );
}

export default Accounts;