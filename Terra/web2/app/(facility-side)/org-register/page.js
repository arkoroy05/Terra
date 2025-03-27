"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { MapPin, Upload, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StakeholderRegistration() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isComplianceChecked, setIsComplianceChecked] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      facilityType: "",
      wasteTypes: "",
      capacity: "",
      certifications: "",
      description: "",
      location: "",
    },
  })

  const onSubmit = async (data) => {
    if (!isComplianceChecked) {
      alert("Please agree to the compliance terms before submitting.")
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader className="text-center bg-green-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Registration Successful!</CardTitle>
            <CardDescription className="text-green-100">Your application has been submitted for review</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-8 px-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <CheckCircle className="h-24 w-24 text-green-500" />
              <h3 className="text-xl font-medium text-gray-900">Thank you for registering!</h3>
              <p className="text-gray-600 max-w-md">
                Your application to become a certified e-waste recycler has been submitted. Our team will review your
                information and contact you within 3-5 business days.
              </p>
              <Button className="mt-6 bg-green-600 hover:bg-green-700">Return to Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="bg-green-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Terra Facility Registration</CardTitle>
          <CardDescription className="text-green-100">
            Register your facility as a Terra certified e-waste recycler
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className={`flex items-center ${step >= 1 ? "text-green-600" : "text-gray-400"}`}>
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 1 ? "border-green-600 bg-green-100" : "border-gray-300"}`}
                >
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Company Info</span>
              </div>
              <div className={`h-0.5 w-16 ${step >= 2 ? "bg-green-600" : "bg-gray-300"}`}></div>
              <div className={`flex items-center ${step >= 2 ? "text-green-600" : "text-gray-400"}`}>
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 2 ? "border-green-600 bg-green-100" : "border-gray-300"}`}
                >
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Facility Details</span>
              </div>
              <div className={`h-0.5 w-16 ${step >= 3 ? "bg-green-600" : "bg-gray-300"}`}></div>
              <div className={`flex items-center ${step >= 3 ? "text-green-600" : "text-gray-400"}`}>
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 3 ? "border-green-600 bg-green-100" : "border-gray-300"}`}
                >
                  3
                </div>
                <span className="ml-2 text-sm font-medium">Certification</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" {...register("companyName")} />
                    {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register("email")} />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" {...register("phone")} />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" {...register("address")} />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" {...register("city")} />
                      {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" {...register("state")} />
                      {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" {...register("zip")} />
                      {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facilityType">Facility Type</Label>
                  <Select onValueChange={(value) => register("facilityType").onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select facility type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="collection">Collection Center</SelectItem>
                      <SelectItem value="processing">Processing Facility</SelectItem>
                      <SelectItem value="refurbishment">Refurbishment Center</SelectItem>
                      <SelectItem value="dismantling">Dismantling Facility</SelectItem>
                      <SelectItem value="recycling">Recycling Plant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wasteTypes">Types of E-Waste Accepted</Label>
                  <Select onValueChange={(value) => register("wasteTypes").onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select waste types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All E-Waste Types</SelectItem>
                      <SelectItem value="computers">Computers & Laptops</SelectItem>
                      <SelectItem value="phones">Mobile Phones & Tablets</SelectItem>
                      <SelectItem value="appliances">Home Appliances</SelectItem>
                      <SelectItem value="batteries">Batteries</SelectItem>
                      <SelectItem value="other">Other Electronic Items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Processing Capacity (tons/month)</Label>
                  <Select onValueChange={(value) => register("capacity").onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Less than 10 tons</SelectItem>
                      <SelectItem value="medium">10-50 tons</SelectItem>
                      <SelectItem value="large">50-100 tons</SelectItem>
                      <SelectItem value="xlarge">More than 100 tons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Facility Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your facility, equipment, and processes..."
                    className="min-h-[120px]"
                    {...register("description")}
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Facility Location</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your location, landmarks, and accessibility..."
                    className="min-h-[120px]"
                    {...register("location")}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certifications">Current Certifications</Label>
                  <Controller
                    name="certifications"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select certifications" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iso14001">ISO 14001</SelectItem>
                          <SelectItem value="r2">R2 (Responsible Recycling)</SelectItem>
                          <SelectItem value="e-stewards">e-Stewards</SelectItem>
                          <SelectItem value="weelabex">WEELABEX</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Required Documents</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4 bg-gray-50">
                      <div className="text-center">
                        <Upload className="h-6 w-6 text-green-500 mx-auto mb-2" />
                        <p className="text-sm font-medium">Business License</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 bg-gray-50">
                      <div className="text-center">
                        <Upload className="h-6 w-6 text-green-500 mx-auto mb-2" />
                        <p className="text-sm font-medium">Environmental Permit</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Compliance Agreement</Label>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <input 
                        type="checkbox" 
                        className="mt-1" 
                        checked={isComplianceChecked}
                        onChange={(e) => setIsComplianceChecked(e.target.checked)}
                      />
                      <div>
                        <p className="text-sm">
                          I certify that all information provided is accurate and complete. I agree to comply with all
                          applicable e-waste regulations and standards, including proper handling, storage, and disposal
                          of electronic waste.
                        </p>
                        <p className="text-sm mt-2">
                          I understand that my facility may be subject to inspection and that certification may be
                          revoked if regulations are not followed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" className="ml-auto bg-green-600 hover:bg-green-700" onClick={nextStep}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="ml-auto bg-green-600 hover:bg-green-700" 
                  disabled={isSubmitting || !isComplianceChecked}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
