"use client"
import React from 'react'

function Checkbox() {
    const [show, setShow] = React.useState(false)

    function showOnClick() {
        if (show === false) {
            setShow(true)
        } else setShow(false)

    }
    return (
        <div>
            <button
                onClick={showOnClick}>
                Click on me
                {show && <span> - Checkbox is checked</span>}
            </button>
        </div>
    )
}

export default Checkbox