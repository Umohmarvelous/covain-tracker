"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    ArrowLeftIcon,
    Bell,
    Search,
} from "lucide-react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'



function Header() {
    const [timeRange, setTimeRange] = useState("30")

    const pathname = usePathname()


    // Function to get the current page name based on the pathname
    const getCurrentPageName = () => {
        switch (pathname) {
            case '/':
                return 'Home'
            case '/budget':
                return 'Budget'
            case '/income':
                return 'Income'
        }
    }

    return (
        <>
            <header className="mb-5 py-3 px-7 w-full xl:w-full flex flex-row items-center justify-between">
                {/* <h4 className="text-center text-black pl-10 font-bold">
                    {getCurrentPageName()}
                </h4> */}

                <Link href="/" className='bg-emerald-300 rounded-3xl p-1'>
                    <ArrowLeftIcon className='text-emerald-600' />
                </Link>

                <form action="">
                    <Button variant="ghost" size="icon">
                        <Search className="w-5 h-5" />
                    </Button>
                    <input
                        type="search"
                        name="search"
                        id=""
                        className='border-1 p-1 px-3 rounded-xl active:outline-0'
                    />
                </form>
                <Button variant="ghost" size="icon">
                    <Bell className="w-5 h-5" />
                </Button>


            </header >
        </>
    )
}

export default Header