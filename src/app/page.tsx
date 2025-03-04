'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [showDevNotice, setShowDevNotice] = useState(true)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Entwicklungshinweis-Popup */}
      {showDevNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Wichtiger Hinweis</h3>
              <button
                onClick={() => setShowDevNotice(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Diese Website befindet sich derzeit noch in der Entwicklung. Bitte beachten Sie:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Die Bewertungen und Einschätzungen werden aktuell von einem KI-System vorgenommen</li>
                <li>Es sind noch keine echten Experten oder Fachgremien an den Analysen beteiligt</li>
                <li>Die dargestellten Daten dienen als erste Orientierung und werden kontinuierlich überarbeitet</li>
                <li>Wir arbeiten daran, in Zukunft verifizierte Expertenmeinungen einzubinden</li>
              </ul>
              <p className="mt-4 font-medium">
                Wir bitten um Ihr Verständnis und freuen uns über Ihr Interesse an unserer Plattform.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setShowDevNotice(false)}
                className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verstanden
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Politische Bildungsplattform
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Vergleichen Sie Wahlprogramme, analysieren Sie politische Reden und verstehen Sie die Umsetzbarkeit politischer Vorhaben.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Wahlprogramme */}
            <div className="relative group bg-gradient-to-br from-black/20 via-[#DD0000]/20 to-[#FFCE00]/20 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-white text-indigo-700 ring-4 ring-white shadow-sm">
                  📚
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <Link href="/wahlprogramme" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Wahlprogramme
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Vergleichen Sie die Wahlprogramme verschiedener Parteien nach Themen und Unterpunkten.
                </p>
              </div>
            </div>

            {/* Reden */}
            <div className="relative group bg-gradient-to-br from-black/20 via-[#DD0000]/20 to-[#FFCE00]/20 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-white text-indigo-700 ring-4 ring-white shadow-sm">
                  🎤
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <Link href="/reden" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Reden & Fact-Checking
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Analysieren Sie politische Reden und deren Bezug zu Wahlversprechen mit Fact-Checking.
                </p>
              </div>
            </div>

            {/* Umsetzbarkeit */}
            <div className="relative group bg-gradient-to-br from-black/20 via-[#DD0000]/20 to-[#FFCE00]/20 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div>
                <span className="rounded-lg inline-flex p-3 bg-white text-indigo-700 ring-4 ring-white shadow-sm">
                  📊
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <Link href="/umsetzbarkeit" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Umsetzbarkeitsanalyse
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Bewerten Sie die Machbarkeit und Sinnhaftigkeit politischer Vorhaben.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-base text-gray-500">
            Eine Plattform für fundierte politische Bildung und Meinungsbildung.
          </p>
        </div>
      </div>
    </main>
  )
} 