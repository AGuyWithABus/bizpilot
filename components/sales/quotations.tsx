import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AutoSuggest } from "@/components/ui/auto-suggest"
import { initialProducts, Product } from "@/components/products/product-management"

// Type definitions (assumed to exist in the original code)
type QuotationItem = {
  id: number;
  productId: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

type Quotation = {
  id: number;
  customerName: string;
  date: string;
  expiryDate: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  items: QuotationItem[];
  total: number;
}


const initialQuotations: Quotation[] = [
  {
    id: 1,
    customerName: "XYZ Corp",
    date: "2024-03-01",
    expiryDate: "2024-03-15",
    status: 'Sent',
    items: [
      { id: 1, productId: 1, description: "Product X", quantity: 5, unitPrice: 100, total: 500 },
      { id: 2, productId: 2, description: "Service Y", quantity: 1, unitPrice: 1000, total: 1000 },
    ],
    total: 1500
  }
]

const customers = [
  { id: 1, name: "XYZ Corp" },
  { id: 2, name: "ABC Industries" },
  { id: 3, name: "123 Company" },
]

export function Quotations() {
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations)
  const [newQuotation, setNewQuotation] = useState<Omit<Quotation, 'id' | 'total'>>({
    customerName: '',
    date: '',
    expiryDate: '',
    status: 'Draft',
    items: []
  })
  const [newItem, setNewItem] = useState<Omit<QuotationItem, 'id' | 'total'>>({
    productId: 0,
    description: '',
    quantity: 0,
    unitPrice: 0
  })

  const handleAddItem = () => {
    if (newItem.productId && newItem.quantity > 0 && newItem.unitPrice > 0) {
      const newItemWithTotal = {
        ...newItem,
        id: newQuotation.items.length + 1,
        total: newItem.quantity * newItem.unitPrice
      }
      setNewQuotation({
        ...newQuotation,
        items: [...newQuotation.items, newItemWithTotal]
      })
      setNewItem({ productId: 0, description: '', quantity: 0, unitPrice: 0 })
    }
  }

  const handleAddQuotation = () => {
    if (newQuotation.customerName && newQuotation.date && newQuotation.expiryDate && newQuotation.items.length > 0) {
      const total = newQuotation.items.reduce((sum, item) => sum + item.total, 0)
      setQuotations([...quotations, { ...newQuotation, id: quotations.length + 1, total }])
      setNewQuotation({ customerName: '', date: '', expiryDate: '', status: 'Draft', items: [] })
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
          <CardTitle>Create New Quotation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <AutoSuggest
                options={customers?.map(c => ({ value: c.id.toString(), label: c.name })) ?? []}
                onSelect={(value) => setNewQuotation({ ...newQuotation, customerName: customers?.find(c => c.id.toString() === value)?.name || '' })}
                placeholder="Select customer"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newQuotation.date}
                onChange={(e) => setNewQuotation({ ...newQuotation, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={newQuotation.expiryDate}
                onChange={(e) => setNewQuotation({ ...newQuotation, expiryDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={newQuotation.status}
                onValueChange={(value: 'Draft' | 'Sent' | 'Accepted' | 'Rejected') => setNewQuotation({ ...newQuotation, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
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
              {newQuotation.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>${item.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="mt-4" onClick={handleAddQuotation}>Create Quotation</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quotations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quotation ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell>{quotation.id}</TableCell>
                  <TableCell>{quotation.customerName}</TableCell>
                  <TableCell>{quotation.date}</TableCell>
                  <TableCell>{quotation.expiryDate}</TableCell>
                  <TableCell>{quotation.status}</TableCell>
                  <TableCell>${quotation.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

