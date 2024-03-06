import Header from "../home/components/Header";
import Footer from "../home/components/Footer";



export default function BlogLayout({
    children
} : {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
                <main>{children}</main>
            <Footer />
        </>
    )
}

