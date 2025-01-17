"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan 2024", income: 0, expense: 0 },
  { month: "Apr 2024", income: 0, expense: 0 },
  { month: "Jul 2024", income: 0, expense: 0 },
  { month: "Oct 2024", income: 0, expense: 0 },
]

export function ProfitLossChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#4ade80"
          strokeWidth={2}
          dot={{ fill: "#4ade80", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ fill: "#ef4444", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

