'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 4500 },
  { name: 'May', amount: 4800 },
  { name: 'Jun', amount: 5200 },
]

export function ReportingAnalytics() {
  const [reportType, setReportType] = useState('payroll-expenses')

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Reporting & Analytics</h2>
        <div className="flex items-center gap-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="payroll-expenses">Payroll Expenses</SelectItem>
              <SelectItem value="employee-earnings">Employee Earnings</SelectItem>
              <SelectItem value="tax-deductions">Tax Deductions</SelectItem>
            </SelectContent>
          </Select>
          <Button>Generate Report</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{reportType === 'payroll-expenses' ? 'Payroll Expenses' : reportType === 'employee-earnings' ? 'Employee Earnings' : 'Tax Deductions'}</CardTitle>
          <CardDescription>Monthly breakdown for the current year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$152,500</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$5,083</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Tax Deductions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$38,125</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

