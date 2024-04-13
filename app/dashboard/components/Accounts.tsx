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
            flex
            flex-1
            flex-col
            gap-2
            w-1/2
            p-6
            bg-white
            rounded-3xl
            overflow-y-scroll

        "
        >
            <h4 className="a">My &apos;sales&apos; accounts</h4>
            {instagramAccounts.map((account) => (
                <AccountBlock key={account.id} account={account} />
            ))}
        </div>
    );
}

export default Accounts;