import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AutoSuggest } from "@/components/ui/auto-suggest"
import { initialProducts, Product } from "@/components/products/product-management"

type InvoiceItem = {
  id: number
  productId: number
  description: string
  quantity: number
  unitPrice: number
  total: number
}

type Invoice = {
  id: number
  customerName: string
  date: string
  dueDate: string
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue'
  items: InvoiceItem[]
  total: number
}

const initialInvoices: Invoice[] = [
  {
    id: 1,
    customerName: "Acme Corp",
    date: "2024-03-01",
    dueDate: "2024-03-15",
    status: 'Sent',
    items: [
      { id: 1, productId: 1, description: "Product A", quantity: 2, unitPrice: 100, total: 200 },
      { id: 2, productId: 2, description: "Service B", quantity: 1, unitPrice: 500, total: 500 },
    ],
    total: 700
  }
]

const customers = [
  { id: 1, name: "Acme Corp" },
  { id: 2, name: "Globex Corporation" },
  { id: 3, name: "Soylent Corp" },
]

export function Invoicing() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, 'id' | 'total'>>({
    customerName: '',
    date: '',
    dueDate: '',
    status: 'Draft',
    items: []
  })
  const [newItem, setNewItem] = useState<Omit<InvoiceItem, 'id' | 'total'>>({
    productId: 0,
    description: '',
    quantity: 0,
    unitPrice: 0
  })

  const handleAddItem = () => {
    if (newItem.productId && newItem.quantity > 0 && newItem.unitPrice > 0) {
      const newItemWithTotal = {
        ...newItem,
        id: newInvoice.items.length + 1,
        total: newItem.quantity * newItem.unitPrice
      }
      setNewInvoice({
        ...newInvoice,
        items: [...newInvoice.items, newItemWithTotal]
      })
      setNewItem({ productId: 0, description: '', quantity: 0, unitPrice: 0 })
    }
  }

  const handleAddInvoice = () => {
    if (newInvoice.customerName && newInvoice.date && newInvoice.dueDate && newInvoice.items.length > 0) {
      const total = newInvoice.items.reduce((sum, item) => sum + item.total, 0)
      setInvoices([...invoices, { ...newInvoice, id: invoices.length + 1, total }])
      setNewInvoice({ customerName: '', date: '', dueDate: '', status: 'Draft', items: [] })
    }
  }

  const handleProductSelect = (productId: string) => {
    const product = initialProducts?.find(p => p.id.toString() === productId)
    if (product) {
      setNewItem({
        ...newItem,
        productId: product.id,
        description: product.name,
        unitPrice: product.price
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <AutoSuggest
                options={customers?.map(c => ({ value: c.id.toString(), label: c.name })) ?? []}
                onSelect={(value) => setNewInvoice({ ...newInvoice, customerName: customers?.find(c => c.id.toString() === value)?.name || '' })}
                placeholder="Select customer"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newInvoice.date}
                onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={newInvoice.status}
                onValueChange={(value: 'Draft' | 'Sent' | 'Paid' | 'Overdue') => setNewInvoice({ ...newInvoice, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-2">
              <Label htmlFor="product">Product/Service</Label>
              <AutoSuggest
                options={initialProducts?.map(p => ({ value: p.id.toString(), label: p.name })) ?? []}
                onSelect={handleProductSelect}
                placeholder="Select product/service"
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
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newInvoice.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>${item.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="mt-4" onClick={handleAddInvoice}>Create Invoice</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>${invoice.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

