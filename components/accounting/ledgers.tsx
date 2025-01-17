import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ledgerEntries = [
  { id: 1, date: '2023-06-01', description: 'Opening Balance', debit: 0, credit: 10000, balance: 10000 },
  { id: 2, date: '2023-06-05', description: 'Sales Revenue', debit: 5000, credit: 0, balance: 15000 },
  { id: 3, date: '2023-06-10', description: 'Utility Bill Payment', debit: 0, credit: 200, balance: 14800 },
]

export function Ledgers() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Ledgers</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="accounts-payable">Accounts Payable</SelectItem>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="expenses">Expenses</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Debit</TableHead>
            <TableHead className="text-right">Credit</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ledgerEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell className="text-right">${entry.debit.toLocaleString()}</TableCell>
              <TableCell className="text-right">${entry.credit.toLocaleString()}</TableCell>
              <TableCell className="text-right">${entry.balance.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

