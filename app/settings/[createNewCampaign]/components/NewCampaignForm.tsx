"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import LoadingModal from '../../../../app/components/LoadingModal';


const NewCampaignForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [campaignName, setCampaignName] = useState('');
    const [message, setMessage] = useState('');
    const [bio, setBio] = useState('');
    const [nbMessages, setNbMessages] = useState<number>(1000); 



    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/api/campaigns/', {
                campaignName,
                message,
                bio,
                nbMessages,
            });

            console.log('Campaign Created:', response.data);
            setCampaignName('');
            setMessage('');
            setBio('');
            setNbMessages(1000);
        } catch (error) {
            console.error('Error creating campaign:', error);
        } finally {
            setIsLoading(false);
        }
    }, [campaignName, message, bio, nbMessages]);

    return (
        <section className="w-full h-full">
            {isLoading && <LoadingModal />}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">Nom de la campagne</label>
                    <input
                        type="text"
                        name="campaignName"
                        id="campaignName"
                        required
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        name="bio"
                        id="bio"
                        required
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="nbMessages" className="block text-sm font-medium text-gray-700">Nombre de messages</label>
                    <input
                        type="number"
                        name="nbMessages"
                        id="nbMessages"
                        required
                        min="1000"
                        value={nbMessages}
                        onChange={(e) => setNbMessages(parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <button type="submit" className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Créer Campagne
                </button>
            </form>
        </section>
    );
}

export default NewCampaignForm;
