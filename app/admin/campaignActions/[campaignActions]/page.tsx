"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { InstagramAccount } from "@prisma/client";
import RunScriptButton from "./components/RunScriptButton";
import axios from "axios";

interface User {
    email: string;
}

interface Campaign {
    id: string;
    campaignName: string;
    nbMessages: string;
    users: User[];
}

const CampaignActions = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [id, setId] = useState<string | null>(null);
    
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [countOfInstagramAccounts, setCountOfInstagramAccounts] = useState<number>(0);
    const [instagramAccounts, setInstagramAccounts] = useState<InstagramAccount[]>([]);
    const [countOfTargets, setCountOfTargets] = useState<number>(0);
    const [notFound, setNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch campaign ID from the URL
    useEffect(() => {
        const pathParts = pathname.split('/');
        const pathId = pathParts[pathParts.length - 1];
        setId(pathId);
    }, [pathname]);

    // Memoize fetch functions to avoid recreating them on every render
    const fetchCampaign = useCallback(async () => {
        try {
            const response = await axios.post('/api/getCampaignById', {
                campaignId: id,
            });

            if (response.status === 200) {
                setCampaign(response.data);
                setNotFound(false);
            } else {
                setCampaign(null);
                setNotFound(true);
            }
        } catch (error) {
            console.error('Error fetching campaign', error);
            setCampaign(null);
            setNotFound(true);
        }
    }, [id]);

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

    const fetchCountOfInstagramAccounts = useCallback(async () => {
        if (id) {
            try {
                const response = await axios.post('/api/getNumberOfInstagramAccountsByCampaignId', {
                    campaignId: id,
                });

                if (response.status === 200) {
                    setCountOfInstagramAccounts(response.data.count);
                }
            } catch (error) {
                console.error('Error fetching Instagram accounts', error);
            }
        }
    }, [id]);

    const fetchCountOfTargets = useCallback(async () => {
        if (id) {
            try {
                const response = await axios.post('/api/getNumberOfTargetsByCampaignId', {
                    campaignId: id,
                });
                if (response.status === 200) {
                    setCountOfTargets(response.data.count);
                }
            } catch (error) {
                console.error('Error fetching count of targets', error);
            }
        }
    }, [id]);

    // Fetch campaign details and Instagram accounts
    useEffect(() => {
        if (id) {
            fetchCampaign();
            fetchCountOfInstagramAccounts();
            fetchInstagramAccounts();
            fetchCountOfTargets();
        }
    }, [id, fetchCampaign, fetchCountOfInstagramAccounts, fetchInstagramAccounts, fetchCountOfTargets]);

    const handleAutomaticAttribution = async () => {
        if (id) {
            setIsLoading(true);
            try {
                const response = await axios.post('/api/linkInstagramAccountsToCampaign', {
                    campaignId: id,
                });

                if (response.status === 200) {
                    const data = response.data;
                    console.log('Instagram accounts linked:', data);

                    // Refresh the list of Instagram accounts
                    await fetchCountOfInstagramAccounts();

                    // Display a success message
                    alert(`Successfully linked ${data.newlyLinkedAccounts} Instagram accounts.`);
                } else {
                    console.error('Error linking Instagram accounts:', response.data);
                    alert('Error linking Instagram accounts: ' + response.data.message);
                }
            } catch (error) {
                console.error('Error linking Instagram accounts:', error);
    
                if (axios.isAxiosError(error) && error.response) {
                    console.error('Server Error Response:', error.response.data);
                    alert('Error linking Instagram accounts: ' + error.response.data);
                } else {
                    alert('Error linking Instagram accounts. Please try again later.');
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            alert('Campaign ID is missing.');
        }
    };

    const handleClickRedirection = (endUrl: string) => {
        if (id) {
            router.push(`/admin/campaignActions/${endUrl}/${id}`);
        } else {
            alert("Please choose a campaign first");
        }
    };

    const handleClickTerminateCampaign = async () => {
        if (id) {
            try {
                const response = await axios.post('/api/terminateCampaignById', {
                    campaignId: id,
                });

                if (response.status === 200) {
                    alert("Successfully terminated campaign!");
                }
            } catch (error) {
                alert('Error');
                console.error('Error fetching Instagram accounts', error);
            }
        } else {
            console.log("No id available");
        }
    };

    const getStatusClass = (status: string | null) => {
        switch (status?.toLowerCase()) {
            case 'working':
                return 'bg-green-500'; // Vert pour 'working'
            case 'banned':
                return 'bg-black'; // Noir pour 'banned'
            // Ajoutez d'autres cas si nécessaire
            default:
                return 'bg-gray-200'; // Couleur par défaut
        }
    };
      
    return (
        <main className="px-16 py-8 h-screen w-full">
            <nav className="flex items-center gap-4 w-full justify-center">
                <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("")}>Campaign actions</div>
                <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("accounts")}>Accounts</div>
                <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("dashboard")}>Dashboard</div>
                <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("messages")}>Messages</div>
            </nav>
            <section className="flex items-center">
                <div className="p-4 bg-white shadow-md rounded-lg w-1/3 min-w-[450px] h-[600px] overflow-scroll">
                    <div>
                        <h3>Campagne sélectionnée : </h3>
                    </div>
                    {campaign ? (
                        <div key={campaign.id} className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md border">
                            <div className="mb-2">
                                <strong>Nom de la campagne :</strong> {campaign.campaignName}
                            </div>
                            <div className="mb-2">
                                <strong>ID :</strong> {campaign.id}
                            </div>
                            <div className="mb-2">
                                <strong>Emails des utilisateurs associés :</strong> {campaign.users.map((user) => user.email).join(', ')}
                            </div>
                            <div className="mb-2">
                                <strong>nbMessages</strong> {campaign.nbMessages}
                            </div>
                            <div className="mb-2">
                                <strong>nbTargets</strong> {countOfTargets.toString()}
                            </div>
                            <div className="mb-2">
                                <strong>nbAccounts</strong>  {countOfInstagramAccounts}
                            </div>
                        </div>
                    ) : notFound && (
                        <div className="text-red-500">Aucune campagne trouvée</div>
                    )}

                    {instagramAccounts.length === 0  ? (
                        <div><p>No account found for this campaign</p></div>
                    ) : (
                        instagramAccounts.map((instagramAccount) => (
                            <div key={instagramAccount.id} className={`${getStatusClass(instagramAccount.status)} p-2 mt-2 rounded-sm`}>
                                <div className="flex items-center"><p>Username: </p><strong className="text-sm">{instagramAccount.username}</strong></div>
                                <div className="flex items-center"><p>Followers: </p><strong className="text-sm">{instagramAccount.followers}</strong></div>
                                <div className="flex items-center"><p>Following: </p><strong className="text-sm">{instagramAccount.following}</strong></div>
                                <div className="flex items-center"><p>CampaignName: </p><strong className="text-sm">{instagramAccount.campaignName}</strong></div>
                                <div className="flex items-center">
                                    <p>UpdatedAt: </p>
                                    <strong className="text-sm">
                                        {instagramAccount.updatedAt ? `${new Date(instagramAccount.updatedAt).toLocaleDateString('fr-CA')} ${new Date(instagramAccount.updatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false })}` : 'N/A'}
                                    </strong>
                                </div>
                            </div>
                        ))
                    )}

                    <div></div>
                </div>
                <div className="flex flex-col items-center w-2/3">
                        {campaign && (
                            <div className="mt-6 flex flex-col items-center">

                                <h4 className="mb-2">Setup</h4>

                                <div
                                    className={`bg-red-400 text-white rounded-xl py-2 mb-2 cursor-pointer text-center w-72 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={isLoading ? undefined : handleAutomaticAttribution}
                                > 
                                    <h4>{isLoading ? 'Attribution en cours...' : 'Attribution automatique'}</h4>
                                </div>

                                <RunScriptButton
                                    endpoint="run-test-connexion-by-campaign-id"
                                    campaignId={campaign.id}
                                    buttonText="Test connection"
                                />

                                <div className="bg-red-400 text-white rounded-xl py-2 mb-2 cursor-pointer text-center w-72" onClick={() => handleClickRedirection("modifyBioAndDeleteDms")}>
                                    <h4>Modify bio + delete dms</h4>
                                </div>

                                <RunScriptButton
                                    endpoint="run-modify-bio-by-campaign-id"
                                    campaignId={campaign.id}
                                    buttonText="Modify bio"
                                />

                                <RunScriptButton
                                    endpoint="run-delete-dms-by-campaign-id"
                                    campaignId={campaign.id}
                                    buttonText="Delete dms"
                                />

                                <h4 className="mb-2">Scraping</h4>

                                <div className="bg-red-400 text-white rounded-xl py-2 mb-2 cursor-pointer text-center w-72" onClick={() => handleClickRedirection("scrapingFollowers")}>
                                    <h4>Scraping followers</h4>
                                </div>

                                <h4 className="mb-2">Message</h4>

                                <div className="bg-red-400 text-white rounded-xl py-2 mb-2 cursor-pointer text-center w-72" onClick={() => handleClickRedirection("modifyMessage")}>
                                    <h4>Modify message</h4>
                                </div>

                                <RunScriptButton
                                    endpoint=""
                                    campaignId={campaign.id}
                                    buttonText="Start campaign"
                                />
                                <h4 className="mb-2">Delete</h4>
                                <div className="bg-red-400 text-white rounded-xl py-2 mb-2 cursor-pointer text-center w-72" onClick={handleClickTerminateCampaign}>
                                    <h4>Terminate campaign</h4>
                                </div>

                            </div>
                        )}
                </div>               
            </section>

        </main>
    );
}

export default CampaignActions;