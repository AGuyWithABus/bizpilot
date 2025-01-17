import { Layout } from "@/components/layout"
import { db, Contact } from "@/lib/db"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactsPage() {
  const contacts = db.contacts.getAll();

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Contacts</h1>
          <Link href="/contacts/new">
            <Button>Add New Contact</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <Card key={contact.id} className="p-6">
              <h2 className="text-lg font-semibold mb-2">{contact.name}</h2>
              <p className="text-gray-600 mb-1">{contact.email}</p>
              <p className="text-gray-600 mb-4">{contact.phone}</p>
              <div className="flex justify-end gap-2">
                <Link href={`/contacts/${contact.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Link href={`/contacts/${contact.id}/delete`}>
                  <Button variant="destructive">Delete</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

