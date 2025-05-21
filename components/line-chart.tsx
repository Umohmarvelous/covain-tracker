"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function LineChart() {
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

    // Actual expense data
    const actualData = [1600, 1800, 2000, 1700, 2100, 1900, 1100, 1500, 1800, 1700, 2300]

    // Projected expense data (after day 7)
    const projectedData = Array(7).fill(null).concat([2000, 1700, 2100, 1900])

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7", "Jan 8", "Jan 9", "Jan 10", "Jan 11"],
        datasets: [
          {
            label: "Actual expense",
            data: actualData,
            borderColor: "#10b981",
            backgroundColor: "#10b981",
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#fff",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.3,
          },
          {
            label: "Projected expense",
            data: projectedData,
            borderColor: "#10b981",
            borderDash: [5, 5],
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#fff",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.3,
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
            max: 3000,
            ticks: {
              stepSize: 500,
              callback: (value) => {
                if (value === 0) return "0"
                return `${value / 1000}k`
              },
            },
          },
        },
      },
    })

    // Add $2357 label to the highest point
    const highestPointIndex = 10 // Jan 11
    const meta = chartInstance.current.getDatasetMeta(0)
    const rect = meta.data[highestPointIndex].getCenterPoint()

    ctx.fillStyle = "black"
    ctx.font = "bold 12px Arial"
    ctx.textAlign = "center"
    ctx.fillText("$2357", rect.x, rect.y - 15)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-48">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
