import { useState, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, FileDown, FileUp, Eye, Pencil, Trash, FileText, History } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from 'date-fns'

type Employee = {
  id: number
  name: string
  jobTitle: string
  email: string
  classification: string
}

const initialEmployees: Employee[] = [
  { id: 1, name: "John Doe", jobTitle: "Software Engineer", email: "john@example.com", classification: "Full-time" },
  { id: 2, name: "Jane Smith", jobTitle: "Project Manager", email: "jane@example.com", classification: "Full-time" },
  { id: 3, name: "Bob Johnson", jobTitle: "Designer", email: "bob@example.com", classification: "Contractor" },
]

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    name: '',
    jobTitle: '',
    email: '',
    classification: 'Full-time'
  })
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null)
  const [isPayslipDialogOpen, setIsPayslipDialogOpen] = useState(false)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleAddEmployee = useCallback(() => {
    if (newEmployee.name && newEmployee.jobTitle && newEmployee.email) {
      setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }])
      setNewEmployee({ name: '', jobTitle: '', email: '', classification: 'Full-time' })
      setIsAddDialogOpen(false)
    }
  }, [employees, newEmployee])

  const handleEditEmployee = useCallback(() => {
    if (editingEmployee && editingEmployee.name && editingEmployee.jobTitle && editingEmployee.email) {
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? editingEmployee : emp))
      setEditingEmployee(null)
      setIsEditDialogOpen(false)
    }
  }, [employees, editingEmployee])

  const handleDeleteEmployee = useCallback(() => {
    if (employeeToDelete) {
      setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id))
      setEmployeeToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }, [employees, employeeToDelete])

  const handleExportToPDF = useCallback(() => {
    // Implement PDF export logic here
    console.log("Exporting to PDF...")
  }, [])

  const handleImportFromCSV = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Implement CSV import logic here
      console.log("Importing from CSV:", file.name)
    }
  }, [])

  const handleViewEmployee = useCallback((employee: Employee) => {
    setSelectedEmployee(employee)
    setIsViewDialogOpen(true)
  }, [])

  const handleViewPayslip = useCallback((employee: Employee) => {
    setSelectedEmployee(employee)
    setIsPayslipDialogOpen(true)
  }, [])

  const handleViewSalaryHistory = useCallback((employee: Employee) => {
    setSelectedEmployee(employee)
    setIsHistoryDialogOpen(true)
  }, [])

  const handleDownloadPayslip = useCallback(() => {
    // Implement payslip download logic here
    console.log("Downloading payslip...")
  }, [])

  const handleDownloadSalaryHistory = useCallback(() => {
    // Implement salary history download logic here
    console.log("Downloading salary history...")
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Employee Database</h2>
        <div className="flex gap-2">
          <Button onClick={handleExportToPDF}>
            <FileDown className="mr-2 h-4 w-4" />
            Export to PDF
          </Button>
          <Label htmlFor="csv-upload" className="cursor-pointer">
            <div className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <FileUp className="mr-2 h-4 w-4" />
              Import CSV
            </div>
          </Label>
          <Input
            id="csv-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleImportFromCSV}
          />
        </div>
      </div>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Employee</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={newEmployee.jobTitle}
                onChange={(e) => setNewEmployee({ ...newEmployee, jobTitle: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="classification">Classification</Label>
              <Select
                value={newEmployee.classification}
                onValueChange={(value) => setNewEmployee({ ...newEmployee, classification: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select classification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contractor">Contractor</SelectItem>
                  <SelectItem value="Freelancer">Freelancer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddEmployee} disabled={!newEmployee.name || !newEmployee.jobTitle || !newEmployee.email}>Add Employee</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          {editingEmployee && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingEmployee.name}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-jobTitle">Job Title</Label>
                <Input
                  id="edit-jobTitle"
                  value={editingEmployee.jobTitle}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, jobTitle: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingEmployee.email}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-classification">Classification</Label>
                <Select
                  value={editingEmployee.classification}
                  onValueChange={(value) => setEditingEmployee({ ...editingEmployee, classification: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select classification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contractor">Contractor</SelectItem>
                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleEditEmployee} disabled={!editingEmployee.name || !editingEmployee.jobTitle || !editingEmployee.email}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Employee</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <p>{selectedEmployee.name}</p>
              </div>
              <div>
                <Label>Job Title</Label>
                <p>{selectedEmployee.jobTitle}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p>{selectedEmployee.email}</p>
              </div>
              <div>
                <Label>Classification</Label>
                <p>{selectedEmployee.classification}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this employee? This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteEmployee}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isPayslipDialogOpen} onOpenChange={setIsPayslipDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Payslip</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div>
                <Label>Employee</Label>
                <p>{selectedEmployee.name}</p>
              </div>
              {/* Add more payslip details here */}
              <Button onClick={handleDownloadPayslip}>Download Payslip</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salary Payment History</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div>
                <Label>Employee</Label>
                <p>{selectedEmployee.name}</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              {/* Add salary history table here */}
              <Button onClick={handleDownloadSalaryHistory}>Download Report</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Classification</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.jobTitle}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.classification}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewEmployee(employee)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View employee
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setEditingEmployee(employee)
                      setIsEditDialogOpen(true)
                    }}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit employee
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewPayslip(employee)}>
                      <FileText className="mr-2 h-4 w-4" />
                      View payslip
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewSalaryHistory(employee)}>
                      <History className="mr-2 h-4 w-4" />
                      Salary history
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      setEmployeeToDelete(employee)
                      setIsDeleteDialogOpen(true)
                    }}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete employee
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

