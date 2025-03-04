'use client'

import { useState } from 'react'

interface WahlprogrammLeicht {
  partei: string
  logo: string
  hauptthemen: {
    titel: string
    erklaerung: string
    wichtigsteZiele: string[]
  }[]
}

// Beispieldaten (später durch API-Calls ersetzt)
const wahlprogramme: WahlprogrammLeicht[] = [
  {
    partei: 'CDU/CSU',
    logo: '🔵',
    hauptthemen: [
      {
        titel: 'Arbeit und Wirtschaft',
        erklaerung: 'Die CDU/CSU möchte, dass Deutschland wirtschaftlich stark bleibt. Das bedeutet: Menschen sollen gute Arbeitsplätze haben und Firmen sollen erfolgreich sein können. Dafür will die CDU/CSU weniger Regeln für Unternehmen machen und neue Technologien fördern. Auch soll das Geld der Menschen mehr wert sein, indem die Preise nicht zu stark steigen.',
        wichtigsteZiele: [
          'Mehr Menschen sollen eine gute Arbeit finden, von der sie gut leben können',
          'Kleine Geschäfte und Firmen sollen weniger Formulare ausfüllen müssen und einfacher arbeiten können',
          'Die Preise im Supermarkt und für Energie sollen bezahlbar bleiben',
          'Deutschland soll neue Technologien entwickeln und damit Arbeitsplätze schaffen',
          'Arbeitnehmer sollen mehr Möglichkeiten haben, von zu Hause zu arbeiten'
        ],
      },
      {
        titel: 'Klima und Umwelt',
        erklaerung: 'Die CDU/CSU will die Umwelt und das Klima schützen. Aber dabei sollen die Menschen weiter gut leben und arbeiten können. Die Partei setzt auf neue Technologien und kluge Lösungen, die sowohl der Umwelt als auch der Wirtschaft helfen. Zum Beispiel sollen Häuser umweltfreundlicher werden und Autos sauberer fahren.',
        wichtigsteZiele: [
          'Neue Technologien entwickeln, die gut für die Umwelt sind und Arbeitsplätze schaffen',
          'Mehr Bäume pflanzen und Wälder schützen, damit die Luft sauberer wird',
          'Bessere Züge und Busse anbieten, damit weniger Menschen das Auto benutzen müssen',
          'Häuser so bauen und renovieren, dass sie weniger Energie verbrauchen',
          'Unterstützung für Menschen, die ihr Haus umweltfreundlicher machen wollen'
        ],
      },
    ],
  },
  {
    partei: 'SPD',
    logo: '🔴',
    hauptthemen: [
      {
        titel: 'Soziale Gerechtigkeit',
        erklaerung: 'Die SPD möchte, dass alle Menschen in Deutschland ein gutes Leben führen können. Das bedeutet: Jeder soll genug Geld zum Leben haben, eine gute Wohnung finden können und im Alter gut versorgt sein. Besonders wichtig ist der SPD, dass Menschen mit wenig Geld mehr Unterstützung bekommen. Auch sollen Familien mit Kindern besser unterstützt werden.',
        wichtigsteZiele: [
          'Der Mindestlohn soll erhöht werden, damit Menschen von ihrer Arbeit gut leben können',
          'Mehr bezahlbare Wohnungen bauen, damit alle ein Zuhause haben können',
          'Bessere Renten, damit alte Menschen nicht arm sind',
          'Mehr Geld für Familien mit Kindern, besonders wenn sie wenig verdienen',
          'Krankenhäuser und Pflegeeinrichtungen sollen besser ausgestattet werden'
        ],
      },
      {
        titel: 'Bildung',
        erklaerung: 'Die SPD will, dass alle Menschen die gleichen Chancen auf gute Bildung haben. Egal ob reich oder arm, alle Kinder sollen gut lernen können. Dafür sollen Schulen und Kitas besser werden. Auch Erwachsene sollen sich weiterbilden können, um bessere Arbeit zu finden. Die SPD möchte, dass Bildung kostenlos ist.',
        wichtigsteZiele: [
          'Kitas sollen kostenlos sein und genug gut ausgebildete Erzieher haben',
          'Schulen sollen modern sein, mit Computern und schnellem Internet',
          'Mehr Lehrer einstellen, damit Klassen kleiner werden können',
          'Ausbildung und Studium sollen besser unterstützt werden',
          'Mehr Möglichkeiten für Erwachsene, sich weiterzubilden'
        ],
      },
    ],
  },
  {
    partei: 'Bündnis 90/Die Grünen',
    logo: '🌻',
    hauptthemen: [
      {
        titel: 'Klimaschutz',
        erklaerung: 'Die Grünen wollen, dass wir besser mit unserer Umwelt umgehen. Sie haben einen Plan, wie Deutschland bis 2035 klimafreundlich werden kann. Das bedeutet: Weniger schädliche Gase in der Luft, mehr erneuerbare Energie wie Wind und Sonne, und besserer Schutz für Tiere und Pflanzen. Die Grünen wollen auch, dass Menschen gesünder leben können.',
        wichtigsteZiele: [
          'Viel mehr Strom aus Sonne und Wind gewinnen, statt aus Kohle und Gas',
          'Autos sollen elektrisch fahren und es soll bessere Radwege geben',
          'Gesundes und umweltfreundliches Essen soll günstiger werden',
          'Mehr Geld für Menschen, die ihr Haus klimafreundlich umbauen',
          'Besserer Schutz für Wälder, Tiere und Pflanzen'
        ],
      },
      {
        titel: 'Zusammenleben',
        erklaerung: 'Die Grünen möchten, dass alle Menschen friedlich zusammenleben können. Egal woher sie kommen, wie sie aussehen oder wen sie lieben. Sie wollen eine offene Gesellschaft, in der sich alle sicher fühlen. Auch sollen Menschen mit wenig Geld besser unterstützt werden. Die Grünen setzen sich für Gleichberechtigung und gegen Diskriminierung ein.',
        wichtigsteZiele: [
          'Alle Menschen sollen die gleichen Rechte und Chancen haben',
          'Mehr Unterstützung für Menschen, die wenig Geld haben',
          'Besserer Schutz vor Diskriminierung und Hass',
          'Mehr bezahlbare Wohnungen in den Städten',
          'Familien sollen besser unterstützt werden, egal wie sie zusammenleben'
        ],
      },
    ],
  },
  {
    partei: 'FDP',
    logo: '💛',
    hauptthemen: [
      {
        titel: 'Wirtschaft und Freiheit',
        erklaerung: 'Die FDP möchte, dass Menschen und Unternehmen mehr Freiheit haben. Sie will weniger Regeln und Steuern. Die FDP glaubt, dass Menschen selbst am besten wissen, was gut für sie ist. Unternehmen sollen einfacher arbeiten können. Die Digitalisierung soll schneller vorangehen.',
        wichtigsteZiele: [
          'Weniger Steuern für alle Menschen und Unternehmen',
          'Weniger Regeln und Vorschriften für Firmen',
          'Besseres Internet und mehr digitale Angebote',
          'Menschen sollen mehr von ihrem Geld behalten können',
          'Schulen und Ämter sollen moderner werden'
        ],
      },
      {
        titel: 'Bildung und Digitalisierung',
        erklaerung: 'Die FDP will das Bildungssystem verbessern und moderner machen. Jeder soll die Chance haben, etwas zu lernen und erfolgreich zu sein. Schulen sollen besser mit Computern und Internet ausgestattet werden. Die FDP möchte auch, dass Deutschland bei neuen Technologien führend wird.',
        wichtigsteZiele: [
          'Alle Schulen sollen gute Computer und schnelles Internet bekommen',
          'Schüler sollen mehr mit digitalen Medien lernen',
          'Jeder soll selbst entscheiden können, wie und was er lernt',
          'Mehr Unterstützung für Menschen, die sich weiterbilden möchten',
          'Deutschland soll bei neuen Technologien vorne sein'
        ],
      },
    ],
  },
  {
    partei: 'Die Linke',
    logo: '❤️',
    hauptthemen: [
      {
        titel: 'Soziale Gerechtigkeit',
        erklaerung: 'Die Linke möchte, dass der Unterschied zwischen Arm und Reich kleiner wird. Sie will, dass Menschen mit wenig Geld mehr bekommen. Reiche Menschen sollen mehr Steuern zahlen. Die Linke möchte auch, dass alle eine gute Gesundheitsversorgung haben.',
        wichtigsteZiele: [
          'Der Mindestlohn soll deutlich höher werden',
          'Reiche sollen mehr Steuern zahlen',
          'Alle sollen die gleiche gute Krankenversicherung haben',
          'Mehr bezahlbare Wohnungen für alle',
          'Bessere Unterstützung für Menschen ohne Arbeit'
        ],
      },
      {
        titel: 'Frieden und Zusammenleben',
        erklaerung: 'Die Linke will, dass es keinen Krieg gibt. Sie möchte weniger Geld für Waffen ausgeben. Stattdessen soll mehr Geld für Schulen, Krankenhäuser und arme Menschen da sein. Die Linke setzt sich auch für Flüchtlinge ein.',
        wichtigsteZiele: [
          'Weniger Geld für Waffen und Militär',
          'Mehr Hilfe für arme Länder',
          'Bessere Unterstützung für Flüchtlinge',
          'Alle Menschen sollen gleich behandelt werden',
          'Mehr Geld für Bildung und Gesundheit'
        ],
      },
    ],
  },
  {
    partei: 'AfD',
    logo: '🔷',
    hauptthemen: [
      {
        titel: 'Einwanderung',
        erklaerung: 'Die AfD möchte weniger Einwanderung nach Deutschland. Sie findet, dass nur Menschen kommen sollen, die hier arbeiten können. Die AfD will auch, dass mehr Menschen, die kein Recht haben hier zu sein, Deutschland wieder verlassen.',
        wichtigsteZiele: [
          'Strengere Regeln für Einwanderung',
          'Mehr Kontrollen an den Grenzen',
          'Nur Menschen aufnehmen, die hier arbeiten können',
          'Deutsche Kultur und Sprache bewahren',
          'Mehr Abschiebungen durchführen'
        ],
      },
      {
        titel: 'Traditionen und Familie',
        erklaerung: 'Die AfD möchte traditionelle Familien stärker unterstützen. Sie findet deutsche Traditionen wichtig und will sie bewahren. Die AfD ist gegen zu viele Veränderungen in der Gesellschaft.',
        wichtigsteZiele: [
          'Mehr Unterstützung für Familien mit Kindern',
          'Deutsche Traditionen bewahren',
          'Weniger Veränderungen in der Gesellschaft',
          'Mehr Wert auf deutsche Kultur legen',
          'Traditionelle Familien fördern'
        ],
      },
    ],
  },
  {
    partei: 'BSW',
    logo: '💗',
    hauptthemen: [
      {
        titel: 'Soziale Wirtschaft',
        erklaerung: 'Das BSW möchte, dass es den Menschen in Deutschland besser geht. Sie wollen, dass Arbeit besser bezahlt wird und die Preise nicht zu hoch sind. Das BSW findet auch, dass der Staat mehr für die Menschen tun soll.',
        wichtigsteZiele: [
          'Bessere Löhne für alle Arbeitnehmer',
          'Preise für wichtige Dinge sollen nicht zu hoch sein',
          'Mehr Unterstützung vom Staat für Menschen mit wenig Geld',
          'Renten sollen höher sein',
          'Bessere Gesundheitsversorgung für alle'
        ],
      },
      {
        titel: 'Frieden und Sicherheit',
        erklaerung: 'Das BSW will Frieden und gute Beziehungen zu allen Ländern. Sie finden, Deutschland soll weniger Geld für Waffen ausgeben. Stattdessen soll mehr Geld für die Menschen in Deutschland da sein.',
        wichtigsteZiele: [
          'Weniger Geld für Waffen ausgeben',
          'Gute Beziehungen zu allen Ländern haben',
          'Mehr Geld für Menschen in Deutschland',
          'Sichere Arbeitsplätze schaffen',
          'Bessere Unterstützung für arme Menschen'
        ],
      },
    ],
  },
  // Weitere Parteien hier...
]

export default function LeichteSprache() {
  const [selectedPartei, setSelectedPartei] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Wahlprogramme in Leichter Sprache
          </h1>
          <p className="text-xl text-gray-600">
            Hier finden Sie die wichtigsten Ziele der Parteien.
            Alles ist einfach erklärt.
          </p>
        </div>

        {/* Parteiauswahl */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {wahlprogramme.map((programm) => (
            <button
              key={programm.partei}
              onClick={() => setSelectedPartei(
                selectedPartei === programm.partei ? null : programm.partei
              )}
              className={`p-4 rounded-lg text-center transition-colors ${
                selectedPartei === programm.partei
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-3xl mb-2">{programm.logo}</div>
              <div className="font-medium">{programm.partei}</div>
            </button>
          ))}
        </div>

        {/* Programminhalte */}
        {selectedPartei ? (
          <div className="space-y-8">
            {wahlprogramme
              .find((p) => p.partei === selectedPartei)
              ?.hauptthemen.map((thema, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {thema.titel}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      {thema.erklaerung}
                    </p>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Das sind die wichtigsten Ziele:
                      </h3>
                      <ul className="list-disc list-inside space-y-2">
                        {thema.wichtigsteZiele.map((ziel, idx) => (
                          <li key={idx} className="text-lg text-gray-600">
                            {ziel}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg">
            Bitte wählen Sie eine Partei aus.
          </div>
        )}

        {/* Erklärung Leichte Sprache */}
        <div className="mt-12 bg-green-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Was ist Leichte Sprache?
          </h2>
          <p className="text-lg text-green-700">
            Leichte Sprache bedeutet:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-green-700">
            <li>Wir benutzen einfache Wörter</li>
            <li>Wir schreiben kurze Sätze</li>
            <li>Wir erklären schwierige Dinge genau</li>
            <li>Jeder soll die Texte verstehen können</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 