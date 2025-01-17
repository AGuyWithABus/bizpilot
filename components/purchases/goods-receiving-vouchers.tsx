import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type GRVItem = {
  id: number
  productName: string
  quantityOrdered: number
  quantityReceived: number
  unitPrice: number
  total: number
}

type GRV = {
  id: number
  purchaseOrderId: number
  supplierName: string
  date: string
  status: 'Pending' | 'Completed' | 'Discrepancy'
  items: GRVItem[]
  total: number
}

const initialGRVs: GRV[] = [
  {
    id: 1,
    purchaseOrderId: 1,
    supplierName: "Supplier A",
    date: "2023-07-15",
    status: 'Completed',
    items: [
      { id: 1, productName: "Product X", quantityOrdered: 10, quantityReceived: 10, unitPrice: 50, total: 500 },
      { id: 2, productName: "Product Y", quantityOrdered: 5, quantityReceived: 4, unitPrice: 100, total: 400 },
    ],
    total: 900
  }
]

export function GoodsReceivingVouchers() {
  const [grvs, setGRVs] = useState<GRV[]>(initialGRVs)
  const [newGRV, setNewGRV] = useState<Omit<GRV, 'id' | 'total'>>({
    purchaseOrderId: 0,
    supplierName: '',
    date: '',
    status: 'Pending',
    items: []
  })
  const [newItem, setNewItem] = useState<Omit<GRVItem, 'id' | 'total'>>({
    productName: '',
    quantityOrdered: 0,
    quantityReceived: 0,
    unitPrice: 0
  })

  const handleAddItem = () => {
    if (newItem.productName && newItem.quantityOrdered > 0 && newItem.quantityReceived >= 0 && newItem.unitPrice > 0) {
      const newItemWithTotal = {
        ...newItem,
        id: newGRV.items.length + 1,
        total: newItem.quantityReceived * newItem.unitPrice
      }
      setNewGRV({
        ...newGRV,
        items: [...newGRV.items, newItemWithTotal]
      })
      setNewItem({ productName: '', quantityOrdered: 0, quantityReceived: 0, unitPrice: 0 })
    }
  }

  const handleAddGRV = () => {
    if (newGRV.purchaseOrderId && newGRV.supplierName && newGRV.date && newGRV.items.length > 0) {
      const total = newGRV.items.reduce((sum, item) => sum + item.total, 0)
      const status = newGRV.items.some(item => item.quantityReceived !== item.quantityOrdered) ? 'Discrepancy' : 'Completed'
      setGRVs([...grvs, { ...newGRV, id: grvs.length + 1, total, status }])
      setNewGRV({ purchaseOrderId: 0, supplierName: '', date: '', status: 'Pending', items: [] })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Goods Receiving Voucher</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="purchaseOrderId">Purchase Order ID</Label>
              <Input
                id="purchaseOrderId"
                type="number"
                value={newGRV.purchaseOrderId || ''}
                onChange={(e) => setNewGRV({ ...newGRV, purchaseOrderId: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="supplierName">Supplier Name</Label>
              <Input
                id="supplierName"
                value={newGRV.supplierName}
                onChange={(e) => setNewGRV({ ...newGRV, supplierName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newGRV.date}
                onChange={(e) => setNewGRV({ ...newGRV, date: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={newItem.productName}
                onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="quantityOrdered">Quantity Ordered</Label>
              <Input
                id="quantityOrdered"
                type="number"
                value={newItem.quantityOrdered}
                onChange={(e) => setNewItem({ ...newItem, quantityOrdered: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="quantityReceived">Quantity Received</Label>
              <Input
                id="quantityReceived"
                type="number"
                value={newItem.quantityReceived}
                onChange={(e) => setNewItem({ ...newItem, quantityReceived: parseInt(e.target.value) })}
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
                <TableHead>Quantity Ordered</TableHead>
                <TableHead>Quantity Received</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newGRV.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantityOrdered}</TableCell>
                  <TableCell>{item.quantityReceived}</TableCell>
                  <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>${item.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="mt-4" onClick={handleAddGRV}>Create GRV</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Goods Receiving Vouchers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>GRV ID</TableHead>
                <TableHead>PO ID</TableHead>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grvs.map((grv) => (
                <TableRow key={grv.id}>
                  <TableCell>{grv.id}</TableCell>
                  <TableCell>{grv.purchaseOrderId}</TableCell>
                  <TableCell>{grv.supplierName}</TableCell>
                  <TableCell>{grv.date}</TableCell>
                  <TableCell>
                    <Select
                      value={grv.status}
                      onValueChange={(value: 'Pending' | 'Completed' | 'Discrepancy') => {
                        const updatedGRVs = grvs.map(g =>
                          g.id === grv.id ? { ...g, status: value } : g
                        )
                        setGRVs(updatedGRVs)
                      }}
                    >
                      <SelectTrigger className="w-

