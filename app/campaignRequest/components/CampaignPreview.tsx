import Image from 'next/image';

interface CampaignPreviewProps {
    data: {
        message: string;
        nbMessages: number;
    };
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ data }) => {
    return (
        <section className="w-1/3 p-6 h-min bg-white rounded-2xl mt-5 sticky mr-5">
            <h3>Preview</h3>
            <div className="bg-gray-200 rounded-lg mt-6 w-full p-4 mb-8 flex min-h-[300px]">
                <div style={{minWidth: '30px', minHeight: '10px'}} className="mr-4">
                    <Image width={30} height={10} src="/images/user_profile.png" alt="profile picture" />
                </div>
                <div className="bg-white p-4 rounded-lg min-h-30 w-3/4 whitespace-pre-wrap">
                    <p>{data.message}</p>
                </div>
            </div>
            
            <h3>Estimated result</h3>
            <div className="bg-gray-200 rounded-lg mt-6 w-full p-4">
                <p>Messages to send: {data.nbMessages}</p>
                <p>Estimated answers: {data.nbMessages/20}</p>
                <p>Estimated answer rate: 5%</p>
            </div>

        </section>
    );
};

export default CampaignPreview;
