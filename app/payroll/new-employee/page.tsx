'use client'

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewEmployeePage() {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [salary, setSalary] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/payroll/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, position, salary: parseFloat(salary) }),
    })
    if (response.ok) {
      router.push('/payroll')
    } else {
      // Handle error
      console.error('Failed to create employee')
    }
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-semibold mb-6">Add New Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="salary">Yearly Salary</Label>
            <Input id="salary" type="number" step="0.01" value={salary} onChange={(e) => setSalary(e.target.value)} required />
          </div>
          <Button type="submit">Add Employee</Button>
        </form>
      </div>
    </Layout>
  )
}

