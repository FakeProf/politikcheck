'use client'

import { useState } from 'react'
import Link from 'next/link'

// Beispieldaten (später durch API-Calls ersetzt)
const parteien = [
  { id: '1', name: 'CDU/CSU', kurzname: 'Union' },
  { id: '2', name: 'SPD', kurzname: 'SPD' },
  { id: '3', name: 'Bündnis 90/Die Grünen', kurzname: 'Grüne' },
  { id: '4', name: 'FDP', kurzname: 'FDP' },
  { id: '5', name: 'Die Linke', kurzname: 'Linke' },
  { id: '6', name: 'AfD', kurzname: 'AfD' },
]

const themen = [
  'Migration & Integration',
  'Klimaschutz',
  'Wirtschaft',
  'Soziales',
  'Bildung',
  'Außenpolitik',
]

export default function Wahlprogramme() {
  const [selectedParteien, setSelectedParteien] = useState<string[]>([])
  const [selectedThema, setSelectedThema] = useState<string>('')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Wahlprogramm-Vergleich
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Wählen Sie Parteien und Themen zum Vergleichen aus
          </p>
        </div>

        {/* Parteienauswahl */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Parteien</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {parteien.map((partei) => (
              <button
                key={partei.id}
                onClick={() => {
                  setSelectedParteien((prev) =>
                    prev.includes(partei.id)
                      ? prev.filter((id) => id !== partei.id)
                      : [...prev, partei.id]
                  )
                }}
                className={`p-4 rounded-lg shadow ${
                  selectedParteien.includes(partei.id)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                {partei.kurzname}
              </button>
            ))}
          </div>
        </div>

        {/* Themenauswahl */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Themen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themen.map((thema) => (
              <button
                key={thema}
                onClick={() => setSelectedThema(thema)}
                className={`p-4 rounded-lg shadow ${
                  selectedThema === thema
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-50'
                }`}
              >
                {thema}
              </button>
            ))}
          </div>
        </div>

        {/* Vergleichsbutton */}
        {selectedParteien.length > 0 && selectedThema && (
          <div className="mt-8 text-center">
            <Link
              href={`/wahlprogramme/vergleich?parteien=${selectedParteien.join(
                ','
              )}&thema=${selectedThema}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Programme vergleichen
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 