
interface CampaignPreviewProps {
    data: { message: string };
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ data }) => {
    return (
        <section className="w-1/3 p-4 bg-white h-1/2 rounded-lg">
            <h3>Preview</h3>
            <div className="bg-gray-200 rounded-lg mt-6 w-full p-4 mb-8">
                <p>{data.message}</p>
            </div>
            
            <h3>Estimated result</h3>
            <div className="bg-gray-200 rounded-lg mt-6 w-full p-4">
                <p>Messages sent: x</p>
                <p>Answers: x</p>
                <p>Answer rate: x%</p>
            </div>

        </section>
    );
};

export default CampaignPreview;
