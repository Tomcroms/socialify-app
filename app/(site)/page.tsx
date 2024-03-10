"use client";

import { TbUsers } from "react-icons/tb";
import PricingComponent from "./components/PricingComponent";

const Home2 = () => {
    return (
        <>
            <section id="home" className="relative w-full h-screen" style={{ 
                backgroundImage: "url('/images/home_background.png')",
                backgroundPosition: 'right top',
                backgroundSize: '70%',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="px-[10%] absolute top-44 flex items-center w-full gap-28">
                    <div className="w-1/2">
                        <h1 className="mb-4 max-w-[500px]">The #1 outreach tool on Instagram</h1>
                        <p className="mb-10 max-w-[480px] text-[18px]">Build your contact list, personalize on alarge scale and send messages that capture new customers.</p>
                        <button className="rounded-3xl py-4 px-8 bg-customBlue"><p className="text-white">Get started</p></button>
                    </div>
                    <div className="w-1/2 flex flex-col items-center">
                        <img src="/images/dashboard.png" alt="dashboard" className="w-12/12 rounded-2xl"/>
                        <p className="mt-4">Over 20K+ leads generated from our clients</p>
                        <img src="/images/landing_logos.png" alt="logos" className="mt-2 scale-125"/>
                    </div>
                    
                </div>

            </section>

            <section id="howItWorks" className="px-[10%] w-full flex flex-col items-center mt-40">
                <button className="lightBlueButton cursor-default">
                    <p className="pBlue">How it works</p>
                </button>
                <h2 className="w-1/2 text-center my-10">The all-in-one platform to automate your instagram prospection</h2>

                <div className="gap-8 grid grid-cols-2 w-2/3">
                    <div className="rounded-2xl shadow-xl bg-customLightGray p-10 flex flex-col items-center">
                        <img src="/images/icon_account.png" alt="icon" className="w-full"/>
                        <h3 className="my-6 text-center">1 - Connect your accounts</h3>
                        <p className="text-center">Connect your instagram sales accounts. If you don&apos;t have any, we can create and setup them for you.</p>
                    </div>
                    <div className="rounded-2xl shadow-xl bg-customLightGray p-10 flex flex-col items-center">
                        <img src="/images/icon_contact.png" alt="icon" className="w-full"/>
                        <h3 className="my-6 text-center">2 - Build your Contact List</h3>
                        <p className="text-center">Build your ideal contact list with precision using our advanced targeting algorithms.</p>
                    </div>
                    <div className="rounded-2xl shadow-xl bg-customLightGray p-10 flex flex-col items-center">
                        <img src="/images/icon_personnalize.png" alt="icon" className="w-full"/>
                        <h3 className="my-6 text-center">3 - Personalize your Outreach</h3>
                        <p className="text-center">Send tailored and engaging messages that resonate with your audience and drive conversions.</p>
                    </div>
                    <div className="rounded-2xl shadow-xl bg-customLightGray p-10 flex flex-col items-center">
                        <img src="/images/icon_leads.png" alt="icon" className="w-full"/>
                        <h3 className="my-6 text-center">4 - Manage your Leads</h3>
                        <p className="text-center">Manage all your leads conversations from a single and unified platform.</p>
                    </div>
                </div>
            </section>

            <section id="leads" className="py-10 px-[10%] mt-60 flex items-center relative">
                <div className="w-8/12 px-8 py-12 2xl:py-16 pr-32 bg-customLightGray rounded-3xl shadow-lg">
                    <h2 className="mb-8 w-7/12">Manage all your leads in one place</h2>
                    <p className="mb-8 w-2/3">No more switching between different accounts to track your leads and follow up with them.</p>
                    <div className="flex">
                        <div className="bg-customBlue flex items-center justify-center w-20 h-20 min-w-20 min-h-20 rounded-xl mr-10">
                            <TbUsers className="w-8 h-8 text-white"/>
                        </div>
                        <div>
                            <h3>Increase volume</h3>
                            <p className="w-3/4">Use multiple &apos;sales&apos; accounts to increase your prospecting volume.</p>
                        </div>
                    </div>
                </div>
                <div className="z-10 w-6/12 bg-white rounded-3xl p-6 relative right-24">
                    <img src="/images/messages.png" alt="messages" className="min-w-96"/>
                </div>
                <div className="absolute right-0 h-full bg-customBlue rounded-l-[40px] w-3/12">
                </div>
            </section>

            <PricingComponent />

            <section id="testimonial" className="w-full h-screen mt-40 flex flex-col items-center justify-center" style={{ 
                    backgroundImage: "url('/images/background_testimonials.png')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                <button className="lightBlueButton font-semibold mb-8 cursor-default">
                    Testimonial
                </button>
                <h2 className="text-white">Trusted by Founders and C-level.</h2>
                <h1 className="font-[50px] text-white">“</h1>
                <p className="text-white w-1/2 max-w-[800px] text-center">It transformed my outreach strategy! Drowning in repetitive tasks and struggling with lead management previously, Sociallify&apos;s easy account management, automated messaging, and centralized platform helped me generate 5x more leads, increase conversion rates by 30%, and contribute to Splead sales growth.</p>
                <img src="/images/yoann.png" alt="yoann picture" className="mt-8 rounded-full w-1/12"/>
                <h3 className="text-white mt-4">Yoann</h3>
            </section>

            <section id="blog" className="my-40 flex flex-col items-center">
                <button className="lightBlueButton mb-8 cursor-default">
                    Blog
                </button>
                <h2 className="mb-4">Article</h2>
                <div className="bg-customLightGray shadow-lg p-6 rounded-3xl w-5/12">
                    <img src="/images/article_photo.png" alt="photo" className="rounded-lg w-full mb-6"/>
                    <p>March 3, 2024</p>
                    <h3 className="mb-8">How to use instagram DMs to grow your business</h3>
                    <p>With over 1 billion active users, instagram is a powerful platform for businesses of all sizes. But with so much noise on the platform, it can be difficult to get your product seen...</p>
                    <a className="mt-12 block underline text-customBlue" href="/blog">Read More</a>
                </div>

            </section>
        </>
    )
}

export default Home2;