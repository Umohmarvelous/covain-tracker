import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eTa",
  description: "Just a basic expenses and budget Management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      style={{
        backgroundColor: 'white'
      }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className=" w-auto popover flex flex-row relative pr-5"
          style={{
            // height: '145vh',
            backgroundColor: '#f4f2f3',

          }} >
          <div className='fixed pb-1 minH-full h-full flex items-center justify-center'>
            <Navbar />
          </div>
          <div className="ml-40 w-full h-auto py-2 my-1">
            <div className='rounded-xl bg-white'>
              <Header />
            </div>
            <div className='px-3 bg-white rounded-xl'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html >
  );
}
