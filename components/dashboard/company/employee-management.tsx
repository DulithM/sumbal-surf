import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, MoreHorizontal, Mail, Phone, Calendar, DollarSign } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const employees = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    status: "Active",
    joinDate: "2024-01-15",
    totalSpent: "Rs. 10,200",
    lastOrder: "2 days ago",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@acme.com",
    status: "Active",
    joinDate: "2024-02-01",
    totalSpent: "Rs. 5,400",
    lastOrder: "1 week ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@acme.com",
    status: "Pending",
    joinDate: "2024-03-10",
    totalSpent: "Rs. 0",
    lastOrder: "Never",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@acme.com",
    status: "Active",
    joinDate: "2023-12-05",
    totalSpent: "Rs. 15,600",
    lastOrder: "Yesterday",
  },
]

export function EmployeeManagement() {
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Employee Management</h2>
          <p className="text-muted-foreground">Manage your team's dining benefits access</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Employee
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search employees..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                All (247)
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Active (235)
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Pending (12)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Overview of all employees with access to dining benefits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.status === "Active" ? "secondary" : "outline"}>{employee.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{employee.totalSpent}</TableCell>
                  <TableCell className="text-muted-foreground">{employee.lastOrder}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Invitation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DollarSign className="mr-2 h-4 w-4" />
                          View Spending
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove Access</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
          <CardDescription>Perform actions on multiple employees at once</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start bg-transparent">
              <Mail className="w-4 h-4 mr-2" />
              Send Bulk Invitations
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Reminders
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Phone className="w-4 h-4 mr-2" />
              Export Contact List
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
