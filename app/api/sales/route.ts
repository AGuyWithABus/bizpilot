import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { customerId, amount, date, status } = body

  try {
    const newSale = db.sales.add({ customerId, amount, date, status })
    return NextResponse.json(newSale, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create sale' }, { status: 500 })
  }
}

