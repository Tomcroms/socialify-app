import { TbUsers } from "react-icons/tb";


const Home2 = () => {
    return (
        <>
            <section id="home" className="relative w-full h-screen" style={{ 
                backgroundImage: "url('/images/home_background.png')",
                backgroundPosition: 'right top',
                backgroundSize: '70%',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="px-[10%] absolute top-60 flex items-center w-full gap-32">
                    <div className="w-1/2">
                        <h1 className="mb-4 max-w-[500px]">The #1 outreach tool on Instagram</h1>
                        <p className="mb-10 max-w-[480px] text-[16px]">Build your contact list, personalize on alarge scale and send messages that capture new customers.</p>
                        <button className="rounded-3xl py-4 px-8 bg-customBlue"><p className="text-white">Get started</p></button>
                    </div>
                    <div className="w-1/2">
                        <img src="/images/dashboard.png" alt="dashboard" className="w-full rounded-2xl"/>
                        <img src="/images/customers_logo.png" alt="logos" className="mt-10"/>
                    </div>
                    
                </div>

            </section>

            <section id="howItWorks" className="px-[10%] w-full flex flex-col items-center mt-40">
                <button className="lightBlueButton">
                    <p className="pBlue">How it works</p>
                </button>
                <h2 className="w-1/2 text-[35px] text-center my-10">The all-in-one platform to automate your Instagram prospection</h2>

                <div className="gap-8 grid grid-cols-2 w-2/3">
                    <div className="rounded-2xl shadow-xl bg-customLightGray p-10 flex flex-col items-center">
                        <img src="/images/icon_accounts.png" alt="icon" className="w-full"/>
                        <h3 className="my-6">1 - Connect your accounts</h3>
                        <p className="text-lg text-center">Connect your instagram sales accounts. If you don't have any, we can create and setup them for you.</p>
                    </div>
                    <div className="rounded-2xl shadow-xl bg-customLightGray p-10 flex flex-col items-center">
                        <img src="/images/icon_contact.png" alt="icon" className="w-full"/>
                        <h3 className="my-6">2 - Build your Contact List</h3>
                        <p className="text-lg text-center">Build your ideal contact list with precision using our advanced targeting algorithms.</p>
                    </div>
                    <div className="rounded-2xl shadow-xl bg-customLightGray p-10 flex flex-col items-center">
                        <img src="/images/icon_personalize.png" alt="icon" className="w-full"/>
                        <h3 className="my-6">3 - Personalize your Outreach</h3>
                        <p className="text-lg text-center">Send tailored and engaging messages that resonate with your audience and drive conversions.</p>
                    </div>
                    <div className="rounded-2xl shadow-xl bg-customLightGray p-10 flex flex-col items-center">
                        <img src="/images/icon_leads.png" alt="icon" className="w-full mb-[70px]"/>
                        <h3 className="my-6">4 - Manage your Leads</h3>
                        <p className="text-lg text-center">Manage all your leads conversations from a single and unified platform.</p>
                    </div>
                </div>
            </section>

            <section id="leads" className="py-16 px-[10%] mt-60 flex items-center relative">
                <div className="w-7/12 p-24 pr-32 bg-customLightGray rounded-3xl shadow-lg">
                    <h2 className="text-[40px] my-10 w-2/3">Manage all your leads in one place</h2>
                    <p className="text-lg mb-8 w-2/3">No more switching between different accounts to track your leads and follow up with them.</p>
                    <div className="flex">
                        <div className="bg-customBlue p-8 rounded-xl mr-10">
                            <TbUsers className="w-8 h-8 text-white"/>
                        </div>
                        <div>
                            <h3>Increase volume</h3>
                            <p className="text-lg w-3/4">Use multiple 'sales' accounts to increase your prospecting volume.</p>
                        </div>
                    </div>
                </div>
                <div className="z-10 w-6/12 bg-white rounded-3xl p-6 relative right-24">
                    <img src="/images/messages.png" alt="messages" />
                </div>
                <div className="absolute right-0 h-full bg-customBlue rounded-l-[40px] w-3/12">
                </div>
            </section>

            <section id="pricing" className="mt-60 flex items-center gap-12  px-[10%]">
                <div className="w-1/3">
                    <div className="lightBlueButton w-min mb-10">
                        <h4>Pricing</h4>
                    </div>
                    <h2 >2,000 messages/mo</h2>
                    <div className="w-full rounded-lg relative bg-customLightBlue h-3 mt-8 mb-14">
                        <div className="rounded-full bg-customBlue w-6 h-6 absolute left-24 bottom-[-6px]"></div>
                    </div>
                    <p className="text-lg text-center">We guarentee the delivery of messages, as well as accurate targeting.</p>
                </div>
                <div className="bg-customLightGray px-4 py-20 w-1/3 rounded-3xl shadow-lg">
                    <h3>Basic</h3>
                    <div className="w-full mt-8 py-4 flex flex-col items-center border-t border-b border-gray-200">
                        <h3>€400 / month</h3>
                        <div className="bg-customYellow rounded-2xl px-3 py-2 mt-3">
                            <h5 className="h5Yellow">3 month engagement</h5>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="mt-8">
                            <span>Precise </span><span className="font-bold text-black">targeting</span>
                        </div>
                        <div className="mt-8">
                            <span className="font-bold text-black">Customized </span><span>and </span><span className="font-bold text-black">automatized </span><span>outreach</span>
                        </div>
                        <div className="mt-8">
                            <span className="font-bold text-black">Instant results </span><span>(Day 1)</span>
                        </div>
                        <div className="mt-8">
                            <span>Analytics</span>
                        </div>
                        <div className="mt-8">
                            <span>Support 7/7 days</span>
                        </div>
                        <button className="bg-white rounded-2xl px-6 py-3 font-bold mt-16 shadow-md">
                            Get started
                        </button>
                    </div>
                </div>
                <div className="bg-customLightGray px-4 py-20 w-1/3 rounded-3xl shadow-lg">
                    <div className="flex items-center"><h3 className="mr-auto">Premium</h3><p>Save 25%</p></div>
                    <div className="w-full mt-8 py-4 flex flex-col items-center border-t border-b border-gray-200">
                        <h3>€300 / month</h3>
                        <div className="bg-customYellow rounded-2xl px-3 py-2 mt-3">
                            <h5 className="h5Yellow">9 month engagement</h5>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="mt-8">
                            <span>Precise </span><span className="font-bold text-black">targeting</span>
                        </div>
                        <div className="mt-8">
                            <span className="font-bold text-black">Customized </span><span>and </span><span className="font-bold text-black">automatized </span><span>outreach</span>
                        </div>
                        <div className="mt-8">
                            <span className="font-bold text-black">Instant results </span><span>(Day 1)</span>
                        </div>
                        <div className="mt-8">
                            <span>Analytics</span>
                        </div>
                        <div className="mt-8">
                            <span>Support 7/7 days</span>
                        </div>
                        <button className="bg-black text-white rounded-2xl px-6 py-3 font-bold mt-16 shadow-md">
                            Get started
                        </button>
                    </div>
                </div>
            </section>

            <section id="testimonial" className="w-full h-screen mt-40 flex flex-col items-center justify-center" style={{ 
                    backgroundImage: "url('/images/background_testimonials.png')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                <button className="lightBlueButton font-semibold mb-8">
                    Testimonial
                </button>
                <h2 className="text-white">Trusted by Founders and C-level.</h2>
                <h1 className="font-[50px] text-white">“</h1>
                <p className="text-white w-1/2 max-w-[800px] text-center">It transformed my outreach strategy! Drowning in repetitive tasks and struggling with lead management previously, Sociallify's easy account management, automated messaging, and centralized platform helped me generate 5x more leads, increase conversion rates by 30%, and contribute to Splead sales growth.</p>
                <img src="/images/yoann.png" alt="yoann picture" className="mt-8 rounded-full w-1/12"/>
                <h3 className="text-white mt-4">Yoann</h3>
            </section>

            <section id="blog" className="my-40 flex flex-col items-center">
                <button className="lightBlueButton mb-8">
                    Blog
                </button>
                <h2>Article</h2>
                <div className="bg-customLightGray shadow-lg p-6 rounded-3xl w-3/12">
                    <img src="/images/article_photo.png" alt="photo" className="rounded-lg w-full mb-6"/>
                    <p>March 3, 2024</p>
                    <h3 className="mb-8">How to use instagram DMs to grow your business</h3>
                    <p>With over 1 billion active users, instagram is a powerful platform for businesses of all sizes. But with so much noise on the platform, it can be difficult to get your product seen...</p>
                    <a className="mt-12 block" href="">Read More</a>
                </div>

            </section>
        </>
    )
}

export default Home2;