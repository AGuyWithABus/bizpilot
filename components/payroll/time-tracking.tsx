import { useState, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileDown, FileUp } from 'lucide-react'

type TimeEntry = {
  id: number
  employeeName: string
  date: string
  hoursWorked: number
  overtime: number
}

const initialTimeEntries: TimeEntry[] = [
  { id: 1, employeeName: "John Doe", date: "2023-06-01", hoursWorked: 8, overtime: 0 },
  { id: 2, employeeName: "Jane Smith", date: "2023-06-01", hoursWorked: 9, overtime: 1 },
]

export function TimeTracking() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(initialTimeEntries)
  const [newEntry, setNewEntry] = useState<Omit<TimeEntry, 'id'>>({
    employeeName: '',
    date: '',
    hoursWorked: 0,
    overtime: 0
  })

  const handleAddEntry = useCallback(() => {
    if (newEntry.employeeName && newEntry.date && newEntry.hoursWorked > 0) {
      setTimeEntries([...timeEntries, { ...newEntry, id: timeEntries.length + 1 }])
      setNewEntry({ employeeName: '', date: '', hoursWorked: 0, overtime: 0 })
    }
  }, [newEntry, timeEntries])

  const handleExport = useCallback(() => {
    // Implement export logic here
    console.log("Exporting time tracking data...")
  }, [])

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Implement import logic here
      console.log("Importing time tracking data:", file.name)
    }
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Time Tracking</h2>
        <div className="flex gap-2">
          <Button onClick={handleExport}>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Label htmlFor="import-time-tracking" className="cursor-pointer">
            <div className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <FileUp className="mr-2 h-4 w-4" />
              Import
            </div>
          </Label>
          <Input
            id="import-time-tracking"
            type="file"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="employeeName">Employee Name</Label>
          <Input
            id="employeeName"
            value={newEntry.employeeName}
            onChange={(e) => setNewEntry({ ...newEntry, employeeName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="hoursWorked">Hours Worked</Label>
          <Input
            id="hoursWorked"
            type="number"
            value={newEntry.hoursWorked}
            onChange={(e) => setNewEntry({ ...newEntry, hoursWorked: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="overtime">Overtime</Label>
          <Input
            id="overtime"
            type="number"
            value={newEntry.overtime}
            onChange={(e) => setNewEntry({ ...newEntry, overtime: parseFloat(e.target.value) })}
          />
        </div>
      </div>
      <Button 
        onClick={handleAddEntry}
        disabled={!newEntry.employeeName || !newEntry.date || newEntry.hoursWorked <= 0}
        className="mb-4"
      >
        Add Time Entry
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Hours Worked</TableHead>
            <TableHead>Overtime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.employeeName}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.hoursWorked}</TableCell>
              <TableCell>{entry.overtime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

