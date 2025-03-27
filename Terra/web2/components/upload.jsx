"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UploadIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export function Upload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      // In a real app, you would upload the file to your backend
      // and process it with AI before redirecting
      setLoading(false)
      router.push("/waste-analyze/results")
    }, 2000)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 border-2 border-dashed border-green-300 bg-green-50 hover:bg-green-100 transition-colors">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            {preview ? (
              <div className="relative w-full h-64 mb-4">
                <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-contain rounded-md" />
              </div>
            ) : (
              <div className="w-full h-64 flex flex-col items-center justify-center text-green-500 mb-4">
                <UploadIcon className="h-16 w-16 mb-2" />
                <p className="text-center text-gray-600">Drag and drop your e-waste photo here, or click to browse</p>
              </div>
            )}

            <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} className="hidden" />

            {!preview ? (
              <Button
                type="button"
                variant="outline"
                className="border-green-500 text-green-700 hover:bg-green-100"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Select Image
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-green-500 text-green-700 hover:bg-green-100"
                  onClick={() => {
                    setFile(null)
                    setPreview(null)
                  }}
                >
                  Remove
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Analyze E-Waste"
                  )}
                </Button>
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
