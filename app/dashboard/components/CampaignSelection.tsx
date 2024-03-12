import { useCampaignsContext } from "@/app/context/CampaignsContext";
import CampaignBlock from "./CampaignBlock";
import { useState } from "react";


const CampaignSelection = () => {
    const { campaigns } = useCampaignsContext();
    const [isOverflowHidden, setIsOverflowHidden] = useState(true);

    return (
        <div className="flex ml-10">
            <section className={`h-14 ${isOverflowHidden ? 'overflow-hidden' : ''} w-32 flex flex-col items-center z-10 rounded-xl border shadow-md`}>
                {campaigns?.map((item) => (
                    <CampaignBlock
                        key={item.id}
                        campaign={item}
                    />
                ))}
            </section>
            <button
                className="px-4 bg-blue-500 text-white rounded-xl ml-10 text-[14px] h-full py-2 my-auto w-36"
                onClick={() => setIsOverflowHidden(!isOverflowHidden)}
            >
                {isOverflowHidden ? 'Show Campaigns' : 'Hide'}
            </button>
        </div>
    )
}

export default CampaignSelection;