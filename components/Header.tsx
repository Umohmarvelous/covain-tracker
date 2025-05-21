"use client"
import React, { useState } from 'react'
// import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
            // default:
            //     return 'Page Not Found'
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
                        {/* <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select time range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">Last 7 days</SelectItem>
                                <SelectItem value="14">Last 14 days</SelectItem>
                                <SelectItem value="30">Last 30 days</SelectItem>
                                <SelectItem value="90">Last 90 days</SelectItem>
                            </SelectContent>
                        </Select> */}
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