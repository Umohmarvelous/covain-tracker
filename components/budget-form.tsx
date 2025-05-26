"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useBudget, type BudgetEntry } from "@/components/budget-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const CATEGORIES = [
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Insurance",
    "Healthcare",
    "Savings",
    "Personal",
    "Entertainment",
    "Debt",
    "Education",
    "Gifts",
    "Salary",
    "Investment",
    "Other",
]

interface BudgetFormProps {
    isOpen: boolean
    onClose: () => void
    editMode?: boolean
    budgetToEdit?: BudgetEntry
}

export default function BudgetForm({ isOpen, onClose, editMode = false, budgetToEdit }: BudgetFormProps) {
    const { addBudget, editBudget } = useBudget()
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        type: "expense" as "income" | "expense",
    })

    // When in edit mode and budgetToEdit changes, update the form data
    useEffect(() => {
        if (editMode && budgetToEdit) {
            setFormData({
                amount: budgetToEdit.amount.toString(),
                category: budgetToEdit.category,
                description: budgetToEdit.description,
                date: budgetToEdit.date,
                type: budgetToEdit.type,
            })
        } else if (!editMode) {
            // Reset form when opening in create mode
            setFormData({
                amount: "",
                category: "",
                description: "",
                date: new Date().toISOString().split("T")[0],
                type: "expense",
            })
        }
    }, [editMode, budgetToEdit, isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.amount || !formData.category || !formData.date) {
            return
        }

        const budgetData = {
            amount: Number.parseFloat(formData.amount),
            category: formData.category,
            description: formData.description,
            date: formData.date,
            type: formData.type,
        }

        if (editMode && budgetToEdit) {
            editBudget(budgetToEdit.id, budgetData)
        } else {
            addBudget(budgetData)
        }

        // Reset form and close modal
        setFormData({
            amount: "",
            category: "",
            description: "",
            date: new Date().toISOString().split("T")[0],
            type: "expense",
        })

        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{editMode ? "Edit Budget Entry" : "Create Budget Entry"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <RadioGroup
                            id="type"
                            value={formData.type}
                            onValueChange={(value) => setFormData({ ...formData, type: value as "income" | "expense" })}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="expense" id="expense" />
                                <Label htmlFor="expense" className="cursor-pointer">
                                    Expense
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="income" id="income" />
                                <Label htmlFor="income" className="cursor-pointer">
                                    Income
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount ($)</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                            required
                        >
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter a description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="min-h-[80px]"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">{editMode ? "Save Changes" : "Submit"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
