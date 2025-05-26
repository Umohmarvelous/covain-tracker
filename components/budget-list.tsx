"use client"

// Import the necessary components and hooks
import { useMemo, useState } from "react"
import { useBudget, type BudgetEntry } from "@/components/budget-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, PencilIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import BudgetForm from "@/components/budget-form"
// import DeleteConfirmation from "@/components/delete-confirmation"

export default function BudgetList() {
  const { budgets, selectedDate } = useBudget()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<BudgetEntry | undefined>(undefined)

  // Handle edit button click
  const handleEdit = (budget: BudgetEntry) => {
    setSelectedBudget(budget)
    setEditModalOpen(true)
  }

  // Handle delete button click
  const handleDelete = (budget: BudgetEntry) => {
    setSelectedBudget(budget)
    setDeleteDialogOpen(true)
  }

  // Filter budgets for the selected month
  const filteredBudgets = useMemo(() => {
    return budgets
      .filter((budget) => {
        const budgetDate = new Date(budget.date)
        return (
          budgetDate.getMonth() === selectedDate.getMonth() && budgetDate.getFullYear() === selectedDate.getFullYear()
        )
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [budgets, selectedDate])

  // Format date to display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          {selectedDate.toLocaleString("default", { month: "long", year: "numeric" })} Entries
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredBudgets.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No budget entries for this month</div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {filteredBudgets.map((budget) => (
              <div key={budget.id} className="flex items-start justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${budget.type === "income" ? "bg-green-100" : "bg-red-100"}`}>
                    {budget.type === "income" ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium capitalize">{budget.category}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {budget.description || "No description"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(budget.date)}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className={`font-semibold ${budget.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {budget.type === "income" ? "+" : "-"}${budget.amount.toFixed(2)}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleEdit(budget)}
                      title="Edit"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(budget)}
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <BudgetForm
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false)
            setSelectedBudget(undefined)
          }}
          editMode={true}
          budgetToEdit={selectedBudget}
        />

        {/* Delete Confirmation Dialog */}
        {/* <DeleteConfirmation
          isOpen={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false)
            setSelectedBudget(undefined)
          }}
          budgetToDelete={selectedBudget}
        /> */}
      </CardContent>
    </Card>
  )
}
