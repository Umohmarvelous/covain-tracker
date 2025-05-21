"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function BarChart() {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)

    useEffect(() => {
        if (!chartRef.current) return

        const ctx = chartRef.current.getContext("2d")
        if (!ctx) return

        // Destroy existing chart
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        // Create new chart
        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: [
                    "Repairs",
                    "House Rent",
                    "Licenses",
                    "Transport",
                    "Laptop",
                    "Net Bill",
                    "AC",
                    "Dish Bill",
                    "School",
                    "Plants",
                ],
                datasets: [
                    {
                        data: [3000, 3500, 2800, 1500, 2300, 2600, 1800, 1200, 2200, 1400],
                        backgroundColor: "#10b981",
                        borderRadius: 4,
                        barThickness: 20,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `$${context.raw}`,
                        },
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        max: 4000,
                        ticks: {
                            stepSize: 500,
                            callback: (value: any) => {
                                if (value === 0) return "0"
                                return `${value / 1000}k`
                            },
                        },
                    },
                },
            },
        })

        // Add $3519 label to the highest bar
        const highestBarIndex = 1 // House Rent is the highest
        const meta = chartInstance.current.getDatasetMeta(0)
        const rect = meta.data[highestBarIndex].getCenterPoint()

        ctx.fillStyle = "white"
        ctx.font = "bold 12px Arial"
        ctx.textAlign = "center"
        ctx.fillText("$3519", rect.x, rect.y - 10)

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, [])

    return (
        <div className="w-full h-64">
            <canvas ref={chartRef}></canvas>
        </div>
    )
}
