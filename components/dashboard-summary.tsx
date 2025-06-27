"use client"

import { useMemo, useState, useEffect } from "react"
import { useBudget } from "@/components/budget-provider"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, TrendingUpIcon } from "lucide-react"

export default function DashboardSummary() {
    const { budgets, totalBudget } = useBudget()
    const [isClient, setIsClient] = useState(false);

    // Prevent hydration mismatch by only rendering after client-side hydration
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Calculate total income and expenses
    const totalIncome = useMemo(() => {
        return budgets.filter((budget) => budget.type === "income").reduce((sum, budget) => sum + budget.amount, 0)
    }, [budgets])

    const totalExpenses = useMemo(() => {
        return budgets.filter((budget) => budget.type === "expense").reduce((sum, budget) => sum + budget.amount, 0)
    }, [budgets])

    // Calculate this month's data
    const currentMonth = isClient ? new Date().getMonth() : 0
    const currentYear = isClient ? new Date().getFullYear() : 2024

    const thisMonthIncome = useMemo(() => {
        return budgets
            .filter((budget) => {
                const date = new Date(budget.date)
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear && budget.type === "income"
            })
            .reduce((sum, budget) => sum + budget.amount, 0)
    }, [budgets, currentMonth, currentYear])

    const thisMonthExpenses = useMemo(() => {
        return budgets
            .filter((budget) => {
                const date = new Date(budget.date)
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear && budget.type === "expense"
            })
            .reduce((sum, budget) => sum + budget.amount, 0)
    }, [budgets, currentMonth, currentYear])

    // Calculate savings rate (income - expenses) / income * 100
    const savingsRate = useMemo(() => {
        if (thisMonthIncome === 0) return 0
        return ((thisMonthIncome - thisMonthExpenses) / thisMonthIncome) * 100
    }, [thisMonthIncome, thisMonthExpenses])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardContent className="flex items-center p-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <DollarSignIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                        <h3 className={`text-2xl font-bold ${totalBudget >= 0 ? "text-green-600" : "text-red-600"}`}>
                            ₦{Math.abs(totalBudget).toFixed(2)}
                        </h3>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center p-6">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                        <ArrowUpIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                        <h3 className="text-2xl font-bold text-green-600">₦{totalIncome.toFixed(2)}</h3>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center p-6">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                        <ArrowDownIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                        <h3 className="text-2xl font-bold text-red-600">₦{totalExpenses.toFixed(2)}</h3>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center p-6">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <TrendingUpIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Savings Rate</p>
                        <h3 className={`text-2xl font-bold ${savingsRate >= 0 ? "text-blue-600" : "text-red-600"}`}>
                            {savingsRate.toFixed(1)}%
                        </h3>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
