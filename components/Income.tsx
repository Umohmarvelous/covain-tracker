"use client"

import { useState } from "react"
import { PlusIcon, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IncomeForm } from "@/components/income-form"
import { IncomeTable } from "@/components/income-table"
import { IncomeStats } from "@/components/income-stats"
import type { Income } from "@/types/income"

// Utility function to generate UUID with fallback
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function Income() {
  const [incomes, setIncomes] = useState<Income[]>([
    {
      id: "1",
      amount: 500,
      date: new Date("2023-05-15"),
      source: "Salary",
      description: "Monthly salary payment",
    }
  ])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingIncome, setEditingIncome] = useState<Income | null>(null)

  const addIncome = (income: Omit<Income, "id">) => {
    const newIncome = {
      ...income,
      id: generateUUID(),
    }
    setIncomes([...incomes, newIncome])
    setIsFormOpen(false)
  }

  const updateIncome = (updatedIncome: Income) => {
    setIncomes(incomes.map((income) => (income.id === updatedIncome.id ? updatedIncome : income)))
    setEditingIncome(null)
    setIsFormOpen(false)
  }

  const deleteIncome = (id: string) => {
    setIncomes(incomes.filter((income) => income.id !== id))
  }

  const handleEdit = (income: Income) => {
    setEditingIncome(income)
    setIsFormOpen(true)
  }

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)

  return (
    <div className="container px-10 mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => {
            setEditingIncome(null)
            setIsFormOpen(!isFormOpen)
          }}
        >
          <PlusIcon className=" h-10 w-10" />
          Add Income
        </Button>
      </div>

      {isFormOpen && (
        <Card>
          <CardHeader>
            <CardTitle>{editingIncome ? "Edit Income" : "Add New Income"}</CardTitle>
            <CardDescription>
              {editingIncome ? "Update the income entry details below" : "Enter the details of your new income"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IncomeForm
              onSubmit={editingIncome ? updateIncome : addIncome}
              initialData={editingIncome}
              onCancel={() => {
                setIsFormOpen(false)
                setEditingIncome(null)
              }}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <IncomeStats incomes={incomes} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Wallet className="mr-2 h-5 w-5" />
                Income Entries
              </CardTitle>
              <CardDescription>Manage all your income sources in one place</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <IncomeTable incomes={incomes} onEdit={handleEdit} onDelete={deleteIncome} />
        </CardContent>
      </Card>
    </div>
  )
}
