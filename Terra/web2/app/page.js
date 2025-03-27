import Link from "next/link"
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react"

export default function Home() {
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
          <p className="text-black text-xl  max-w-md mb-8">
           JOIN TERRA.ORG , BE A PART OF THE FUTURE.
          </p>
          <button className="flex items-center text-white">
            Explore More <ChevronDown className="ml-2" />
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
          <h2 className="text-4xl md:text-5xl font-bold max-w-2xl mb-16">
           THE NEW WAY OF E-WASTE MANAGEMENT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden h-80 bg-gray-200 flex items-center justify-center">
              <img src="/hero2.jpg" alt="Image 1" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-t border-gray-300 pt-6">
                <h3 className="font-medium mb-4">Solar Energy</h3>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  </div>
                </div>
                <button className="text-sm font-medium">VIEW DETAILS</button>
              </div>
              <div className="border-t border-gray-300 pt-6">
                <h3 className="font-medium mb-4">Hydro Energy</h3>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v6m0 0c-3.5 0-6.5 1-8 3 1.5-2 4.5-3 8-3s6.5 1 8 3c-1.5-2-4.5-3-8-3zm0 0v14m-8-5c1.5 2 4.5 3 8 3s6.5-1 8-3m-16-4c1.5 2 4.5 3 8 3s6.5-1 8-3" />
                    </svg>
                  </div>
                </div>
                <button className="text-sm font-medium">VIEW DETAILS</button>
              </div>
              <div className="border-t border-gray-300 pt-6">
                <h3 className="font-medium mb-4">Geothermal Energy</h3>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M2 12h20M7 12c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" />
                    </svg>
                  </div>
                </div>
                <button className="text-sm font-medium">VIEW DETAILS</button>
              </div>
              <div className="border-t border-gray-300 pt-6 bg-gray-900 text-white p-4">
                <h3 className="font-medium mb-4">Wind Energy</h3>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0v8m-8-8h16" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm mb-4">Wind turbines convert the kinetic energy of wind into electrical power.</p>
                <button className="text-sm font-medium">VIEW DETAILS</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Future Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
              <span className="text-sm">Benefits</span>
            </div>
            <div className="text-sm">suergy.org</div>
            <div className="text-sm">2024</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold max-w-2xl mb-8">
          Innovate. Recycle. Thrive
          </h2>
          <p className="max-w-2xl text-sm mb-16">
          A smarter world starts with smarter choices. By transforming e-waste into a resource, we create a cycle of innovation that benefits both people and the planet
          </p>

          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-gray-500">Environmental benefits image will go here</span>
            <div className="absolute bottom-8 right-8 bg-white p-6 rounded-lg max-w-xs">
              <h3 className="font-medium mb-2">Environmental Benefits</h3>
              <p className="text-sm text-gray-600 mb-4">
              Technology evolves, but waste doesn’t have to pile up. By embracing smart, digital solutions, we can turn e-waste into opportunity—recycling responsibly, reducing impact, and building a future where innovation and sustainability go hand in hand
              </p>
              <div className="flex justify-between text-sm">
                <button className="flex items-center">PREVIOUS</button>
                <button className="flex items-center">
                  NEXT <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="font-bold text-2xl mb-4">SUERGY</h3>
              <p className="max-w-xs text-sm text-gray-600">
                Leading the transition to sustainable energy solutions for a cleaner future.
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
            <p className="text-sm text-gray-600">© 2024 SUERGY. All rights reserved.</p>
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

