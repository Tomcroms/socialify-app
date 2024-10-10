'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { Campaign } from '@prisma/client';
import axios from 'axios';


const ModifyMessage = () => {

    const pathname = usePathname();
    const [id, setId] = useState<string | null>(null);
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        const pathParts = pathname.split('/');
        const pathId = pathParts[pathParts.length - 1];
        setId(pathId);
    }, [pathname]);


    useEffect(() => {
        if (id) {
            setLoading(true);
            setError(null);

            axios.post('/api/getCampaignById', { campaignId: id })
                .then(response => {
                    setCampaign(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.response?.data || 'An error occurred');
                    setLoading(false);
                });
        }
    }, [id]);

    const handleUpdateMessage = () => {
        if (id && newMessage) {
            axios.post('/api/updateCampaignMessage', { campaignId: id, message: newMessage })
                .then(response => {
                    setCampaign(prevCampaign => {
                        if (prevCampaign) {
                            return {
                                ...prevCampaign,
                                message: newMessage,
                            };
                        }
                        return null;
                    });
                    setNewMessage('');
                })
                .catch(err => {
                    setError(err.response?.data || 'An error occurred');
                });
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section className='flex justify-center items-center h-screen'>
            <div>
                {campaign ? (
                    <section className='flex flex-col items-center'>
                        <div className='bg-white w-[800px]'>
                            <h2>{campaign.campaignName}</h2>
                            <p className='text-black mb-8'>Current message: <pre>{campaign.message}</pre></p>
                        </div>
                        <div className='bg-black flex flex-col items-center gap-2 p-6 rounded-xl w-full'>
                            <textarea
                                className='bg-white min-h-60 w-full border border-black rounded-lg p-2'
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="New message"
                            />
                            <button className='ml-4 p-2 bg-white h-min rounded-sm' onClick={handleUpdateMessage}>Update Message</button>
                        </div>
                    </section>


                    
                ) : (
                    <p>No campaign found</p>
                )}
            </div>
        </section>

    );
}

export default ModifyMessage;