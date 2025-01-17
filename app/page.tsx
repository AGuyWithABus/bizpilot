import Link from 'next/link'
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Cmple Books</h1>
          <p className="text-xl text-muted-foreground">Simplify your financial management with our comprehensive accounting solution</p>
        </header>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Streamline Your Finances</h2>
            <p className="text-lg mb-4">Cmple Books offers a powerful yet intuitive platform for managing your business finances. From invoicing to expense tracking, we've got you covered.</p>
            <Button asChild size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img src="/placeholder.svg?height=300&width=500" alt="Cmple Books Dashboard" className="w-full h-auto" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Easy Invoicing</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Create and send professional invoices in minutes. Track payments and send reminders automatically.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expense Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Easily categorize and monitor your expenses. Generate reports to understand your spending patterns.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Financial Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Access real-time financial reports including profit & loss statements, balance sheets, and cash flow statements.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Ready to simplify your accounting?</h2>
          <p className="text-lg mb-6">Join thousands of businesses already using Cmple Books to manage their finances.</p>
          <Button asChild size="lg">
            <Link href="/signup">Sign Up Now</Link>
          </Button>
        </section>

        <section className="bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>Small Business Owner</CardDescription>
              </CardHeader>
              <CardContent>
                <p>"Cmple Books has revolutionized how I manage my business finances. It's intuitive, powerful, and saves me hours every week!"</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Jane Smith</CardTitle>
                <CardDescription>Freelance Designer</CardDescription>
              </CardHeader>
              <CardContent>
                <p>"As a freelancer, keeping track of my finances was always a challenge. Cmple Books makes it effortless and helps me stay on top of my cash flow."</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  )
}

