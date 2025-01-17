import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const accounts = [
  { id: '1000', name: 'Cash', type: 'Asset', balance: 10000 },
  { id: '2000', name: 'Accounts Payable', type: 'Liability', balance: 5000 },
  { id: '3000', name: 'Revenue', type: 'Income', balance: 20000 },
  { id: '4000', name: 'Expenses', type: 'Expense', balance: 15000 },
]

export function ChartOfAccounts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chart of Accounts</h2>
        <Button>Add Account</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account ID</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.id}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell className="text-right">${account.balance.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

