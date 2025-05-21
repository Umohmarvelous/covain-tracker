"use client"

import { useState } from "react"
import Link from "next/link"
import { useBudget } from "@/components/budget-provider"
import BudgetSummary from "@/components/budget-sumary"
import BudgetCalendar from "@/components/budget-calendar"
import BudgetForm from "@/components/budget-form"
import BudgetList from "@/components/budget-list"
import EmptyState from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { PlusIcon, LayoutDashboardIcon } from "lucide-react"

export default function BudgetPage() {
  const { budgets } = useBudget()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Budget Tracker</h1> */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline">
            <Link href="/dashboard" className="flex items-center gap-2">
              <LayoutDashboardIcon size={16} />
              Dashboard
            </Link>
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <PlusIcon size={16} />
            Create Budget
          </Button>
        </div>
      </div>

      {budgets.length === 0 ? (
        <EmptyState onCreateClick={() => setIsModalOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BudgetSummary />
            <BudgetList />
          </div>
          <div className="lg:col-span-1">
            <BudgetCalendar />
          </div>
        </div>
      )}

      <BudgetForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
