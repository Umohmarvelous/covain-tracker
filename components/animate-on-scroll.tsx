"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface AnimateOnScrollProps {
    children: React.ReactNode
    animation?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scale" | "stagger"
    delay?: number
    duration?: number
    className?: string
    threshold?: number
    once?: boolean
}

export function AnimateOnScroll({
    children,
    animation = "fadeIn",
    delay = 0,
    duration = 0.5,
    className = "",
    threshold = 0.1,
    once = true,
}: AnimateOnScrollProps) {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { threshold, once })
    const [hasAnimated, setHasAnimated] = useState(false)

    // Animation variants
    const variants = {
        hidden: {
            opacity: 0,
            y: animation === "fadeInUp" ? 50 : 0,
            x: animation === "fadeInLeft" ? 50 : animation === "fadeInRight" ? -50 : 0,
            scale: animation === "scale" ? 0.8 : 1,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration,
                delay,
                ease: "easeOut",
            },
        },
    }

    // Stagger animation for children
    const staggerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    }

    useEffect(() => {
        if (isInView && !hasAnimated) {
            controls.start("visible")
            if (once) {
                setHasAnimated(true)
            }
        }
        if (!isInView && !once && hasAnimated) {
            controls.start("hidden")
            setHasAnimated(false)
        }
    }, [isInView, controls, once, hasAnimated])

    if (animation === "stagger") {
        return (
            <motion.div ref={ref} initial="hidden" animate={controls} variants={staggerVariants} className={className}>
                {Array.isArray(children)
                    ? children.map((child, i) => (
                        <motion.div key={i} variants={childVariants}>
                            {child}
                        </motion.div>
                    ))
                    : children}
            </motion.div>
        )
    }

    return (
        <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
            {children}
        </motion.div>
    )
}
