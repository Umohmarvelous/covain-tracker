"use client";

import { useBudget } from "@/components/budget-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#10b981", "#ef4444", "#3b82f6", "#f59e42", "#a78bfa", "#f472b6", "#facc15", "#38bdf8"];

export default function BudgetExpenseOverview() {
  const { budgets } = useBudget();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only rendering after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="space-y-8 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-400">Loading...</div>
              <p className="text-xs sm:text-sm text-gray-600">Total Income</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-400">Loading...</div>
              <p className="text-xs sm:text-sm text-gray-600">Total Expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-400">Loading...</div>
              <p className="text-xs sm:text-sm text-gray-600">Net Savings</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 300 }} className="flex items-center justify-center">
              <div className="text-gray-500">Loading chart...</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 300 }} className="flex items-center justify-center">
              <div className="text-gray-500">Loading chart...</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Budget & Expense Entries</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading data...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Totals
  const totalIncome = budgets.filter(b => b.type === 'income').reduce((sum, b) => sum + b.amount, 0);
  const totalExpenses = budgets.filter(b => b.type === 'expense').reduce((sum, b) => sum + b.amount, 0);
  const netSavings = totalIncome - totalExpenses;

  // Monthly trend data
  const months = Array.from(new Set(budgets.map(b => {
    const d = new Date(b.date);
    return `${d.getFullYear()}-${d.getMonth() + 1}`;
  }))).sort();
  const monthlyData = months.map(monthYear => {
    const [year, month] = monthYear.split("-").map(Number);
    const monthBudgets = budgets.filter(b => {
      const d = new Date(b.date);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });
    return {
      month: new Date(year, month - 1).toLocaleString("default", { month: "short", year: "2-digit" }),
      income: monthBudgets.filter(b => b.type === 'income').reduce((sum, b) => sum + b.amount, 0),
      expenses: monthBudgets.filter(b => b.type === 'expense').reduce((sum, b) => sum + b.amount, 0),
    };
  });

  // Category breakdown (expenses)
  const categoryMap: Record<string, number> = {};
  budgets.filter(b => b.type === 'expense').forEach(b => {
    categoryMap[b.category] = (categoryMap[b.category] || 0) + b.amount;
  });
  const categoryData = Object.entries(categoryMap).map(([category, amount]) => ({ category, amount }));

  // Table data (all entries, most recent first)
  const allEntries = [...budgets].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600">₦{totalIncome.toLocaleString()}</div>
            <p className="text-xs sm:text-sm text-gray-600">Total Income</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-xl sm:text-2xl font-bold text-red-600">₦{totalExpenses.toLocaleString()}</div>
            <p className="text-xs sm:text-sm text-gray-600">Total Expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">₦{netSavings.toLocaleString()}</div>
            <p className="text-xs sm:text-sm text-gray-600">Net Savings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`₦${value.toLocaleString()}`, ""]} />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#10b981" />
                <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
                  {categoryData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`₦${value.toLocaleString()}`, ""]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Budget & Expense Entries</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-right">Amount (₦)</th>
              </tr>
            </thead>
            <tbody>
              {allEntries.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">No entries yet</td></tr>
              ) : (
                allEntries.map(entry => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{new Date(entry.date).toLocaleDateString()}</td>
                    <td className="p-2 capitalize">{entry.type}</td>
                    <td className="p-2">{entry.category}</td>
                    <td className="p-2">{entry.description || '-'}</td>
                    <td className="p-2 text-right">{entry.amount.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
} 