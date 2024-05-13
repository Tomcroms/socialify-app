export default async function adminLayout({
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

