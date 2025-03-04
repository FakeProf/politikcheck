'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo, Suspense } from 'react'

// Beispieldaten (später durch API-Calls ersetzt)
const parteien = {
  '1': { name: 'CDU/CSU', kurzname: 'Union' },
  '2': { name: 'SPD', kurzname: 'SPD' },
  '3': { name: 'Bündnis 90/Die Grünen', kurzname: 'Grüne' },
  '4': { name: 'FDP', kurzname: 'FDP' },
  '5': { name: 'Die Linke', kurzname: 'Linke' },
  '6': { name: 'AfD', kurzname: 'AfD' },
}

// Konstante Beispielwerte für die Machbarkeit
const EXAMPLE_MACHBARKEIT = {
  CDU: 0.7,
  SPD: 0.6,
  GRUENE: 0.8,
  FDP: 0.5,
  LINKE: 0.4,
  AFD: 0.3,
}

interface Unterpunkt {
  titel: string
  positionen: {
    [key: string]: string
  }
  machbarkeit?: number
  analyse?: string
}

interface ThemaData {
  parteiId: string
  unterpunkte: Unterpunkt[]
}

// Definiere den Typ für die Machbarkeitswerte
type ThemenWerte = {
  [key: string]: number;
  'Migration & Integration': number;
  Klimaschutz: number;
  Wirtschaft: number;
  Soziales: number;
  Bildung: number;
  Außenpolitik: number;
}

type Machbarkeitswerte = {
  [key: string]: ThemenWerte;
}

const machbarkeitswerte: Machbarkeitswerte = {
  'CDU/CSU': {
    'Migration & Integration': 65,
    'Klimaschutz': 45,
    'Wirtschaft': 75,
    'Soziales': 55,
    'Bildung': 60,
    'Außenpolitik': 70
  },
  'SPD': {
    'Migration & Integration': 70,
    'Klimaschutz': 75,
    'Wirtschaft': 70,
    'Soziales': 85,
    'Bildung': 85,
    'Außenpolitik': 75
  },
  'Grüne': {
    'Migration & Integration': 80,
    'Klimaschutz': 90,
    'Wirtschaft': 65,
    'Soziales': 75,
    'Bildung': 80,
    'Außenpolitik': 70
  },
  'FDP': {
    'Migration & Integration': 65,
    'Klimaschutz': 60,
    'Wirtschaft': 90,
    'Soziales': 60,
    'Bildung': 75,
    'Außenpolitik': 70
  },
  'AfD': {
    'Migration & Integration': 40,
    'Klimaschutz': 30,
    'Wirtschaft': 60,
    'Soziales': 45,
    'Bildung': 50,
    'Außenpolitik': 35
  },
  'Linke': {
    'Migration & Integration': 75,
    'Klimaschutz': 80,
    'Wirtschaft': 50,
    'Soziales': 90,
    'Bildung': 85,
    'Außenpolitik': 60
  }
};

// Ersetze die zufällige Berechnung durch feste Werte
const getMachbarkeitswert = (partei: string, thema: string) => {
  return machbarkeitswerte[partei]?.[thema] || 50;
};

export default function Vergleich() {
  return (
    <Suspense fallback={<div>Laden...</div>}>
      <InnerVergleich />
    </Suspense>
  );
}

function InnerVergleich() {
  const searchParams = useSearchParams();
  
  const selectedParteien = useMemo(() => {
    const parteienParam = searchParams.get('parteien');
    return parteienParam ? parteienParam.split(',') : [];
  }, [searchParams]);

  const selectedThema = searchParams.get('thema') || '';

  const [themenDaten, setThemenDaten] = useState<Record<string, ThemaData>>({});
  const [activeTab, setActiveTab] = useState<'positionen' | 'machbarkeit'>('positionen');

  // Simuliere API-Aufruf mit konstanten Werten
  useEffect(() => {
    const mockData: Record<string, ThemaData> = {}
    selectedParteien.forEach((parteiId) => {
      const partei = parteien[parteiId as keyof typeof parteien]
      const machbarkeitWert = EXAMPLE_MACHBARKEIT[partei.kurzname as keyof typeof EXAMPLE_MACHBARKEIT] || 0.5

      // Beispielreden für verschiedene Themen
      const themenBeispiele = {
        'Migration & Integration': [
          { 
            titel: 'Fachkräfteeinwanderung',
            positionen: {
              'CDU/CSU': 'Befürwortet gezielte Einwanderung von Fachkräften durch Punktesystem. Fokus auf qualifizierte Zuwanderung für den Arbeitsmarkt.',
              'SPD': 'Setzt sich für erleichterte Einwanderung von Fachkräften ein. Modernisierung des Einwanderungsrechts und Abbau bürokratischer Hürden.',
              'Grüne': 'Fordert umfassende Reform des Einwanderungsrechts. Erleichterter Zugang zum Arbeitsmarkt und vereinfachte Anerkennung ausländischer Abschlüsse.',
              'FDP': 'Plädiert für ein Punktesystem nach kanadischem Vorbild. Fokus auf wirtschaftliche Bedürfnisse und Qualifikationen.',
              'Linke': 'Setzt sich für offene Grenzen und erleichterte Arbeitsmigration ein. Kritisiert selektive Einwanderungspolitik.',
              'AfD': 'Strikte Begrenzung der Einwanderung. Nur hochqualifizierte Fachkräfte nach strengen Kriterien.',
            }
          },
          { 
            titel: 'Asylpolitik',
            positionen: {
              'CDU/CSU': 'Fordert strikte Trennung zwischen Asyl und Arbeitsmigration. Schnellere Verfahren und konsequente Rückführung.',
              'SPD': 'Bekennt sich zum Grundrecht auf Asyl. Setzt auf faire Verteilung in Europa und humane Aufnahmebedingungen.',
              'Grüne': 'Steht für humane Flüchtlingspolitik. Legale Fluchtwege, Seenotrettung und Reform des Dublin-Systems.',
              'FDP': 'Befürwortet geordnete Asylverfahren. Fokus auf Außengrenzschutz und europäische Lösungen.',
              'Linke': 'Fordert offene Grenzen für Schutzsuchende. Ablehnung von Abschiebungen und Asylrechtsverschärfungen.',
              'AfD': 'Grundlegende Änderung des Asylrechts. Ablehnung von Migration über das Asylsystem.',
            }
          }
        ],
        'Klimaschutz': [
          {
            titel: 'CO2-Bepreisung',
            positionen: {
              'CDU/CSU': 'Befürwortet marktwirtschaftliche CO2-Bepreisung. Sozialverträgliche Ausgestaltung mit Ausgleichsmaßnahmen.',
              'SPD': 'Unterstützt steigende CO2-Preise mit sozialem Ausgleich. Klimageld als Rückerstattung an Bürger.',
              'Grüne': 'Fordert deutlich höhere CO2-Preise. Einnahmen sollen als Energiegeld an Bürger zurückfließen.',
              'FDP': 'Setzt auf europäischen Emissionshandel. Ablehnung nationaler Alleingänge bei CO2-Bepreisung.',
              'Linke': 'Kritisiert CO2-Preis als unsozial. Fordert stattdessen ordnungsrechtliche Maßnahmen.',
              'AfD': 'Lehnt CO2-Bepreisung grundsätzlich ab. Bezweifelt menschengemachten Klimawandel.',
            }
          },
          {
            titel: 'Energiewende',
            positionen: {
              'CDU/CSU': 'Unterstützt Ausbau erneuerbarer Energien mit Fokus auf Wirtschaftlichkeit und Versorgungssicherheit.',
              'SPD': 'Strebt 100% erneuerbare Energien bis 2040 an. Fokus auf sozialverträglichen Umbau.',
              'Grüne': 'Fordert beschleunigten Ausstieg aus fossilen Energien. 100% erneuerbare Energien bis 2035.',
              'FDP': 'Setzt auf Technologieoffenheit und Marktwirtschaft in der Energiewende.',
              'Linke': 'Fordert schnellen Kohleausstieg und Vergesellschaftung der Energiekonzerne.',
              'AfD': 'Gegen Energiewende. Für Weiterbetrieb von Kohle- und Kernkraftwerken.',
            }
          }
        ],
        'Wirtschaft': [
          {
            titel: 'Digitalisierung',
            positionen: {
              'CDU/CSU': 'Fokus auf digitale Infrastruktur und E-Government. Förderung von KI und Zukunftstechnologien.',
              'SPD': 'Setzt auf digitale Teilhabe und Arbeitnehmerschutz. Ausbau digitaler Verwaltung.',
              'Grüne': 'Verbindet Digitalisierung mit Klimaschutz. Open Source und digitale Bürgerrechte.',
              'FDP': 'Maximale Förderung der Digitalisierung. Abbau von Bürokratie durch digitale Lösungen.',
              'Linke': 'Fordert gemeinwohlorientierte Digitalisierung. Kritik an Datenkonzernen.',
              'AfD': 'Unterstützt Digitalisierung unter nationaler Kontrolle. Skepsis gegenüber globalen Plattformen.',
            }
          }
        ],
        'Soziales': [
          {
            titel: 'Rentenreform',
            positionen: {
              'CDU/CSU': 'Setzt auf Kombination aus gesetzlicher und privater Vorsorge. Flexible Übergänge in Rente.',
              'SPD': 'Stabilisierung des Rentenniveaus. Einbeziehung aller in die gesetzliche Rente.',
              'Grüne': 'Bürgerfonds als zusätzliche Säule. Garantierente gegen Altersarmut.',
              'FDP': 'Flexible Altersvorsorge mit Aktienrente. Mehr Eigenverantwortung.',
              'Linke': 'Deutliche Erhöhung des Rentenniveaus. Solidarische Mindestrente.',
              'AfD': 'Fokus auf deutsche Staatsbürger. Familienorientierte Rentenpolitik.',
            }
          }
        ],
        'Bildung': [
          {
            titel: 'Digitale Bildung',
            positionen: {
              'CDU/CSU': 'Flächendeckender Ausbau der digitalen Infrastruktur an Schulen. Digitalpakt 2.0 mit erhöhten Mitteln.',
              'SPD': 'Digitale Grundausstattung für alle Schüler. Fokus auf digitale Kompetenzen und Medienpädagogik.',
              'Grüne': 'Open Source Software und digitale Lernplattformen. Datenschutzkonformer Zugang zu digitalen Bildungsangeboten.',
              'FDP': 'Digitale Bildung als Kernkompetenz. Ausstattung aller Schüler mit digitalen Endgeräten.',
              'Linke': 'Kostenlose digitale Endgeräte für alle. Kritischer Umgang mit digitalen Medien.',
              'AfD': 'Digitalisierung als Ergänzung zum klassischen Unterricht. Gegen übermäßige Technisierung.',
            }
          },
          {
            titel: 'Schulmodernisierung',
            positionen: {
              'CDU/CSU': 'Investitionsoffensive für moderne Schulgebäude. Beibehaltung des gegliederten Schulsystems.',
              'SPD': 'Ausbau von Ganztagsschulen. Modernisierung der Schulinfrastruktur mit Bundesmitteln.',
              'Grüne': 'Klimagerechte Sanierung von Schulgebäuden. Mehr multiprofessionelle Teams.',
              'FDP': 'Autonomie für Schulen bei Modernisierung. Leistungsorientierte Mittelvergabe.',
              'Linke': 'Massive Investitionen in Schulgebäude. Eine Schule für alle.',
              'AfD': 'Erhalt des klassischen Bildungssystems. Fokus auf Grundfertigkeiten.',
            }
          },
          {
            titel: 'Chancengleichheit',
            positionen: {
              'CDU/CSU': 'Förderung nach Begabung. Durchlässigkeit zwischen Bildungswegen.',
              'SPD': 'Gebührenfreie Bildung von der Kita bis zur Uni. Soziale Hürden abbauen.',
              'Grüne': 'Individuelle Förderung und inklusive Bildung. Abbau sozialer Benachteiligung.',
              'FDP': 'Chancengerechtigkeit durch Leistungsprinzip. Talentförderung unabhängig von Herkunft.',
              'Linke': 'Kostenfreie Bildung für alle. Abschaffung des mehrgliedrigen Schulsystems.',
              'AfD': 'Leistungsorientierte Förderung. Ablehnung von Quotenregelungen.',
            }
          }
        ],
        'Außenpolitik': [
          {
            titel: 'EU-Politik',
            positionen: {
              'CDU/CSU': 'Starkes Europa als Wertegemeinschaft. Reform der EU-Institutionen für mehr Effizienz.',
              'SPD': 'Vertiefte europäische Integration. Soziales Europa und gemeinsame Außenpolitik.',
              'Grüne': 'Föderales Europa mit starkem Parlament. Klimaneutrale EU-Wirtschaft.',
              'FDP': 'Subsidiarität und Eigenverantwortung. Reform der Währungsunion.',
              'Linke': 'Soziales und friedliches Europa. Kritik an Militarisierung und Neoliberalismus.',
              'AfD': 'Rückbau der EU zu Wirtschaftsgemeinschaft. Ablehnung weiterer Integration.',
            }
          },
          {
            titel: 'Verteidigungspolitik',
            positionen: {
              'CDU/CSU': 'Stärkung der Bundeswehr. Erfüllung des 2%-Ziels der NATO.',
              'SPD': 'Modernisierung der Bundeswehr. Europäische Verteidigungsunion.',
              'Grüne': 'Fokus auf Cyberabwehr und neue Bedrohungen. Parlamentsvorbehalt stärken.',
              'FDP': 'Effiziente Bundeswehr durch Modernisierung. Europäische Armee als Ziel.',
              'Linke': 'Ablehnung von Auslandseinsätzen. Abrüstung statt Aufrüstung.',
              'AfD': 'Wiedereinführung der Wehrpflicht. Nationale Verteidigung stärken.',
            }
          },
          {
            titel: 'Entwicklungszusammenarbeit',
            positionen: {
              'CDU/CSU': 'Entwicklungshilfe an Bedingungen knüpfen. Fokus auf wirtschaftliche Zusammenarbeit.',
              'SPD': 'Erhöhung der Entwicklungshilfe. Bekämpfung von Fluchtursachen.',
              'Grüne': 'Klimagerechtigkeit und faire Handelspolitik. Stärkung lokaler Strukturen.',
              'FDP': 'Entwicklungszusammenarbeit durch Handel. Hilfe zur Selbsthilfe.',
              'Linke': 'Massive Aufstockung der Entwicklungshilfe. Schuldenerlass für ärmste Länder.',
              'AfD': 'Entwicklungshilfe stark reduzieren. Fokus auf deutsche Interessen.',
            }
          }
        ],
      }

      const aktuelleThemenBeispiele = themenBeispiele[selectedThema as keyof typeof themenBeispiele] || []

      mockData[parteiId] = {
        parteiId,
        unterpunkte: aktuelleThemenBeispiele.map((beispiel) => ({
          titel: beispiel.titel,
          positionen: beispiel.positionen,
          machbarkeit: machbarkeitWert * (0.7 + Math.random() * 0.3), // Variiere die Machbarkeit etwas
          analyse: 'Detaillierte Analyse der Umsetzbarkeit...',
        })),
      }
    })
    setThemenDaten(mockData)
  }, [selectedParteien, selectedThema])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Vergleich: {selectedThema}
          </h1>
        </div>

        {/* Tab-Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex justify-center space-x-8">
            <button
              onClick={() => setActiveTab('positionen')}
              className={`${
                activeTab === 'positionen'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Positionen
            </button>
            <button
              onClick={() => setActiveTab('machbarkeit')}
              className={`${
                activeTab === 'machbarkeit'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Machbarkeitsanalyse
            </button>
          </nav>
        </div>

        {/* Vergleichstabelle */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
            {selectedParteien.map((parteiId) => {
              const partei = parteien[parteiId as keyof typeof parteien]
              const data = themenDaten[parteiId]

              return (
                <div key={parteiId} className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {partei.name}
                  </h2>
                  {activeTab === 'positionen' ? (
                    <div className="space-y-6">
                      {data?.unterpunkte.map((unterpunkt, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            {unterpunkt.titel}
                          </h3>
                          <p className="text-gray-700">
                            {unterpunkt.positionen[partei.name]}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {data?.unterpunkte.map((unterpunkt, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {unterpunkt.titel}
                          </h3>
                          <div className="flex items-center space-x-4">
                            <div className="flex-grow">
                              <div className="h-4 bg-gray-200 rounded-full">
                                <div
                                  className="h-4 bg-green-500 rounded-full"
                                  style={{
                                    width: `${getMachbarkeitswert(partei.name, selectedThema)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              {getMachbarkeitswert(partei.name, selectedThema)}%
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">
                            {unterpunkt.analyse || 'Analyse folgt...'}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 