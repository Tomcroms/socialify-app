"use client";

import { HiArrowRight } from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Campaign {
    id: string;
    campaignName: string;
    users: {
        email: string;
    }[];
}

const Admin = () => {
    const router = useRouter();

    const handleStartNewCampaignClick = () => {
        router.push('/admin/startNewCampaign'); // Changez '/new-page' par l'URL cible
    };

    const handleCampaignActionsClick = () => {
        router.push('/admin/campaignActions'); // Changez '/new-page' par l'URL cible
    };
    
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [filters, setFilters] = useState({
        email: '',
        id: '',
        name: ''
    });

    const fetchCampaigns = async () => {
        try {
            const response = await axios.post('/api/getFilteredCampaigns', filters);
            setCampaigns(response.data);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };
    

    useEffect(() => {
        fetchCampaigns();
    }, [filters]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <>
            <section className="bg-white p-12 w-full">
                <div onClick={handleStartNewCampaignClick} className="bg-black p-4 mb-6 flex items-center rounded-lg w-max cursor-pointer">
                    <p className="text-white">Start a new campaign</p><HiArrowRight className="ml-2 text-white" />
                </div>  
                <div onClick={handleCampaignActionsClick} className="bg-black p-4 mb-6 flex items-center rounded-lg w-max cursor-pointer">
                    <p className="text-white">Campaign actions</p><HiArrowRight className="ml-2 text-white"/>
                </div>  
                <section>
                    <nav>
                        <div><p>Campaign</p></div>
                    </nav>
                    <div className="border border-black">
                        <div className="border border-black p-2">
                            <input
                                type="text"
                                name="email"
                                value={filters.email}
                                onChange={handleChange}
                                placeholder="Filter by email"
                            />
                            <input
                                type="text"
                                name="id"
                                value={filters.id}
                                onChange={handleChange}
                                placeholder="Filter by ID"
                            />
                            <input
                                type="text"
                                name="name"
                                value={filters.name}
                                onChange={handleChange}
                                placeholder="Filter by Campaign Name"
                            />
                        </div>
                        <div className="min-h-[200px] p-2">
                            {campaigns.length === 0 ? (
                                <div className="text-center py-4">
                                    <p>Aucune campagne ne correspond aux critères de recherche.</p>
                                </div>
                            ) : (
                                campaigns.map((campaign) => (
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
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </section>
            </section>
        </>
    )
}

export default Admin;