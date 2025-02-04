"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  Users,
  CheckCircle2,
  BarChart3,
  Activity,
  Filter,
  CheckCheck,
  AlertCircle,
  Bell,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Install required components:
// pnpm dlx shadcn-ui@latest add select popover calendar
// pnpm add date-fns

// Mock data
const recentSessions = [
  {
    id: 1,
    employee: "John Doe",
    video: "Safety Protocols 2024",
    startTime: "2024-02-10 09:30",
    duration: "45 mins",
    correctAnswers: 8,
    wrongAnswers: 2,
    status: "Passed",
    department: "Operations",
  },
  {
    id: 2,
    employee: "Jane Smith",
    video: "Emergency Procedures",
    startTime: "2024-02-10 10:15",
    duration: "30 mins",
    correctAnswers: 5,
    wrongAnswers: 5,
    status: "Failed",
    department: "Sales",
  },
  {
    id: 3,
    employee: "Mike Johnson",
    video: "Compliance Training",
    startTime: "2024-02-10 11:00",
    duration: "60 mins",
    correctAnswers: 10,
    wrongAnswers: 0,
    status: "Passed",
    department: "HR",
  },
  {
    id: 4,
    employee: "Sarah Williams",
    video: "Customer Service Basics",
    startTime: "2024-02-10 13:45",
    duration: "40 mins",
    correctAnswers: 9,
    wrongAnswers: 1,
    status: "Passed",
    department: "Sales",
  },
  {
    id: 5,
    employee: "David Chen",
    video: "Workplace Safety",
    startTime: "2024-02-10 14:30",
    duration: "55 mins",
    correctAnswers: 4,
    wrongAnswers: 6,
    status: "Failed",
    department: "Operations",
  },
  {
    id: 6,
    employee: "Emily Brown",
    video: "HR Policies 2024",
    startTime: "2024-02-10 15:15",
    duration: "35 mins",
    correctAnswers: 7,
    wrongAnswers: 3,
    status: "Passed",
    department: "HR",
  },
  {
    id: 7,
    employee: "Alex Turner",
    video: "Sales Techniques",
    startTime: "2024-02-10 16:00",
    duration: "50 mins",
    correctAnswers: 6,
    wrongAnswers: 4,
    status: "Failed",
    department: "Sales",
  },
  {
    id: 8,
    employee: "Maria Garcia",
    video: "Equipment Safety",
    startTime: "2024-02-10 16:45",
    duration: "40 mins",
    correctAnswers: 9,
    wrongAnswers: 1,
    status: "Passed",
    department: "Operations",
  },
];

const performanceData = [
  { name: "Safety Protocols", passed: 25, failed: 5 },
  { name: "Emergency Procedures", passed: 20, failed: 8 },
  { name: "Compliance Training", passed: 30, failed: 2 },
];

const completionStats = [
  { name: "Completed", value: 75, color: "#22c55e" },
  { name: "In Progress", value: 15, color: "#eab308" },
  { name: "Not Started", value: 10, color: "#ef4444" },
];

const dailyProgress = [
  { date: "02/01", completed: 5 },
  { date: "02/02", completed: 8 },
  { date: "02/03", completed: 12 },
  { date: "02/04", completed: 7 },
  { date: "02/05", completed: 15 },
];

// Add mock notifications data
const notifications = [
  {
    id: 1,
    title: "Training Completion Alert",
    message: "5 employees completed Safety Training this week",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    title: "Low Performance Warning",
    message: "3 employees failed Emergency Procedures test",
    time: "5 hours ago",
    unread: false,
  },
];

export default function AdminDashboard() {
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "Passed" | "Failed"
  >("all");

  // Filter data based on department
  const filteredSessions = recentSessions.filter(
    (session) =>
      (selectedDept === "all" || session.department === selectedDept) &&
      (selectedStatus === "all" || session.status === selectedStatus)
  );

  // Department stats
  const deptStats = {
    all: { employees: 100, completion: 75, pass: 85, active: 12 },
    operations: { employees: 45, completion: 80, pass: 88, active: 5 },
    sales: { employees: 30, completion: 70, pass: 82, active: 4 },
    hr: { employees: 25, completion: 75, pass: 85, active: 3 },
  };

  const currentStats = deptStats[selectedDept as keyof typeof deptStats];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-base text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Monitor training progress and performance
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="relative">
                  <div className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    {notifications.some((n) => n.unread) && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={cn(
                        "flex flex-col items-start gap-1 p-4",
                        notification.unread && "bg-primary/5"
                      )}>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {notification.title}
                        </span>
                        {notification.unread && (
                          <span className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Select defaultValue="all" onValueChange={setSelectedDept}>
                <SelectTrigger className="w-[180px] border-primary/20">
                  <Filter className="w-4 h-4 mr-2 text-primary" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="p-6 border-primary/10 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-muted-foreground">
                  Total Employees
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {currentStats.employees}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">Registered in system</p>
          </Card>

          <Card className="p-6 border-primary/10 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-muted-foreground">
                  Completion Rate
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {currentStats.completion}%
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">
              Average across all courses
            </p>
          </Card>

          <Card className="p-6 border-primary/10 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-muted-foreground">
                  Pass Rate
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {currentStats.pass}%
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">First attempt success</p>
          </Card>

          <Card className="p-6 border-primary/10 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-muted-foreground">
                  Active Sessions
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {currentStats.active}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">Currently in progress</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Performance by Course */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Performance by Course</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="passed" fill="#22c55e" name="Passed" />
                  <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Daily Progress */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Daily Completion Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#2563eb"
                    name="Completed Trainings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Completion Status */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Overall Completion Status</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={completionStats}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label>
                    {completionStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Department Performance */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Department Performance</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Operations", completed: 85 },
                    { name: "Sales", completed: 70 },
                    { name: "HR", completed: 90 },
                  ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#2563eb" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Sessions Table */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Recent Training Sessions</h3>
            <Select
              defaultValue="all"
              onValueChange={(value: "all" | "Passed" | "Failed") =>
                setSelectedStatus(value)
              }>
              <SelectTrigger className="w-[150px] border-primary/20">
                <CheckCheck className="w-4 h-4 mr-2 text-primary" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Passed">Passed</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Video</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Correct</TableHead>
                <TableHead>Wrong</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.employee}</TableCell>
                  <TableCell>{session.department}</TableCell>
                  <TableCell>{session.video}</TableCell>
                  <TableCell>{session.startTime}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>{session.correctAnswers}</TableCell>
                  <TableCell>{session.wrongAnswers}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit",
                        session.status === "Passed"
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      )}>
                      {session.status === "Passed" ? (
                        <CheckCheck className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {session.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}
