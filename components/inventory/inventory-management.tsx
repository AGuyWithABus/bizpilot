import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type InventoryItem = {
  id: number
  name: string
  quantity: number
  reorderPoint: number
}

const initialInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Product A",
    quantity: 100,
    reorderPoint: 20
  },
  {
    id: 2,
    name: "Product B",
    quantity: 50,
    reorderPoint: 10
  }
]

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)
  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id'>>({
    name: '',
    quantity: 0,
    reorderPoint: 0
  })

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity >= 0 && newItem.reorderPoint >= 0) {
      setInventory([...inventory, { ...newItem, id: inventory.length + 1 }])
      setNewItem({ name: '', quantity: 0, reorderPoint: 0 })
    }
  }

  const handleUpdateQuantity = (id: number, change: number) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Inventory Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="reorderPoint">Reorder Point</Label>
              <Input
                id="reorderPoint"
                type="number"
                value={newItem.reorderPoint}
                onChange={(e) => setNewItem({ ...newItem, reorderPoint: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <Button onClick={handleAddItem}>Add Inventory Item</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reorder Point</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.reorderPoint}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, -1)}>-</Button>
                    <Button variant="outline" size="sm" className="ml-2" onClick={() => handleUpdateQuantity(item.id, 1)}>+</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

