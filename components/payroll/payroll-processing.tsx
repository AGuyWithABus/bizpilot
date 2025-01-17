import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type PayrollEntry = {
  id: number
  employeeName: string
  grossPay: number
  deductions: number
  taxWithheld: number
  netPay: number
  payPeriod: string
}

const initialPayroll: PayrollEntry[] = [
  { id: 1, employeeName: "John Doe", grossPay: 5000, deductions: 1000, taxWithheld: 800, netPay: 3200, payPeriod: "June 2023" },
  { id: 2, employeeName: "Jane Smith", grossPay: 6000, deductions: 1200, taxWithheld: 960, netPay: 3840, payPeriod: "June 2023" },
]

export function PayrollProcessing() {
  const [payroll, setPayroll] = useState<PayrollEntry[]>(initialPayroll)
  const [newEntry, setNewEntry] = useState<Omit<PayrollEntry, 'id' | 'taxWithheld' | 'netPay'>>({
    employeeName: '',
    grossPay: 0,
    deductions: 0,
    payPeriod: ''
  })

  const calculateTaxAndNetPay = (grossPay: number, deductions: number) => {
    const taxableIncome = grossPay - deductions
    const taxRate = 0.2 // 20% tax rate for this example
    const taxWithheld = taxableIncome * taxRate
    const netPay = grossPay - deductions - taxWithheld
    return { taxWithheld, netPay }
  }

  const handleAddEntry = () => {
    const { taxWithheld, netPay } = calculateTaxAndNetPay(newEntry.grossPay, newEntry.deductions)
    setPayroll([...payroll, { ...newEntry, id: payroll.length + 1, taxWithheld, netPay }])
    setNewEntry({ employeeName: '', grossPay: 0, deductions: 0, payPeriod: '' })
  }

  const totalGrossPay = payroll.reduce((sum, entry) => sum + entry.grossPay, 0)
  const totalNetPay = payroll.reduce((sum, entry) => sum + entry.netPay, 0)
  const totalTaxWithheld = payroll.reduce((sum, entry) => sum + entry.taxWithheld, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payroll Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Total Gross Pay</p>
              <p className="text-2xl font-bold">${totalGrossPay.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Net Pay</p>
              <p className="text-2xl font-bold">${totalNetPay.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Tax Withheld</p>
              <p className="text-2xl font-bold">${totalTaxWithheld.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Add Payroll Entry</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label htmlFor="employeeName">Employee Name</Label>
            <Input
              id="employeeName"
              value={newEntry.employeeName}
              onChange={(e) => setNewEntry({ ...newEntry, employeeName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="grossPay">Gross Pay</Label>
            <Input
              id="grossPay"
              type="number"
              value={newEntry.grossPay}
              onChange={(e) => setNewEntry({ ...newEntry, grossPay: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="deductions">Deductions</Label>
            <Input
              id="deductions"
              type="number"
              value={newEntry.deductions}
              onChange={(e) => setNewEntry({ ...newEntry, deductions: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="payPeriod">Pay Period</Label>
            <Input
              id="payPeriod"
              value={newEntry.payPeriod}
              onChange={(e) => setNewEntry({ ...newEntry, payPeriod: e.target.value })}
            />
          </div>
        </div>
        <Button onClick={handleAddEntry}>Add Payroll Entry</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Gross Pay</TableHead>
            <TableHead>Deductions</TableHead>
            <TableHead>Tax Withheld</TableHead>
            <TableHead>Net Pay</TableHead>
            <TableHead>Pay Period</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payroll.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.employeeName}</TableCell>
              <TableCell>${entry.grossPay.toFixed(2)}</TableCell>
              <TableCell>${entry.deductions.toFixed(2)}</TableCell>
              <TableCell>${entry.taxWithheld.toFixed(2)}</TableCell>
              <TableCell>${entry.netPay.toFixed(2)}</TableCell>
              <TableCell>{entry.payPeriod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

