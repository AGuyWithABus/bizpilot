import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const journalEntries = [
  { id: 1, date: '2023-06-01', description: 'Office Rent Payment', debit: 1000, credit: 1000 },
  { id: 2, date: '2023-06-05', description: 'Sales Revenue', debit: 5000, credit: 5000 },
  { id: 3, date: '2023-06-10', description: 'Utility Bill Payment', debit: 200, credit: 200 },
]

export function JournalEntries() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Journal Entries</h2>
        <Button>New Entry</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Debit</TableHead>
            <TableHead className="text-right">Credit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {journalEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell className="text-right">${entry.debit.toLocaleString()}</TableCell>
              <TableCell className="text-right">${entry.credit.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

