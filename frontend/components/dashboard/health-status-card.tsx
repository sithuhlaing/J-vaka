import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { HealthRecord } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface HealthStatusCardProps {
  healthRecord: HealthRecord
}

export function HealthStatusCard({ healthRecord }: HealthStatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500"
      case "needs_attention":
        return "bg-yellow-500"
      case "high_risk":
        return "bg-red-500"
      case "overdue":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "healthy":
        return "default"
      case "needs_attention":
        return "secondary"
      case "high_risk":
        return "destructive"
      case "overdue":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div
            className={cn("w-4 h-4 rounded-full", getStatusColor(healthRecord.health_status))}
            aria-label="Health status indicator"
          />
          Health Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Badge variant={getStatusVariant(healthRecord.health_status)} className="capitalize">
            {healthRecord.health_status.replace("_", " ")}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Last checkup:</span>{" "}
            {new Date(healthRecord.last_checkup_date).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Next due:</span>{" "}
            {new Date(healthRecord.next_checkup_due).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Fitness for work:</span>{" "}
            <Badge variant="outline" className="capitalize">
              {healthRecord.fitness_for_work.replace("_", " ")}
            </Badge>
          </p>
        </div>

        {healthRecord.medical_conditions.length > 0 && (
          <div>
            <p className="font-medium text-sm mb-2">Medical Conditions:</p>
            <div className="space-y-1">
              {healthRecord.medical_conditions.map((condition, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {condition.condition} {condition.managed && "(Managed)"}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
