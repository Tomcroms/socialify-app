"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import RunScriptButton from "../../[campaignActions]/components/RunScriptButton";

const Component = () => {
    const pathname = usePathname();
    const [instagramUsernames, setInstagramUsernames] = useState<string>(''); // Updated to handle multiple usernames
    const [followersCount, setFollowersCount] = useState<number | ''>('');
    const [instagramUsersSelected, setInstagramUsersSelected] = useState(false);
    const [id, setId] = useState<string | null>(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);

	useEffect(() => {
		if (pathname) {
		const pathParts = pathname.split('/');
		const pathId = pathParts[pathParts.length - 1];
		setId(pathId);
		}
	}, [pathname]);

  // Function to handle API call for multiple usernames
	const handleScrapingFollowers = async () => {
		if (!id || !instagramUsernames || !followersCount) {
			setError("Veuillez entrer un ID de campagne, au moins un nom d'utilisateur Instagram et le nombre de followers.");
		return;
		}
    
		// Split the usernames string into an array
		const usernameArray = instagramUsernames.split(',').map(username => username.trim());
		
		setLoading(true);
		setError(null);
		setResult(null);
		try {
			const response = await axios.post('/api/scrapingFollowersByUsernames', {
				campaignId: id, // Use campaignId instead of id
				usernames: usernameArray,  // Send the list of usernames
				followersCount
			});
			setResult(response.data);
			setInstagramUsersSelected(true);
		} catch (error) {
			setError("Une erreur s'est produite lors de la récupération des followers.");
			console.log(error);
		} finally {
			setLoading(false);
		}
  	};

	return (
		<main className="p-4">
		{/* Section to input Instagram usernames */}
		<section className="mt-12 bg-gray-200 p-4 w-max flex gap-32 relative box-content">
			<div className="rounded flex flex-col items-center">
			<div>Sélectionner les comptes Instagram (séparés par une virgule)</div>
			<textarea
				placeholder="Nom d'utilisateur Instagram, autre nom d'utilisateur..."
				value={instagramUsernames}
				onChange={(e) => setInstagramUsernames(e.target.value)}
				className="mt-2 p-2 border border-gray-400 rounded w-full"
				rows={3}
			/>
			</div>
		</section>

		{/* Section to input number of followers */}
			<section className="bg-gray-200 p-4 w-min flex flex-col items-center mt-8 relative mb-4">
				<div>Nombre de followers à récupérer :</div>
				<input
					type="number"
					placeholder="1000"
					value={followersCount}
					onChange={(e) => setFollowersCount(Number(e.target.value))}
					className="mt-2 p-2 border border-gray-400 rounded"
				/>

				{error && <p className="text-red-500 mt-4">{error}</p>}
				{result && (
				<div className="mt-4">
					<p>Récupération des followers réussie !</p>
					{/* Display result here, you can customize it */}
					<pre>{JSON.stringify(result, null, 2)}</pre>
				</div>
				)}
			</section>
			{id && (
				<RunScriptButton endpoint="run-scraping-followers-by-usernames" campaignId={id} params={{usernames: instagramUsernames, numberOfAccountsToScrap: followersCount}}/>
			)}
		</main>
	);
};

export default Component;
