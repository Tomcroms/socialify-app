"use client";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import axios from "axios";

const Component = () => {
    const pathname = usePathname();
    const [id, setId] = useState<string | null>(null); // State for campaignId
    const [bio, setBio] = useState<string>(''); // State for bio input
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State to handle submission status

    useEffect(() => {
        const pathParts = pathname.split('/');
        const pathId = pathParts[pathParts.length - 1];
        setId(pathId);
    }, [pathname]);

    // Function to handle the API call when the button is clicked
    const handleModifyBio = async () => {
        if (!id || !bio.trim()) {
            // If campaignId or bio is missing, do not proceed
            return;
        }
        setIsSubmitting(true); // Disable the button while the API call is in progress
        try {
            // Call the API endpoint to modify the bio
            const response = await axios.post('/api/modifyBioByCampaignId', {
                campaignId: id,
                bio: bio,
            });

            // Handle the response from the API
            if (response.status === 200) {
                alert('Bio modified successfully');
                // Optionally, you can clear the bio input or perform other actions
                setBio('');
            } else {
                alert('Error modifying bio');
            }
        } catch (error) {
            console.error('Error modifying bio:', error);
            alert('Error modifying bio');
        } finally {
            setIsSubmitting(false); // Re-enable the button after the API call
        }
    };

    return (
        <section className="flex flex-col items-center pt-10 w-full">
            <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter new bio"
                className="mb-4 p-2 border border-gray-300 rounded w-1/2 h-40 resize-none"
                rows={5}
            />

            {/* Button to submit the new bio */}
            <button
                className={`bg-red-400 text-white rounded-xl py-2 mb-4 text-center w-72 ${
                    !bio.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={handleModifyBio}
                disabled={!bio.trim() || isSubmitting} // Disable the button if bio is empty or while submitting
            >
                <h4>{isSubmitting ? 'Modifying...' : 'Modifier bio'}</h4>
            </button>
        </section>
    );
};

export default Component;