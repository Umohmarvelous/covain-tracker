"use client"

import { useBudget } from "@/components/budget-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, BarChart3Icon, PieChartIcon, TrendingUpIcon } from "lucide-react"

export default function BudgetSummary() {
    const { totalBudget, monthlySpending, frequentCategory, budgets } = useBudget()

    // Calculate total income and expenses
    const totalIncome = budgets
        .filter((budget) => budget.type === "income")
        .reduce((sum, budget) => sum + budget.amount, 0)

    const totalExpenses = budgets
        .filter((budget) => budget.type === "expense")
        .reduce((sum, budget) => sum + budget.amount, 0)

    // Get current month's spending
    const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" })
    const currentMonthSpending = monthlySpending[currentMonth] || 0

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5  gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                    <TrendingUpIcon className={`h-4 w-4 ${totalBudget >= 0 ? "text-green-500" : "text-red-500"}`} />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${totalBudget >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ₦{Math.abs(totalBudget).toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">{totalBudget >= 0 ? "Positive balance" : "Negative balance"}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600 flex flex-wrap">₦{totalIncome.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">All time income</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">₦{totalExpenses.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">All time expenses</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 ">
                    <CardTitle className="text-sm font-medium">
                        {frequentCategory ? "Top Category" : "Monthly Spending"}
                    </CardTitle>
                    {frequentCategory ? (
                        <PieChartIcon className="h-4 w-4 text-purple-500" />
                    ) : (
                        <BarChart3Icon className="h-4 w-4 text-blue-500" />
                    )}
                </CardHeader>
                <CardContent>
                    {frequentCategory ? (
                        <>
                            <div className="text-2xl font-bold text-purple-600 capitalize">{frequentCategory}</div>
                            <p className="text-xs text-muted-foreground">Most frequent category</p>
                        </>
                    ) : (
                        <>
                            <div className="text-2xl font-bold text-blue-600">₦{currentMonthSpending.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">Current month expenses</p>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
