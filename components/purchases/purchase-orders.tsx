import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PurchaseOrderItem = {
  id: number
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

type PurchaseOrder = {
  id: number
  supplierName: string
  date: string
  expectedDeliveryDate: string
  status: 'Pending' | 'Approved' | 'Received' | 'Cancelled'
  items: PurchaseOrderItem[]
  total: number
}

const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: 1,
    supplierName: "Supplier A",
    date: "2023-07-01",
    expectedDeliveryDate: "2023-07-15",
    status: 'Pending',
    items: [
      { id: 1, productName: "Product X", quantity: 10, unitPrice: 50, total: 500 },
      { id: 2, productName: "Product Y", quantity: 5, unitPrice: 100, total: 500 },
    ],
    total: 1000
  }
]

export function PurchaseOrders() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders)
  const [newPurchaseOrder, setNewPurchaseOrder] = useState<Omit<PurchaseOrder, 'id' | 'total'>>({
    supplierName: '',
    date: '',
    expectedDeliveryDate: '',
    status: 'Pending',
    items: []
  })
  const [newItem, setNewItem] = useState<Omit<PurchaseOrderItem, 'id' | 'total'>>({
    productName: '',
    quantity: 0,
    unitPrice: 0
  })

  const handleAddItem = () => {
    if (newItem.productName && newItem.quantity > 0 && newItem.unitPrice > 0) {
      const newItemWithTotal = {
        ...newItem,
        id: newPurchaseOrder.items.length + 1,
        total: newItem.quantity * newItem.unitPrice
      }
      setNewPurchaseOrder({
        ...newPurchaseOrder,
        items: [...newPurchaseOrder.items, newItemWithTotal]
      })
      setNewItem({ productName: '', quantity: 0, unitPrice: 0 })
    }
  }

  const handleAddPurchaseOrder = () => {
    if (newPurchaseOrder.supplierName && newPurchaseOrder.date && newPurchaseOrder.expectedDeliveryDate && newPurchaseOrder.items.length > 0) {
      const total = newPurchaseOrder.items.reduce((sum, item) => sum + item.total, 0)
      setPurchaseOrders([...purchaseOrders, { ...newPurchaseOrder, id: purchaseOrders.length + 1, total }])
      setNewPurchaseOrder({ supplierName: '', date: '', expectedDeliveryDate: '', status: 'Pending', items: [] })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Purchase Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="supplierName">Supplier Name</Label>
              <Input
                id="supplierName"
                value={newPurchaseOrder.supplierName}
                onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, supplierName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newPurchaseOrder.date}
                onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="expectedDeliveryDate">Expected Delivery Date</Label>
              <Input
                id="expectedDeliveryDate"
                type="date"
                value={newPurchaseOrder.expectedDeliveryDate}
                onChange={(e) => setNewPurchaseOrder({ ...newPurchaseOrder, expectedDeliveryDate: e.target.value })}
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
              {newPurchaseOrder.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>${item.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="mt-4" onClick={handleAddPurchaseOrder}>Create Purchase Order</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO ID</TableHead>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell>{po.id}</TableCell>
                  <TableCell>{po.supplierName}</TableCell>
                  <TableCell>{po.date}</TableCell>
                  <TableCell>{po.expectedDeliveryDate}</TableCell>
                  <TableCell>
                    <Select
                      value={po.status}
                      onValueChange={(value: 'Pending' | 'Approved' | 'Received' | 'Cancelled') => {
                        const updatedPurchaseOrders = purchaseOrders.map(order =>
                          order.id === po.id ? { ...order, status: value } : order
                        )
                        setPurchaseOrders(updatedPurchaseOrders)
                      }}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Received">Received</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>${po.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

