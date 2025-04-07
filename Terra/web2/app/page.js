"use client"
import Link from "next/link"
import { ChevronDown, ChevronRight, ArrowRight,Award , Smartphone,Recycle,Database} from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function Home() {
  const [activeDetail, setActiveDetail] = useState(null)

  const toggleDetails = (id) => {
    if (activeDetail === id) {
      setActiveDetail(null)
    } else {
      setActiveDetail(id)
    }
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="font-bold text-2xl text-white">TERRA</div>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white font-medium">
                HOME
              </Link>
              <Link href="#green-energy" className="text-white font-medium">
                GREEN ENERGY
              </Link>
              <Link href="#case-study" className="text-white font-medium">
                CASE STUDY
              </Link>
              <Link href="#resources" className="text-white font-medium">
                RESOURCES
              </Link>
            </nav>
            <div>
              <Link href="/org-register" className="bg-white text-black px-6 py-2 rounded-full font-medium">
                Become a Facility
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-teal-800/30">
          {/* Image placeholder - you'll add the actual image later */}
          <div className="w-full h-full bg-teal-800/50 flex items-center justify-center">
            <img src="/hero.jpg" alt="Hero Image" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-24">
          <h1 className="text-white text-6xl md:text-8xl font-bold mb-4">
            THE FUTURE IS NOW
          </h1>
          <p className="text-white text-xl  max-w-md mb-8">
           JOIN TERRA.ORG , BE A PART OF THE FUTURE.
          </p>
          <button className="flex items-center text-white">
          <Link href="/user-dashboard" className="bg-white text-black px-6 py-2 rounded-full font-medium">
                Join the Terra Community
          </Link>
          </button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
            <span className="text-sm">Introduction</span>
          </div>
          <div className="text-sm">terra.org</div>
          <div className="text-sm">2025</div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold max-w-2xl mb-16">THE NEW WAY OF E-WASTE MANAGEMENT</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden h-80 bg-gray-200 flex items-center justify-center">
            <img src="/hero2.jpg" alt="E-waste management" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-t border-gray-300 pt-6">
              <h3 className="font-medium mb-4">SDG 12</h3>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>
              </div>
              <button className="text-sm font-medium" onClick={() => toggleDetails("sdg12")}>
                VIEW DETAILS
              </button>
              {activeDetail === "sdg12" && (
                <div className="mt-4 text-sm">
                  <p>
                    Sustainable Development Goal 12 focuses on responsible consumption and production patterns, which
                    directly aligns with Terra's mission to manage e-waste effectively.
                  </p>
                </div>
              )}
            </div>
            <div className="border-t border-gray-300 pt-6">
              <h3 className="font-medium mb-4">Consumer Disposal</h3>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Smartphone className="w-8 h-8" />
                </div>
              </div>
              <button className="text-sm font-medium" onClick={() => toggleDetails("consumer")}>
                VIEW DETAILS
              </button>
              {activeDetail === "consumer" && (
                <div className="mt-4 text-sm">
                  <p>
                    Terra simplifies the e-waste disposal process for consumers, providing convenient drop-off points
                    and pickup services for old electronics.
                  </p>
                </div>
              )}
            </div>
            <div className="border-t border-gray-300 pt-6">
              <h3 className="font-medium mb-4">Recycler Network</h3>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Recycle className="w-8 h-8" />
                </div>
              </div>
              <button className="text-sm font-medium" onClick={() => toggleDetails("recycler")}>
                VIEW DETAILS
              </button>
              {activeDetail === "recycler" && (
                <div className="mt-4 text-sm">
                  <p>
                    Our platform connects certified e-waste recyclers with consumers, ensuring proper disposal and
                    maximum resource recovery from electronic waste.
                  </p>
                </div>
              )}
            </div>
            <div className="border-t border-gray-300 pt-6 bg-gray-900 text-white p-4">
              <h3 className="font-medium mb-4">Reseller Marketplace</h3>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Database className="w-8 h-8" />
                </div>
              </div>
              <p className="text-sm mb-4">
                Our marketplace connects refurbishers and resellers with consumers looking for affordable, sustainable
                electronics.
              </p>
              <button className="text-sm font-medium" onClick={() => toggleDetails("reseller")}>
                VIEW DETAILS
              </button>
              {activeDetail === "reseller" && (
                <div className="mt-4 text-sm">
                  <p>
                    Terra's reseller network gives electronic devices a second life, reducing waste and making
                    technology more accessible.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Sustainable Future Section */}
      <section className="w-full bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-leaf"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span className="font-medium">Benefits</span>
        </div>
        <div>terra.org</div>
        <div>2025</div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left column - Main heading */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Innovate. Recycle. Thrive
            </h1>
          </div>

          {/* Right column - Description */}
          <div>
            <p className="text-sm md:text-base uppercase tracking-wide">
            A smarter world starts with smarter choices. By transforming e-waste into a resource, we create a cycle of innovation that benefits both people and the planet


            </p>
          </div>
        </div>
      </div>

      {/* Full-width image section with card overlay */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        {/* Background image */}
        <Image
          src="/hero3.jpg"
          alt="Aerial view of sustainable landscape"
          fill
          className="object-cover"
          priority
        />

        {/* Card overlay - Environmental Benefits */}
       
        
      </div>
              
      
    </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="font-bold text-2xl mb-4">TERRA</h3>
              <p className="max-w-xs text-sm text-gray-600">
                 The solution for a cleaner future.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8 md:mt-0">
              <div>
                <h4 className="font-medium mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#about">About Us</Link>
                  </li>
                  <li>
                    <Link href="#team">Our Team</Link>
                  </li>
                  <li>
                    <Link href="#careers">Careers</Link>
                  </li>
                  <li>
                    <Link href="#contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Solutions</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#solar">Solar Energy</Link>
                  </li>
                  <li>
                    <Link href="#wind">Wind Energy</Link>
                  </li>
                  <li>
                    <Link href="#hydro">Hydro Energy</Link>
                  </li>
                  <li>
                    <Link href="#geothermal">Geothermal</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#blog">Blog</Link>
                  </li>
                  <li>
                    <Link href="#case-studies">Case Studies</Link>
                  </li>
                  <li>
                    <Link href="#reports">Reports</Link>
                  </li>
                  <li>
                    <Link href="#newsletter">Newsletter</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2025 TERRA. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Terms
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

