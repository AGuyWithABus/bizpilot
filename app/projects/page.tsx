import { Layout } from "@/components/layout"
import { db, Project } from "@/lib/db"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = db.projects.getAll();

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <Link href="/projects/new">
            <Button>Add New Project</Button>
          </Link>
        </div>
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
                  <p className="text-gray-600 mb-1">Status: {project.status}</p>
                  <p className="text-gray-600">Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                  <p className="text-gray-600">End Date: {new Date(project.endDate).toLocaleDateString()}</p>
                </div>
                <Link href={`/projects/${project.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

