export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en"
            style={{
                backgroundColor: 'white'
            }}>
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}