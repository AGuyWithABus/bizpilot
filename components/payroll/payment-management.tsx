import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Payment = {
  id: number
  employeeName: string
  amount: number
  method: string
  status: string
}

const initialPayments: Payment[] = [
  { id: 1, employeeName: "John Doe", amount: 4000, method: "Direct Deposit", status: "Completed" },
  { id: 2, employeeName: "Jane Smith", amount: 4800, method: "Check", status: "Pending" },
]

export function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [newPayment, setNewPayment] = useState<Omit<Payment, 'id'>>({
    employeeName: '',
    amount: 0,
    method: 'Direct Deposit',
    status: 'Pending'
  })

  const handleAddPayment = () => {
    setPayments([...payments, { ...newPayment, id: payments.length + 1 }])
    setNewPayment({ employeeName: '', amount: 0, method: 'Direct Deposit', status: 'Pending' })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Payment Management</h2>
        <Button onClick={handleAddPayment}>Add Payment</Button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="employeeName">Employee Name</Label>
          <Input
            id="employeeName"
            value={newPayment.employeeName}
            onChange={(e) => setNewPayment({ ...newPayment, employeeName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={newPayment.amount}
            onChange={(e) => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="method">Payment Method</Label>
          <Select
            value={newPayment.method}
            onValueChange={(value) => setNewPayment({ ...newPayment, method: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Direct Deposit">Direct Deposit</SelectItem>
              <SelectItem value="Check">Check</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={newPayment.status}
            onValueChange={(value) => setNewPayment({ ...newPayment, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.employeeName}</TableCell>
              <TableCell>${payment.amount.toFixed(2)}</TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell>{payment.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

