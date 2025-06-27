"use client"
import React from 'react'
import Dashboard from '@/components/Dashboard'
import { BudgetProvider } from '@/components/budget-provider'

function DashBoardLayout() {
  return (
    <BudgetProvider>
      <Dashboard />
    </BudgetProvider>
  )
}

export default DashBoardLayout