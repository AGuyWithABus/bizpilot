import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type PayStub = {
  id: number
  date: string
  grossPay: number
  deductions: number
  netPay: number
}

type TimeOffRequest = {
  id: number
  startDate: string
  endDate: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

const initialPayStubs: PayStub[] = [
  { id: 1, date: '2023-05-31', grossPay: 5000, deductions: 1000, netPay: 4000 },
  { id: 2, date: '2023-06-30', grossPay: 5000, deductions: 1000, netPay: 4000 },
]

const initialTimeOffRequests: TimeOffRequest[] = [
  { id: 1, startDate: '2023-07-01', endDate: '2023-07-05', status: 'Approved' },
  { id: 2, startDate: '2023-08-15', endDate: '2023-08-20', status: 'Pending' },
]

export function EmployeeSelfService() {
  const [payStubs] = useState<PayStub[]>(initialPayStubs)
  const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>(initialTimeOffRequests)
  const [newRequest, setNewRequest] = useState({ startDate: '', endDate: '' })

  const handleAddTimeOffRequest = () => {
    if (newRequest.startDate && newRequest.endDate) {
      setTimeOffRequests([...timeOffRequests, { 
        id: timeOffRequests.length + 1, 
        ...newRequest, 
        status: 'Pending' 
      }])
      setNewRequest({ startDate: '', endDate: '' })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Self-Service Portal</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="paystubs">
            <TabsList>
              <TabsTrigger value="paystubs">Pay Stubs</TabsTrigger>
              <TabsTrigger value="timeoff">Time Off Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="paystubs">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Gross Pay</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payStubs.map((stub) => (
                    <TableRow key={stub.id}>
                      <TableCell>{stub.date}</TableCell>
                      <TableCell>${stub.grossPay.toFixed(2)}</TableCell>
                      <TableCell>${stub.deductions.toFixed(2)}</TableCell>
                      <TableCell>${stub.netPay.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="timeoff">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newRequest.startDate}
                      onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newRequest.endDate}
                      onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddTimeOffRequest}>Submit Request</Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeOffRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.startDate}</TableCell>
                        <TableCell>{request.endDate}</TableCell>
                        <TableCell>{request.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

