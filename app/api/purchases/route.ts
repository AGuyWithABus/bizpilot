import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { supplierId, amount, date, status } = body

  try {
    const newPurchase = db.purchases.add({ supplierId, amount, date, status })
    return NextResponse.json(newPurchase, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 })
  }
}

