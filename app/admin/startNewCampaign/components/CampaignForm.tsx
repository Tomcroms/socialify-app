"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";



interface FormState {
    userEmail: string;
    campaignName: string;
    message: string;
    biography: string;
    keywords: string;
    followersMin: number | null;
    followersMax: number | null;
    nbMessages: number;
    subscriptionDuration: string;
    price: number | null;
}

const CampaignForm = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [formState, setFormState] = useState<FormState>({
        campaignName: '',
        userEmail: '',
        message: '',
        biography: '',
        keywords: '',
        followersMin: null,
        followersMax: null,
        nbMessages: 1000,
        subscriptionDuration: '3months',
        price: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let newValue=null;
    
        // Gérer la conversion pour les champs numériques
        if (name === "followersMin" || name === "followersMax" || name === "nbMessages" || name === "price") {
            // Si la valeur est vide, affecter `null`
            if (value === '') {
                newValue = null;
            } else {
                // Convertir en nombre
                newValue = parseInt(value, 10);
    
                // Vérifier si la conversion est incorrecte
                if (isNaN(newValue)) {
                    newValue = null;
                }
            }
        } else {
            newValue = value;
        }
    
        setFormState(prevState => ({ ...prevState, [name]: newValue }));
    };

    const calculatePrice = () => {
        const pricePerMessage = formState.subscriptionDuration === '3months' ? 0.4 : 0.3;
        return formState.nbMessages * pricePerMessage;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const postData = {
            userEmail: formState.userEmail,
            campaignName: formState.campaignName,
            campaignMessage: formState.message,
            biography: formState.biography,
            campaignKeyWords: formState.keywords.split(',').map(kw => kw.trim()),
            followersMin: formState.followersMin,
            followersMax: formState.followersMax,
            campaignDuration: formState.subscriptionDuration,
            campaignPrice: calculatePrice(),
            nbMessages: formState.nbMessages
        };
    
        try {
            const response = await axios.post('/api/newCampaign', postData);
            console.log("sucess")
            router.push("/")
        } catch (error) {
            console.error('Error creating campaign', error);
        }
    };
    return (
        <>
            {isLoading && (
                <div className="bg-gray-300 w-screen h-screen text-center absolute flex items-center justify-center z-20 opacity-40"><h2>Loading...</h2></div>
            )}
            <form onSubmit={handleSubmit} className="bg-white shadow-md px-12 pt-6 pb-8 w-2/3 h-full">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userEmail">
                        User email
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="userEmail"
                    type="text"
                    name="userEmail"
                    value={formState.userEmail}
                    onChange={handleChange}
                    placeholder="* User email"
                    required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campaignName">
                        Campaign Name
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="campaignName"
                    type="text"
                    name="campaignName"
                    value={formState.campaignName}
                    onChange={handleChange}
                    placeholder="* Campaign Name"
                    required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message to send
                    </label>
                    <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="* Write your message"
                    required
                    />
                </div>

                <div className='mb-4'>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="biography">
                        Accounts biography
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="biography"
                        name="biography"
                        value={formState.biography}
                        onChange={handleChange}
                        placeholder="* Biography for the accounts"
                        required
                    />
                </div>

                <div className="mb-4 flex gap-4">
                    <input
                        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="keywords"
                        type="text"
                        name="keywords"
                        value={formState.keywords}
                        onChange={handleChange}
                        placeholder="Key words"
                    />
                    <div className='w-1/2'>
                        <input
                            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="followersMin"
                            type="number"
                            min="0"
                            name="followersMin"
                            value={formState.followersMin === null ? '' : formState.followersMin}
                            onChange={handleChange}
                            placeholder="Followers min"
                        />
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="followersMax"
                            type="number"
                            min={formState.followersMin === null ? '' : formState.followersMin}
                            name="followersMax"
                            value={formState.followersMax === null ? '' : formState.followersMax}
                            onChange={handleChange}
                            placeholder="Followers max"
                        />
                    </div>
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="audience">
                        Number of message per month
                </label>
                <div className="mb-4 flex gap-12 items-center">
                    <div className="w-1/3">
                        <div className="flex items-center">
                            <h3>{formState.nbMessages}</h3><h4 className="ml-4 text-gray-600">messages/mo</h4>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="10000"
                            step="500"
                            name="nbMessages"
                            value={formState.nbMessages}
                            onChange={handleChange}
                            className="w-full h-2 bg-customLightBlue rounded-lg appearance-none cursor-pointer"
                            required
                        />
                    </div>

                    <div className="w-1/2 flex flex-col">
                        <div className="flex items-center">
                            <label htmlFor="3months">Pay 3 months</label>   
                            <input
                                type="radio"
                                id="3months"
                                name="subscriptionDuration"
                                value="3months"
                                onChange={handleChange}
                                checked={formState.subscriptionDuration === '3months'}
                                className="ml-4"
                            />  
                        </div>

                        <div className="flex items-center">
                            <label htmlFor="6months">Pay 6 months</label>   
                            <input
                                type="radio"
                                id="6months"
                                name="subscriptionDuration"
                                value="6months"
                                onChange={handleChange}
                                checked={formState.subscriptionDuration === '6months'}
                                className="ml-4"
                            />  
                        </div>
                    </div>


                </div>

                <div className="mb-4">
                    <p>Price: {calculatePrice()}</p>
                </div>

                <div className='mb-4 flex'>
                    <h3>Number of instagram sales accounts allocated to your campaign: {Math.ceil(formState.nbMessages/800)}</h3>
                </div>

                <div className="flex items-center justify-center mt-10">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    >
                        Create new campaign
                    </button>
                </div>
            </form>
        </>

    );
};

export default CampaignForm;



{/* <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="audience">
        Audience
    </label>
    <div className='flex w-full gap-4'>
        <input
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            type="text"
            name="Country"
            value={formState.country}
            onChange={handleChange}
            placeholder="Country"
        />
        <select
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="businessType"
            name="businessType"
            value={formState.businessType}
            onChange={handleChange}
        >
            <option value="">Select a business type</option>
            <option value="small">Small Business</option>
            <option value="medium">Medium Business</option>
            <option value="large">Large Enterprise</option>
        </select>
    </div>
</div> */}