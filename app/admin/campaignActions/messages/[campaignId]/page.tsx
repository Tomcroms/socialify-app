'use client';

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const pathParts = pathname.split('/');
        const pathId = pathParts[pathParts.length - 1];
        setId(pathId);
        
    }, [pathname]);

    
    const handleClickRedirection = (endUrl: string) => {
        if (id) {
            router.push(`/admin/campaignActions/${endUrl}/${id}`);
        } else {
            alert("Please choose a campaign first");
        }
    };

  return (
    <nav className="ml-40 mt-4 mb-4 flex items-center gap-4 w-full justify-center">
        <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("")}>Campaign actions</div>
        <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("accounts")}>Accounts</div>
        <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("dashboard")}>Dashboard</div>
        <div className="bg-black text-white rounded-xl px-8 py-1 mb-4 text-center w-52 cursor-pointer" onClick={() => handleClickRedirection("messages")}>Messages</div>
    </nav>
  )
}

export default Home;