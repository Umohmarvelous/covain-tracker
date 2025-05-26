"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type BudgetEntry = {
    id: string
    amount: number
    category: string
    description: string
    date: string
    type: "income" | "expense"
}

type BudgetContextType = {
    budgets: BudgetEntry[]
    addBudget: (budget: Omit<BudgetEntry, "id">) => void
    editBudget: (id: string, budget: Omit<BudgetEntry, "id">) => void
    deleteBudget: (id: string) => void
    totalBudget: number
    monthlySpending: Record<string, number>
    frequentCategory: string | null
    selectedDate: Date
    setSelectedDate: (date: Date) => void
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined)

export function BudgetProvider({ children }: { children: React.ReactNode }) {
    const [budgets, setBudgets] = useState<BudgetEntry[]>([])
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    // Load budgets from localStorage on initial render
    useEffect(() => {
        const savedBudgets = localStorage.getItem("budgets")
        if (savedBudgets) {
            setBudgets(JSON.parse(savedBudgets))
        }
    }, [])

    // Save budgets to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("budgets", JSON.stringify(budgets))
    }, [budgets])

    // Calculate total budget (income - expenses)
    const totalBudget = budgets.reduce((total, budget) => {
        return budget.type === "income" ? total + budget.amount : total - budget.amount
    }, 0)

    // Calculate monthly spending
    const monthlySpending: Record<string, number> = budgets.reduce(
        (acc, budget) => {
            if (budget.type === "expense") {
                const month = new Date(budget.date).toLocaleString("default", { month: "long", year: "numeric" })
                acc[month] = (acc[month] || 0) + budget.amount
            }
            return acc
        },
        {} as Record<string, number>,
    )

    // Find most frequent category
    const frequentCategory =
        budgets.length > 0
            ? Object.entries(
                budgets.reduce(
                    (acc, budget) => {
                        acc[budget.category] = (acc[budget.category] || 0) + 1
                        return acc
                    },
                    {} as Record<string, number>,
                ),
            ).sort((a, b) => b[1] - a[1])[0][0]
            : null

    const addBudget = (budget: Omit<BudgetEntry, "id">) => {
        const newBudget = {
            ...budget,
            id: crypto.randomUUID(),
        }
        setBudgets([...budgets, newBudget])
    }

    const editBudget = (id: string, updatedBudget: Omit<BudgetEntry, "id">) => {
        setBudgets(
            budgets.map((budget) =>
                budget.id === id
                    ? {
                        ...updatedBudget,
                        id,
                    }
                    : budget,
            ),
        )
    }

    const deleteBudget = (id: string) => {
        setBudgets(budgets.filter((budget) => budget.id !== id))
    }

    return (
        <BudgetContext.Provider
            value={{
                budgets,
                addBudget,
                editBudget,
                deleteBudget,
                totalBudget,
                monthlySpending,
                frequentCategory,
                selectedDate,
                setSelectedDate,
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}

export function useBudget() {
    const context = useContext(BudgetContext)
    if (context === undefined) {
        throw new Error("useBudget must be used within a BudgetProvider")
    }
    return context
}
