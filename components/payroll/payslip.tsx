import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Employee = {
  id: number
  name: string
  jobTitle: string
  hourlyRate: number
}

type PayslipItem = {
  description: string
  amount: number
  type: 'earning' | 'deduction'
}

const employees: Employee[] = [
  { id: 1, name: "John Doe", jobTitle: "Software Engineer", hourlyRate: 25 },
  { id: 2, name: "Jane Smith", jobTitle: "Project Manager", hourlyRate: 30 },
]

export function Payslip() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [hoursWorked, setHoursWorked] = useState(0)

  const generatePayslip = () => {
    if (!selectedEmployee) return []

    const basicPay = selectedEmployee.hourlyRate * hoursWorked
    const incomeTax = basicPay * 0.2 // 20% income tax
    const healthInsurance = 100 // Fixed amount
    const housingAllowance = 500 // Fixed amount
    const performanceBonus = basicPay * 0.05 // 5% of basic pay

    return [
      { description: 'Basic Pay', amount: basicPay, type: 'earning' as const },
      { description: 'Housing Allowance', amount: housingAllowance, type: 'earning' as const },
      { description: 'Performance Bonus', amount: performanceBonus, type: 'earning' as const },
      { description: 'Income Tax', amount: incomeTax, type: 'deduction' as const },
      { description: 'Health Insurance', amount: healthInsurance, type: 'deduction' as const },
    ]
  }

  const payslipItems = generatePayslip()
  const totalEarnings = payslipItems.filter(item => item.type === 'earning').reduce((sum, item) => sum + item.amount, 0)
  const totalDeductions = payslipItems.filter(item => item.type === 'deduction').reduce((sum, item) => sum + item.amount, 0)
  const netPay = totalEarnings - totalDeductions

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Generate Payslip</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <Select onValueChange={(value) => setSelectedEmployee(employees.find(e => e.id === parseInt(value)) || null)}>
            <SelectTrigger>
              <SelectValue placeholder="Select employee" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id.toString()}>{employee.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <input
            type="number"
            placeholder="Hours worked"
            className="w-full p-2 border rounded"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(parseInt(e.target.value))}
          />
        </div>
        <div>
          <Button onClick={generatePayslip}>Generate Payslip</Button>
        </div>
      </div>
      {selectedEmployee && (
        <Card>
          <CardHeader>
            <CardTitle>Payslip for {selectedEmployee.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payslipItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>${item.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total Earnings</TableCell>
                  <TableCell className="font-bold">${totalEarnings.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Total Deductions</TableCell>
                  <TableCell className="font-bold">${totalDeductions.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Net Pay</TableCell>
                  <TableCell className="font-bold">${netPay.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

