"use client"
import {
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  PiggyBank,
  Home,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/bar-chart"
import { LineChart } from "@/components/line-chart"
import { DonutChart } from "@/components/donut-chart"
import React from 'react'
// import '../app/globals.css'


const Dashboard = () => {
  return (
    <div className="h-auto p-10">

      <main className="pt-2 gap-2 flex flex-col">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {/* Total Income */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">TOTAL INCOME</CardTitle>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <DollarSign className="w-6 h-6 mr-1 text-emerald-500" />
                <span className="text-2xl font-bold">₦45,000</span>
              </div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 mr-1 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-500">6% vs last 30 days</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Expense */}
          <Card className="bg-emerald-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">TOTAL EXPENSE</CardTitle>
              <MoreHorizontal className="w-5 h-5 text-emerald-100" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">₦27,450</span>
              </div>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="w-4 h-4 mr-1 text-emerald-100" />
                <span className="text-xs font-medium text-emerald-100">2% vs last 30 days</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Savings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">TOTAL SAVINGS</CardTitle>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <PiggyBank className="w-6 h-6 mr-1 text-emerald-500" />
                <span className="text-2xl font-bold">₦17,550</span>
              </div>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="w-4 h-4 mr-1 text-red-500" />
                <span className="text-xs font-medium text-red-500">1% vs last 30 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Top 5 Expense Source</CardTitle>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <BarChart />
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Recent Expenses</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1 h-full bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Fridge</p>
                    <p className="font-medium">₦550</p>
                  </div>
                  <p className="text-xs text-gray-500">1st January, 2023</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1 h-full bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Internet Bill</p>
                    <p className="font-medium">₦17</p>
                  </div>
                  <p className="text-xs text-gray-500">28th December, 2022</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1 h-full bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Indoor Plants</p>
                    <p className="font-medium">₦96</p>
                  </div>
                  <p className="text-xs text-gray-500">27th December, 2022</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1 h-full bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Transport</p>
                    <p className="font-medium">₦11</p>
                  </div>
                  <p className="text-xs text-gray-500">25th December, 2022</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Overview and Expense Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Report Overview</CardTitle>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48">
                <DonutChart />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm">Income</span>
                  <span className="ml-auto font-medium">₦45,000</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                  <span className="text-sm">Expense</span>
                  <span className="ml-auto font-medium">₦27,450</span>
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
                  <span className="text-sm">Savings</span>
                  <span className="ml-auto font-medium">₦17,550</span>
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expense Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Expense Activity</CardTitle>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Actual expense</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 border border-dashed border-emerald-500 rounded-full"></div>
                  <span>Projected expense</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LineChart />
            </CardContent>
          </Card>
        </div>
      </main >
    </div >
  );
};

export default Dashboard