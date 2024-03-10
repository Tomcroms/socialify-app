import { CiMail } from "react-icons/ci";


const Footer = () => {
    return (
        <footer className="w-full pb-10 px-[10%]">
            <div className="border-gray-200 border-t border-b py-20 flex justify-center items-center">
                <div className="flex items-center w-2/3">
                    <div className="w-1/3 mr-auto">
                        <div className="flex items-center mb-6">
                            <img src="/images/img_footer.png" alt="logo" />
                            <h3 className="ml-4">Socialify</h3>
                        </div>
                        <p className="mb-6">Sociallify helps you automate and scale your Instagram DM outreach, generate leads, and boost sales.</p>
                        <div className="flex items-center">
                            <CiMail className="w-6 h-6 font-bold text-customBlue mr-4"/>
                            <a href="mailto:info@socialify.fr">info@socialify.fr</a>
                        </div>
                    </div>
                    <nav>
                        <a className="block mb-4 text-[#797979]" href="#home">Home</a>
                        <a className="block mb-4 text-[#797979]" href="#howItWorks">How it works</a>
                        <a className="block mb-4 text-[#797979]" href="#pricing">Pricing</a>
                        <a className="block text-[#797979]" href="#blog">Blog</a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer;