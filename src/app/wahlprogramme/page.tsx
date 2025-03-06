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

// Beispieldaten für Wahlprogramme und Positionen
const wahlprogramme = {
  '1': {
    'Migration & Integration': 'Die Union setzt auf eine kontrollierte Zuwanderung und Integration durch Bildung.',
    'Klimaschutz': 'Die Union fördert erneuerbare Energien und setzt auf Technologieoffenheit.',
    'Wirtschaft': 'Die Union unterstützt die soziale Marktwirtschaft und den Mittelstand.',
    'Soziales': 'Die Union setzt auf eine starke Sozialpartnerschaft und Rentensicherheit.',
    'Bildung': 'Die Union fördert digitale Bildung und Chancengleichheit.',
    'Außenpolitik': 'Die Union setzt auf eine starke EU und transatlantische Partnerschaft.',
  },
  '2': {
    'Migration & Integration': 'Die SPD setzt auf Integration durch Teilhabe und Chancengleichheit.',
    'Klimaschutz': 'Die SPD fördert den Kohleausstieg und den Ausbau erneuerbarer Energien.',
    'Wirtschaft': 'Die SPD setzt auf soziale Gerechtigkeit und Arbeitnehmerrechte.',
    'Soziales': 'Die SPD fördert soziale Sicherheit und bezahlbaren Wohnraum.',
    'Bildung': 'Die SPD setzt auf gebührenfreie Bildung und Inklusion.',
    'Außenpolitik': 'Die SPD fördert eine friedliche Außenpolitik und internationale Zusammenarbeit.',
  },
  '3': {
    'Migration & Integration': 'Die Grünen setzen auf eine humane Flüchtlingspolitik und Integration durch Teilhabe.',
    'Klimaschutz': 'Die Grünen fördern den Ausbau erneuerbarer Energien und den Kohleausstieg.',
    'Wirtschaft': 'Die Grünen setzen auf eine nachhaltige Wirtschaft und soziale Gerechtigkeit.',
    'Soziales': 'Die Grünen fördern soziale Sicherheit und Inklusion.',
    'Bildung': 'Die Grünen setzen auf Bildungsgerechtigkeit und Chancengleichheit.',
    'Außenpolitik': 'Die Grünen fördern eine friedliche Außenpolitik und internationale Zusammenarbeit.',
  },
  '4': {
    'Migration & Integration': 'Die FDP setzt auf eine gesteuerte Zuwanderung und Integration durch Bildung.',
    'Klimaschutz': 'Die FDP fördert Technologieoffenheit und marktwirtschaftliche Lösungen im Klimaschutz.',
    'Wirtschaft': 'Die FDP setzt auf eine liberale Wirtschaftspolitik und Entbürokratisierung.',
    'Soziales': 'Die FDP fördert Eigenverantwortung und soziale Marktwirtschaft.',
    'Bildung': 'Die FDP setzt auf digitale Bildung und individuelle Förderung.',
    'Außenpolitik': 'Die FDP fördert eine starke EU und transatlantische Partnerschaft.',
  },
  '5': {
    'Migration & Integration': 'Die Linke setzt auf offene Grenzen und Integration durch soziale Teilhabe.',
    'Klimaschutz': 'Die Linke fördert den Kohleausstieg und den Ausbau erneuerbarer Energien.',
    'Wirtschaft': 'Die Linke setzt auf soziale Gerechtigkeit und Umverteilung.',
    'Soziales': 'Die Linke fördert soziale Sicherheit und bezahlbaren Wohnraum.',
    'Bildung': 'Die Linke setzt auf gebührenfreie Bildung und Inklusion.',
    'Außenpolitik': 'Die Linke fördert eine friedliche Außenpolitik und Abrüstung.',
  },
  '6': {
    'Migration & Integration': 'Die AfD setzt auf eine restriktive Zuwanderungspolitik und Integration durch Assimilation.',
    'Klimaschutz': 'Die AfD lehnt den Kohleausstieg ab und setzt auf fossile Energien.',
    'Wirtschaft': 'Die AfD setzt auf eine nationale Wirtschaftspolitik und Protektionismus.',
    'Soziales': 'Die AfD fördert traditionelle Familienwerte und Eigenverantwortung.',
    'Bildung': 'Die AfD setzt auf Leistung und Disziplin in der Bildung.',
    'Außenpolitik': 'Die AfD fördert nationale Interessen und eine kritische Haltung zur EU.',
  }
}

export default function Wahlprogramme() {
  const [selectedThema, setSelectedThema] = useState<string>('')
  const [selectedParteien, setSelectedParteien] = useState<string[]>([])
  const [showWahlprogramme, setShowWahlprogramme] = useState<boolean>(false)

  const links = {
    '1': 'https://www.cdu.de/app/uploads/2025/01/km_btw_2025_wahlprogramm_langfassung_ansicht.pdf',
    '2': 'https://www.spd.de/fileadmin/Dokumente/Beschluesse/Programm/SPD_Programm_bf.pdf',
    '3': 'https://cms.gruene.de/uploads/assets/20250205_Regierungsprogramm_DIGITAL_DINA5.pdf',
    '4': 'https://www.fdp.de/sites/default/files/2024-12/fdp-wahlprogramm_2025.pdf',
    '5': 'https://www.die-linke.de/fileadmin/user_upload/Wahlprogramm_Langfassung_Linke-BTW25_01.pdf',
    '6': 'https://www.afd.de/wp-content/uploads/2025/02/AfD_Bundestagswahlprogramm2025_web.pdf'
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Wahlprogramm-Vergleich
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Wählen Sie Parteien und Themen zum Vergleichen aus
          </p>
        </div>

        {/* Parteienauswahl */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Parteien (mehrere auswählbar)</h2>
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
                className={`p-4 rounded-lg shadow-md transition-all duration-200 ${
                  selectedParteien.includes(partei.id)
                    ? 'bg-blue-600 text-white shadow-blue-200'
                    : 'bg-white text-slate-700 hover:bg-slate-50 hover:shadow-lg'
                }`}
              >
                {partei.kurzname}
              </button>
            ))}
          </div>
        </div>

        {/* Themenauswahl mit allen Punkten */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Themen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themen.map((thema) => (
              <button
                key={thema}
                onClick={() => setSelectedThema(thema)}
                className={`p-4 rounded-lg shadow-md transition-all duration-200 ${
                  selectedThema === thema
                    ? 'bg-blue-600 text-white shadow-blue-200'
                    : 'bg-white text-slate-700 hover:bg-slate-50 hover:shadow-lg'
                }`}
              >
                {thema}
              </button>
            ))}
          </div>
        </div>

        {/* Vergleichsbutton und Anzeige der Wahlprogramme */}
        {selectedParteien.length > 0 && selectedThema && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowWahlprogramme(!showWahlprogramme)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:shadow-lg shadow-blue-200"
            >
              {showWahlprogramme ? 'Wahlprogramme ausblenden' : 'Programme vergleichen'}
            </button>
          </div>
        )}

        {/* Anzeige der Wahlprogramme */}
        {showWahlprogramme && selectedParteien.length > 0 && selectedThema && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Wahlprogramme im Vergleich</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedParteien.map((parteiId) => {
                const partei = parteien.find((p) => p.id === parteiId);
                return (
                  <div key={parteiId} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 h-full border border-slate-100">
                    <div className="flex flex-col h-full">
                      <h3 className="text-lg font-medium text-slate-800 mb-4 pb-2 border-b border-slate-100">
                        {partei?.name}
                    </h3>
                      <p className="flex-grow text-slate-600 leading-relaxed">
                        {wahlprogramme[parteiId as keyof typeof wahlprogramme][selectedThema as keyof (typeof wahlprogramme)[keyof typeof wahlprogramme]] || 'Keine Daten verfügbar'}
                      </p>
                      <p className="mt-6 pt-4 border-t border-slate-100">
                        <Link 
                          href={links[parteiId as keyof typeof links]} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-2"
                        >
                          Mehr erfahren 
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 