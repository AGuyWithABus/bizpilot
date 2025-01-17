import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SalesReturnItem = {
  id: number
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

type SalesReturn = {
  id: number
  customerName: string
  date: string
  reason: string
  status: 'Pending' | 'Approved' | 'Rejected'
  items: SalesReturnItem[]
  total: number
}

const initialSalesReturns: SalesReturn[] = [
  {
    id: 1,
    customerName: "ABC Inc",
    date: "2023-07-05",
    reason: "Defective product",
    status: 'Pending',
    items: [
      { id: 1, productName: "Product A", quantity: 2, unitPrice: 100, total: 200 },
    ],
    total: 200
  }
]

export function SalesReturns() {
  const [salesReturns, setSalesReturns] = useState<SalesReturn[]>(initialSalesReturns)
  const [newSalesReturn, setNewSalesReturn] = useState<Omit<SalesReturn, 'id' | 'total'>>({
    customerName: '',
    date: '',
    reason: '',
    status: 'Pending',
    items: []
  })
  const [newItem, setNewItem] = useState<Omit<SalesReturnItem, 'id' | 'total'>>({
    productName: '',
    quantity: 0,
    unitPrice: 0
  })

  const handleAddItem = () => {
    if (newItem.productName && newItem.quantity > 0 && newItem.unitPrice > 0) {
      const newItemWithTotal = {
        ...newItem,
        id: newSalesReturn.items.length + 1,
        total: newItem.quantity * newItem.unitPrice
      }
      setNewSalesReturn({
        ...newSalesReturn,
        items: [...newSalesReturn.items, newItemWithTotal]
      })
      setNewItem({ productName: '', quantity: 0, unitPrice: 0 })
    }
  }

  const handleAddSalesReturn = () => {
    if (newSalesReturn.customerName && newSalesReturn.date && newSalesReturn.reason && newSalesReturn.items.length > 0) {
      const total = newSalesReturn.items.reduce((sum, item) => sum + item.total, 0)
      setSalesReturns([...salesReturns, { ...newSalesReturn, id: salesReturns.length + 1, total }])
      setNewSalesReturn({ customerName: '', date: '', reason: '', status: 'Pending', items: [] })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Sales Return</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={newSalesReturn.customerName}
                onChange={(e) => setNewSalesReturn({ ...newSalesReturn, customerName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newSalesReturn.date}
                onChange={(e) => setNewSalesReturn({ ...newSalesReturn, date: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="reason">Reason for Return</Label>
              <Input
                id="reason"
                value={newSalesReturn.reason}
                onChange={(e) => setNewSalesReturn({ ...newSalesReturn, reason: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={newItem.productName}
                onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
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
              <Label htmlFor="unitPrice">Unit Price</Label>
              <Input
                id="unitPrice"
                type="number"
                value={newItem.unitPrice}
                onChange={(e) => setNewItem({ ...newItem, unitPrice: parseFloat(e.target.value) })}
              />
            </div>
          </div>
          <Button onClick={handleAddItem}>Add Item</Button>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newSalesReturn.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>${item.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="mt-4" onClick={handleAddSalesReturn}>Create Sales Return</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sales Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesReturns.map((salesReturn) => (
                <TableRow key={salesReturn.id}>
                  <TableCell>{salesReturn.id}</TableCell>
                  <TableCell>{salesReturn.customerName}</TableCell>
                  <TableCell>{salesReturn.date}</TableCell>
                  <TableCell>{salesReturn.reason}</TableCell>
                  <TableCell>
                    <Select
                      value={salesReturn.status}
                      onValueChange={(value: 'Pending' | 'Approved' | 'Rejected') => {
                        const updatedSalesReturns = salesReturns.map(sr =>
                          sr.id === salesReturn.id ? { ...sr, status: value } : sr
                        )
                        setSalesReturns(updatedSalesReturns)
                      }}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>${salesReturn.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

