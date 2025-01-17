import { Layout } from "@/components/layout"
import { db, Purchase } from "@/lib/db"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PurchasesPage() {
  const purchases = db.purchases.getAll();

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Purchases</h1>
          <Link href="/purchases/new">
            <Button>Add New Purchase</Button>
          </Link>
        </div>
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <Card key={purchase.id} className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Purchase from {purchase.supplierId}</h2>
                  <p className="text-gray-600 mb-1">Amount: ${purchase.amount.toLocaleString()}</p>
                  <p className="text-gray-600">Date: {new Date(purchase.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  purchase.status === 'completed' ? 'bg-green-100 text-green-700' :
                  purchase.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {purchase.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

