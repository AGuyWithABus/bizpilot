'use client'

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Invoicing } from "@/components/sales/invoicing"
import { Quotations } from "@/components/sales/quotations"

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState("invoicing")

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Sales Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
          <TabsTrigger value="quotations">Quotations</TabsTrigger>
        </TabsList>
        <TabsContent value="invoicing">
          <Invoicing />
        </TabsContent>
        <TabsContent value="quotations">
          <Quotations />
        </TabsContent>
      </Tabs>
    </Layout>
  )
}

