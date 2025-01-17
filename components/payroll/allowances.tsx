import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Allowance = {
  id: number
  name: string
  amount: number
  type: 'fixed' | 'percentage'
}

const initialAllowances: Allowance[] = [
  { id: 1, name: "Housing Allowance", amount: 500, type: 'fixed' },
  { id: 2, name: "Performance Bonus", amount: 5, type: 'percentage' },
]

export function Allowances() {
  const [allowances, setAllowances] = useState<Allowance[]>(initialAllowances)
  const [newAllowance, setNewAllowance] = useState<Omit<Allowance, 'id'>>({
    name: '',
    amount: 0,
    type: 'fixed'
  })

  const handleAddAllowance = () => {
    setAllowances([...allowances, { ...newAllowance, id: allowances.length + 1 }])
    setNewAllowance({ name: '', amount: 0, type: 'fixed' })
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Allowances</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="name">Allowance Name</Label>
          <Input
            id="name"
            value={newAllowance.name}
            onChange={(e) => setNewAllowance({ ...newAllowance, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={newAllowance.amount}
            onChange={(e) => setNewAllowance({ ...newAllowance, amount: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={newAllowance.type}
            onValueChange={(value: 'fixed' | 'percentage') => setNewAllowance({ ...newAllowance, type: value })}
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
          <Button onClick={handleAddAllowance}>Add Allowance</Button>
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
          {allowances.map((allowance) => (
            <TableRow key={allowance.id}>
              <TableCell>{allowance.name}</TableCell>
              <TableCell>{allowance.amount}{allowance.type === 'percentage' ? '%' : ''}</TableCell>
              <TableCell>{allowance.type === 'fixed' ? 'Fixed Amount' : 'Percentage'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

