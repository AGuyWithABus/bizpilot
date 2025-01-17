import { useState, useCallback, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Employee = {
  id: number
  name: string
  jobTitle: string
  email: string
}

type Modification = {
  id: number
  employeeId: number
  type: 'deduction' | 'allowance' | 'income'
  name: string
  amount: number
}

const initialEmployees: Employee[] = [
  { id: 1, name: "John Doe", jobTitle: "Software Engineer", email: "john@example.com" },
  { id: 2, name: "Jane Smith", jobTitle: "Project Manager", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", jobTitle: "Designer", email: "bob@example.com" },
]

const initialModifications: Modification[] = [
  { id: 1, employeeId: 1, type: 'income', name: 'Salary', amount: 5000 },
  { id: 2, employeeId: 1, type: 'deduction', name: 'Income Tax', amount: 1000 },
  { id: 3, employeeId: 2, type: 'allowance', name: 'Housing Allowance', amount: 500 },
]

export function EmployeeModifications() {
  const [employees] = useState<Employee[]>(initialEmployees)
  const [modifications, setModifications] = useState<Modification[]>(initialModifications)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [newModification, setNewModification] = useState<Omit<Modification, 'id' | 'employeeId'>>({
    type: 'income',
    name: '',
    amount: 0
  })
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toString().includes(searchTerm)
    )
  }, [employees, searchTerm])

  const handleAddModification = useCallback(() => {
    if (selectedEmployee && newModification.name && newModification.amount > 0) {
      setModifications([...modifications, {
        ...newModification,
        id: modifications.length + 1,
        employeeId: selectedEmployee.id
      }])
      setNewModification({ type: 'income', name: '', amount: 0 })
    }
  }, [selectedEmployee, newModification, modifications])

  const filteredModifications = useMemo(() => 
    selectedEmployee
      ? modifications.filter(mod => mod.employeeId === selectedEmployee.id)
      : [],
    [selectedEmployee, modifications]
  )

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Employee Modifications</h2>
      <div className="mb-4">
        <Label htmlFor="employeeSearch">Search Employee</Label>
        <Input
          id="employeeSearch"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredEmployees.length > 0 && (
        <div className="mb-4">
          <Label>Select Employee</Label>
          <Select onValueChange={(value) => setSelectedEmployee(employees.find(e => e.id.toString() === value) || null)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an employee" />
            </SelectTrigger>
            <SelectContent>
              {filteredEmployees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id.toString()}>{employee.name} (ID: {employee.id})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {selectedEmployee && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={newModification.type}
                onValueChange={(value: 'deduction' | 'allowance' | 'income') => setNewModification({ ...newModification, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="deduction">Deduction</SelectItem>
                  <SelectItem value="allowance">Allowance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newModification.name}
                onChange={(e) => setNewModification({ ...newModification, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={newModification.amount}
                onChange={(e) => setNewModification({ ...newModification, amount: parseFloat(e.target.value) })}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddModification} disabled={!newModification.name || newModification.amount <= 0}>Add Modification</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModifications.map((mod) => (
                <TableRow key={mod.id}>
                  <TableCell>{mod.type}</TableCell>
                  <TableCell>{mod.name}</TableCell>
                  <TableCell>${mod.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  )
}

