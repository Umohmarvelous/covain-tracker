"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"

export default function DashboardHeader() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
                <p className="text-gray-500">View your financial health at a glance</p>
            </div>
            <Button variant="outline" asChild className="mt-4 md:mt-0">
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeftIcon size={16} />
                    Back to Budget
                </Link>
            </Button>
        </div>
    )
}
