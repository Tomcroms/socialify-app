import Header from "../../components/Header";
import Footer from "../../components/Footer";


export default function startNewCampaignLayout({
    children
} : {
    children: React.ReactNode;
}) {
    return (
        <>
            <main>{children}</main>
        </>
    )
}

