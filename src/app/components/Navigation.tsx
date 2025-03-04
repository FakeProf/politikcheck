'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">PolitikCheck</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/wahlprogramme" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Wahlprogramme
            </Link>
            <Link href="/reden" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Reden
            </Link>
            <Link href="/abgeordnete" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Abgeordnete
            </Link>
            <Link href="/umsetzbarkeit" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Umsetzbarkeit
            </Link>
            <Link href="/leichte-sprache" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
              Leichte Sprache
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Menü öffnen</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/wahlprogramme" 
            className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Wahlprogramme
          </Link>
          <Link 
            href="/reden" 
            className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Reden
          </Link>
          <Link 
            href="/abgeordnete" 
            className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Abgeordnete
          </Link>
          <Link 
            href="/umsetzbarkeit" 
            className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Umsetzbarkeit
          </Link>
          <Link 
            href="/leichte-sprache" 
            className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Leichte Sprache
          </Link>
        </div>
      </div>
    </nav>
  )
} 