import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, phone } = body

  try {
    const newContact = db.contacts.add({ name, email, phone })
    return NextResponse.json(newContact, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
  }
}

