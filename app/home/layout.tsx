import Header from "./components/Header";
import Footer from "./components/Footer";



export default function Home2Layout({
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

