import { Layout } from "@/components/layout"
import { InventoryManagement } from "@/components/inventory/inventory-management"

export default function InventoryPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Inventory Management</h1>
      <InventoryManagement />
    </Layout>
  )
}

