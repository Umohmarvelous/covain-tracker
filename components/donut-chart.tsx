"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function DonutChart() {
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
      type: "doughnut",
      data: {
        labels: ["Income", "Expense", "Savings"],
        datasets: [
          {
            data: [65, 25, 10],
            backgroundColor: ["#10b981", "#34d399", "#1e293b"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number
                return `${value}%`
              },
            },
          },
        },
      },
    })

    // Add percentage labels
    const centerX = chartInstance.current.chartArea.left + chartInstance.current.chartArea.width / 2
    const centerY = chartInstance.current.chartArea.top + chartInstance.current.chartArea.height / 2

    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // 65% label
    ctx.font = "bold 24px Arial"
    ctx.fillStyle = "#10b981"
    ctx.fillText("65%", centerX, centerY - 10)

    // Income label
    ctx.font = "12px Arial"
    ctx.fillStyle = "#6b7280"
    ctx.fillText("Income", centerX, centerY + 15)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
