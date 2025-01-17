import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const taxRecords = [
  { id: 1, period: 'Q2 2023', type: 'Sales Tax', amount: 2500, status: 'Paid' },
  { id: 2, period: 'Q2 2023', type: 'Income Tax', amount: 5000, status: 'Due' },
  { id: 3, period: 'Q1 2023', type: 'Payroll Tax', amount: 3000, status: 'Paid' },
]

export function TaxManagement() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tax Management</h2>
        <Button>Add Tax Record</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Tax Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taxRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.period}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell className="text-right">${record.amount.toLocaleString()}</TableCell>
              <TableCell>{record.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

