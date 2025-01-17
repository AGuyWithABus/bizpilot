'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const salesData = [
  { month: 'Jan', value: 30 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 25 },
  { month: 'Apr', value: 35 },
  { month: 'May', value: 50 },
  { month: 'Jun', value: 30 },
]

const cashFlowData = [
  { month: 'Jan', in: 40, out: 24 },
  { month: 'Feb', value: 30, out: 13 },
  { month: 'Mar', value: 20, out: 28 },
  { month: 'Apr', value: 27, out: 18 },
  { month: 'May', value: 18, out: 12 },
  { month: 'Jun', value: 23, out: 19 },
]

export function SalesChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CashFlowChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={cashFlowData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="in" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="out" fill="#1f2937" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

