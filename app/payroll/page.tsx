'use client'

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeManagement } from "@/components/payroll/employee-management"
import { TimeTracking } from "@/components/payroll/time-tracking"
import { DeductionsAllowances } from "@/components/payroll/deductions-allowances"
import { EmployeeModifications } from "@/components/payroll/employee-modifications"

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState("employee-management")

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Payroll Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="employee-management">Employee Management</TabsTrigger>
          <TabsTrigger value="time-tracking">Time Tracking</TabsTrigger>
          <TabsTrigger value="deductions-allowances">Deductions & Allowances</TabsTrigger>
          <TabsTrigger value="employee-modifications">Employee Modifications</TabsTrigger>
        </TabsList>
        <TabsContent value="employee-management">
          <EmployeeManagement />
        </TabsContent>
        <TabsContent value="time-tracking">
          <TimeTracking />
        </TabsContent>
        <TabsContent value="deductions-allowances">
          <DeductionsAllowances />
        </TabsContent>
        <TabsContent value="employee-modifications">
          <EmployeeModifications />
        </TabsContent>
      </Tabs>
    </Layout>
  )
}

