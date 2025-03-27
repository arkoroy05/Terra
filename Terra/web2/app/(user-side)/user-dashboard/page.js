"use client"

import { useState } from "react"
import {
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Filter,
  Home,
  Leaf,
  LogOut,
  MessageCircle,
  MoreHorizontal,
  Newspaper,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  User,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useRouter } from "next/navigation"

// Sample data for demonstration
const userDisposalsData = [
  {
    id: "DSP-001",
    facilityName: "EcoRecycle Center - Downtown",
    facilityAddress: "123 Green St, Eco City",
    date: "2025-03-28T10:30:00",
    wasteType: "computers",
    wasteTypeLabel: "Computers & Laptops",
    weight: "5.2",
    description: "Old Dell laptop (2015) and HP desktop with monitor",
    status: "scheduled",
    otp: "384291",
  },
  {
    id: "DSP-002",
    facilityName: "GreenTech Recycling - North",
    facilityAddress: "456 Sustainable Ave, Eco City",
    date: "2025-04-05T14:15:00",
    wasteType: "batteries",
    wasteTypeLabel: "Batteries",
    weight: "3.0",
    description: "Collection of various batteries from electronics",
    status: "scheduled",
    otp: "129384",
  },
  {
    id: "DSP-003",
    facilityName: "EcoRecycle Center - Westside",
    facilityAddress: "789 Recycling Blvd, Green Valley",
    date: "2025-03-26T09:00:00",
    wasteType: "phones",
    wasteTypeLabel: "Mobile Phones",
    weight: "0.8",
    description: "3 old smartphones - iPhone 8, Samsung Galaxy S7, Google Pixel 2",
    status: "scheduled",
    otp: "573921",
  },
  {
    id: "DSP-004",
    facilityName: "EcoRecycle Center - Downtown",
    facilityAddress: "123 Green St, Eco City",
    date: "2025-03-15T11:30:00",
    wasteType: "peripherals",
    wasteTypeLabel: "Computer Peripherals",
    weight: "4.7",
    description: "2 old keyboards, 3 mice, and various cables and adapters",
    status: "completed",
    otp: "628471",
  },
  {
    id: "DSP-005",
    facilityName: "GreenTech Recycling - South",
    facilityAddress: "567 Conservation St, Green Valley",
    date: "2025-03-10T13:45:00",
    wasteType: "appliances",
    wasteTypeLabel: "Home Appliances",
    weight: "12.5",
    description: "Microwave oven and old coffee maker",
    status: "completed",
    otp: "194726",
  },
]

const newsData = [
  {
    id: 1,
    title: "New E-Waste Recycling Center Opening",
    summary: "A new state-of-the-art recycling facility is opening next month in the eastern district.",
    date: "2025-03-20",
  },
  {
    id: 2,
    title: "Updated Regulations for Battery Disposal",
    summary: "New guidelines for battery recycling have been announced. Check the details before your next disposal.",
    date: "2025-03-18",
  },
  {
    id: 3,
    title: "E-Waste Awareness Week Coming Soon",
    summary: "Join us for workshops and events during E-Waste Awareness Week starting April 15.",
    date: "2025-03-15",
  },
]

// Sample chatbot messages
const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "👋 Hello! I'm EcoBot, your recycling assistant. How can I help you today?",
    time: "Just now",
  },
  {
    id: 2,
    sender: "bot",
    text: "You can ask me about recycling procedures, facility locations, or schedule a new disposal.",
    time: "Just now",
  },
]

export default function UserDashboard() {
  const router = useRouter()
  const [disposals, setDisposals] = useState(userDisposalsData)
  const [selectedDisposal, setSelectedDisposal] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  // Filter disposals based on status
  const filteredDisposals = disposals.filter((disp) => {
    if (filterStatus === "all") return true
    return disp.status === filterStatus
  })

  const upcomingCount = disposals.filter(
    (disp) => disp.status === "scheduled" && new Date(disp.date) > new Date(),
  ).length
  const completedCount = disposals.filter((disp) => disp.status === "completed").length

  const viewDisposalDetails = (disposal) => {
    setSelectedDisposal(disposal)
    setIsDetailOpen(true)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const disposalHistory = () => {
    router.push("/user-dashboard/history")
  }

  const Myimpact = () => {
    router.push("/user-dashboard/user-impact")
  }

  const disposalPage = () => {
    router.push("/waste-analyze")
  }
  const sendMessage = () => {
    if (!newMessage.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      time: "Just now",
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: "bot",
        text: "Thank you for your message. Our team will help you with your recycling needs. Is there anything specific you'd like to know about e-waste disposal?",
        time: "Just now",
      }

      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-green-100">
        <div className="flex h-14 items-center border-b border-green-100 px-4">
          <div className="flex items-center gap-2 font-semibold text-green-800">
            <Leaf className="h-5 w-5 text-green-600" />
            <span>EcoRecycle Portal</span>
          </div>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-green-700">My Dashboard</h2>
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
                My Disposals
                <Badge className="ml-auto bg-green-600">{upcomingCount}</Badge>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 hover:bg-green-100 hover:text-green-800"
                onClick={() => disposalHistory()}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Disposal History
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 hover:bg-green-100 hover:text-green-800"
                onClick={() => Myimpact()}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                My Impact
              </Button>
            </div>
          </div>

          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-green-700">Latest News</h2>
            <div className="space-y-3">
              {newsData.map((news) => (
                <Card key={news.id} className="bg-white border-green-100">
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium text-green-800">{news.title}</h3>
                    <p className="text-xs text-green-600 mt-1">{news.summary}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-green-500">{news.date}</span>
                      <Button variant="link" className="h-auto p-0 text-xs text-green-700">
                        Read more
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full text-green-700 border-green-200">
                <Newspaper className="mr-2 h-4 w-4" />
                View All News
              </Button>
            </div>
          </div>

          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-green-700">Account</h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
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
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
              <AvatarFallback className="bg-green-100 text-green-800">JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">John Doe</div>
              <div className="text-xs text-green-600">john.doe@example.com</div>
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
        <header className="flex h-14 items-center gap-4 border-b border-green-100 bg-white px-4 sm:px-6">
          <Button variant="outline" size="icon" className="md:hidden">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-green-800">My Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="text-green-700">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </Button>
            <Button variant="outline" size="icon" className="text-green-700">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon" className="text-green-700">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Calendar</span>
            </Button>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Upcoming Disposals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">{upcomingCount}</div>
                <p className="text-xs text-green-600">Scheduled for recycling</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Completed Disposals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">{completedCount}</div>
                <p className="text-xs text-green-600">Successfully recycled</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">42 kg</div>
                <p className="text-xs text-green-600">CO₂ emissions saved</p>
              </CardContent>
            </Card>
          </div>

          {/* Disposals table */}
          <Card className="bg-white border-green-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-green-800">My E-Waste Disposals</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-[180px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-600" />
                    <Input
                      type="search"
                      placeholder="Search disposals..."
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
                      <SelectItem value="all">All Disposals</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={disposalPage}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Disposal
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-50 hover:bg-green-50">
                    <TableHead className="w-[100px]">Disposal ID</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead className="w-[180px]">Date & Time</TableHead>
                    <TableHead>Waste Type</TableHead>
                    <TableHead className="w-[100px]">Weight</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="text-right w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDisposals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-green-600">
                        No disposals found matching the current filter.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDisposals.map((disposal) => (
                      <TableRow key={disposal.id} className="hover:bg-green-50">
                        <TableCell className="font-medium">{disposal.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{disposal.facilityName}</div>
                          <div className="text-xs text-green-600">{disposal.facilityAddress}</div>
                        </TableCell>
                        <TableCell>{formatDate(disposal.date)}</TableCell>
                        <TableCell>{disposal.wasteTypeLabel}</TableCell>
                        <TableCell>{disposal.weight} kg</TableCell>
                        <TableCell>{getStatusBadge(disposal.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem onClick={() => viewDisposalDetails(disposal)}>
                                View details
                              </DropdownMenuItem>
                              {disposal.status === "scheduled" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                                </>
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

      {/* Disposal details dialog */}
      {selectedDisposal && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-green-800">Disposal Details - {selectedDisposal.id}</DialogTitle>
              <DialogDescription>Complete information about your e-waste disposal appointment.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-green-700">Appointment Information</h3>
                {getStatusBadge(selectedDisposal.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-600 font-medium">Facility</p>
                  <p>{selectedDisposal.facilityName}</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">Address</p>
                  <p>{selectedDisposal.facilityAddress}</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">Date & Time</p>
                  <p>{new Date(selectedDisposal.date).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">OTP Code</p>
                  <p className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded text-center inline-block">
                    {selectedDisposal.otp}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold text-green-700 mb-2">E-Waste Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-green-600 font-medium">Waste Type</p>
                    <p>{selectedDisposal.wasteTypeLabel}</p>
                  </div>
                  <div>
                    <p className="text-green-600 font-medium">Weight</p>
                    <p>{selectedDisposal.weight} kg</p>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <p className="text-green-600 font-medium">Description</p>
                  <p className="mt-1 p-2 bg-green-50 rounded">{selectedDisposal.description}</p>
                </div>
              </div>

              {selectedDisposal.status === "scheduled" && (
                <div className="mt-2 p-3 bg-blue-50 rounded border border-blue-100 text-sm text-blue-800">
                  <p className="font-medium">Important:</p>
                  <p>Please arrive at the facility on time and present your OTP code to the staff for verification.</p>
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {selectedDisposal.status === "scheduled" && (
                <>
                  <Button variant="outline" className="border-green-200 text-green-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    Reschedule
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    <X className="mr-2 h-4 w-4" />
                    Cancel Disposal
                  </Button>
                </>
              )}

              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Chatbot button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat</span>
      </Button>

      {/* Chatbot dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 gap-0 overflow-hidden">
          <DialogHeader className="bg-green-600 text-white p-4">
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              EcoBot Assistant
            </DialogTitle>
            <DialogDescription className="text-green-100">Ask me anything about e-waste recycling</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-3">
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage()
                }}
              >
                <Input
                  placeholder="Type your message..."
                  className="flex-1 border-green-200 focus-visible:ring-green-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700 text-white">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

