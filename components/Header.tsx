"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Bell,
    Search,
} from "lucide-react"
import { usePathname } from 'next/navigation'



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
            <header className="mb-5 py-3 px-3 w-full xl:w-full flex flex-row items-center justify-between">
                <h4 className="text-center text-black pl-10 font-bold">
                    {getCurrentPageName()}
                </h4>
                <div className="flex items-center justify-between p-2 ">
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <img src="/uk-flag.svg" alt="Language" className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header >
        </>
    )
}

export default Header