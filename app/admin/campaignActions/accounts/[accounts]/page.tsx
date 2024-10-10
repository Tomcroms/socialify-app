'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Campaign, InstagramAccount } from '@prisma/client';
import MessageGraph from './MessageGraph';
import axios from 'axios';


const Accounts = () => {

    const router = useRouter();
    const pathname = usePathname();
    const [id, setId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [instagramAccounts, setInstagramAccounts] = useState<InstagramAccount[]>([]);

    useEffect(() => {
        const pathParts = pathname.split('/');
        const pathId = pathParts[pathParts.length - 1];
        setId(pathId);
    }, [pathname]);

    const fetchInstagramAccounts = useCallback(async () => {
        if (id) {
            try {
                const response = await axios.post('/api/getInstagramAccountsByCampaignId', {
                    campaignId: id,
                });

                if (response.status === 200) {
                    setInstagramAccounts(response.data);
                }
            } catch (error) {
                console.error('Error fetching Instagram accounts', error);
            }
        }
    }, [id]);

    useEffect(() => {
        if(id){
            fetchInstagramAccounts();
        }
    }, [id, fetchInstagramAccounts]);

    const getStatusClass = (status: string | null) => {
        switch(status?.toLowerCase()) {
          case 'working':
            return 'bg-green-500'; 
          case 'banned':
            return 'bg-black'; 
          default:
            return 'bg-gray-200';
        }
    };

    const handleClickRedirection = (endUrl: string) => {
        if (id) {
            router.push(`/admin/campaignActions/${endUrl}/${id}`);
        } else {
            alert("Please choose a campaign first");
        }
    };
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    else {
        return (
            
            <main className='p-4'> 
                <nav className="flex items-center gap-4 w-full justify-center">
                    <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("")}>Campaign actions</div>
                    <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("accounts")}>Accounts</div>
                    <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("dashboard")}>Dashboard</div>
                    <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("messages")}>Messages</div>
                </nav>
                <section className='flex flex-wrap gap-4 w-full'>
                    {instagramAccounts.length === 0 ? (
                        <div><p>No account found for this campaign</p></div>
                    ) : (
                        instagramAccounts.map((instagramAccount) => (
                            <div key={instagramAccount.id} className={`bg-gray-200 p-2 rounded-sm w-[calc(50%-8px)] flex items-center`}>
                                <div>
                                    <div className="flex items-center">
                                        <p>Username: </p>
                                        <strong className="text-sm">{instagramAccount.username}</strong>
                                    </div>
                                    <div className="flex items-center">
                                        <p>Followers: </p>
                                        <strong className="text-sm">{instagramAccount.followers}</strong>
                                    </div>
                                    <div className="flex items-center">
                                        <p>Following: </p>
                                        <strong className="text-sm">{instagramAccount.following}</strong>
                                    </div>
                                    <div className="flex items-center">
                                        <p>Id: </p>
                                        <strong className="text-sm">{instagramAccount.id}</strong>
                                    </div>
                                    <div className="flex items-center">
                                        <p>CampaignName: </p>
                                        <strong className="text-sm">{instagramAccount.campaignName}</strong>
                                    </div>
                                    <div className="flex items-center">
                                        <p>UpdatedAt: </p>
                                        <strong className="text-sm">
                                            {instagramAccount.updatedAt
                                                ? `${new Date(instagramAccount.updatedAt).toLocaleDateString('fr-CA')} ${new Date(instagramAccount.updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false })}`
                                                : 'N/A'}
                                        </strong>
                                    </div>
                                </div>
                                {/* Le graphique */}
                                <div className='w-7/12'>
                                    <MessageGraph instagramAccountId={instagramAccount.id} />
                                </div>
                            </div>
                        ))
                    )}
                </section>

            </main>


        )
    }
}

export default Accounts;
