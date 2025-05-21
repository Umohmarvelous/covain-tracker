"use client"

import { useMemo } from "react"
import { useBudget } from "@/components/budget-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export default function BudgetCalendar() {
    const { budgets, selectedDate, setSelectedDate } = useBudget()

    // Get days in month
    const daysInMonth = useMemo(() => {
        return new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()
    }, [selectedDate])

    // Get first day of month
    const firstDayOfMonth = useMemo(() => {
        return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()
    }, [selectedDate])

    // Create calendar days array
    const calendarDays = useMemo(() => {
        const days = []

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null)
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i)
        }

        return days
    }, [daysInMonth, firstDayOfMonth])

    // Get budget entries for each day
    const budgetsByDay = useMemo(() => {
        const result: Record<number, { count: number; total: number }> = {}

        budgets.forEach((budget) => {
            const budgetDate = new Date(budget.date)

            if (
                budgetDate.getMonth() === selectedDate.getMonth() &&
                budgetDate.getFullYear() === selectedDate.getFullYear()
            ) {
                const day = budgetDate.getDate()

                if (!result[day]) {
                    result[day] = { count: 0, total: 0 }
                }

                result[day].count += 1
                result[day].total += budget.type === "income" ? budget.amount : -budget.amount
            }
        })

        return result
    }, [budgets, selectedDate])

    // Navigate to previous month
    const goToPreviousMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
    }

    // Navigate to next month
    const goToNextMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
    }

    // Navigate to current month
    const goToCurrentMonth = () => {
        setSelectedDate(new Date())
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Budget Calendar</CardTitle>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={goToCurrentMonth}>
                        Today
                    </Button>
                    <Button variant="outline" size="sm" onClick={goToNextMonth}>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold">
                        {selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}
                    </h3>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-sm font-medium text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={`
                aspect-square p-1 relative
                ${day ? "border rounded-md hover:bg-gray-50" : ""}
                ${day &&
                                    selectedDate.getDate() === day &&
                                    new Date().getMonth() === selectedDate.getMonth() &&
                                    new Date().getFullYear() === selectedDate.getFullYear()
                                    ? "bg-gray-100 font-bold"
                                    : ""
                                }
              `}
                        >
                            {day && (
                                <>
                                    <div className="text-sm">{day}</div>
                                    {budgetsByDay[day] && (
                                        <div
                                            className={`
                        absolute bottom-1 right-1 w-3 h-3 rounded-full
                        ${budgetsByDay[day].total >= 0 ? "bg-green-500" : "bg-red-500"}
                      `}
                                            title={`${budgetsByDay[day].count} entries, total: ₦${Math.abs(budgetsByDay[day].total).toFixed(2)}`}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
