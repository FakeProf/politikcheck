'use client'

import { useState } from 'react'

interface Vorhaben {
  id: string
  titel: string
  partei: string
  thema: string
  beschreibung: string
  machbarkeit: {
    technisch: number
    finanziell: number
    rechtlich: number
    politisch: number
  }
  analyse: {
    vorteile: string[]
    nachteile: string[]
    alternativen: string[]
    expertenmeinungen: {
      experte: string
      institution: string
      meinung: string
    }[]
    quellen: string[]
  }
}

// Definiere Interface für erweiterte Daten
interface ErweiterteDaten {
  [key: string]: {
    vorteile: string[];
    nachteile: string[];
  };
}

// Beispieldaten (später durch API-Calls ersetzt)
const vorhaben: Vorhaben[] = [
  {
    id: '1',
    titel: 'Atomkraftwerke Wiederinbetriebnahme',
    partei: 'CDU',
    thema: 'Energie',
    beschreibung:
      'Wiederinbetriebnahme der stillgelegten Atomkraftwerke zur Sicherung der Energieversorgung',
    machbarkeit: {
      technisch: 0.6,
      finanziell: 0.4,
      rechtlich: 0.3,
      politisch: 0.2,
    },
    analyse: {
      vorteile: [
        'CO2-arme Energieerzeugung',
        'Grundlastfähigkeit',
        'Unabhängigkeit von Gasimporten',
      ],
      nachteile: [
        'Hohe Reaktivierungskosten',
        'Ungeklärte Endlagerung',
        'Sicherheitsbedenken',
      ],
      alternativen: [
        'Ausbau erneuerbarer Energien',
        'Energieeffizienzsteigerung',
        'Modernisierung bestehender Kraftwerke',
      ],
      expertenmeinungen: [
        {
          experte: 'Dr. Maria Schmidt',
          institution: 'Institut für Energiewirtschaft',
          meinung:
            'Eine Reaktivierung ist technisch möglich, aber wirtschaftlich fragwürdig.',
        },
      ],
      quellen: ['Bundesamt für Strahlenschutz', 'Wirtschaftsministerium'],
    },
  },
  {
    id: '2',
    titel: 'Digitales Bildungspaket',
    partei: 'FDP',
    thema: 'Bildung',
    beschreibung: 'Flächendeckende Digitalisierung aller Schulen mit Tablets, WLAN und digitalen Lernplattformen',
    machbarkeit: {
      technisch: 0.8,
      finanziell: 0.5,
      rechtlich: 0.7,
      politisch: 0.6,
    },
    analyse: {
      vorteile: [
        'Modernisierung des Bildungssystems',
        'Bessere Vorbereitung auf digitale Arbeitswelt',
        'Flexiblere Lernmöglichkeiten'
      ],
      nachteile: [
        'Hohe Initialkosten',
        'Fortbildungsbedarf bei Lehrkräften',
        'Technische Wartung erforderlich'
      ],
      alternativen: [
        'Hybrides Lernsystem',
        'BYOD (Bring Your Own Device)',
        'Schrittweise Digitalisierung'
      ],
      expertenmeinungen: [
        {
          experte: 'Prof. Dr. Thomas Weber',
          institution: 'Institut für Bildungsforschung',
          meinung: 'Die Digitalisierung der Schulen ist alternativlos, muss aber pädagogisch durchdacht sein.'
        }
      ],
      quellen: ['Kultusministerkonferenz', 'Digitalpakt Schule']
    }
  },
  {
    id: '3',
    titel: 'Soziales Klimageld',
    partei: 'SPD',
    thema: 'Soziales',
    beschreibung: 'Monatliche Ausgleichszahlung für Bürger zur Kompensation steigender CO2-Preise',
    machbarkeit: {
      technisch: 0.7,
      finanziell: 0.5,
      rechtlich: 0.8,
      politisch: 0.6,
    },
    analyse: {
      vorteile: [
        'Soziale Abfederung der Klimapolitik',
        'Direkte Entlastung der Bürger',
        'Erhöhung der Akzeptanz für Klimaschutz'
      ],
      nachteile: [
        'Hohe Staatsausgaben',
        'Komplexe Verwaltung',
        'Mögliche Fehlanreize'
      ],
      alternativen: [
        'Steuerliche Entlastung',
        'Zielgerichtete Förderung einkommensschwacher Haushalte',
        'Investitionszuschüsse für klimafreundliche Technologien'
      ],
      expertenmeinungen: [
        {
          experte: 'Dr. Lisa Müller',
          institution: 'Deutsches Institut für Wirtschaftsforschung',
          meinung: 'Ein Klimageld kann die Akzeptanz für Klimaschutzmaßnahmen erhöhen, muss aber zielgenau ausgestaltet sein.'
        }
      ],
      quellen: ['Umweltbundesamt', 'Sozialverband Deutschland']
    }
  },
  {
    id: '4',
    titel: 'Verkehrswende in Innenstädten',
    partei: 'Grüne',
    thema: 'Verkehr',
    beschreibung: 'Umgestaltung der Innenstädte zu autofreien Zonen mit Ausbau des ÖPNV und Radwegenetzes',
    machbarkeit: {
      technisch: 0.7,
      finanziell: 0.4,
      rechtlich: 0.6,
      politisch: 0.5,
    },
    analyse: {
      vorteile: [
        'Reduzierung von Emissionen',
        'Erhöhte Lebensqualität',
        'Mehr Sicherheit für Fußgänger und Radfahrer'
      ],
      nachteile: [
        'Widerstand von Einzelhandel und Autofahrern',
        'Hohe Umbaukosten',
        'Längere Umsetzungszeit'
      ],
      alternativen: [
        'Temporäre Verkehrsberuhigung',
        'Shared Space Konzepte',
        'Intelligente Verkehrssteuerung'
      ],
      expertenmeinungen: [
        {
          experte: 'Prof. Dr. Michael Schmidt',
          institution: 'Institut für Stadtplanung',
          meinung: 'Autofreie Innenstädte sind ein wichtiger Baustein für lebenswerte Städte, erfordern aber gute Alternativen.'
        }
      ],
      quellen: ['Verkehrsclub Deutschland', 'Umweltbundesamt']
    }
  },
  {
    id: '5',
    titel: 'KI-gestützte Verwaltung',
    partei: 'FDP',
    thema: 'Digitalisierung',
    beschreibung: 'Einführung von KI-Systemen in der öffentlichen Verwaltung zur Effizienzsteigerung',
    machbarkeit: {
      technisch: 0.6,
      finanziell: 0.5,
      rechtlich: 0.4,
      politisch: 0.6,
    },
    analyse: {
      vorteile: [
        'Schnellere Bearbeitung von Anträgen',
        'Kosteneinsparungen',
        'Bessere Verfügbarkeit'
      ],
      nachteile: [
        'Datenschutzbedenken',
        'Hohe Implementierungskosten',
        'Schulungsbedarf'
      ],
      alternativen: [
        'Teilautomatisierung',
        'Prozessoptimierung ohne KI',
        'Interkommunale Zusammenarbeit'
      ],
      expertenmeinungen: [
        {
          experte: 'Dr. Sarah Klein',
          institution: 'Kompetenzzentrum Digitale Verwaltung',
          meinung: 'KI bietet großes Potenzial für die Verwaltung, muss aber transparent und nachvollziehbar sein.'
        }
      ],
      quellen: ['Bundesministerium des Innern', 'Bitkom']
    }
  },
  {
    id: '6',
    titel: 'Pflege-Bürgergeld',
    partei: 'Die Linke',
    thema: 'Gesundheit',
    beschreibung: 'Einführung eines steuerfinanzierten Pflege-Bürgergeldes für pflegende Angehörige',
    machbarkeit: {
      technisch: 0.8,
      finanziell: 0.4,
      rechtlich: 0.7,
      politisch: 0.5,
    },
    analyse: {
      vorteile: [
        'Entlastung pflegender Angehöriger',
        'Anerkennung der Pflegearbeit',
        'Reduzierung von Altersarmut'
      ],
      nachteile: [
        'Hohe Kosten für öffentliche Haushalte',
        'Komplexe Antragsverfahren',
        'Mögliche Fehlanreize'
      ],
      alternativen: [
        'Ausbau professioneller Pflegedienste',
        'Zeitwertkonten für Pflege',
        'Stärkung der Pflegeversicherung'
      ],
      expertenmeinungen: [
        {
          experte: 'Prof. Dr. Anna Wagner',
          institution: 'Institut für Pflegewissenschaft',
          meinung: 'Ein Pflege-Bürgergeld könnte die häusliche Pflege stärken, muss aber mit weiteren Maßnahmen kombiniert werden.'
        }
      ],
      quellen: ['Pflegerat', 'Sozialverband VdK']
    }
  },
  {
    id: '7',
    titel: 'Wasserstoff-Infrastruktur',
    partei: 'CDU',
    thema: 'Wirtschaft',
    beschreibung: 'Aufbau einer flächendeckenden Wasserstoff-Infrastruktur für Industrie und Verkehr',
    machbarkeit: {
      technisch: 0.6,
      finanziell: 0.4,
      rechtlich: 0.7,
      politisch: 0.7,
    },
    analyse: {
      vorteile: [
        'Förderung klimaneutraler Industrie',
        'Neue Arbeitsplätze',
        'Technologieführerschaft'
      ],
      nachteile: [
        'Hohe Investitionskosten',
        'Energieverluste bei Herstellung',
        'Technische Herausforderungen'
      ],
      alternativen: [
        'Fokus auf Batterietechnologie',
        'Dezentrale Lösungen',
        'Internationale Kooperationen'
      ],
      expertenmeinungen: [
        {
          experte: 'Dr. Frank Meyer',
          institution: 'Forschungszentrum Energietechnik',
          meinung: 'Wasserstoff ist ein wichtiger Baustein der Energiewende, aber nicht für alle Anwendungen die beste Lösung.'
        }
      ],
      quellen: ['Nationale Wasserstoffstrategie', 'Fraunhofer-Institut']
    }
  },
  {
    id: '8',
    titel: 'Mietpreisbremse 2.0',
    partei: 'SPD',
    thema: 'Wohnen',
    beschreibung: 'Verschärfung der Mietpreisbremse und Ausweitung auf alle Großstädte',
    machbarkeit: {
      technisch: 0.9,
      finanziell: 0.8,
      rechtlich: 0.5,
      politisch: 0.4,
    },
    analyse: {
      vorteile: [
        'Dämpfung der Mietpreisentwicklung',
        'Schutz der Mieter',
        'Erhalt sozialer Durchmischung'
      ],
      nachteile: [
        'Rückgang von Investitionen',
        'Ausweicheffekte',
        'Rechtliche Unsicherheiten'
      ],
      alternativen: [
        'Förderung von Neubau',
        'Kommunaler Wohnungsbau',
        'Baulandmobilisierung'
      ],
      expertenmeinungen: [
        {
          experte: 'Prof. Dr. Julia Becker',
          institution: 'Institut für Wohnungsmarktforschung',
          meinung: 'Die Mietpreisbremse kann kurzfristig wirken, löst aber nicht die strukturellen Probleme des Wohnungsmarkts.'
        }
      ],
      quellen: ['Deutscher Mieterbund', 'Bundesbauministerium']
    }
  },
  {
    id: '9',
    titel: 'Pflichtjahr für Jugendliche',
    partei: 'CDU',
    thema: 'Gesellschaft',
    beschreibung: 'Einführung eines verpflichtenden sozialen oder ökologischen Jahres nach der Schule',
    machbarkeit: {
      technisch: 0.8,
      finanziell: 0.5,
      rechtlich: 0.4,
      politisch: 0.3,
    },
    analyse: {
      vorteile: [
        'Stärkung des gesellschaftlichen Zusammenhalts',
        'Berufsorientierung',
        'Unterstützung sozialer Einrichtungen'
      ],
      nachteile: [
        'Eingriff in persönliche Freiheit',
        'Verzögerung der Ausbildung',
        'Organisatorischer Aufwand'
      ],
      alternativen: [
        'Freiwilligendienst mit Anreizen',
        'Duales Orientierungsjahr',
        'Ausbau bestehender Freiwilligendienste'
      ],
      expertenmeinungen: [
        {
          experte: 'Dr. Martin Krause',
          institution: 'Deutsches Jugendinstitut',
          meinung: 'Ein Pflichtjahr könnte wichtige Impulse setzen, freiwillige Angebote wären aber vorzuziehen.'
        }
      ],
      quellen: ['Bundesjugendring', 'Sozialverbände']
    }
  },
  {
    id: '10',
    titel: 'Ernährungswende',
    partei: 'Grüne',
    thema: 'Landwirtschaft',
    beschreibung: 'Umstellung der Landwirtschaftsförderung auf 100% Bio-Landwirtschaft bis 2035',
    machbarkeit: {
      technisch: 0.7,
      finanziell: 0.4,
      rechtlich: 0.6,
      politisch: 0.3,
    },
    analyse: {
      vorteile: [
        'Klimaschutz in der Landwirtschaft',
        'Besserer Tierschutz',
        'Gesündere Ernährung'
      ],
      nachteile: [
        'Höhere Lebensmittelpreise',
        'Ertragseinbußen',
        'Internationale Wettbewerbsnachteile'
      ],
      alternativen: [
        'Parallelsystem konventionell/bio',
        'Fokus auf regionale Erzeugung',
        'Technologieoffene Nachhaltigkeitskriterien'
      ],
      expertenmeinungen: [
        {
          experte: 'Prof. Dr. Hans Meyer',
          institution: 'Agrarinstitut',
          meinung: 'Eine vollständige Umstellung auf Bio ist ambitioniert, aber mit entsprechenden Übergangsfristen machbar.'
        }
      ],
      quellen: ['Bundeslandwirtschaftsministerium', 'Bioland']
    }
  },
  {
    id: '11',
    titel: 'Grundeinkommen für Künstler',
    partei: 'Die Linke',
    thema: 'Kultur',
    beschreibung: 'Einführung eines bedingungslosen Grundeinkommens für freischaffende Künstler',
    machbarkeit: {
      technisch: 0.8,
      finanziell: 0.4,
      rechtlich: 0.6,
      politisch: 0.4,
    },
    analyse: {
      vorteile: [
        'Sicherung kultureller Vielfalt',
        'Soziale Absicherung von Künstlern',
        'Förderung der freien Kunst'
      ],
      nachteile: [
        'Hohe Kosten',
        'Abgrenzungsprobleme',
        'Mögliche Fehlanreize'
      ],
      alternativen: [
        'Projektbezogene Förderung',
        'Stipendienprogramme',
        'Sozialversicherung für Künstler stärken'
      ],
      expertenmeinungen: [
        {
          experte: 'Dr. Claudia Schneider',
          institution: 'Kulturpolitische Gesellschaft',
          meinung: 'Ein Grundeinkommen für Künstler könnte die kulturelle Entwicklung fördern, muss aber klar definiert sein.'
        }
      ],
      quellen: ['Deutscher Kulturrat', 'Künstlersozialkasse']
    }
  },
  {
    id: '12',
    titel: 'Energieautarke Kommunen',
    partei: 'Grüne',
    thema: 'Energie',
    beschreibung: 'Förderung dezentraler Energieversorgung durch kommunale Energiegenossenschaften und Bürgerenergieprojekte',
    machbarkeit: {
      technisch: 0.8,
      finanziell: 0.6,
      rechtlich: 0.7,
      politisch: 0.6,
    },
    analyse: {
      vorteile: [
        'Stärkung lokaler Wirtschaftskreisläufe',
        'Höhere Versorgungssicherheit',
        'Bürgerbeteiligung an der Energiewende'
      ],
      nachteile: [
        'Hoher Koordinationsaufwand',
        'Unterschiedliche lokale Voraussetzungen',
        'Anfängliche Investitionskosten'
      ],
      alternativen: [
        'Regionale Energieverbünde',
        'Zentrale Steuerung durch Energieversorger',
        'Public-Private-Partnerships'
      ],
      expertenmeinungen: [
        {
          experte: 'Prof. Dr. Andrea Weber',
          institution: 'Institut für dezentrale Energiesysteme',
          meinung: 'Dezentrale Energieversorgung erhöht die Resilienz des Gesamtsystems und schafft lokale Wertschöpfung.'
        }
      ],
      quellen: ['Agentur für Erneuerbare Energien', 'Deutscher Städte- und Gemeindebund']
    }
  },
  // Weitere Vorhaben hier...
]

// Erweiterte Vor- und Nachteile für jedes Vorhaben
const erweiterteDaten: ErweiterteDaten = {
  '1': {
    vorteile: [
      'Reduzierung der Abhängigkeit von fossilen Brennstoffen',
      'Stabilisierung des Stromnetzes',
      'Technologische Expertise bleibt erhalten',
      'Arbeitsplätze in der Nuklearindustrie',
      'Mögliche Exportchancen für Technologie'
    ],
    nachteile: [
      'Langfristige Folgekosten',
      'Gesellschaftliche Widerstände',
      'Versicherungskosten',
      'Technologische Abhängigkeiten',
      'Internationale Bedenken'
    ]
  },
  '2': {
    vorteile: [
      'Individualisiertes Lernen möglich',
      'Internationale Vernetzung',
      'Ressourceneinsparung durch digitale Materialien',
      'Verbesserte Datenverwaltung',
      'Erleichterter Fernunterricht'
    ],
    nachteile: [
      'Datenschutzrisiken',
      'Abhängigkeit von Technologie',
      'Soziale Isolation möglich',
      'Erhöhte Bildschirmzeit',
      'Technische Ausfallrisiken'
    ]
  }
  // Weitere erweiterte Daten für andere Vorhaben...
}

type SortOption = 'name' | 'partei' | 'score' | 'gesamtscore' | 'technisch' | 'finanziell' | 'rechtlich' | 'politisch';

export default function Umsetzbarkeit() {
  const [selectedThema, setSelectedThema] = useState<string>('')
  const [selectedPartei, setSelectedPartei] = useState<string>('')
  const [displayCount, setDisplayCount] = useState(5)
  const [showTooltip, setShowTooltip] = useState<{ [key: string]: boolean }>({})
  const [sortBy, setSortBy] = useState<SortOption>('gesamtscore')
  const [expandedDetails, setExpandedDetails] = useState<{ [key: string]: boolean }>({})

  // Berechne den Gesamtscore für ein Vorhaben
  const calculateScore = (vorhaben: Vorhaben) => {
    const { technisch, finanziell, rechtlich, politisch } = vorhaben.machbarkeit
    return (technisch + finanziell + rechtlich + politisch) / 4 * 100
  }

  // Sortiere und filtere die Vorhaben
  const sortedAndFilteredVorhaben = vorhaben
    .filter(
    (v) =>
      (!selectedThema || v.thema === selectedThema) &&
      (!selectedPartei || v.partei === selectedPartei)
  )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.titel.localeCompare(b.titel)
        case 'partei':
          return a.partei.localeCompare(b.partei)
        case 'gesamtscore':
          return calculateScore(b) - calculateScore(a)
        case 'technisch':
        case 'finanziell':
        case 'rechtlich':
        case 'politisch':
          return b.machbarkeit[sortBy] - a.machbarkeit[sortBy]
        default:
          return 0
      }
    })

  const displayedVorhaben = sortedAndFilteredVorhaben.slice(0, displayCount)
  const hasMore = sortedAndFilteredVorhaben.length > displayCount

  return (
    <div className="min-h-screen bg-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Umsetzbarkeit von Wahlversprechen
          </h1>
          <p className="mt-3 text-lg text-slate-700">
            Analyse und Bewertung politischer Vorhaben
          </p>
        </div>

        {/* Filter */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
          <select
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedThema}
            onChange={(e) => setSelectedThema(e.target.value)}
          >
            <option value="">Alle Themen</option>
              <option value="Bildung">Bildung</option>
              <option value="Digitalisierung">Digitalisierung</option>
            <option value="Energie">Energie</option>
              <option value="Gesellschaft">Gesellschaft</option>
              <option value="Gesundheit">Gesundheit</option>
            <option value="Klimaschutz">Klimaschutz</option>
              <option value="Kultur">Kultur</option>
              <option value="Landwirtschaft">Landwirtschaft</option>
              <option value="Soziales">Soziales</option>
              <option value="Verkehr">Verkehr</option>
            <option value="Wirtschaft">Wirtschaft</option>
              <option value="Wohnen">Wohnen</option>
          </select>
          <select
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedPartei}
            onChange={(e) => setSelectedPartei(e.target.value)}
          >
            <option value="">Alle Parteien</option>
            <option value="CDU">CDU</option>
            <option value="SPD">SPD</option>
            <option value="Grüne">Grüne</option>
              <option value="FDP">FDP</option>
              <option value="Die Linke">Die Linke</option>
            </select>
          </div>

          {/* Sortierung nach Umsetzbarkeit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 bg-white p-4 rounded-lg border border-gray-300">
              <span className="text-sm font-medium text-gray-700">Sortieren nach:</span>
              <select
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="gesamtscore">Gesamtscore</option>
                <option value="technisch">Technische Umsetzbarkeit</option>
                <option value="finanziell">Finanzielle Umsetzbarkeit</option>
                <option value="rechtlich">Rechtliche Umsetzbarkeit</option>
                <option value="politisch">Politische Umsetzbarkeit</option>
          </select>
            </div>
          </div>
        </div>

        {/* Vorhabenliste */}
        <div className="mt-8 space-y-6">
          {displayedVorhaben.map((vorhaben) => (
            <div
              key={vorhaben.id}
              className="bg-slate-50 rounded-lg shadow-md border border-slate-300 overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {vorhaben.titel}
                  </h2>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                      Score: {Math.round(calculateScore(vorhaben))}%
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {vorhaben.partei}
                  </span>
                </div>
                <p className="mt-2 text-gray-500">{vorhaben.beschreibung}</p>

                {/* Umsetzbarkeitsanalyse */}
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-gray-900">
                      Umsetzbarkeitsanalyse
                  </h3>
                    <div className="relative">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onMouseEnter={() => setShowTooltip(prev => ({ ...prev, [vorhaben.id]: true }))}
                        onMouseLeave={() => setShowTooltip(prev => ({ ...prev, [vorhaben.id]: false }))}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {showTooltip[vorhaben.id] && (
                        <div className="absolute z-10 w-72 px-4 py-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg shadow-lg -left-2 top-6">
                          <p>Die Prozentangaben basieren auf einer Bewertung durch Experten in vier Dimensionen:</p>
                          <ul className="mt-2 list-disc list-inside">
                            <li><span className="font-medium">Technisch:</span> Technische Umsetzbarkeit und vorhandene Infrastruktur</li>
                            <li><span className="font-medium">Finanziell:</span> Finanzielle Umsetzbarkeit und Wirtschaftlichkeit</li>
                            <li><span className="font-medium">Rechtlich:</span> Rechtliche Umsetzbarkeit und Regulierungen</li>
                            <li><span className="font-medium">Politisch:</span> Politische Umsetzbarkeit und gesellschaftliche Akzeptanz</li>
                          </ul>
                          <p className="mt-2">100% bedeutet optimal umsetzbar, 0% bedeutet praktisch nicht umsetzbar.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    {Object.entries(vorhaben.machbarkeit).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500 capitalize">
                            {key}
                          </span>
                          <span className="text-sm text-gray-500">
                            {Math.round(value * 100)}%
                          </span>
                        </div>
                        <div className="mt-1">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${value * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailanalyse */}
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-gray-900">Vorteile</h4>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                      {vorhaben.analyse.vorteile.slice(0, expandedDetails[vorhaben.id] ? undefined : 3).map((vorteil: string, index: number) => (
                        <li key={index}>{vorteil}</li>
                      ))}
                      {erweiterteDaten[vorhaben.id as keyof typeof erweiterteDaten]?.vorteile?.map((vorteil: string, index: number) => (
                        <li key={`extended-${index}`}>{vorteil}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Nachteile</h4>
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                      {vorhaben.analyse.nachteile.slice(0, expandedDetails[vorhaben.id] ? undefined : 3).map((nachteil: string, index: number) => (
                        <li key={index}>{nachteil}</li>
                      ))}
                      {erweiterteDaten[vorhaben.id as keyof typeof erweiterteDaten]?.nachteile?.map((nachteil: string, index: number) => (
                        <li key={`extended-${index}`}>{nachteil}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {(vorhaben.analyse.vorteile.length > 3 || vorhaben.analyse.nachteile.length > 3 || 
                  erweiterteDaten[vorhaben.id as keyof typeof erweiterteDaten]?.vorteile || 
                  erweiterteDaten[vorhaben.id as keyof typeof erweiterteDaten]?.nachteile) && (
                  <button
                    onClick={() => setExpandedDetails(prev => ({
                      ...prev,
                      [vorhaben.id]: !prev[vorhaben.id]
                    }))}
                    className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    {expandedDetails[vorhaben.id] ? 'Weniger Details anzeigen' : 'Mehr Details anzeigen'}
                  </button>
                )}

                {/* Expertenmeinungen */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900">Expertenmeinungen</h4>
                  <div className="mt-2 space-y-4">
                    {vorhaben.analyse.expertenmeinungen.map((experte, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <p className="text-sm text-gray-500">{experte.meinung}</p>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {experte.experte}, {experte.institution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quellen */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900">Quellen</h4>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                    {vorhaben.analyse.quellen.map((quelle, index) => (
                      <li key={index}>{quelle}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Mehr anzeigen Button */}
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setDisplayCount(displayCount + 5)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Weitere Vorhaben anzeigen
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 