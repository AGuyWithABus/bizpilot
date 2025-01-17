import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const transactions = [
  { id: 1, date: '2023-06-01', description: 'Deposit', amount: 5000, reconciled: false },
  { id: 2, date: '2023-06-02', description: 'Office Supplies', amount: -200, reconciled: false },
  { id: 3, date: '2023-06-05', description: 'Client Payment', amount: 3000, reconciled: false },
]

export function BankReconciliation() {
  const [bankBalance, setBankBalance] = useState('')
  const [reconciledTransactions, setReconciledTransactions] = useState(transactions)

  const handleReconcile = (id: number) => {
    setReconciledTransactions(reconciledTransactions.map(t => 
      t.id === id ? { ...t, reconciled: !t.reconciled } : t
    ))
  }

  const calculateDifference = () => {
    const totalReconciled = reconciledTransactions
      .filter(t => t.reconciled)
      .reduce((sum, t) => sum + t.amount, 0)
    return parseFloat(bankBalance) - totalReconciled
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Bank Reconciliation</h2>
        <div className="flex items-center gap-2">
          <Input 
            type="number" 
            placeholder="Enter bank balance" 
            value={bankBalance} 
            onChange={(e) => setBankBalance(e.target.value)}
            className="w-40"
          />
          <Button>Finalize Reconciliation</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Reconciled</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reconciledTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className="text-right">${Math.abs(transaction.amount).toLocaleString()}</TableCell>
              <TableCell>
                <input 
                  type="checkbox" 
                  checked={transaction.reconciled} 
                  onChange={() => handleReconcile(transaction.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {bankBalance && (
        <div className="mt-4 text-right">
          <p>Difference: ${calculateDifference().toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}

