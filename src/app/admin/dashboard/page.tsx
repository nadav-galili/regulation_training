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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
// Install required components:
// pnpm dlx shadcn-ui@latest add select popover calendar
// pnpm add date-fns

// Mock data
const recentSessions = [
  {
    id: 1,
    employee: "ישראל ישראלי",
    video: "הדרכת חוק המזון",
    startTime: "2024-02-10 09:30",
    duration: "45 דקות",
    correctAnswers: 8,
    wrongAnswers: 2,
    status: "עבר",
    department: "מחלקת סחר",
  },
  {
    id: 2,
    employee: "מיכל מיכלי",
    video: "הדרכת בטיחות",
    startTime: "2024-02-10 10:15",
    duration: "30 דקות",
    correctAnswers: 5,
    wrongAnswers: 5,
    status: "עבר",
    department: "מחלקת מכירות",
  },
  {
    id: 3,
    employee: "אבי לוי",
    video: "הדרכת מלגזה",
    startTime: "2024-02-10 11:00",
    duration: "60 דקות",
    correctAnswers: 10,
    wrongAnswers: 0,
    status: "עבר",
    department: "מחלקת משאבי אנוש",
  },
  {
    id: 4,
    employee: "שרה וילינסון",
    video: "הדרכת בטיחות",
    startTime: "2024-02-10 13:45",
    duration: "40 דקות",
    correctAnswers: 9,
    wrongAnswers: 1,
    status: "נכשל",
    department: "מחלקת מכירות",
  },
  {
    id: 5,
    employee: "דוד כהן",
    video: "הדרכת בטיחות",
    startTime: "2024-02-10 14:30",
    duration: "55 דקות",
    correctAnswers: 4,
    wrongAnswers: 6,
    status: "נכשל",
    department: "מחלקת משאבי אנוש",
  },
  {
    id: 6,
    employee: "אלטה בן רחמים",
    video: "הדרכת בטיחות",
    startTime: "2024-02-10 15:15",
    duration: "35 דקות",
    correctAnswers: 7,
    wrongAnswers: 3,
    status: "עבר",
    department: "מחלקת מכירות",
  },
  {
    id: 7,
    employee: "אלטה בן רחמים",
    video: "הדרכת בטיחות",
    startTime: "2024-02-10 16:00",
    duration: "50 דקות",
    correctAnswers: 6,
    wrongAnswers: 4,
    status: "נכשל",
    department: "מחלקת מכירות",
  },
  {
    id: 8,
    employee: "מרים גארסיה",
    video: "הדרכת בטיחות",
    startTime: "2024-02-10 16:45",
    duration: "40 דקות",
    correctAnswers: 9,
    wrongAnswers: 1,
    status: "עבר",
    department: "מחלקת משאבי אנוש",
  },
];

const performanceData = [
  { name: "הדרכת חוק המזון", passed: 25, failed: 5 },
  { name: "הדרכת בטיחות", passed: 20, failed: 8 },
  { name: "הדרכת מלגזה", passed: 30, failed: 2 },
];

const completionStats = [
  { name: "הושלמו", value: 75, color: "#22c55e" },
  { name: "בתהליך", value: 15, color: "#eab308" },
  { name: "לא התחיל", value: 10, color: "#ef4444" },
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
  const [selectedStatus, setSelectedStatus] = useState<"all" | "עבר" | "נכשל">(
    "all"
  );

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
                פורטל המנהלים
              </h1>
              <p className="text-base text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                עקוב אחר התהליך והגבלת הדרכות של המשתמשים
              </p>
            </div>
            {/* home button */}
            <Link href="/">
              <Button variant="outline">
                <Home className="w-4 h-4" />
                דף הבית
              </Button>
            </Link>
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
                  <SelectItem value="all">כל המחלקות</SelectItem>
                  <SelectItem value="operations">מחלקת סחר</SelectItem>
                  <SelectItem value="sales">מחלקת מכירות</SelectItem>
                  <SelectItem value="hr">מחלקת משאבי אנוש</SelectItem>
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
                  סה״כ עובדים{" "}
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {currentStats.employees}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">משתמשים רשומים במערכת</p>
          </Card>

          <Card className="p-6 border-primary/10 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-muted-foreground">
                  שיעור ההשלמה
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {currentStats.completion}%
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">ממוצע בכל ההדרכות</p>
          </Card>

          <Card className="p-6 border-primary/10 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-muted-foreground">
                  מספר המבחנים שעברו
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {currentStats.pass}%
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">הצלחה בפעם הראשונה</p>
          </Card>

          <Card className="p-6 border-primary/10 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-muted-foreground">
                  מבחנים המתבצעים כעת{" "}
                </h3>
                <p className="text-3xl font-bold text-primary">
                  {currentStats.active}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">מבחנים בתהליך</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Performance by Course */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">ביצוע על פי הדרכה</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="passed" fill="#22c55e" name="עבר" />
                  <Bar dataKey="failed" fill="#ef4444" name="נכשל" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Daily Progress */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">טרנד השלמת מבחנים יומי</h3>
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
                    name="הדרכות שהושלמו"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Completion Status */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">סטטוס השלמת הדרכות</h3>
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
            <h3 className="font-semibold mb-4">ביצועי מחלקות</h3>
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
            <h3 className="font-semibold">הדרכות שהושלמו </h3>
            <Select
              defaultValue="all"
              onValueChange={(value: "all" | "עבר" | "נכשל") =>
                setSelectedStatus(value)
              }>
              <SelectTrigger className="w-[150px] border-primary/20">
                <CheckCheck className="w-4 h-4 mr-2 text-primary" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל המצבים</SelectItem>
                <SelectItem value="עבר">עבר</SelectItem>
                <SelectItem value="נכשל">נכשל</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>עובד</TableHead>
                <TableHead>מחלקה</TableHead>
                <TableHead>הדרכה</TableHead>
                <TableHead>שיעור התחיל</TableHead>
                <TableHead>משך השיעור</TableHead>
                <TableHead>תשובות נכונות</TableHead>
                <TableHead>תשובות שגויות</TableHead>
                <TableHead>מצב</TableHead>
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
                        session.status === "עבר"
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      )}>
                      {session.status === "עבר" ? (
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
