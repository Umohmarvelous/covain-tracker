'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Mock data for demonstration - replace with actual data from your API
const mockBudgetData = {
  monthlyBudgets: [
    { month: 'Jan', planned: 5000, actual: 4800, remaining: 200 },
    { month: 'Feb', planned: 5000, actual: 5200, remaining: -200 },
    { month: 'Mar', planned: 5000, actual: 4700, remaining: 300 },
    { month: 'Apr', planned: 5000, actual: 5100, remaining: -100 },
    { month: 'May', planned: 5000, actual: 4900, remaining: 100 },
    { month: 'Jun', planned: 5000, actual: 5300, remaining: -300 },
  ],
  categoryBreakdown: [
    { category: 'Food & Dining', amount: 1200, percentage: 24 },
    { category: 'Transportation', amount: 800, percentage: 16 },
    { category: 'Entertainment', amount: 600, percentage: 12 },
    { category: 'Shopping', amount: 1000, percentage: 20 },
    { category: 'Bills & Utilities', amount: 800, percentage: 16 },
    { category: 'Others', amount: 600, percentage: 12 },
  ],
  spendingTrend: [
    { week: 'Week 1', amount: 1200 },
    { week: 'Week 2', amount: 1100 },
    { week: 'Week 3', amount: 1300 },
    { week: 'Week 4', amount: 1000 },
  ]
};

// Bar Chart Component
const BudgetBarChart = ({ data }: { data: typeof mockBudgetData.monthlyBudgets }) => {
  const maxValue = Math.max(...data.map(item => Math.max(item.planned, item.actual)));

  return (
    <div className="w-full h-64 flex items-end justify-between space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <div className="flex flex-col space-y-1">
            {/* Planned Budget Bar */}
            <div
              className="w-8 bg-blue-200 rounded-t"
              style={{
                height: `${(item.planned / maxValue) * 200}px`,
                minHeight: '4px'
              }}
            />
            {/* Actual Spending Bar */}
            <div
              className={`w-8 rounded-b ${item.actual <= item.planned ? 'bg-green-500' : 'bg-red-500'
                }`}
              style={{
                height: `${(item.actual / maxValue) * 200}px`,
                minHeight: '4px'
              }}
            />
          </div>
          <span className="text-xs text-gray-600 font-medium">{item.month}</span>
        </div>
      ))}
    </div>
  );
};

// Pie Chart Component
const BudgetPieChart = ({ data }: { data: typeof mockBudgetData.categoryBreakdown }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  let currentAngle = 0;

  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg width="256" height="256" viewBox="0 0 256 256">
        {data.map((item, index) => {
          const percentage = (item.amount / total) * 100;
          const angle = (percentage / 100) * 360;
          const radius = 100;
          const x1 = 128 + radius * Math.cos((currentAngle * Math.PI) / 180);
          const y1 = 128 + radius * Math.sin((currentAngle * Math.PI) / 180);
          const x2 = 128 + radius * Math.cos(((currentAngle + angle) * Math.PI) / 180);
          const y2 = 128 + radius * Math.sin(((currentAngle + angle) * Math.PI) / 180);

          const largeArcFlag = angle > 180 ? 1 : 0;

          const pathData = [
            `M 128 128`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');

          currentAngle += angle;

          return (
            <path
              key={index}
              d={pathData}
              fill={colors[index % colors.length]}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">${total.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Budget</div>
        </div>
      </div>
    </div>
  );
};

// Line Chart Component
const BudgetLineChart = ({ data }: { data: typeof mockBudgetData.spendingTrend }) => {
  const maxAmount = Math.max(...data.map(item => item.amount));
  const minAmount = Math.min(...data.map(item => item.amount));

  return (
    <div className="w-full h-64 relative">
      <svg width="100%" height="100%" viewBox="0 0 400 200">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="0"
            y1={40 + i * 40}
            x2="400"
            y2={40 + i * 40}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        ))}

        {/* Line chart */}
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          points={data.map((item, index) => {
            const x = (index / (data.length - 1)) * 360 + 20;
            const y = 200 - ((item.amount - minAmount) / (maxAmount - minAmount)) * 120 - 20;
            return `${x},${y}`;
          }).join(' ')}
        />

        {/* Data points */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 360 + 20;
          const y = 200 - ((item.amount - minAmount) / (maxAmount - minAmount)) * 120 - 20;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#3B82F6"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <span key={index} className="text-xs text-gray-600">
            {item.week}
          </span>
        ))}
      </div>
    </div>
  );
};

// Legend Component
const ChartLegend = ({ data, type }: {
  data: typeof mockBudgetData.categoryBreakdown | typeof mockBudgetData.monthlyBudgets,
  type: 'category' | 'monthly'
}) => {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: colors[index % colors.length] }}
          />
          <span className="text-sm text-gray-700">
            {type === 'category'
              ? `${item.category} (${item.percentage}%)`
              : `${item.month}`
            }
          </span>
        </div>
      ))}
    </div>
  );
};

// Main Component
export default function BudgetOverviewCharts() {
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only rendering after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">Budget Overview</h2>
        <div className="text-xs sm:text-sm text-gray-500 font-medium">
          Last updated: {isClient ? new Date().toLocaleDateString() : 'Loading...'}
        </div>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 rounded-lg overflow-hidden shadow-md">
          <TabsTrigger value="monthly" className="text-xs sm:text-sm md:text-base">Monthly Comparison</TabsTrigger>
          <TabsTrigger value="categories" className="text-xs sm:text-sm md:text-base">Category Breakdown</TabsTrigger>
          <TabsTrigger value="trends" className="text-xs sm:text-sm md:text-base">Spending Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <Card className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold">Monthly Budget vs Actual Spending</CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                Compare planned budgets with actual spending across months
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <BudgetBarChart data={mockBudgetData.monthlyBudgets} />
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-200 rounded"></div>
                  <span className="text-xs sm:text-sm text-gray-600">Planned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-xs sm:text-sm text-gray-600">Under Budget</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-xs sm:text-sm text-gray-600">Over Budget</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold">Budget by Category</CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                Distribution of budget across different spending categories
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8 w-full">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs mx-auto">
                  <BudgetPieChart data={mockBudgetData.categoryBreakdown} />
                </div>
                <div className="w-full max-w-xs mx-auto">
                  <ChartLegend data={mockBudgetData.categoryBreakdown} type="category" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold">Weekly Spending Trends</CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                Track spending patterns over the past month
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <BudgetLineChart data={mockBudgetData.spendingTrend} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              ${mockBudgetData.monthlyBudgets[mockBudgetData.monthlyBudgets.length - 1].remaining > 0
                ? mockBudgetData.monthlyBudgets[mockBudgetData.monthlyBudgets.length - 1].remaining
                : 0}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Remaining This Month</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              ${mockBudgetData.categoryBreakdown.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Total Budget</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">
              {mockBudgetData.categoryBreakdown.length}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Active Categories</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 