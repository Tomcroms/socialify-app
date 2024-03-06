"use client";
import { useState } from 'react';
import axios from 'axios';


interface CampaignFormProps {
    onCampaignDataChange: (newData: { message: string }) => void;
}

interface FormState {
  campaignName: string;
  message: string;
  country: string;
  businessType: string;
  keywords: string;
  followersMin: number | string;
  followersMax: number | string;
  pricing: number;
  savePlus: boolean;
  paymentTerm: '3months' | '6months';
  salesAccounts: string[];
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onCampaignDataChange }) => {

    
    let nbSalesAccounts = 0;

    const [formState, setFormState] = useState<FormState>({
        campaignName: '',
        message: '',
        country: '',
        businessType: '',
        keywords: '',
        followersMin: '',
        followersMax: '',
        pricing: 250,
        savePlus: false,
        paymentTerm: '3months',
        salesAccounts: ['', '', '', '', ''],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => {
          const newState = { ...prevState, [name]: value };
          // Appeler onCampaignDataChange dès que le message change
          if (name === 'message') {
            onCampaignDataChange(newState);
          }
          return newState;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/campaign', formState);
            // handle success
        } catch (error) {
            // handle error
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4 w-2/3">
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
                placeholder="Campaign Name"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Content
                </label>
                <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Write your message"
                />
            </div>

            <div className="mb-4">
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
                        placeholder="Campaign Name"
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
            </div>

            <div className="mb-4 flex gap-4">
                <input
                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="keywords"
                    type="text"
                    name="Key words"
                    value={formState.keywords}
                    onChange={handleChange}
                    placeholder="Campaign Name"
                />
                <div className='w-1/2'>
                    <input
                        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="followersMin"
                        type="number"
                        min="0"
                        name="Key words"
                        value={formState.followersMin}
                        onChange={handleChange}
                        placeholder="Followers min"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="followersMax"
                        type="number"
                        min={formState.followersMin}
                        name="Followers max"
                        value={formState.followersMax}
                        onChange={handleChange}
                        placeholder="Followers max"
                    />
                </div>
            </div>

            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="audience">
                    Pricing
            </label>
            <div className="mb-4 flex gap-4">
                <div className='flex justify-center items-center w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight'>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="pricing"
                        type="range"
                        name="pricing"
                        min="0" // Définissez le budget minimum ici
                        max="10000" // Définissez le budget maximum ici
                        value={formState.pricing}
                        onChange={handleChange}
                    />
                </div>

                <div className='w-1/2'>
                    <input
                        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="3months"
                        type="text"
                        name="3months"
                        value=""
                        onChange={handleChange}
                        placeholder="Pay 3 months"
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="6months"
                        type="text"
                        name="6months"
                        value=""
                        onChange={handleChange}
                        placeholder="Pay 6 months"
                    />
                </div>
            </div>

            <div className='mb-4 flex'>
                <h2>Number of sales accounts allocated to your campaign: {nbSalesAccounts}</h2>
            </div>

            <div className="flex items-center justify-between">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                >
                Send a campaign request
                </button>
            </div>
        </form>
    );
};

export default CampaignForm;
