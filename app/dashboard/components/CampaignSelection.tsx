import { useCampaignsContext } from "@/app/context/CampaignsContext";
import CampaignBlock from "./CampaignBlock";
import { useState } from "react";


const CampaignSelection = () => {
    const { campaigns } = useCampaignsContext();
    const [isOverflowHidden, setIsOverflowHidden] = useState(true);

    return (
        <div className="flex ml-10 bg-white">
            <section className={`${isOverflowHidden ? 'h-14 overflow-hidden' : 'h-max'} w-32 flex flex-col gap-2 z-10 rounded-xl border shadow-md`}>
                {campaigns?.map((item) => (
                    <CampaignBlock
                        key={item.id}
                        campaign={item}
                    />
                ))}
            </section>
            <button
                className="px-4 bg-blue-500 text-white rounded-xl ml-10 text-[14px] h-14 py-2 w-36"
                onClick={() => setIsOverflowHidden(!isOverflowHidden)}
            >
                {isOverflowHidden ? 'Show Campaigns' : 'Hide'}
            </button>
        </div>
    )
}

export default CampaignSelection;