import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, position, salary } = body

  try {
    const newEmployee = db.employees.add({ name, position, salary })
    return NextResponse.json(newEmployee, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 })
  }
}

