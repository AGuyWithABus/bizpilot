import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const transactions = [
  { id: 1, date: '2023-06-01', description: 'Deposit', amount: 5000, type: 'Credit' },
  { id: 2, date: '2023-06-02', description: 'Office Supplies', amount: 200, type: 'Debit' },
  { id: 3, date: '2023-06-05', description: 'Client Payment', amount: 3000, type: 'Credit' },
]

export function BankTransactions() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Bank Transactions</h2>
        <Button>Add Transaction</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className="text-right">${transaction.amount.toLocaleString()}</TableCell>
              <TableCell>{transaction.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

