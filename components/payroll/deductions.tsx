import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Deduction = {
  id: number
  name: string
  amount: number
  type: 'fixed' | 'percentage'
}

const initialDeductions: Deduction[] = [
  { id: 1, name: "Income Tax", amount: 20, type: 'percentage' },
  { id: 2, name: "Health Insurance", amount: 100, type: 'fixed' },
]

export function Deductions() {
  const [deductions, setDeductions] = useState<Deduction[]>(initialDeductions)
  const [newDeduction, setNewDeduction] = useState<Omit<Deduction, 'id'>>({
    name: '',
    amount: 0,
    type: 'fixed'
  })

  const handleAddDeduction = () => {
    setDeductions([...deductions, { ...newDeduction, id: deductions.length + 1 }])
    setNewDeduction({ name: '', amount: 0, type: 'fixed' })
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Deductions</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="name">Deduction Name</Label>
          <Input
            id="name"
            value={newDeduction.name}
            onChange={(e) => setNewDeduction({ ...newDeduction, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={newDeduction.amount}
            onChange={(e) => setNewDeduction({ ...newDeduction, amount: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={newDeduction.type}
            onValueChange={(value: 'fixed' | 'percentage') => setNewDeduction({ ...newDeduction, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={handleAddDeduction}>Add Deduction</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deductions.map((deduction) => (
            <TableRow key={deduction.id}>
              <TableCell>{deduction.name}</TableCell>
              <TableCell>{deduction.amount}{deduction.type === 'percentage' ? '%' : ''}</TableCell>
              <TableCell>{deduction.type === 'fixed' ? 'Fixed Amount' : 'Percentage'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

