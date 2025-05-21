"use client"

import { useBudget } from "@/components/budget-provider"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSummary from "@/components/dashboard-summary"
import ExpensesByCategoryChart from "@/components/expenses-by-category-chart"
import MonthlyBalanceChart from "@/components/monthly-balance-chart"
import IncomeVsExpensesChart from "@/components/income-vs-expenses-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
    const { budgets } = useBudget()

    return (
        <div className="container mx-auto py-8 px-4 min-h-screen h-screen">
            {/* <DashboardHeader /> */}

            {budgets.length === 0 ? (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>No Data Available</CardTitle>
                        <CardDescription>
                            You haven't created any budget entries yet. Go to the Budget page to create your first entry.
                        </CardDescription>
                    </CardHeader>
                </Card>
            ) : (
                <>
                    <DashboardSummary />

                    <Tabs defaultValue="overview" className="mt-6">
                        <TabsList className="grid w-full md:w-auto grid-cols-3">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="expenses">Expenses</TabsTrigger>
                            <TabsTrigger value="trends">Trends</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6 mt-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Monthly Balance</CardTitle>
                                        <CardDescription>Your balance trend over the past months</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        <MonthlyBalanceChart />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Expenses by Category</CardTitle>
                                        <CardDescription>How your expenses are distributed</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        <ExpensesByCategoryChart />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="expenses" className="space-y-6 mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Expenses by Category</CardTitle>
                                    <CardDescription>Detailed breakdown of your expenses</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[400px]">
                                    <ExpensesByCategoryChart showLegend={true} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="trends" className="space-y-6 mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Income vs Expenses</CardTitle>
                                    <CardDescription>Compare your income and expenses over time</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[400px]">
                                    <IncomeVsExpensesChart />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </div>
    )
}
