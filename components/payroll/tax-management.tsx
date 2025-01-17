import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TaxEntry = {
  id: number
  employeeName: string
  taxType: string
  amount: number
  status: string
}

const initialTaxes: TaxEntry[] = [
  { id: 1, employeeName: "John Doe", taxType: "Federal Income Tax", amount: 1000, status: "Filed" },
  { id: 2, employeeName: "Jane Smith", taxType: "State Income Tax", amount: 500, status: "Pending" },
]

export function TaxManagement() {
  const [taxes, setTaxes] = useState<TaxEntry[]>(initialTaxes)
  const [newTax, setNewTax] = useState<Omit<TaxEntry, 'id'>>({
    employeeName: '',
    taxType: '',
    amount: 0,
    status: 'Pending'
  })

  const handleAddTax = () => {
    setTaxes([...taxes, { ...newTax, id: taxes.length + 1 }])
    setNewTax({ employeeName: '', taxType: '', amount: 0, status: 'Pending' })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tax Management</h2>
        <Button onClick={handleAddTax}>Add Tax Entry</Button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="employeeName">Employee Name</Label>
          <Input
            id="employeeName"
            value={newTax.employeeName}
            onChange={(e) => setNewTax({ ...newTax, employeeName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="taxType">Tax Type</Label>
          <Input
            id="taxType"
            value={newTax.taxType}
            onChange={(e) => setNewTax({ ...newTax, taxType: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={newTax.amount}
            onChange={(e) => setNewTax({ ...newTax, amount: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={newTax.status}
            onValueChange={(value) => setNewTax({ ...newTax, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Filed">Filed</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Tax Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taxes.map((tax) => (
            <TableRow key={tax.id}>
              <TableCell>{tax.employeeName}</TableCell>
              <TableCell>{tax.taxType}</TableCell>
              <TableCell>${tax.amount.toFixed(2)}</TableCell>
              <TableCell>{tax.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

