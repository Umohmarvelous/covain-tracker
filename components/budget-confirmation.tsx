"use client"

import { useBudget, type BudgetEntry } from "@/components/budget-provider"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteConfirmationProps {
    isOpen: boolean
    onClose: () => void
    budgetToDelete?: BudgetEntry
}

export default function DeleteConfirmation({ isOpen, onClose, budgetToDelete }: DeleteConfirmationProps) {
    const { deleteBudget } = useBudget()

    const handleDelete = () => {
        if (budgetToDelete) {
            deleteBudget(budgetToDelete.id)
            onClose()
        }
    }

    if (!budgetToDelete) return null

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString()
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this entry?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to delete a {budgetToDelete.type} of ${budgetToDelete.amount.toFixed(2)} in the{" "}
                        {budgetToDelete.category} category from {formatDate(budgetToDelete.date)}. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
