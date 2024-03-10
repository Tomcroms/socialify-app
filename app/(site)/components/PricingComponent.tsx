"use client";

import { useState } from "react";

const PricingComponent = () => {

    const [nbMessages, setNbMessages] = useState(1000);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNbMessages(parseInt(event.target.value));
    };

    return (
        <section id="pricing" className="mt-60 flex items-center gap-12  px-[10%]">
            <div className="w-1/3">
                <div className="lightBlueButton w-min mb-10">
                    <h4>Pricing</h4>
                </div>
                <div className="flex items-center">
                    <h2>{nbMessages}</h2><h3 className="ml-4 text-gray-600">messages/mo</h3>
                </div>
                <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="500"
                    value={nbMessages}
                    onChange={handleChange}
                    className="w-full h-2 bg-customLightBlue rounded-lg appearance-none cursor-pointer my-8"
                />
                <p className="text-lg text-center">We guarentee the delivery of messages, as well as accurate targeting.</p>
            </div>
            <div className="bg-customLightGray px-4 py-12 w-1/3 rounded-3xl shadow-lg">
                <h3>Basic</h3>
                <div className="w-full mt-8 py-4 flex flex-col items-center border-t border-b border-gray-200">
                    <h3>€{0.4 * nbMessages} / month</h3>
                    <div className="bg-customYellow rounded-2xl px-3 py-2 mt-3">
                        <h5 className="h5Yellow">3 month engagement</h5>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="mt-5">
                        <span>Precise </span><span className="font-bold text-black">targeting</span>
                    </div>
                    <div className="mt-5">
                        <span className="font-bold text-black">Customized </span><span>and </span><span className="font-bold text-black">automatized </span>
                    </div>
                    <div><span>outreach</span></div>
                    <div className="mt-5">
                        <span className="font-bold text-black">Instant results </span><span>(Day 1)</span>
                    </div>
                    <div className="mt-5">
                        <span>Analytics</span>
                    </div>
                    <div className="mt-5">
                        <span>Support 7/7 days</span>
                    </div>
                    <button className="bg-white rounded-2xl px-6 py-3 font-bold mt-10 shadow-md">
                        Get started
                    </button>
                </div>
            </div>
            <div className="bg-customLightGray px-4 py-12 w-1/3 rounded-3xl shadow-lg">
                <div className="flex items-center"><h3 className="mr-auto">Premium</h3><p>Save 25%</p></div>
                <div className="w-full mt-8 py-4 flex flex-col items-center border-t border-b border-gray-200">
                    <h3>€{0.3*nbMessages} / month</h3>
                    <div className="bg-customYellow rounded-2xl px-3 py-2 mt-3">
                        <h5 className="h5Yellow">9 month engagement</h5>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="mt-5">
                        <span>Precise </span><span className="font-bold text-black">targeting</span>
                    </div>
                    <div className="mt-5">
                        <span className="font-bold text-black">Customized </span><span>and </span><span className="font-bold text-black">automatized </span>
                    </div>
                    <div><span>outreach</span></div>
                    <div className="mt-5">
                        <span className="font-bold text-black">Instant results </span><span>(Day 1)</span>
                    </div>
                    <div className="mt-5">
                        <span>Analytics</span>
                    </div>
                    <div className="mt-5">
                        <span>Support 7/7 days</span>
                    </div>
                    <button className="bg-black text-white rounded-2xl px-6 py-3 font-bold mt-10 shadow-md">
                        Get started
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PricingComponent;