"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan 2024", incoming: 0, outgoing: 0, profit: 0 },
  { month: "Apr 2024", incoming: 0, outgoing: 0, profit: 0 },
  { month: "Jul 2024", incoming: 0, outgoing: 0, profit: 0 },
  { month: "Oct 2024", incoming: 0, outgoing: 0, profit: 0 },
]

export function CashFlowChart() {
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
          dataKey="incoming"
          stroke="#4ade80"
          strokeWidth={2}
          dot={{ fill: "#4ade80", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="outgoing"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ fill: "#ef4444", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: "#3b82f6", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

