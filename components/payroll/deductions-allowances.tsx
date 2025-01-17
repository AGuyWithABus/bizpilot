import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Item = {
  id: number
  name: string
  amount: number
  type: 'fixed' | 'percentage'
  category: 'deduction' | 'allowance'
}

const initialItems: Item[] = [
  { id: 1, name: "Income Tax", amount: 20, type: 'percentage', category: 'deduction' },
  { id: 2, name: "Health Insurance", amount: 100, type: 'fixed', category: 'deduction' },
  { id: 3, name: "Housing Allowance", amount: 500, type: 'fixed', category: 'allowance' },
  { id: 4, name: "Performance Bonus", amount: 5, type: 'percentage', category: 'allowance' },
]

export function DeductionsAllowances() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({
    name: '',
    amount: 0,
    type: 'fixed',
    category: 'deduction'
  })

  const handleAddItem = () => {
    setItems([...items, { ...newItem, id: items.length + 1 }])
    setNewItem({ name: '', amount: 0, type: 'fixed', category: 'deduction' })
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Deductions & Allowances</h2>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
          <TabsTrigger value="allowances">Allowances</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ItemTable items={items} />
        </TabsContent>
        <TabsContent value="deductions">
          <ItemTable items={items.filter(item => item.category === 'deduction')} />
        </TabsContent>
        <TabsContent value="allowances">
          <ItemTable items={items.filter(item => item.category === 'allowance')} />
        </TabsContent>
      </Tabs>
      <div className="mt-4 grid grid-cols-5 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={newItem.type}
            onValueChange={(value: 'fixed' | 'percentage') => setNewItem({ ...newItem, type: value })}
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
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={newItem.category}
            onValueChange={(value: 'deduction' | 'allowance') => setNewItem({ ...newItem, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deduction">Deduction</SelectItem>
              <SelectItem value="allowance">Allowance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={handleAddItem}>Add Item</Button>
        </div>
      </div>
    </div>
  )
}

function ItemTable({ items }: { items: Item[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.amount}{item.type === 'percentage' ? '%' : ''}</TableCell>
            <TableCell>{item.type === 'fixed' ? 'Fixed Amount' : 'Percentage'}</TableCell>
            <TableCell>{item.category === 'deduction' ? 'Deduction' : 'Allowance'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

