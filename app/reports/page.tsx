import { Layout } from "@/components/layout"
import { db } from "@/lib/db"
import { Card } from "@/components/ui/card"
import { SalesChart, CashFlowChart } from "@/components/charts"

export default function ReportsPage() {
  const sales = db.sales.getAll();
  const purchases = db.purchases.getAll();

  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalPurchases = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);
  const netProfit = totalSales - totalPurchases;

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-semibold mb-6">Financial Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
            <p className="text-2xl">${totalSales.toLocaleString()}</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Total Purchases</h2>
            <p className="text-2xl">${totalPurchases.toLocaleString()}</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Net Profit</h2>
            <p className="text-2xl">${netProfit.toLocaleString()}</p>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
            <SalesChart />
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Cash Flow</h2>
            <CashFlowChart />
          </Card>
        </div>
        {/* You can add more detailed reports or export options here */}
      </div>
    </Layout>
  )
}

