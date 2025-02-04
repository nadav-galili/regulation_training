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
} from "recharts";

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
  },
  // Add more mock sessions...
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

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor training progress and performance
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Total Employees</h3>
            <p className="text-3xl font-bold">100</p>
            <p className="text-muted-foreground">Registered in system</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Completion Rate</h3>
            <p className="text-3xl font-bold">75%</p>
            <p className="text-muted-foreground">Average across all courses</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Pass Rate</h3>
            <p className="text-3xl font-bold">85%</p>
            <p className="text-muted-foreground">First attempt success</p>
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
        </div>

        {/* Recent Sessions Table */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Training Sessions</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Video</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Correct</TableHead>
                <TableHead>Wrong</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.employee}</TableCell>
                  <TableCell>{session.video}</TableCell>
                  <TableCell>{session.startTime}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>{session.correctAnswers}</TableCell>
                  <TableCell>{session.wrongAnswers}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        session.status === "Passed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
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
