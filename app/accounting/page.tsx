'use client'

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartOfAccounts } from "@/components/accounting/chart-of-accounts"
import { JournalEntries } from "@/components/accounting/journal-entries"
import { Ledgers } from "@/components/accounting/ledgers"
import { TaxManagement } from "@/components/accounting/tax-management"

export default function AccountingPage() {
  const [activeTab, setActiveTab] = useState("chart-of-accounts")

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Accounting</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="chart-of-accounts">Chart of Accounts</TabsTrigger>
          <TabsTrigger value="journal-entries">Journal Entries</TabsTrigger>
          <TabsTrigger value="ledgers">Ledgers</TabsTrigger>
          <TabsTrigger value="tax-management">Tax Management</TabsTrigger>
        </TabsList>
        <TabsContent value="chart-of-accounts">
          <ChartOfAccounts />
        </TabsContent>
        <TabsContent value="journal-entries">
          <JournalEntries />
        </TabsContent>
        <TabsContent value="ledgers">
          <Ledgers />
        </TabsContent>
        <TabsContent value="tax-management">
          <TaxManagement />
        </TabsContent>
      </Tabs>
    </Layout>
  )
}

