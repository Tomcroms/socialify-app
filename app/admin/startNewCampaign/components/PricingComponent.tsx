'use client';

import { useState } from 'react';

const PricingComponent = () => {
    const [formState, setFormState] = useState({ pricing: 0 });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
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
                        min="0" 
                        max="10000"
                        value={formState.pricing}
                        onChange={handleChange}
                    />
                </div>

                <div className='w-1/2'>
                    {/* Additional inputs as before, with proper value bindings */}
                </div>
            </div>
        </div>
    );
}

export default PricingComponent;
