"use client"



import { useState } from "react"
import { InfoIcon, MapPinIcon, SendIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function FacilityCheckIn() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    location: "",
    wasteType: "",
    description: "",
    weight: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission - would connect to backend in a real application
    console.log("Form submitted:", formData)
    router.push("/user-dashboard")
  }

  // Generate a random 6-digit OTP for display purposes
  const otp = "123456"

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-800 mb-2">Facility Check-in</h1>
          <p className="text-green-600">Please verify your identity and provide e-waste details</p>
        </div>

        {/* OTP Display */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-sm font-medium text-green-700 mb-2">Your verification code</div>
          <div className="flex gap-2 justify-center">
            {otp.split("").map((digit, index) => (
              <div
                key={index}
                className="w-12 h-14 flex items-center justify-center rounded-lg bg-white border-2 border-green-300 shadow-sm text-2xl font-bold text-green-800"
              >
                {digit}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-green-600">Show this code to the faculty staff, for cashbacks and more</div>
        </div>

        <Card className="border-green-200 shadow-md bg-white">
          <CardHeader className="bg-green-100 rounded-t-lg">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <InfoIcon className="h-5 w-5" />
              E-Waste Information
            </CardTitle>
            <CardDescription>Please provide details about your e-waste for proper recycling</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-green-700 flex items-center gap-1">
                    <UserIcon className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="username"
                    placeholder="Enter your name"
                    className="border-green-200 focus-visible:ring-green-500"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="border-green-200 focus-visible:ring-green-500"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-green-700 flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  Your Location
                </Label>
                <Input
                  id="location"
                  placeholder="Enter your address"
                  className="border-green-200 focus-visible:ring-green-500"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waste-type" className="text-green-700">
                    Type of E-Waste
                  </Label>
                  <Select onValueChange={(value) => handleChange("wasteType", value)} required>
                    <SelectTrigger id="waste-type" className="border-green-200 focus:ring-green-500">
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label htmlFor="weight" className="text-green-700">
                    Approximate Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter weight in kg"
                    className="border-green-200 focus-visible:ring-green-500"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-green-700">
                  Additional Details
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your e-waste items in detail (brand, model, condition, etc.)"
                  className="min-h-[100px] border-green-200 focus-visible:ring-green-500"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-green-50 rounded-b-lg flex flex-col sm:flex-row gap-3 items-center">
              <Button type="submit" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                <SendIcon className="mr-2 h-4 w-4" />
                Submit Check-in
              </Button>
              <p className="text-xs text-green-600 text-center sm:text-left sm:ml-auto">
                Thank you for choosing to recycle responsibly with EcoRecycle
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

