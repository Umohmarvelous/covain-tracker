import "./globals.css";

export default function HomeLayout({
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