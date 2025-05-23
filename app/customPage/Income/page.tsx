import React from 'react'
import Income from '@/components/Income'


function IncomeLayout() {

    return (
        <>
            <div className=''
                style={{
                    height: '100vh',
                    width: '80vw',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black'
                }}>
                <Income />
            </div>
        </>
    )
}

export default IncomeLayout