import { useCampaignsContext } from "@/app/context/CampaignsContext";
import CampaignBlock from "./CampaignBlock";
import { useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";



const CampaignSelection = () => {
    const { campaigns } = useCampaignsContext();
    const [isOverflowHidden, setIsOverflowHidden] = useState(true);

    return (
        <div className="flex ml-10 bg-white">
            <section className={`${isOverflowHidden ? 'overflow-hidden' : 'overflow-visible'} h-14 flex rounded-xl border shadow-md px-2`}>
                <div className="h-max w-36 flex flex-col gap-2 z-10 bg-white px-2">
                    {campaigns?.map((item) => (
                        <CampaignBlock
                            key={item.id}
                            campaign={item}
                        />
                    ))}
                </div>
                <button className="flex items-center justify-center h-full px-4" onClick={() => setIsOverflowHidden(!isOverflowHidden)}>
                    {/* {isOverflowHidden ? 'Show Campaigns' : 'Hide'} */}
                    <TbTriangleInvertedFilled />
                </button>
            </section>
        </div>
    )
}

export default CampaignSelection;