"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlusIcon, WalletIcon } from "lucide-react"

export default function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <Card className="w-full p-8 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <WalletIcon className="h-8 w-8 text-gray-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No budget entries yet!</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Start tracking your finances by creating your first budget entry. You'll be able to see your spending patterns
        and manage your money better.
      </p>
      <Button onClick={onCreateClick} className="flex items-center gap-2">
        <PlusIcon size={16} />
        Create Budget Entry
      </Button>
    </Card>
  )
}
