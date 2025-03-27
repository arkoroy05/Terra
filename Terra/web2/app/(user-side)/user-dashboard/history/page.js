"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, Download, FileText, Search, SlidersHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { useRouter } from "next/navigation"

// Sample data for demonstration
const disposalHistoryData = [
  {
    id: "DSP-001",
    facilityName: "EcoRecycle Center - Downtown",
    date: "2025-03-15T10:30:00",
    wasteType: "computers",
    wasteTypeLabel: "Computers & Laptops",
    weight: "5.2",
    status: "completed",
    carbonSaved: 12.5,
    certificate: true,
  },
  {
    id: "DSP-002",
    facilityName: "GreenTech Recycling - North",
    date: "2025-02-28T14:15:00",
    wasteType: "batteries",
    wasteTypeLabel: "Batteries",
    weight: "3.0",
    status: "completed",
    carbonSaved: 7.2,
    certificate: true,
  },
  {
    id: "DSP-003",
    facilityName: "EcoRecycle Center - Westside",
    date: "2025-02-10T09:00:00",
    wasteType: "phones",
    wasteTypeLabel: "Mobile Phones",
    weight: "0.8",
    status: "completed",
    carbonSaved: 1.9,
    certificate: true,
  },
  {
    id: "DSP-004",
    facilityName: "EcoRecycle Center - Downtown",
    date: "2025-01-22T11:30:00",
    wasteType: "peripherals",
    wasteTypeLabel: "Computer Peripherals",
    weight: "4.7",
    status: "completed",
    carbonSaved: 11.3,
    certificate: true,
  },
  {
    id: "DSP-005",
    facilityName: "GreenTech Recycling - South",
    date: "2025-01-10T13:45:00",
    wasteType: "appliances",
    wasteTypeLabel: "Home Appliances",
    weight: "12.5",
    status: "completed",
    carbonSaved: 30.0,
    certificate: true,
  },
  {
    id: "DSP-006",
    facilityName: "EcoRecycle Center - Downtown",
    date: "2024-12-18T15:30:00",
    wasteType: "other",
    wasteTypeLabel: "Other Electronics",
    weight: "8.3",
    status: "completed",
    carbonSaved: 19.9,
    certificate: true,
  },
  {
    id: "DSP-007",
    facilityName: "GreenTech Recycling - North",
    date: "2024-12-05T10:00:00",
    wasteType: "computers",
    wasteTypeLabel: "Computers & Laptops",
    weight: "6.1",
    status: "completed",
    carbonSaved: 14.6,
    certificate: true,
  },
  {
    id: "DSP-008",
    facilityName: "EcoRecycle Center - Westside",
    date: "2024-11-20T09:30:00",
    wasteType: "phones",
    wasteTypeLabel: "Mobile Phones",
    weight: "1.2",
    status: "completed",
    carbonSaved: 2.9,
    certificate: true,
  },
  {
    id: "DSP-009",
    facilityName: "EcoRecycle Center - Downtown",
    date: "2024-11-08T14:00:00",
    wasteType: "batteries",
    wasteTypeLabel: "Batteries",
    weight: "2.5",
    status: "completed",
    carbonSaved: 6.0,
    certificate: true,
  },
  {
    id: "DSP-010",
    facilityName: "GreenTech Recycling - South",
    date: "2024-10-25T11:15:00",
    wasteType: "appliances",
    wasteTypeLabel: "Home Appliances",
    weight: "9.8",
    status: "completed",
    carbonSaved: 23.5,
    certificate: false,
  },
]

// Monthly data for charts
const monthlyData = [
  { month: "Oct", weight: 9.8, items: 1, carbonSaved: 23.5 },
  { month: "Nov", weight: 3.7, items: 2, carbonSaved: 8.9 },
  { month: "Dec", weight: 14.4, items: 2, carbonSaved: 34.5 },
  { month: "Jan", weight: 17.2, items: 2, carbonSaved: 41.3 },
  { month: "Feb", weight: 3.8, items: 2, carbonSaved: 9.1 },
  { month: "Mar", weight: 5.2, items: 1, carbonSaved: 12.5 },
]

// Waste type data for pie chart
const wasteTypeData = [
  { name: "Computers", value: 11.3 },
  { name: "Phones", value: 2.0 },
  { name: "Batteries", value: 5.5 },
  { name: "Appliances", value: 22.3 },
  { name: "Peripherals", value: 4.7 },
  { name: "Other", value: 8.3 },
]

// Colors for pie chart
const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0", "#dcfce7"]

export default function DisposalHistory() {
  const router=useRouter();
  const [disposals, setDisposals] = useState(disposalHistoryData)
  const [selectedYear, setSelectedYear] = useState("2025")
  const [selectedWasteType, setSelectedWasteType] = useState("all")
  const [selectedFacility, setSelectedFacility] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedDisposal, setSelectedDisposal] = useState(null)

  // Calculate total statistics
  const totalWeight = disposals.reduce((sum, item) => sum + Number.parseFloat(item.weight), 0).toFixed(1)
  const totalItems = disposals.length
  const totalCarbonSaved = disposals.reduce((sum, item) => sum + item.carbonSaved, 0).toFixed(1)

  // Filter disposals based on selected filters
  const filteredDisposals = disposals.filter((disp) => {
    const matchesYear = selectedYear === "all" || new Date(disp.date).getFullYear().toString() === selectedYear
    const matchesWasteType = selectedWasteType === "all" || disp.wasteType === selectedWasteType
    const matchesFacility = selectedFacility === "all" || disp.facilityName.includes(selectedFacility)
    return matchesYear && matchesWasteType && matchesFacility
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredDisposals.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredDisposals.length / itemsPerPage)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const viewDisposalDetails = (disposal) => {
    setSelectedDisposal(disposal)
    setIsDetailOpen(true)
  }

  const redirectToDashboard = () => {
    router.push("/user-dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <header className="bg-white border-b border-green-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-green-700" onClick={() => redirectToDashboard()}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-green-800">Disposal History</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-green-700 border-green-200">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="bg-white border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Items Recycled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{totalItems}</div>
              <p className="text-xs text-green-600">Electronic devices properly disposed</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Weight</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{totalWeight} kg</div>
              <p className="text-xs text-green-600">Of e-waste recycled</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Carbon Footprint Reduced</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{totalCarbonSaved} kg</div>
              <p className="text-xs text-green-600">CO₂ emissions saved</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="bg-white border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Monthly Recycling Activity</CardTitle>
              <CardDescription>Weight of e-waste recycled over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2f1" />
                    <XAxis dataKey="month" stroke="#047857" />
                    <YAxis stroke="#047857" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1fae5",
                        borderRadius: "6px",
                      }}
                    />
                    <Area type="monotone" dataKey="weight" stroke="#16a34a" fill="#dcfce7" name="Weight (kg)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Waste Type Distribution</CardTitle>
              <CardDescription>Breakdown of recycled items by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={wasteTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {wasteTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} kg`, "Weight"]}
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1fae5",
                        borderRadius: "6px",
                      }}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and table */}
        <Card className="bg-white border-green-100">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-lg font-semibold text-green-800">Disposal Records</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-[180px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-600" />
                  <Input
                    type="search"
                    placeholder="Search records..."
                    className="pl-8 border-green-200 focus-visible:ring-green-500"
                  />
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="border-green-200 text-green-700">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[220px] p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="year" className="text-green-700">
                          Year
                        </Label>
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                          <SelectTrigger id="year" className="border-green-200 focus:ring-green-500">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Years</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="waste-type" className="text-green-700">
                          Waste Type
                        </Label>
                        <Select value={selectedWasteType} onValueChange={setSelectedWasteType}>
                          <SelectTrigger id="waste-type" className="border-green-200 focus:ring-green-500">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="computers">Computers & Laptops</SelectItem>
                            <SelectItem value="phones">Mobile Phones</SelectItem>
                            <SelectItem value="batteries">Batteries</SelectItem>
                            <SelectItem value="appliances">Home Appliances</SelectItem>
                            <SelectItem value="peripherals">Computer Peripherals</SelectItem>
                            <SelectItem value="other">Other Electronics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="facility" className="text-green-700">
                          Facility
                        </Label>
                        <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                          <SelectTrigger id="facility" className="border-green-200 focus:ring-green-500">
                            <SelectValue placeholder="Select facility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Facilities</SelectItem>
                            <SelectItem value="Downtown">EcoRecycle - Downtown</SelectItem>
                            <SelectItem value="Westside">EcoRecycle - Westside</SelectItem>
                            <SelectItem value="North">GreenTech - North</SelectItem>
                            <SelectItem value="South">GreenTech - South</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          setSelectedYear("all")
                          setSelectedWasteType("all")
                          setSelectedFacility("all")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-green-50 hover:bg-green-50">
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead className="w-[180px]">Date</TableHead>
                  <TableHead>Waste Type</TableHead>
                  <TableHead className="w-[100px]">Weight</TableHead>
                  <TableHead className="w-[120px]">Carbon Saved</TableHead>
                  <TableHead className="w-[100px]">Certificate</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-green-600">
                      No disposal records found matching the current filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentItems.map((disposal) => (
                    <TableRow key={disposal.id} className="hover:bg-green-50">
                      <TableCell className="font-medium">{disposal.id}</TableCell>
                      <TableCell>{disposal.facilityName}</TableCell>
                      <TableCell>{formatDate(disposal.date)}</TableCell>
                      <TableCell>{disposal.wasteTypeLabel}</TableCell>
                      <TableCell>{disposal.weight} kg</TableCell>
                      <TableCell>{disposal.carbonSaved.toFixed(1)} kg</TableCell>
                      <TableCell>
                        {disposal.certificate ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem onClick={() => viewDisposalDetails(disposal)}>
                              View details
                            </DropdownMenuItem>
                            {disposal.certificate && <DropdownMenuItem>Download certificate</DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-green-700">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredDisposals.length)} of{" "}
                  {filteredDisposals.length} items
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-green-700 border-green-200"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      className={`h-8 w-8 ${
                        currentPage === page
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "text-green-700 border-green-200"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-green-700 border-green-200"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Disposal details dialog */}
      {selectedDisposal && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-green-800">Disposal Record - {selectedDisposal.id}</DialogTitle>
              <DialogDescription>Complete information about your past e-waste disposal.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-green-700">Disposal Information</h3>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-600 font-medium">Facility</p>
                  <p>{selectedDisposal.facilityName}</p>
                </div>
                <div>
                  <p className="text-green-600 font-medium">Date & Time</p>
                  <p>{formatDate(selectedDisposal.date)}</p>
                </div>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold text-green-700 mb-2">E-Waste Details</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-green-600 font-medium">Waste Type</p>
                    <p>{selectedDisposal.wasteTypeLabel}</p>
                  </div>
                  <div>
                    <p className="text-green-600 font-medium">Weight</p>
                    <p>{selectedDisposal.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-green-600 font-medium">Carbon Saved</p>
                    <p>{selectedDisposal.carbonSaved.toFixed(1)} kg CO₂</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 p-3 bg-green-50 rounded border border-green-100 text-sm">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-green-800">Recycling Certificate</p>
                  {selectedDisposal.certificate ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">
                      Pending
                    </Badge>
                  )}
                </div>
                {selectedDisposal.certificate && (
                  <p className="mt-1 text-green-700">
                    Your recycling certificate is available for download. This document certifies that your e-waste was
                    properly recycled according to environmental standards.
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {selectedDisposal.certificate && (
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Certificate
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

