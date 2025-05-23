"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

interface CounterAnimationProps {
    end: number
    duration?: number
    prefix?: string
    suffix?: string
    className?: string
    threshold?: number
}

export function CounterAnimation({
    end,
    duration = 2000,
    prefix = "",
    suffix = "",
    className = "",
    threshold = 0.5,
}: CounterAnimationProps) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, threshold })
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (isInView && !hasAnimated) {
            let startTime: number
            let animationFrame: number

            const countUp = (timestamp: number) => {
                if (!startTime) startTime = timestamp
                const progress = Math.min((timestamp - startTime) / duration, 1)
                setCount(Math.floor(progress * end))

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(countUp)
                } else {
                    setHasAnimated(true)
                }
            }

            animationFrame = requestAnimationFrame(countUp)

            return () => cancelAnimationFrame(animationFrame)
        }
    }, [isInView, end, duration, hasAnimated])

    return (
        <span ref={ref} className={className}>
            {prefix}
            {count}
            {suffix}
        </span>
    )
}
