"use client"
import React from 'react'
import { BudgetProvider } from '@/components/budget-provider'
import DashboardPage from '@/components/dashboard-page'
import Dashboard from '@/components/Dashboard'

function DashBoardLayout() {
  return (
    <Dashboard />
    // <BudgetProvider>
    //   <DashboardPage />
    // </BudgetProvider>
  )
}

export default DashBoardLayout