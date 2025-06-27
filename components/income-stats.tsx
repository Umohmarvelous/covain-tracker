"use client"

import { useMemo, useState, useEffect } from "react"
import { ArrowUpRight, DollarSign, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Income } from "@/types/income"

interface IncomeStatsProps {
  incomes: Income[]
}

export function IncomeStats({ incomes }: IncomeStatsProps) {
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only rendering after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const stats = useMemo(() => {
    const total = incomes.reduce((sum, income) => sum + income.amount, 0)

    // Get current month incomes
    const now = isClient ? new Date() : new Date(2024, 0, 1) // Default date for SSR
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const thisMonthIncomes = incomes.filter((income) => {
      const incomeDate = new Date(income.date)
      return incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear
    })

    const thisMonthTotal = thisMonthIncomes.reduce((sum, income) => sum + income.amount, 0)

    // Get average income per entry
    const average = incomes.length > 0 ? total / incomes.length : 0

    return {
      total,
      thisMonthTotal,
      average,
      count: incomes.length,
    }
  }, [incomes, isClient])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.total)}</div>
          <p className="text-xs text-muted-foreground">From {stats.count} income entries</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.thisMonthTotal)}</div>
          <div className="flex items-center pt-1">
            <ArrowUpRight className="h-3 w-3 text-emerald-500" />
            <p className="text-xs text-muted-foreground ml-1">Current month income</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.average)}</div>
          <p className="text-xs text-muted-foreground">Per income entry</p>
        </CardContent>
      </Card>
    </>
  )
}
