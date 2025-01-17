import { Layout } from "@/components/layout"
import { ProductManagement } from "@/components/products/product-management"

export default function ProductsPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Products and Services</h1>
      <ProductManagement />
    </Layout>
  )
}

