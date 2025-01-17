'use client'

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTransactions } from "@/components/banking/bank-transactions"
import { BankReconciliation } from "@/components/banking/bank-reconciliation"

export default function BankingPage() {
  const [activeTab, setActiveTab] = useState("transactions")

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Banking</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <BankTransactions />
        </TabsContent>
        <TabsContent value="reconciliation">
          <BankReconciliation />
        </TabsContent>
      </Tabs>
    </Layout>
  )
}

