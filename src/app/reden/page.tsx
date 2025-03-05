'use client'

import React from 'react'
import type { JSX } from 'react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Rede {
  id: string
  titel: string
  datum: string
  redner: string
  partei: string
  thema: string
  faktcheck: {
    aussage: string
    bewertung: 'wahr' | 'teilweise wahr' | 'falsch'
    erklärung: string
    quellen: string[]
  }[]
  videoLink?: string | JSX.Element
  zusammenfassung?: string
}

// Beispieldaten (später durch API-Calls ersetzt)
const reden: Rede[] = [
  {
    id: '21',
    titel: 'Rede zur Klimapolitik 2025',
    datum: '2025-01-10',
    redner: 'Robert Habeck',
    partei: 'Grüne',
    thema: 'Klimaschutz',
    faktcheck: [
      {
        aussage: 'Deutschland wird bis 2030 klimaneutral',
        bewertung: 'teilweise wahr',
        erklärung: 'Ambitioniertes Ziel, erfordert jedoch erhebliche Anstrengungen.',
        quellen: ['Umweltbundesamt', 'Eurostat'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/klimapolitik-2025',
  },
  {
    id: '22',
    titel: 'Debatte zur Wirtschaftspolitik 2025',
    datum: '2025-01-15',
    redner: 'Christian Lindner',
    partei: 'FDP',
    thema: 'Wirtschaft',
    faktcheck: [
      {
        aussage: 'Die Wirtschaft wächst um 3% jährlich',
        bewertung: 'teilweise wahr',
        erklärung: 'Prognosen sind optimistisch, aber nicht garantiert.',
        quellen: ['Bundesfinanzministerium', 'Sachverständigenrat'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/wirtschaftspolitik-2025',
  },
  {
    id: '23',
    titel: 'Rede zur sozialen Gerechtigkeit 2025',
    datum: '2025-01-20',
    redner: 'Sahra Wagenknecht',
    partei: 'BSW',
    thema: 'Soziales',
    faktcheck: [
      {
        aussage: 'Die soziale Ungleichheit nimmt ab',
        bewertung: 'falsch',
        erklärung: 'Statistiken zeigen eine Zunahme der Ungleichheit.',
        quellen: ['Statistisches Bundesamt', 'Institut für Arbeitsmarkt- und Berufsforschung'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/soziale-gerechtigkeit-2025',
  },
  {
    id: '24',
    titel: 'Debatte zur Migrationspolitik 2025',
    datum: '2025-01-25',
    redner: 'Friedrich Merz',
    partei: 'CDU',
    thema: 'Migration',
    faktcheck: [
      {
        aussage: 'Deutschland hat die meisten Asylanträge in der EU',
        bewertung: 'teilweise wahr',
        erklärung: 'In absoluten Zahlen ja, pro Kopf jedoch nicht.',
        quellen: ['UNHCR', 'Eurostat'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/migrationspolitik-2025',
  },
  {
    id: '25',
    titel: 'Rede zur Gesundheitspolitik 2025',
    datum: '2025-01-30',
    redner: 'Karl Lauterbach',
    partei: 'SPD',
    thema: 'Gesundheit',
    faktcheck: [
      {
        aussage: 'Die Gesundheitsreform wird 10.000 Arbeitsplätze schaffen',
        bewertung: 'falsch',
        erklärung: 'Die genaue Zahl ist unklar und umstritten.',
        quellen: ['Bundesgesundheitsministerium', 'Deutsche Krankenhausgesellschaft'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/gesundheitspolitik-2025',
  },
  {
    id: '26',
    titel: 'Debatte zur Digitalisierung 2025',
    datum: '2025-01-05',
    redner: 'Dorothee Bär',
    partei: 'CSU',
    thema: 'Digitalisierung',
    faktcheck: [
      {
        aussage: 'Deutschland ist führend in der KI-Forschung',
        bewertung: 'teilweise wahr',
        erklärung: 'In einigen Bereichen ja, aber nicht in allen.',
        quellen: ['EU-Digitalindex', 'Bitkom'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/digitalisierung-2025',
  },
  {
    id: '27',
    titel: 'Rede zur Verteidigungspolitik 2025',
    datum: '2025-01-10',
    redner: 'Marie-Agnes Strack-Zimmermann',
    partei: 'FDP',
    thema: 'Verteidigung',
    faktcheck: [
      {
        aussage: 'Die Bundeswehr ist voll einsatzbereit',
        bewertung: 'teilweise wahr',
        erklärung: 'Es gibt noch immer Ausrüstungsmängel.',
        quellen: ['Wehrbeauftragter des Bundestages', 'Bundesverteidigungsministerium'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/verteidigungspolitik-2025',
  },
  {
    id: '28',
    titel: 'Debatte zum Klimaschutz 2025',
    datum: '2025-01-15',
    redner: 'Annalena Baerbock',
    partei: 'Grüne',
    thema: 'Klimaschutz',
    faktcheck: [
      {
        aussage: 'Das 1,5-Grad-Ziel ist erreichbar',
        bewertung: 'teilweise wahr',
        erklärung: 'Technisch möglich, aber erfordert sofortige Maßnahmen.',
        quellen: ['IPCC', 'Deutsches Klimakonsortium'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/klimaschutz-2025',
  },
  {
    id: '29',
    titel: 'Rede zur Rentenpolitik 2025',
    datum: '2025-01-20',
    redner: 'Hubertus Heil',
    partei: 'SPD',
    thema: 'Soziales',
    faktcheck: [
      {
        aussage: 'Die Rente ist bis 2050 sicher',
        bewertung: 'teilweise wahr',
        erklärung: 'Die Grundsicherung ist gewährleistet, das Rentenniveau könnte sinken.',
        quellen: ['Deutsche Rentenversicherung', 'Bundesarbeitsministerium'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/rentenpolitik-2025',
  },
  {
    id: '30',
    titel: 'Debatte zur Bildungspolitik 2025',
    datum: '2025-01-25',
    redner: 'Bettina Stark-Watzinger',
    partei: 'FDP',
    thema: 'Bildung',
    faktcheck: [
      {
        aussage: 'Deutschland investiert mehr in Bildung als je zuvor',
        bewertung: 'wahr',
        erklärung: 'Die Ausgaben sind gestiegen, aber im internationalen Vergleich noch niedrig.',
        quellen: ['OECD', 'Kultusministerkonferenz'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/bildungspolitik-2025',
  },
  {
    id: '31',
    titel: 'Rede zur Europapolitik 2025',
    datum: '2025-01-30',
    redner: 'Norbert Röttgen',
    partei: 'CDU',
    thema: 'Europa',
    faktcheck: [
      {
        aussage: 'Die EU-Erweiterung stärkt die Handlungsfähigkeit',
        bewertung: 'teilweise wahr',
        erklärung: 'Reformen sind notwendig, um die Handlungsfähigkeit zu sichern.',
        quellen: ['EU-Kommission', 'European Council on Foreign Relations'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/europapolitik-2025',
  },
  {
    id: '32',
    titel: 'Debatte zur Energiepolitik 2025',
    datum: '2025-01-05',
    redner: 'Robert Habeck',
    partei: 'Grüne',
    thema: 'Energie',
    faktcheck: [
      {
        aussage: 'Deutschland erreicht 90% erneuerbaren Strom bis 2030',
        bewertung: 'teilweise wahr',
        erklärung: 'Ambitioniertes Ziel, erfordert beschleunigten Ausbau.',
        quellen: ['Bundeswirtschaftsministerium', 'Fraunhofer ISE'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/energiepolitik-2025',
  },
  {
    id: '33',
    titel: 'Rede zur Verkehrspolitik 2025',
    datum: '2025-01-10',
    redner: 'Volker Wissing',
    partei: 'FDP',
    thema: 'Verkehr',
    faktcheck: [
      {
        aussage: 'E-Fuels sind die Zukunft der Mobilität',
        bewertung: 'teilweise wahr',
        erklärung: 'E-Fuels sind klimaneutral, aber weniger effizient.',
        quellen: ['Umweltbundesamt', 'Agora Verkehrswende'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/verkehrspolitik-2025',
  },
  {
    id: '34',
    titel: 'Debatte zur Innenpolitik 2025',
    datum: '2025-01-15',
    redner: 'Nancy Faeser',
    partei: 'SPD',
    thema: 'Inneres',
    faktcheck: [
      {
        aussage: 'Die Kriminalität in Deutschland sinkt',
        bewertung: 'wahr',
        erklärung: 'Langfristige Trends zeigen einen Rückgang.',
        quellen: ['Bundeskriminalamt', 'Polizeiliche Kriminalstatistik'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/innenpolitik-2025',
  },
  {
    id: '35',
    titel: 'Rede zur Agrarpolitik 2025',
    datum: '2025-01-20',
    redner: 'Cem Özdemir',
    partei: 'Grüne',
    thema: 'Landwirtschaft',
    faktcheck: [
      {
        aussage: 'Bio-Landwirtschaft kann die Welternährung sichern',
        bewertung: 'teilweise wahr',
        erklärung: 'Bio ist ein Teil der Lösung, aber nicht die einzige.',
        quellen: ['FAO', 'Thünen-Institut'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/agrarpolitik-2025',
  },
  {
    id: '36',
    titel: 'Debatte zur Familienpolitik 2025',
    datum: '2025-01-25',
    redner: 'Lisa Paus',
    partei: 'Grüne',
    thema: 'Familie',
    faktcheck: [
      {
        aussage: 'Die Kindergrundsicherung wird Kinderarmut halbieren',
        bewertung: 'teilweise wahr',
        erklärung: 'Positive Effekte sind zu erwarten, aber nicht garantiert.',
        quellen: ['Bundesfamilienministerium', 'DIW Berlin'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/familienpolitik-2025',
  },
  {
    id: '37',
    titel: 'Rede zur Wohnungspolitik 2025',
    datum: '2025-01-30',
    redner: 'Kevin Kühnert',
    partei: 'SPD',
    thema: 'Wohnen',
    faktcheck: [
      {
        aussage: 'Wir brauchen 500.000 neue Wohnungen pro Jahr',
        bewertung: 'wahr',
        erklärung: 'Experten halten diese Zahl für notwendig.',
        quellen: ['Pestel-Institut', 'Bundesbauministerium'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/wohnungspolitik-2025',
  },
  {
    id: '38',
    titel: 'Debatte zur Außenpolitik 2025',
    datum: '2025-01-05',
    redner: 'Annalena Baerbock',
    partei: 'Grüne',
    thema: 'Außenpolitik',
    faktcheck: [
      {
        aussage: 'China bleibt ein systemischer Rivale',
        bewertung: 'wahr',
        erklärung: 'Die EU sieht China weiterhin als Rivalen.',
        quellen: ['EU-Strategie-Papier', 'Auswärtiges Amt'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/aussenpolitik-2025',
  },
  {
    id: '39',
    titel: 'Rede zur Finanzpolitik 2025',
    datum: '2025-01-10',
    redner: 'Christian Lindner',
    partei: 'FDP',
    thema: 'Finanzen',
    faktcheck: [
      {
        aussage: 'Die Inflation ist unter Kontrolle',
        bewertung: 'teilweise wahr',
        erklärung: 'Risiken bestehen weiterhin, aber die Lage ist stabil.',
        quellen: ['Bundesbank', 'EZB'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/finanzpolitik-2025',
  },
  {
    id: '40',
    titel: 'Debatte zur Arbeitsmarktpolitik 2025',
    datum: '2025-01-15',
    redner: 'Hubertus Heil',
    partei: 'SPD',
    thema: 'Arbeit',
    faktcheck: [
      {
        aussage: 'Das Bürgergeld schafft Arbeitsanreize',
        bewertung: 'teilweise wahr',
        erklärung: 'In bestimmten Fällen ja, aber nicht systemisch.',
        quellen: ['IAB', 'Bundesagentur für Arbeit'],
      },
    ],
    videoLink: 'https://www.phoenix.de/reden/arbeitsmarktpolitik-2025',
  },
  {
    id: '41',
    titel: 'Vereinbarte Debatte zur Situation in Deutschland',
    datum: '2025-02-11',
    redner: 'Robert Habeck',
    partei: 'Grüne',
    thema: 'Allgemein',
    faktcheck: [
      {
        aussage: 'Die Debatte behandelt die aktuelle Situation in Deutschland',
        bewertung: 'wahr',
        erklärung: 'Die Debatte wurde im Bundestag geführt.',
        quellen: ['Bundestag'],
      },
    ],
    videoLink: 'https://webtv.bundestag.de/pservices/player/embed/nokey?e=bt-od&ep=69&a=144277506&c=7629441&t=https%3A%2F%2Fdbtg.tv%2Fcvid%2F7629441',
    zusammenfassung: `- **Klimakrise als existenzielle Bedrohung**: Der Klimawandel gefährdet Leben, Umwelt und zukünftige Generationen.  
- **Notwendigkeit schneller Maßnahmen**: Verzögerung führt zu irreversiblen Schäden, daher ist sofortiges Handeln entscheidend.  
- **Verantwortung der Politik und Gesellschaft**: Alle müssen ihren Beitrag leisten, insbesondere politische Entscheidungsträger.  
- **Forderung nach nachhaltigen Lösungen**: Investitionen in erneuerbare Energien, Ressourcenschonung und Klimagerechtigkeit sind essenziell.  
- **Appell an Solidarität und Engagement**: Nur durch gemeinsames, weltweites Handeln können die Klimaziele erreicht werden.`,
  },
]

// Bilder der Abgeordneten
const abgeordnetenBilder: { [key: string]: string } = {
  'Robert Habeck': '/images/abgeordnete/habeck.jpg',
  'Christian Lindner': '/images/abgeordnete/lindner.jpg',
  'Sahra Wagenknecht': '/images/abgeordnete/wagenknecht.jpg',
  'Friedrich Merz': '/images/abgeordnete/merz.jpg',
  'Karl Lauterbach': '/images/abgeordnete/lauterbach.jpg',
  'Dorothee Bär': '/images/abgeordnete/baer.jpg',
  'Marie-Agnes Strack-Zimmermann': '/images/abgeordnete/strack-zimmermann.jpg',
  'Annalena Baerbock': '/images/abgeordnete/baerbock.jpg',
  'Hubertus Heil': '/images/abgeordnete/heil.jpg',
  'Bettina Stark-Watzinger': '/images/abgeordnete/stark-watzinger.jpg',
  'Norbert Röttgen': '/images/abgeordnete/roettgen.jpg',
  'Volker Wissing': '/images/abgeordnete/wissing.jpg',
  'Nancy Faeser': '/images/abgeordnete/faeser.jpg',
  'Cem Özdemir': '/images/abgeordnete/oezdemir.jpg',
  'Lisa Paus': '/images/abgeordnete/paus.jpg',
  'Kevin Kühnert': '/images/abgeordnete/kuehnert.jpg'
}

export default function Reden(): JSX.Element {
  const [selectedThema, setSelectedThema] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterBewertung, setFilterBewertung] = useState<'alle' | 'falsch' | 'teilweise wahr'>('alle')
  const [visibleCount, setVisibleCount] = useState<number>(5)

  // Sortiere die Reden nach Datum, absteigend
  const sortedReden = [...reden].sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime())

  // Filtere Reden basierend auf Thema, Suchbegriff und Bewertung
  const filteredReden = sortedReden.filter(
    (rede) => {
      const matchesThema = !selectedThema || rede.thema === selectedThema
      const matchesSearch = !searchTerm ||
        rede.titel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rede.redner.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBewertung = filterBewertung === 'alle' ||
        rede.faktcheck.some(check => check.bewertung === filterBewertung)
      
      return matchesThema && matchesSearch && matchesBewertung
    }
  )

  // Erhöhe die Anzahl der sichtbaren Reden um 5
  const showMoreReden = () => {
    setVisibleCount((prev) => prev + 5)
  }

  return (
    <React.Fragment>
    <div className="min-h-screen bg-gradient-to-br from-[#38557c] via-white to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Reden-Analyse & Fact-Checking
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Analysieren Sie politische Reden und deren Wahrheitsgehalt
          </p>
        </div>

        {/* Suchleiste und Filter */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Suche nach Reden oder Rednern..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedThema}
            onChange={(e) => setSelectedThema(e.target.value)}
          >
            <option value="">Alle Themen</option>
            <option value="Klimaschutz">Klimaschutz</option>
            <option value="Migration">Migration</option>
            <option value="Wirtschaft">Wirtschaft</option>
              <option value="Soziales">Soziales</option>
              <option value="Gesundheit">Gesundheit</option>
              <option value="Digitalisierung">Digitalisierung</option>
              <option value="Verteidigung">Verteidigung</option>
              <option value="Europa">Europa</option>
              <option value="Energie">Energie</option>
              <option value="Verkehr">Verkehr</option>
              <option value="Inneres">Inneres</option>
              <option value="Landwirtschaft">Landwirtschaft</option>
              <option value="Familie">Familie</option>
              <option value="Wohnen">Wohnen</option>
              <option value="Außenpolitik">Außenpolitik</option>
              <option value="Finanzen">Finanzen</option>
              <option value="Arbeit">Arbeit</option>
              <option value="Bildung">Bildung</option>
            </select>
            <select
              className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={filterBewertung}
              onChange={(e) => setFilterBewertung(e.target.value as 'alle' | 'falsch' | 'teilweise wahr')}
            >
              <option value="alle">Alle Bewertungen</option>
              <option value="falsch">Falsche Aussagen</option>
              <option value="teilweise wahr">Teilweise wahre Aussagen</option>
          </select>
          </div>
        </div>

        {/* Redenliste */}
        <div className="mt-8 space-y-6">
              {filteredReden.slice(0, visibleCount).map((rede) => (
            <div
              key={rede.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Profilbild */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {abgeordnetenBilder[rede.redner] ? (
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url(${abgeordnetenBilder[rede.redner]})`,
                            width: '64px',
                            height: '64px'
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-500">
                          {rede.redner.split(' ').map(name => name[0]).join('')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-grow max-w-2xl">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {rede.titel}
                  </h2>
                            <div className="text-sm text-gray-500">
                  <p>
                        {rede.redner} (<span className={
                          rede.partei === 'CDU' ? 'text-black' :
                          rede.partei === 'CSU' ? 'text-black' :
                          rede.partei === 'SPD' ? 'text-[#E3000F]' :
                          rede.partei === 'Grüne' ? 'text-[#46962b]' :
                          rede.partei === 'FDP' ? 'text-[#FFED00]' :
                          rede.partei === 'BSW' ? 'text-[#FF0000]' :
                          rede.partei === 'AfD' ? 'text-[#009EE0]' :
                          rede.partei === 'Die Linke' ? 'text-[#BE3075]' :
                          'text-gray-500'
                        }>{rede.partei}</span>) - {rede.datum}
                  </p>
                              <p>Thema: {rede.thema}</p>
                            </div>
                          </div>
                          {rede.videoLink && (
                            <div className="flex-shrink-0 md:ml-6 md:mr-6">
                              {typeof rede.videoLink === 'string' ? (
                                <iframe
                                  width="320"
                                  height="180"
                                  src={rede.videoLink}
                                  allowFullScreen={true}
                                  referrerPolicy="origin"
                                  style={{ border: 'none' }}
                                  allow="geolocation; autoplay"
                                  sandbox="allow-same-origin allow-scripts allow-forms allow-modals allow-popups"
                                ></iframe>
                              ) : (
                                rede.videoLink
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                </div>

                {/* Fact-Checking */}
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Fact-Checking
                  </h3>
                  <div className="mt-2 space-y-4">
                      {rede.faktcheck.map((check, checkIndex) => (
                        <div key={checkIndex} className="border border-gray-200 rounded-lg p-4">
                        <p className="font-medium text-gray-900">
                          Aussage: {check.aussage}
                        </p>
                        <p
                          className={`mt-2 text-sm font-medium ${
                            check.bewertung === 'wahr'
                              ? 'text-green-600'
                              : check.bewertung === 'teilweise wahr'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          Bewertung: {check.bewertung}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          {check.erklärung}
                        </p>
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">Quellen: </span>
                          {check.quellen.join(', ')}
                        </div>
                      </div>
                    ))}
                      {rede.zusammenfassung && (
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold mb-2">
                            Zusammenfassung
                          </h3>
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown>{rede.zusammenfassung}</ReactMarkdown>
                          </div>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mehr anzeigen Button */}
          {visibleCount < filteredReden.length && (
            <div className="text-center mt-4">
              <button
                onClick={showMoreReden}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Mehr anzeigen
              </button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
} 