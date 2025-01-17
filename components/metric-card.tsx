import { type LucideIcon } from 'lucide-react'
import { Card } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string
  icon: LucideIcon
  iconColor: string
}

export function MetricCard({ title, value, icon: Icon, iconColor }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </Card>
  )
}

