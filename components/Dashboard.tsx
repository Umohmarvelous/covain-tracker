"use client"
import {
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  PiggyBank,
  Home,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/bar-chart"
import { LineChart } from "@/components/line-chart"
import { DonutChart } from "@/components/donut-chart"
import React from 'react'
import { useBudget } from "@/components/budget-provider"
import BudgetExpenseOverview from "@/components/BudgetExpenseOverview"
// import '../app/globals.css'


const Dashboard = () => {
  const { budgets, totalBudget } = useBudget();

  // Calculate total income and expenses
  const totalIncome = budgets.filter(b => b.type === 'income').reduce((sum, b) => sum + b.amount, 0);
  const totalExpenses = budgets.filter(b => b.type === 'expense').reduce((sum, b) => sum + b.amount, 0);
  const totalSavings = totalIncome - totalExpenses;

  // Get the 5 most recent expenses
  const recentExpenses = budgets
    .filter(b => b.type === 'expense')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="h-auto p-10">
      <BudgetExpenseOverview />
      <main className="pt-2 gap-2 flex flex-col">



        {/* Report Overview and Expense Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Report Overview</CardTitle>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48">
                <DonutChart budgets={budgets} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm">Income</span>
                  <span className="ml-auto font-medium">₦{totalIncome.toLocaleString()}</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                  <span className="text-sm">Expense</span>
                  <span className="ml-auto font-medium">₦{totalExpenses.toLocaleString()}</span>
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
                  <span className="text-sm">Savings</span>
                  <span className="ml-auto font-medium">₦{totalSavings.toLocaleString()}</span>
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expense Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Expense Activity</CardTitle>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Actual expense</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 border border-dashed border-emerald-500 rounded-full"></div>
                  <span>Projected expense</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LineChart income={budgets} />
            </CardContent>
          </Card>


          {/* Charts and Tables */}
          <div className="w-[200%]">

            {/* Recent Expenses */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentExpenses.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No recent expenses</div>
                ) : (
                  recentExpenses.map((expense) => (
                    <div key={expense.id} className="flex items-start gap-3">
                      <div className="w-1 h-full bg-emerald-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{expense.category}</p>
                          <p className="font-medium">₦{expense.amount.toLocaleString()}</p>
                        </div>
                        <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </main >
    </div >
  );
};

export default Dashboard