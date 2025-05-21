"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import type { Income } from "@/types/income"
import { cn } from "@/lib/utils"

interface IncomeFormProps {
    onSubmit: (income: Income | Omit<Income, "id">) => void
    initialData?: Income | null
    onCancel: () => void
}

export function IncomeForm({ onSubmit, initialData, onCancel }: IncomeFormProps) {
    const [formData, setFormData] = useState<Omit<Income, "id"> | Income>({
        amount: initialData?.amount || 0,
        date: initialData?.date || new Date(),
        source: initialData?.source || "",
        description: initialData?.description || "",
        ...(initialData?.id ? { id: initialData.id } : {}),
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        if (name === "amount") {
            const numValue = Number.parseFloat(value)
            setFormData({
                ...formData,
                [name]: isNaN(numValue) ? 0 : numValue,
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            })
        }
    }

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setFormData({
                ...formData,
                date,
            })

            if (errors.date) {
                setErrors({
                    ...errors,
                    date: "",
                })
            }
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (formData.amount <= 0) {
            newErrors.amount = "Amount must be greater than zero"
        }

        if (!formData.source.trim()) {
            newErrors.source = "Source is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            onSubmit(formData)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        className={cn(errors.amount && "border-destructive")}
                    />
                    {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn("w-full justify-start text-left font-normal", errors.date && "border-destructive")}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.date ? format(formData.date, "PPP") : "Select a date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={formData.date} onSelect={handleDateChange} initialFocus />
                        </PopoverContent>
                    </Popover>
                    {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className={cn(errors.source && "border-destructive")}
                />
                {errors.source && <p className="text-sm text-destructive">{errors.source}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} />
            </div>

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">{initialData ? "Update" : "Add"} Income</Button>
            </div>
        </form>
    )
}
