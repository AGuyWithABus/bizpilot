import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ComplianceSecurity() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Compliance & Security</h2>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Ensures adherence to labor laws and payroll regulations.</p>
            <ul className="list-disc pl-5 mt-2">
              <li>FLSA Compliance</li>
              <li>State-specific Labor Laws</li>
              <li>GDPR (for EU employees)</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Protects sensitive employee data with encryption and secure practices.</p>
            <ul className="list-disc pl-5 mt-2">
              <li>256-bit AES Encryption</li>
              <li>Regular Security Audits</li>
              <li>Multi-Factor Authentication</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Audit Trails</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Logs of all payroll transactions for accountability.</p>
            <ul className="list-disc pl-5 mt-2">
              <li>User Action Logging</li>
              <li>Change History</li>
              <li>Exportable Audit Reports</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manages user permissions and access to sensitive information.</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Role-Based Access Control</li>
              <li>IP Whitelisting</li>
              <li>Session Management</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

