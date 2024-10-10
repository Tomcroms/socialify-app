"use client";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import axios from "axios";
import RunScriptButton from "../../[campaignActions]/components/RunScriptButton";

const Component = () => {
    const pathname = usePathname();
    const [id, setId] = useState<string | null>(null); // State for campaignId
    const [bio, setBio] = useState<string>(''); // State for bio input

    useEffect(() => {
        const pathParts = pathname.split('/');
        const pathId = pathParts[pathParts.length - 1];
        setId(pathId);
    }, [pathname]);

    return (
        <section className="flex flex-col items-center pt-10 w-full">
            <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter new bio"
                className="mb-4 p-2 border border-gray-300 rounded w-1/2 h-40 resize-none"
                rows={5}
            />
            {id && (
                <RunScriptButton endpoint="run-modify-bio-and-delete-dms-by-campaign-id" campaignId={id} params={{bio}} />
            )}
        </section>
    );
};

export default Component;