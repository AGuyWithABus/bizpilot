import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Customer = {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Acme Corp",
    email: "contact@acmecorp.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA"
  }
]

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, 'id'>>({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.email) {
      setCustomers([...customers, { ...newCustomer, id: customers.length + 1 }])
      setNewCustomer({ name: '', email: '', phone: '', address: '' })
    }
  }

  const handleUpdateCustomer = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? editingCustomer : c))
      setEditingCustomer(null)
    }
  }

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              />
            </div>
          </div>
          <Button className="mt-4" onClick={handleAddCustomer}>Add Customer</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="mr-2" onClick={() => setEditingCustomer(customer)}>
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Customer</DialogTitle>
                        </DialogHeader>
                        {editingCustomer && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="edit-name">Name</Label>
                              <Input
                                id="edit-name"
                                value={editingCustomer.name}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-email">Email</Label>
                              <Input
                                id="edit-email"
                                type="email"
                                value={editingCustomer.email}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-phone">Phone</Label>
                              <Input
                                id="edit-phone"
                                value={editingCustomer.phone}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-address">Address</Label>
                              <Input
                                id="edit-address"
                                value={editingCustomer.address}
                                onChange={(e) => setEditingCustomer({ ...editingCustomer, address: e.target.value })}
                              />
                            </div>
                          </div>
                        )}
                        <Button onClick={handleUpdateCustomer}>Update Customer</Button>
                      </DialogContent>
                    </Dialog>
                    <Button variant="destructive" onClick={() => handleDeleteCustomer(customer.id)}>
                      Delete
                    </Button>
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

