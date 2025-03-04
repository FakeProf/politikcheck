import React from 'react'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Häufig gestellte Fragen</h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="text-center py-12">
            <div className="mb-6">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Noch keine FAQ verfügbar
            </h2>
            <p className="text-gray-600 max-w-sm mx-auto">
              Wir sammeln derzeit die häufigsten Fragen unserer Nutzer und werden diese hier in Kürze zur Verfügung stellen.
            </p>
            <div className="mt-8">
              <p className="text-sm text-gray-500">
                Sie haben eine Frage? Kontaktieren Sie uns über unser{' '}
                <a href="/kontakt" className="text-indigo-600 hover:text-indigo-800">
                  Kontaktformular
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Vorgeschlagene Kategorien
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Allgemeine Fragen</h4>
                <p className="text-gray-600 text-sm">
                  Grundlegende Informationen über PolitikCheck und unsere Mission
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Fact-Checking</h4>
                <p className="text-gray-600 text-sm">
                  Informationen zu unserer Methodik und Vorgehensweise
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Mitmachen</h4>
                <p className="text-gray-600 text-sm">
                  Wie Sie sich als Experte oder Unterstützer einbringen können
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Technische Fragen</h4>
                <p className="text-gray-600 text-sm">
                  Fragen zur Nutzung der Plattform und ihrer Funktionen
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 