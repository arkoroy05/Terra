import { Upload } from "@/components/upload"
import { Leaf } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      

      <main className="container mx-auto py-12 px-4">
      <Link href="/user-dashboard" className="mb-6">
          <Button variant="ghost" className="mb-6 text-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Identify Your E-Waste</h2>
          <p className="text-gray-600 mb-8">
            Upload a photo of your electronic waste and our AI will help you identify it, provide educational
            information, and locate the nearest disposal site.
          </p>

          <Upload />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Identify</h3>
              <p className="text-gray-600">
                Our AI technology identifies the type of electronic waste from your photo.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Learn</h3>
              <p className="text-gray-600">
                Get educational information about the environmental impact and proper handling.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Recycle</h3>
              <p className="text-gray-600">
                Find the nearest certified e-waste collection centers that accept your item.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-600 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© 2025 E-Waste Recycler. All rights reserved.</p>
          <p className="mt-2 text-green-100">Helping you make environmentally responsible decisions.</p>
        </div>
      </footer>
    </div>
  )
}

