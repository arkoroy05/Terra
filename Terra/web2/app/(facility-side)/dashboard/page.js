"use client"

import { useState } from "react"
import {
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Clock,
  FileText,
  Filter,
  Home,
  Leaf,
  LogOut,
  MoreHorizontal,
  RefreshCw,
  Search,
  Settings,
  Users,
  XCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample data for demonstration
const requestsData = [
  {
    id: "REQ-001",
    username: "Sarah Johnson",
    email: "sarah.j@example.com",
    otp: "384291",
    location: "123 Green St, Eco City",
    wasteType: "computers",
    wasteTypeLabel: "Computers & Laptops",
    weight: "5.2",
    description: "Old Dell laptop (2015) and HP desktop with monitor",
    status: "pending",
    timestamp: "2025-03-24T09:30:00",
  },
  {
    id: "REQ-002",
    username: "Michael Chen",
    email: "m.chen@example.com",
    otp: "129384",
    location: "456 Sustainable Ave, Eco City",
    wasteType: "phones",
    wasteTypeLabel: "Mobile Phones",
    weight: "0.8",
    description: "3 old smartphones - iPhone 8, Samsung Galaxy S7, Google Pixel 2",
    status: "processing",
    timestamp: "2025-03-24T10:15:00",
  },
  {
    id: "REQ-003",
    username: "Emily Rodriguez",
    email: "e.rodriguez@example.com",
    otp: "573921",
    location: "789 Recycling Blvd, Green Valley",
    wasteType: "appliances",
    wasteTypeLabel: "Home Appliances",
    weight: "12.5",
    description: "Microwave oven and old coffee maker, both still working but outdated",
    status: "pending",
    timestamp: "2025-03-24T11:05:00",
  },
  {
    id: "REQ-004",
    username: "David Wilson",
    email: "d.wilson@example.com",
    otp: "628471",
    location: "321 Earth Way, Eco City",
    wasteType: "batteries",
    wasteTypeLabel: "Batteries",
    weight: "3.0",
    description: "Collection of various batteries from electronics and car battery",
    status: "pending",
    timestamp: "2025-03-24T11:30:00",
  },
  {
    id: "REQ-005",
    username: "Aisha Patel",
    email: "a.patel@example.com",
    otp: "194726",
    location: "567 Conservation St, Green Valley",
    wasteType: "peripherals",
    wasteTypeLabel: "Computer Peripherals",
    weight: "4.7",
    description: "2 old keyboards, 3 mice, and various cables and adapters",
    status: "completed",
    timestamp: "2025-03-24T08:45:00",
  },
  {
    id: "REQ-006",
    username: "James Thompson",
    email: "j.thompson@example.com",
    otp: "837261",
    location: "890 Sustainability Rd, Eco City",
    wasteType: "other",
    wasteTypeLabel: "Other Electronics",
    weight: "8.3",
    description: "Old stereo system with speakers and DVD player",
    status: "rejected",
    timestamp: "2025-03-24T09:10:00",
  },
]

export default function FacilityDashboard() {
  const [requests, setRequests] = useState(requestsData)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter requests based on status
  const filteredRequests = requests.filter((req) => {
    if (filterStatus === "all") return true
    return req.status === filterStatus
  })

  const pendingCount = requests.filter((req) => req.status === "pending").length
  const processingCount = requests.filter((req) => req.status === "processing").length
  const completedCount = requests.filter((req) => req.status === "completed").length

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(requests.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req)))
  }

  const viewRequestDetails = (request) => {
    setSelectedRequest(request)
    setIsDetailOpen(true)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-green-100">
        <div className="flex h-14 items-center border-b border-green-100 px-4">
          <div className="flex items-center gap-2 font-semibold text-green-800">
            <Leaf className="h-5 w-5 text-green-600" />
            <span>EcoRecycle Admin</span>
          </div>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-green-700">Dashboard</h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                <Home className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start bg-green-100 text-green-800 font-medium">
                <ClipboardList className="mr-2 h-4 w-4" />
                Incoming Requests
                <Badge className="ml-auto bg-green-600">{pendingCount}</Badge>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Processed Items
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-green-700">Management</h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                <Users className="mr-2 h-4 w-4" />
                Staff
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                <FileText className="mr-2 h-4 w-4" />
                Reports
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </nav>
        <div className="border-t border-green-100 p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-semibold">
              AF
            </div>
            <div>
              <div className="font-medium text-sm">Admin Facility</div>
              <div className="text-xs text-green-600">Eco City Center</div>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-green-700">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
       

        {/* Dashboard content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Pending Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">{pendingCount}</div>
                <p className="text-xs text-green-600">Awaiting processing</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">{processingCount}</div>
                <p className="text-xs text-green-600">Currently being processed</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Completed Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">{completedCount}</div>
                <p className="text-xs text-green-600">Successfully processed</p>
              </CardContent>
            </Card>
          </div>

          {/* Requests table */}
          <Card className="bg-white border-green-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-green-800">Incoming E-Waste Requests</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-[180px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-600" />
                    <Input
                      type="search"
                      placeholder="Search requests..."
                      className="pl-8 border-green-200 focus-visible:ring-green-500"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[130px] border-green-200 focus:ring-green-500">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-green-600" />
                        <SelectValue placeholder="Filter" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Requests</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-50 hover:bg-green-50">
                    <TableHead className="w-[100px]">Request ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="w-[100px]">OTP</TableHead>
                    <TableHead>Waste Type</TableHead>
                    <TableHead className="w-[100px]">Weight</TableHead>
                    <TableHead className="w-[120px]">Time</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="text-right w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-green-600">
                        No requests found matching the current filter.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-green-50">
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{request.username}</div>
                          <div className="text-xs text-green-600">{request.email}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded text-center">
                            {request.otp}
                          </div>
                        </TableCell>
                        <TableCell>{request.wasteTypeLabel}</TableCell>
                        <TableCell>{request.weight} kg</TableCell>
                        <TableCell>{formatDate(request.timestamp)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem onClick={() => viewRequestDetails(request)}>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {request.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleStatusChange(request.id, "processing")}>
                                  Start processing
                                </DropdownMenuItem>
                              )}
                              {request.status === "processing" && (
                                <DropdownMenuItem onClick={() => handleStatusChange(request.id, "completed")}>
                                  Mark as completed
                                </DropdownMenuItem>
                              )}
                              {(request.status === "pending" || request.status === "processing") && (
                                <DropdownMenuItem onClick={() => handleStatusChange(request.id, "rejected")}>
                                  Reject request
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Request details dialog */}
      {selectedRequest && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-green-800">Request Details - {selectedRequest.id}</DialogTitle>
              <DialogDescription>Complete information about the e-waste disposal request.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-green-700">User Information</h3>
                {getStatusBadge(selectedRequest.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-600 font-medium">Name</p>
                  <p>{selectedRequest.username}</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">Email</p>
                  <p>{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">Location</p>
                  <p>{selectedRequest.location}</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">OTP Code</p>
                  <p className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded text-center inline-block">
                    {selectedRequest.otp}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold text-green-700 mb-2">E-Waste Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-green-600 font-medium">Waste Type</p>
                    <p>{selectedRequest.wasteTypeLabel}</p>
                  </div>
                  <div>
                    <p className="text-green-600 font-medium">Weight</p>
                    <p>{selectedRequest.weight} kg</p>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <p className="text-green-600 font-medium">Description</p>
                  <p className="mt-1 p-2 bg-green-50 rounded">{selectedRequest.description}</p>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold text-green-700 mb-2">Request Timeline</h3>
                <div className="text-sm">
                  <p className="text-green-600 font-medium">Submitted</p>
                  <p>{new Date(selectedRequest.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {selectedRequest.status === "pending" && (
                <>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      handleStatusChange(selectedRequest.id, "processing")
                      setIsDetailOpen(false)
                    }}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Start Processing
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      handleStatusChange(selectedRequest.id, "rejected")
                      setIsDetailOpen(false)
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Request
                  </Button>
                </>
              )}

              {selectedRequest.status === "processing" && (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    handleStatusChange(selectedRequest.id, "completed")
                    setIsDetailOpen(false)
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
              )}

              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

