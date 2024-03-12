import Image from "next/image";

interface Account {
    id: string;
    campaignId?: string | null; // Autorisez `campaignId` à être `string` ou `null`
    conversationIds: string[];
    updatedAt?: Date | null;
    username?: string | null;
    password?: string | null;
    campaignName?: string | null;
    followers?: number | null;
    following?: number | null;
    publications: number | null;
    names?: string | null;
    status?: string | null;
    image?: string | null;
    bio?: string | null;
    gender?: string | null;
    location?: string | null;
    public?: string | null;
    twoFaTokens?: string | null;
}

// Utilisez l'interface pour typer le prop `account`
const AccountBlock: React.FC<{ account: Account }> = ({ account }) => {

    return (
        <div className="border rounded-lg p-4 shadow-lg h-min">
            <div className="flex items-center">
                <Image src={account.image || "/images/user_profile.png"} width={25} height={25} alt="profile"/>
                <h4 className="ml-5">{account.username} {account.names}</h4>
            </div>
            <div className="flex mt-4">
                <h5>Followers: {account.followers}</h5>
                <h5 className="ml-4">Following: {account.following}</h5>
            </div>
            <p className="mt-4">Biography: {account.bio}</p>
        </div>
    );
};

export default AccountBlock;
