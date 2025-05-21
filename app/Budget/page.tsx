// "use client"
import BudgetPage from '@/components/budget-page'
import { BudgetProvider } from '@/components/budget-provider'
import Budget_comp from '@/components/Budget_comp'

// import Budget_comp from '@/components/Budget_comp'
import React from 'react'

function Budget_Laybout() {
    return (
        <div style={{
            height: 'auto',
        }}>
            {/* <Budget_comp /> */}
            <BudgetProvider>
                <BudgetPage />
            </BudgetProvider>
        </div>
    )
}

export default Budget_Laybout