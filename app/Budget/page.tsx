import BudgetPage from '@/components/budget-page'
import { BudgetProvider } from '@/components/budget-provider'
import React from 'react'

function Budget_Laybout() {
    return (
        <div style={{
            height: 'auto',
        }}>
            <BudgetProvider>
                <BudgetPage />
            </BudgetProvider>
        </div>
    )
}

export default Budget_Laybout