"use client";

import { HiArrowRight } from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Campaign, InstagramAccount } from "@prisma/client";

const Admin = () => {
    const router = useRouter();

    const [view, setView] = useState('campaigns'); // 'campaigns' ou 'accounts'

    const [filters, setFilters] = useState({
        id: '',
        emailOrUsername: '',
        campaignName: ''
    });

    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const endpoint = view === 'campaigns' ? '/api/getFilteredCampaigns' : '/api/getFilteredInstagramAccounts';

            const adjustedFilters: any = {
                id: filters.id,
                campaignName: filters.campaignName,
            };

            if (view === 'campaigns') {
                adjustedFilters.email = filters.emailOrUsername;
            } else {
                adjustedFilters.username = filters.emailOrUsername;
            }

            const response = await axios.post(endpoint, adjustedFilters);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters, view]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleCampaignsClick = () => {
        setView('campaigns');
    };

    const handleAccountsClick = () => {
        setView('accounts');
    };

    const handleStartNewCampaignClick = () => {
        router.push('/admin/startNewCampaign'); 
    };

    const handleCampaignActionsClick = (id: string) => {
        router.push(`/admin/campaignActions/${id}`); 
    };

    const handleStartCampaign = () => {
        // Logique pour démarrer la campagne
    };

    return (
        <>
            <section className="bg-white p-12 w-full">
                <div className="flex items-center justify-center gap-3">
                    <div onClick={handleCampaignsClick} className="bg-black p-4 flex items-center rounded-lg w-max cursor-pointer">
                        <p className="text-white">Campaigns</p><HiArrowRight className="ml-2 text-white" />
                    </div>  
                    <div onClick={handleAccountsClick} className="bg-black p-4 flex items-center rounded-lg w-max cursor-pointer">
                        <p className="text-white">Accounts</p><HiArrowRight className="ml-2 text-white" />
                    </div>  
                </div>

                <section>
                    <nav>
                        <div><p>{view === 'campaigns' ? 'Campaigns' : 'Instagram Accounts'}</p></div>
                    </nav>
                    <div className="border border-black">
                        <div className="flex items-center justify-between border border-black px-4 py-2">
                            <div>
                                <input
                                    type="text"
                                    name="id"
                                    value={filters.id}
                                    onChange={handleChange}
                                    placeholder="Filter by ID"
                                />
                                <input
                                    type="text"
                                    name="emailOrUsername"
                                    value={filters.emailOrUsername}
                                    onChange={handleChange}
                                    placeholder={view === 'campaigns' ? "Filter by Email" : "Filter by Username"}
                                />
                                <input
                                    type="text"
                                    name="campaignName"
                                    value={filters.campaignName}
                                    onChange={handleChange}
                                    placeholder="Filter by Campaign Name"
                                />
                            </div>
                            {view === 'campaigns' && (
                                <div onClick={handleStartNewCampaignClick} className="bg-black px-4 py-2 flex items-center rounded-lg w-max cursor-pointer">
                                    <p className="text-white">New campaign</p>
                                </div>
                            )}
                        </div>
                        <div className="min-h-[200px] p-2">
                            {data.length === 0 ? (
                                <div className="text-center py-4">
                                    <p>{view === 'campaigns' ? 'Aucune campagne ne correspond aux critères de recherche.' : 'Aucun compte Instagram ne correspond aux critères de recherche.'}</p>
                                </div>
                            ) : (
                                view === 'campaigns' ? (
                                    data.map((campaign: Campaign & { users: { email: string }[]; _count: { instagramAccounts: number } }) => {
                                      const statusColorMap = {
                                        pending: 'bg-orange-500',
                                        ready: 'bg-green-500',
                                        ongoing: 'bg-yellow-500',
                                        finished: 'bg-red-500',
                                      };
                                  
                                      const bgColor = statusColorMap[campaign.status.toLowerCase() as keyof typeof statusColorMap] || 'bg-gray-100';
                                  
                                      return (
                                        <div
                                          key={campaign.id}
                                          className={`flex items-center justify-between p-4 mb-4 ${bgColor} rounded-lg shadow-md border cursor-pointer`}
                                        >
                                          <div onClick={() => handleCampaignActionsClick(campaign.id)}>
                                            <div className="mb-2">
                                              <strong>Nom de la campagne :</strong> {campaign.campaignName}
                                            </div>
                                            <div className="mb-2">
                                              <strong>ID :</strong> {campaign.id}
                                            </div>
                                            <div className="mb-2">
                                              <strong>Emails des utilisateurs associés :</strong>{" "}
                                              {campaign.users && campaign.users.map((user) => user.email).join(", ")}
                                            </div>
                                            <div className="mb-2">
                                              <strong>Instagram accounts :</strong>{" "}
                                              {campaign._count?.instagramAccounts ?? "Chargement..."}
                                            </div>
                                          </div>
                                          <div className="flex flex-col gap-2 cursor-default">
                                            <div
                                              className="cursor-pointer bg-black p-2 rounded-lg hover:bg-gray-800"
                                              onClick={handleStartCampaign}
                                            >
                                              <p>Start</p>
                                            </div>
                                            <div
                                              className="cursor-pointer bg-black p-2 rounded-lg hover:bg-gray-800"
                                              onClick={handleStartCampaign}
                                            >
                                              <p>Stop</p>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    data.map((account: InstagramAccount) => (
                                        <div key={account.id} className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg shadow-md border cursor-pointer">
                                            <div className="flex items-center gap-2 w-full">
                                                <div className="w-1/3">
                                                    <div className="mb-2">
                                                        <strong>Username:</strong> {account.username}
                                                    </div>
                                                    {account.campaignName && (
                                                        <div className="mb-2">
                                                            <strong>Campaign Name:</strong> {account.campaignName}
                                                        </div>
                                                    )}
                                                    <div className="mb-2">
                                                        <strong>Followers:</strong> {account.followers}
                                                    </div>
                                                    <div className="mb-2">
                                                        <strong>Following:</strong> {account.following}
                                                    </div>
                                                </div>
                                                <div>
                                                    {account.image && <img src={account.image} alt={account.username ?? ''} className="w-12 h-12 rounded-full mr-4" />}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                            )}
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}

export default Admin;
