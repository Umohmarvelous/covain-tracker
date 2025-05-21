"use client"

import { useMemo } from "react"
import { useBudget } from "@/components/budget-provider"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"

export default function IncomeVsExpensesChart() {
    const { budgets } = useBudget()

    // Prepare data for the chart
    const chartData = useMemo(() => {
        // Get all unique months from the budget entries
        const months = new Set<string>()

        budgets.forEach((budget) => {
            const date = new Date(budget.date)
            const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`
            months.add(monthYear)
        })

        // Sort months chronologically
        const sortedMonths = Array.from(months).sort()

        // Calculate income and expenses for each month
        return sortedMonths.map((monthYear) => {
            const [year, month] = monthYear.split("-").map(Number)

            // Filter budgets for this month
            const monthlyBudgets = budgets.filter((budget) => {
                const date = new Date(budget.date)
                return date.getFullYear() === year && date.getMonth() + 1 === month
            })

            // Calculate income and expenses
            const income = monthlyBudgets
                .filter((budget) => budget.type === "income")
                .reduce((sum, budget) => sum + budget.amount, 0)

            const expenses = monthlyBudgets
                .filter((budget) => budget.type === "expense")
                .reduce((sum, budget) => sum + budget.amount, 0)

            // Format month for display
            const date = new Date(year, month - 1)
            const formattedMonth = date.toLocaleString("default", { month: "short", year: "2-digit" })

            return {
                month: formattedMonth,
                income,
                expenses,
            }
        })
    }, [budgets])

    // If no data, show a message
    if (chartData.length === 0) {
        return <div className="flex h-full items-center justify-center text-muted-foreground">No data available</div>
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`₦${value.toFixed(2)}`, ""]} />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#10b981" />
                <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
            </BarChart>
        </ResponsiveContainer>
    )
}
