"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    email: string;
}

interface Campaign {
    id: string;
    campaignName: string;
    users: User[];
}

const CampaignActions = () => {
    const router = useRouter();

    // Utilisez un état qui contient soit une campagne, soit `null`
    const [campaignIdInput, setCampaignIdInput] = useState('');
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [notFound, setNotFound] = useState(false);

    const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

    // Fonction appelée lorsque le formulaire est soumis
    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Faites un appel POST pour rechercher la campagne
            const response = await fetch('/api/getCampaignById', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ campaignId: campaignIdInput }),
            });

            if (response.ok) {
                const data: Campaign = await response.json();
                setCampaign(data);
                setSelectedCampaignId(data.id);
                setNotFound(false);
            } else {
                setCampaign(null);
                setSelectedCampaignId(null);
                setNotFound(true);
            }
        } catch (error) {
            console.error('Error fetching campaign', error);
            setCampaign(null);
            setSelectedCampaignId(null);
            setNotFound(true);
        }
    };

    const handleClickRedirection = (endUrl: string) => {
        if (selectedCampaignId) {
            router.push(`/admin/campaignActions/${endUrl}/${selectedCampaignId}`);
        } else {
            alert("Please choose a campaign first");
        }
    };


    return (
        <section className="flex items-center gap-4">
            <div className="p-4 bg-white shadow-md rounded-lg w-1/3 min-w-[450px]">
                <form onSubmit={handleSearch} className="mb-4 w-full">
                    <label htmlFor="campaignIdInput" className="block mb-2 font-bold">
                        ID de la Campagne :
                    </label>
                    <input
                        type="text"
                        id="campaignIdInput"
                        value={campaignIdInput}
                        onChange={(e) => setCampaignIdInput(e.target.value)}
                        className="p-2 mb-2 border rounded-md w-full"
                        required
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Rechercher
                    </button>
                </form>

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
                    </div>
                ) : notFound && (
                    <div className="text-red-500">Aucune campagne trouvée</div>
                )}
            </div>
            <div className="flex flex-col items-center w-2/3">
                <h2>Campaign actions:</h2>
                <div className="mt-6 flex flex-col items-center">
                    <div className="bg-black text-white rounded-xl px-12 py-1 mb-4 text-center w-min">
                        <h4>Setup</h4>
                    </div>
                    <div className="bg-red-400 text-white rounded-xl py-4 mb-4 cursor-pointer text-center w-72" onClick={() => handleClickRedirection("accountManagement")}>
                        <h4>Ajouter / Supprimer un compte</h4>
                    </div>
                    <div className="bg-red-400 text-white rounded-xl py-4 mb-4 cursor-pointer text-center w-72" onClick={() => handleClickRedirection("updateAccountInfo")}>
                        <h4>Modifier infos comptes</h4>
                    </div>
                    <div className="bg-black text-white rounded-xl px-12 py-1 mb-4 w-min">
                        <h4>Message</h4>
                    </div>
                    <div className="bg-red-400 text-white rounded-xl py-4 mb-4 cursor-pointer text-center w-72" onClick={() => handleClickRedirection("startAndStopMessages")}>
                        <h4>Lancer / Arrêter campagne</h4>
                    </div>
                    <div className="bg-red-400 text-white rounded-xl py-4 mb-4 cursor-pointer text-center w-72" onClick={() => handleClickRedirection("modifyMessage")}>
                        <h4>Modifier le message</h4>
                    </div>
                    <div className="bg-red-400 text-white rounded-xl py-4 mb-4 cursor-pointer text-center w-72" onClick={() => handleClickRedirection("deletePreviousMessages")}>
                        <h4>Supprimer les messages envoyés</h4>
                    </div>
                    <div className="bg-black text-white rounded-xl px-12 py-1 mb-4 w-min">
                        <h4>Scraping</h4>
                    </div>
                    <div className="bg-red-400 text-white rounded-xl py-4 mb-4 cursor-pointer text-center w-72" onClick={() => handleClickRedirection("scrapingSimilar")}>
                        <h4>Scraping comptes similaires</h4>
                    </div>
                    <div className="bg-red-400 text-white rounded-xl py-4 mb-4 cursor-pointer text-center w-72" onClick={() => handleClickRedirection("scrapingGoogleMaps")}>
                        <h4>Scraping google maps</h4>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default CampaignActions;