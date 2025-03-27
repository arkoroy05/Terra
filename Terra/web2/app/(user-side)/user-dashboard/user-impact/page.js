"use client"

import { useState } from "react"
import {
  Award,
  ChevronLeft,
  Download,
  Droplets,
  Leaf,
  LightbulbOff,
  Recycle,
  Share2,
  Thermometer,
  TreesIcon as Tree,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { useRouter } from "next/navigation"

// Sample data for demonstration
const impactData = {
  totalRecycled: 54.1, // kg
  totalCarbonSaved: 129.8, // kg CO2
  waterSaved: 2150, // liters
  energySaved: 432, // kWh
  treesEquivalent: 6.5,
  landfillSpaceSaved: 0.27, // cubic meters
  rawMaterialsSaved: {
    plastic: 12.3, // kg
    metal: 28.7, // kg
    glass: 5.2, // kg
    other: 7.9, // kg
  },
  achievements: [
    {
      id: 1,
      title: "Eco Warrior",
      description: "Recycled over 50kg of e-waste",
      icon: "award",
      achieved: true,
      date: "2025-02-15",
    },
    {
      id: 2,
      title: "Carbon Crusher",
      description: "Saved 100kg of CO2 emissions",
      icon: "thermometer",
      achieved: true,
      date: "2025-03-01",
    },
    {
      id: 3,
      title: "Digital Detoxer",
      description: "Recycled 10 electronic devices",
      icon: "recycle",
      achieved: true,
      date: "2025-01-20",
    },
    {
      id: 4,
      title: "Resource Guardian",
      description: "Saved 30kg of raw materials",
      icon: "leaf",
      achieved: true,
      date: "2025-02-28",
    },
    {
      id: 5,
      title: "Water Protector",
      description: "Saved 5,000 liters of water",
      icon: "droplets",
      achieved: false,
      progress: 43,
    },
    {
      id: 6,
      title: "Energy Saver",
      description: "Saved 1,000 kWh of energy",
      icon: "lightbulb-off",
      achieved: false,
      progress: 43,
    },
  ],
}

// Monthly impact data for charts
const monthlyImpactData = [
  { month: "Oct", weight: 9.8, carbonSaved: 23.5, energySaved: 47 },
  { month: "Nov", weight: 3.7, carbonSaved: 8.9, energySaved: 18 },
  { month: "Dec", weight: 14.4, carbonSaved: 34.5, energySaved: 69 },
  { month: "Jan", weight: 17.2, carbonSaved: 41.3, energySaved: 83 },
  { month: "Feb", weight: 3.8, carbonSaved: 9.1, energySaved: 18 },
  { month: "Mar", weight: 5.2, carbonSaved: 12.5, energySaved: 25 },
]

// Comparison data
const comparisonData = [
  { name: "You", value: 129.8 },
  { name: "Avg. User", value: 85.2 },
]

// Colors for charts
const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"]

// Icon mapping for achievements
const iconMap = {
  award: Award,
  thermometer: Thermometer,
  recycle: Recycle,
  leaf: Leaf,
  droplets: Droplets,
  "lightbulb-off": LightbulbOff,
}

export default function MyImpact() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Get the icon component based on the icon name
  const getIconComponent = (iconName) => {
    const IconComponent = iconMap[iconName] || Leaf
    return <IconComponent className="h-5 w-5" />
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
            <h1 className="text-xl font-semibold text-green-800">My Environmental Impact</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-green-700 border-green-200">
              <Share2 className="mr-2 h-4 w-4" />
              Share Impact
            </Button>
            <Button variant="outline" className="text-green-700 border-green-200">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-green-100 p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              Detailed Impact
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Impact summary cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-white border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Total E-Waste Recycled</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-800">{impactData.totalRecycled} kg</div>
                  <p className="text-xs text-green-600">Electronic waste properly disposed</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Carbon Footprint Reduced</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-800">{impactData.totalCarbonSaved} kg</div>
                  <p className="text-xs text-green-600">CO₂ emissions saved</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Trees Equivalent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-800">{impactData.treesEquivalent}</div>
                  <p className="text-xs text-green-600">Trees worth of carbon absorption</p>
                </CardContent>
              </Card>
            </div>

            {/* Main impact chart */}
            <Card className="bg-white border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Your Environmental Impact Over Time</CardTitle>
                <CardDescription>Carbon footprint reduction from your recycling activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyImpactData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                      <Area
                        type="monotone"
                        dataKey="carbonSaved"
                        stroke="#16a34a"
                        fill="#dcfce7"
                        name="CO₂ Saved (kg)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Comparison and achievements preview */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-white border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-800">How You Compare</CardTitle>
                  <CardDescription>Your impact compared to the average user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0f2f1" />
                        <XAxis dataKey="name" stroke="#047857" />
                        <YAxis stroke="#047857" />
                        <Tooltip
                          formatter={(value) => [`${value} kg CO₂`, "Carbon Saved"]}
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1fae5",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar dataKey="value" fill="#16a34a" name="CO₂ Saved (kg)" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 text-center text-sm text-green-700">
                    You've saved{" "}
                    <span className="font-bold">{Math.round((impactData.totalCarbonSaved / 85.2 - 1) * 100)}%</span>{" "}
                    more CO₂ than the average user!
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-800">Recent Achievements</CardTitle>
                  <CardDescription>Milestones you've reached through recycling</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {impactData.achievements
                      .filter((a) => a.achieved)
                      .slice(0, 3)
                      .map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                            {getIconComponent(achievement.icon)}
                          </div>
                          <div>
                            <h4 className="font-medium text-green-800">{achievement.title}</h4>
                            <p className="text-xs text-green-600">{achievement.description}</p>
                          </div>
                          <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-100">Earned</Badge>
                        </div>
                      ))}
                    <Button
                      variant="outline"
                      className="w-full mt-2 border-green-200 text-green-700"
                      onClick={() => setActiveTab("achievements")}
                    >
                      View All Achievements
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Detailed Impact Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Water Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-800">{impactData.waterSaved.toLocaleString()} L</div>
                  <p className="text-xs text-green-600">Clean water preserved through recycling</p>
                  <div className="mt-2">
                    <div className="text-xs text-green-700 mb-1">
                      Equivalent to {Math.round(impactData.waterSaved / 150)} days of average household use
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Energy Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-800">{impactData.energySaved} kWh</div>
                  <p className="text-xs text-green-600">Electricity conserved through recycling</p>
                  <div className="mt-2">
                    <div className="text-xs text-green-700 mb-1">
                      Equivalent to {Math.round(impactData.energySaved / 30)} days of average household use
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Landfill Space Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-800">{impactData.landfillSpaceSaved} m³</div>
                  <p className="text-xs text-green-600">Landfill space preserved</p>
                  <div className="mt-2">
                    <div className="text-xs text-green-700 mb-1">
                      Equivalent to {Math.round(impactData.landfillSpaceSaved * 100)} average-sized trash bags
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Raw materials saved */}
            <Card className="bg-white border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Raw Materials Recovered</CardTitle>
                <CardDescription>Valuable resources saved through your recycling efforts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Plastic", value: impactData.rawMaterialsSaved.plastic },
                            { name: "Metal", value: impactData.rawMaterialsSaved.metal },
                            { name: "Glass", value: impactData.rawMaterialsSaved.glass },
                            { name: "Other", value: impactData.rawMaterialsSaved.other },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[0, 1, 2, 3].map((entry, index) => (
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
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium text-green-700">Plastic</div>
                        <div className="text-sm font-medium text-green-700">
                          {impactData.rawMaterialsSaved.plastic} kg
                        </div>
                      </div>
                      <Progress value={impactData.rawMaterialsSaved.plastic / 0.54} className="h-2 bg-green-100">
                        <div className="h-full bg-green-600 rounded-full" />
                      </Progress>
                      <div className="text-xs text-green-600 mt-1">
                        Equivalent to {Math.round(impactData.rawMaterialsSaved.plastic / 0.03)} plastic bottles
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium text-green-700">Metal</div>
                        <div className="text-sm font-medium text-green-700">
                          {impactData.rawMaterialsSaved.metal} kg
                        </div>
                      </div>
                      <Progress value={impactData.rawMaterialsSaved.metal / 0.54} className="h-2 bg-green-100">
                        <div className="h-full bg-green-600 rounded-full" />
                      </Progress>
                      <div className="text-xs text-green-600 mt-1">
                        Equivalent to {Math.round(impactData.rawMaterialsSaved.metal / 0.5)} small appliances
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium text-green-700">Glass</div>
                        <div className="text-sm font-medium text-green-700">
                          {impactData.rawMaterialsSaved.glass} kg
                        </div>
                      </div>
                      <Progress value={impactData.rawMaterialsSaved.glass / 0.54} className="h-2 bg-green-100">
                        <div className="h-full bg-green-600 rounded-full" />
                      </Progress>
                      <div className="text-xs text-green-600 mt-1">
                        Equivalent to {Math.round(impactData.rawMaterialsSaved.glass / 0.2)} glass bottles
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium text-green-700">Other Materials</div>
                        <div className="text-sm font-medium text-green-700">
                          {impactData.rawMaterialsSaved.other} kg
                        </div>
                      </div>
                      <Progress value={impactData.rawMaterialsSaved.other / 0.54} className="h-2 bg-green-100">
                        <div className="h-full bg-green-600 rounded-full" />
                      </Progress>
                      <div className="text-xs text-green-600 mt-1">Various other valuable materials recovered</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Energy and water savings over time */}
            <Card className="bg-white border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Resource Conservation Over Time</CardTitle>
                <CardDescription>Energy saved through your recycling activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyImpactData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="energySaved"
                        stroke="#16a34a"
                        name="Energy Saved (kWh)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Environmental impact certificate */}
            <Card className="bg-white border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Environmental Impact Certificate</CardTitle>
                <CardDescription>Your official record of environmental contribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-green-200 rounded-lg bg-green-50 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <Tree className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Certificate of Environmental Impact</h3>
                  <p className="text-sm text-green-700 mb-4">
                    This certifies that you have made a significant positive impact on the environment through your
                    e-waste recycling efforts.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="text-left">
                      <p className="text-green-600 font-medium">Total E-Waste Recycled</p>
                      <p className="font-bold text-green-800">{impactData.totalRecycled} kg</p>
                    </div>
                    <div className="text-left">
                      <p className="text-green-600 font-medium">Carbon Footprint Reduced</p>
                      <p className="font-bold text-green-800">{impactData.totalCarbonSaved} kg CO₂</p>
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {impactData.achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`bg-white border-green-100 ${achievement.achieved ? "ring-1 ring-green-200" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        {getIconComponent(achievement.icon)}
                      </div>
                      {achievement.achieved ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Earned</Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">
                          In Progress
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold text-green-800 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-green-700 mb-3">{achievement.description}</p>

                    {achievement.achieved ? (
                      <div className="text-xs text-green-600">
                        Achieved on {new Date(achievement.date).toLocaleDateString()}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-700">Progress</span>
                          <span className="font-medium text-green-800">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2 bg-green-100">
                          <div className="h-full bg-green-600 rounded-full" />
                        </Progress>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Next achievements */}
            <Card className="bg-white border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Upcoming Achievements</CardTitle>
                <CardDescription>Keep recycling to unlock these milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Tree className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">Forest Guardian</h4>
                        <p className="text-xs text-green-600">Save the equivalent of 10 trees worth of carbon</p>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-xs text-green-700 font-medium">
                          {Math.round((impactData.treesEquivalent / 10) * 100)}%
                        </div>
                        <div className="text-xs text-green-600">{impactData.treesEquivalent}/10 trees</div>
                      </div>
                    </div>
                    <Progress value={(impactData.treesEquivalent / 10) * 100} className="h-2 mt-2 bg-green-100">
                      <div className="h-full bg-green-600 rounded-full" />
                    </Progress>
                  </div>

                  <div className="p-4 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Recycle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">Recycling Champion</h4>
                        <p className="text-xs text-green-600">Recycle 100kg of e-waste</p>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-xs text-green-700 font-medium">
                          {Math.round((impactData.totalRecycled / 100) * 100)}%
                        </div>
                        <div className="text-xs text-green-600">{impactData.totalRecycled}/100 kg</div>
                      </div>
                    </div>
                    <Progress value={(impactData.totalRecycled / 100) * 100} className="h-2 mt-2 bg-green-100">
                      <div className="h-full bg-green-600 rounded-full" />
                    </Progress>
                  </div>

                  <div className="p-4 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Thermometer className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">Climate Defender</h4>
                        <p className="text-xs text-green-600">Save 200kg of CO₂ emissions</p>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-xs text-green-700 font-medium">
                          {Math.round((impactData.totalCarbonSaved / 200) * 100)}%
                        </div>
                        <div className="text-xs text-green-600">{impactData.totalCarbonSaved}/200 kg</div>
                      </div>
                    </div>
                    <Progress value={(impactData.totalCarbonSaved / 200) * 100} className="h-2 mt-2 bg-green-100">
                      <div className="h-full bg-green-600 rounded-full" />
                    </Progress>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

