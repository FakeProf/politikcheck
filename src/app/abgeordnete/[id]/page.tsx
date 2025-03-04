'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Rede {
  id: string
  titel: string
  datum: string
  thema: string
  zusammenfassung: string
  faktcheck: {
    aussage: string
    bewertung: 'wahr' | 'teilweise wahr' | 'falsch'
    erklärung: string
  }[]
}

interface AbgeordnetenDaten {
  [key: string]: {
    name: string
    partei: string
    position: string
    wahlkreis: string
    schwerpunkte: string[]
    isFraktionsvorsitz: boolean
    score: {
      wert: number
      vorfaelle: Array<{
        datum: string
        beschreibung: string
        quelle: string
        plattform: string
      }>
    }
    vorhaben: Array<{
      titel: string
      beschreibung: string
      status: string
      machbarkeit: number
    }>
    reden: Rede[]
  }
}

// Beispieldaten (später durch API-Calls ersetzt)
const redenBeispiele: Rede[] = [
  {
    id: '1',
    titel: 'Rede zur Klimapolitik',
    datum: '2024-02-15',
    thema: 'Klimaschutz',
    zusammenfassung: 'Diskussion über CO2-Bepreisung und Klimaziele',
    faktcheck: [
      {
        aussage: 'Deutschland hat die höchsten CO2-Einsparungen in der EU',
        bewertung: 'teilweise wahr',
        erklärung: 'Deutschland hat zwar absolute Einsparungen erreicht, pro Kopf liegt es aber im Mittelfeld.',
      },
    ],
  },
]

const abgeordnetenDaten: AbgeordnetenDaten = {
  '1': {
    name: 'Friedrich Merz',
    partei: 'CDU',
    position: 'Fraktionsvorsitzender',
    wahlkreis: 'Hochsauerlandkreis',
    schwerpunkte: ['Wirtschaft', 'Finanzen', 'Außenpolitik'],
    isFraktionsvorsitz: true,
    score: {
      wert: 0.85,
      vorfaelle: [
        {
          datum: '2024-01-15',
          beschreibung: 'Falsche Aussage zur Migrationspolitik auf Twitter',
          quelle: 'Faktenfinder der Tagesschau',
          plattform: 'Twitter/X',
        },
      ],
    },
    vorhaben: [
      {
        titel: 'Wirtschaftliche Stärkung des Mittelstands',
        beschreibung: 'Steuerliche Entlastungen und Bürokratieabbau für kleine und mittlere Unternehmen',
        status: 'in Bearbeitung',
        machbarkeit: 0.75,
      },
      {
        titel: 'Reform der Unternehmensbesteuerung',
        beschreibung: 'Modernisierung des Steuersystems für mehr internationale Wettbewerbsfähigkeit',
        status: 'geplant',
        machbarkeit: 0.60,
      },
    ],
    reden: [
      {
        id: '1',
        titel: 'Generaldebatte zum Bundeshaushalt 2024',
        datum: '2024-01-31',
        thema: 'Haushalt und Finanzen',
        zusammenfassung: 'Kritik an der Haushaltspolitik der Ampel-Koalition',
        faktcheck: [
          {
            aussage: 'Deutschland hat die höchste Steuer- und Abgabenlast aller Industrieländer',
            bewertung: 'teilweise wahr',
            erklärung: 'Deutschland liegt im OECD-Vergleich auf den vorderen Plätzen, aber nicht an der Spitze.',
          }
        ]
      },
      {
        id: '2',
        titel: 'Debatte zur Migration',
        datum: '2024-02-15',
        thema: 'Migrationspolitik',
        zusammenfassung: 'Forderung nach strengeren Grenzkontrollen und schnelleren Abschiebungen',
        faktcheck: [
          {
            aussage: 'Die Mehrheit der Asylbewerber hat keinen Anspruch auf Schutz',
            bewertung: 'teilweise wahr',
            erklärung: 'Die Gesamtschutzquote lag 2023 bei etwa 51%.',
          }
        ]
      }
    ]
  },
  '2': {
    name: 'Rolf Mützenich',
    partei: 'SPD',
    position: 'Fraktionsvorsitzender',
    wahlkreis: 'Köln I',
    schwerpunkte: ['Außenpolitik', 'Verteidigung', 'Soziales'],
    isFraktionsvorsitz: true,
    score: {
      wert: 0.92,
      vorfaelle: [
        {
          datum: '2023-12-10',
          beschreibung: 'Irreführende Darstellung der Verteidigungsausgaben',
          quelle: 'Correctiv',
          plattform: 'Bundespressekonferenz',
        },
      ],
    },
    vorhaben: [
      {
        titel: 'Reform der Bundeswehr',
        beschreibung: 'Modernisierung der Streitkräfte und Verbesserung der Ausrüstung',
        status: 'in Bearbeitung',
        machbarkeit: 0.75,
      },
    ],
    reden: [
      {
        id: '3',
        titel: 'Debatte zur Ukraine-Unterstützung',
        datum: '2024-02-22',
        thema: 'Außenpolitik',
        zusammenfassung: 'Plädoyer für weitere militärische und humanitäre Hilfe',
        faktcheck: [
          {
            aussage: 'Deutschland ist größter Unterstützer der Ukraine in Europa',
            bewertung: 'teilweise wahr',
            erklärung: 'Deutschland ist zweitgrößter Unterstützer nach Großbritannien in absoluten Zahlen.',
          }
        ]
      }
    ]
  },
  '3': {
    name: 'Britta Haßelmann',
    partei: 'Grüne',
    position: 'Fraktionsvorsitzende',
    wahlkreis: 'Bielefeld',
    schwerpunkte: ['Umwelt', 'Gleichstellung', 'Demokratie'],
    isFraktionsvorsitz: true,
    score: {
      wert: 0.88,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Stärkung der parlamentarischen Demokratie',
        beschreibung: 'Reform der Geschäftsordnung des Bundestages',
        status: 'in Bearbeitung',
        machbarkeit: 0.85,
      },
    ],
    reden: [
      {
        id: '4',
        titel: 'Parlamentsreform und Wahlrechtsänderung',
        datum: '2024-02-08',
        thema: 'Parlamentarische Demokratie',
        zusammenfassung: 'Vorstellung der Reformvorschläge zur Verkleinerung des Bundestags',
        faktcheck: [
          {
            aussage: 'Der Bundestag ist das größte demokratisch gewählte Parlament der Welt',
            bewertung: 'wahr',
            erklärung: 'Mit 736 Abgeordneten ist der deutsche Bundestag das größte demokratisch gewählte Parlament.',
          }
        ]
      }
    ]
  },
  '4': {
    name: 'Christian Dürr',
    partei: 'FDP',
    position: 'Fraktionsvorsitzender',
    wahlkreis: 'Delmenhorst',
    schwerpunkte: ['Wirtschaft', 'Finanzen', 'Digitalisierung'],
    isFraktionsvorsitz: true,
    score: {
      wert: 0.87,
      vorfaelle: [
        {
          datum: '2024-02-20',
          beschreibung: 'Korrektur von Aussagen zur Wirtschaftslage',
          quelle: 'Deutscher Bundestag',
          plattform: 'Plenardebatte'
        }
      ]
    },
    vorhaben: [
      {
        titel: 'Digitalisierung der Verwaltung',
        beschreibung: 'Beschleunigung der digitalen Transformation',
        status: 'in Bearbeitung',
        machbarkeit: 0.80
      },
      {
        titel: 'Bürokratieabbau',
        beschreibung: 'Vereinfachung von Verwaltungsprozessen für Unternehmen',
        status: 'in Bearbeitung',
        machbarkeit: 0.75
      }
    ],
    reden: [
      {
        id: '8',
        titel: 'Debatte zum Wachstumschancengesetz',
        datum: '2024-02-02',
        thema: 'Wirtschaft',
        zusammenfassung: 'Vorstellung der Maßnahmen zur Wirtschaftsförderung und Stärkung des Mittelstands',
        faktcheck: [
          {
            aussage: 'Das Gesetz entlastet die Wirtschaft um 32 Milliarden Euro',
            bewertung: 'falsch',
            erklärung: 'Nach Änderungen beträgt das Entlastungsvolumen etwa 3,2 Milliarden Euro pro Jahr.'
          }
        ]
      },
      {
        id: '9',
        titel: 'Generaldebatte zum Bundeshaushalt 2024',
        datum: '2024-01-31',
        thema: 'Haushalt',
        zusammenfassung: 'Verteidigung der Haushaltsplanung und Diskussion über Investitionen in Zukunftstechnologien',
        faktcheck: [
          {
            aussage: 'Deutschland hat die höchsten Investitionen in Digitalisierung in der EU',
            bewertung: 'teilweise wahr',
            erklärung: 'Deutschland liegt bei den absoluten Zahlen vorne, pro Kopf aber im Mittelfeld.'
          }
        ]
      },
      {
        id: '10',
        titel: 'Debatte zur Verwaltungsdigitalisierung',
        datum: '2024-02-15',
        thema: 'Digitalisierung',
        zusammenfassung: 'Präsentation der Digitalstrategie und Maßnahmen zur Modernisierung der Verwaltung',
        faktcheck: [
          {
            aussage: 'Nur 20% der Verwaltungsdienstleistungen sind vollständig digitalisiert',
            bewertung: 'wahr',
            erklärung: 'Laut Digitalindex der EU liegt Deutschland bei der Verwaltungsdigitalisierung unter dem EU-Durchschnitt.'
          }
        ]
      }
    ]
  },
  '5': {
    name: 'Dietmar Bartsch',
    partei: 'Linke',
    position: 'Fraktionsvorsitzender',
    wahlkreis: 'Rostock',
    schwerpunkte: ['Soziales', 'Wirtschaft', 'Ostdeutschland'],
    isFraktionsvorsitz: true,
    score: {
      wert: 0.86,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Angleichung der Lebensverhältnisse Ost-West',
        beschreibung: 'Maßnahmenpaket zur Stärkung der ostdeutschen Länder',
        status: 'in Bearbeitung',
        machbarkeit: 0.70,
      },
    ],
    reden: [
      {
        id: '6',
        titel: 'Debatte zur sozialen Gerechtigkeit',
        datum: '2024-01-25',
        thema: 'Soziales',
        zusammenfassung: 'Forderung nach Erhöhung des Mindestlohns und der Grundsicherung',
        faktcheck: [
          {
            aussage: 'Jedes fünfte Kind in Deutschland ist von Armut bedroht',
            bewertung: 'wahr',
            erklärung: 'Laut Statistischem Bundesamt lag die Kinderarmutsgefährdungsquote 2023 bei 20,8%.',
          }
        ]
      }
    ]
  },
  '6': {
    name: 'Alice Weidel',
    partei: 'AfD',
    position: 'Fraktionsvorsitzende',
    wahlkreis: 'Bodensee',
    schwerpunkte: ['Finanzen', 'Migration', 'Europa'],
    isFraktionsvorsitz: true,
    score: {
      wert: 0.45,
      vorfaelle: [
        {
          datum: '2024-02-01',
          beschreibung: 'Falsche Behauptungen zur Migrationspolitik',
          quelle: 'Faktenfinder der Tagesschau',
          plattform: 'Bundestagsrede',
        },
      ],
    },
    vorhaben: [
      {
        titel: 'Verschärfung der Migrationspolitik',
        beschreibung: 'Gesetzentwurf zur Änderung des Asylrechts',
        status: 'geplant',
        machbarkeit: 0.30,
      },
    ],
    reden: [
      {
        id: '7',
        titel: 'Debatte zur Energiepolitik',
        datum: '2024-02-16',
        thema: 'Energie',
        zusammenfassung: 'Kritik an der Energiewende und Forderung nach Wiedereinstieg in die Kernenergie',
        faktcheck: [
          {
            aussage: 'Die Strompreise in Deutschland sind die höchsten in Europa',
            bewertung: 'teilweise wahr',
            erklärung: 'Deutschland hat eine der höchsten Strompreise für Privathaushalte, liegt aber hinter Dänemark.',
          }
        ]
      }
    ]
  },
  '7': {
    name: 'Ralph Brinkhaus',
    partei: 'CDU/CSU',
    position: 'Mitglied des Bundestages',
    wahlkreis: 'Gütersloh I',
    schwerpunkte: ['Haushalt', 'Finanzen', 'Wirtschaft'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.89,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Reform der Schuldenbremse',
        beschreibung: 'Modernisierung der Haushaltsregeln',
        status: 'in Bearbeitung',
        machbarkeit: 0.65,
      },
    ],
    reden: redenBeispiele,
  },
  '8': {
    name: 'Julia Klöckner',
    partei: 'CDU/CSU',
    position: 'Mitglied des Bundestages',
    wahlkreis: 'Bad Kreuznach',
    schwerpunkte: ['Wirtschaft', 'Landwirtschaft', 'Verbraucherschutz'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.82,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Stärkung der regionalen Landwirtschaft',
        beschreibung: 'Förderung nachhaltiger Agrarbetriebe',
        status: 'in Bearbeitung',
        machbarkeit: 0.75,
      },
    ],
    reden: redenBeispiele,
  },
  '9': {
    name: 'Karl Lauterbach',
    partei: 'SPD',
    position: 'Bundesminister für Gesundheit',
    wahlkreis: 'Leverkusen - Köln IV',
    schwerpunkte: ['Gesundheit', 'Pandemiebekämpfung', 'Prävention'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.87,
      vorfaelle: [
        {
          datum: '2023-11-20',
          beschreibung: 'Korrektur bezüglich Impfstoffbestellungen',
          quelle: 'Bundesgesundheitsministerium',
          plattform: 'Pressemitteilung',
        },
        {
          datum: '2024-01-15',
          beschreibung: 'Präzisierung der Krankenhausreform-Pläne',
          quelle: 'Deutscher Bundestag',
          plattform: 'Plenarprotokoll',
        },
      ],
    },
    vorhaben: [
      {
        titel: 'Krankenhausreform',
        beschreibung: 'Neustrukturierung der Krankenhauslandschaft',
        status: 'in Bearbeitung',
        machbarkeit: 0.70,
      },
      {
        titel: 'Digitalisierung des Gesundheitswesens',
        beschreibung: 'Einführung der elektronischen Patientenakte',
        status: 'in Bearbeitung',
        machbarkeit: 0.85,
      },
      {
        titel: 'Präventionsgesetz',
        beschreibung: 'Stärkung der Gesundheitsvorsorge',
        status: 'geplant',
        machbarkeit: 0.90,
      },
    ],
    reden: redenBeispiele,
  },
  '10': {
    name: 'Dorothee Bär',
    partei: 'CDU/CSU',
    position: 'Mitglied des Bundestages',
    wahlkreis: 'Bad Kissingen',
    schwerpunkte: ['Digitales', 'Familie', 'Verkehr'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.85,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Digitale Bildung',
        beschreibung: 'Ausbau der digitalen Infrastruktur an Schulen',
        status: 'in Bearbeitung',
        machbarkeit: 0.80,
      },
    ],
    reden: redenBeispiele,
  },
  '11': {
    name: 'Norbert Röttgen',
    partei: 'CDU/CSU',
    position: 'Mitglied des Bundestages',
    wahlkreis: 'Rhein-Sieg-Kreis II',
    schwerpunkte: ['Außenpolitik', 'Europa', 'Klimaschutz'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.90,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Europäische Klimapolitik',
        beschreibung: 'Stärkung der EU-Klimaziele',
        status: 'in Bearbeitung',
        machbarkeit: 0.75,
      },
    ],
    reden: redenBeispiele,
  },
  '12': {
    name: 'Sahra Wagenknecht',
    partei: 'BSW',
    position: 'Mitglied des Bundestages',
    wahlkreis: 'Düsseldorf',
    schwerpunkte: ['Wirtschaft', 'Soziales', 'Außenpolitik'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.72,
      vorfaelle: [
        {
          datum: '2023-10-23',
          beschreibung: 'Kontroverse Aussagen zur Migrationspolitik',
          quelle: 'ARD-Faktenfinder',
          plattform: 'Talkshow',
        },
        {
          datum: '2024-01-08',
          beschreibung: 'Diskussion um Parteigründung',
          quelle: 'Pressekonferenz',
          plattform: 'BSW-Gründungsveranstaltung',
        },
      ],
    },
    vorhaben: [
      {
        titel: 'Reform der Wirtschaftspolitik',
        beschreibung: 'Neuausrichtung der Wirtschaftsbeziehungen',
        status: 'geplant',
        machbarkeit: 0.45,
      },
      {
        titel: 'Sozialstaatsreform',
        beschreibung: 'Grundlegende Änderungen im Sozialsystem',
        status: 'in Bearbeitung',
        machbarkeit: 0.35,
      },
    ],
    reden: redenBeispiele,
  },
  '13': {
    name: 'Hubertus Heil',
    partei: 'SPD',
    position: 'Bundesminister für Arbeit und Soziales',
    wahlkreis: 'Gifhorn',
    schwerpunkte: ['Arbeit', 'Soziales', 'Rente'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.88,
      vorfaelle: [
        {
          datum: '2024-01-20',
          beschreibung: 'Präzisierung der Aussagen zur Rentenreform',
          quelle: 'Bundesarbeitsministerium',
          plattform: 'Pressemitteilung',
        },
      ],
    },
    vorhaben: [
      {
        titel: 'Rentenreform 2024',
        beschreibung: 'Stabilisierung des Rentenniveaus und Einführung der Aktienrente',
        status: 'in Bearbeitung',
        machbarkeit: 0.75,
      },
    ],
    reden: redenBeispiele,
  },
  '14': {
    name: 'Saskia Esken',
    partei: 'SPD',
    position: 'Parteivorsitzende',
    wahlkreis: 'Calw',
    schwerpunkte: ['Digitales', 'Bildung', 'Gleichstellung'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.82,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Digitalpakt 2.0',
        beschreibung: 'Modernisierung der digitalen Infrastruktur an Schulen',
        status: 'in Bearbeitung',
        machbarkeit: 0.80,
      },
    ],
    reden: redenBeispiele,
  },
  '15': {
    name: 'Kevin Kühnert',
    partei: 'SPD',
    position: 'Generalsekretär',
    wahlkreis: 'Berlin-Tempelhof',
    schwerpunkte: ['Soziales', 'Wohnen', 'Jugend'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.85,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Mietpreisbremse',
        beschreibung: 'Verschärfung der Mietpreisbremse in Ballungsgebieten',
        status: 'geplant',
        machbarkeit: 0.65,
      },
    ],
    reden: redenBeispiele,
  },
  '16': {
    name: 'Bärbel Bas',
    partei: 'SPD',
    position: 'Bundestagspräsidentin',
    wahlkreis: 'Duisburg I',
    schwerpunkte: ['Gesundheit', 'Soziales', 'Parlamentsarbeit'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.91,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Parlamentsreform',
        beschreibung: 'Modernisierung der Arbeitsweise des Bundestags',
        status: 'in Bearbeitung',
        machbarkeit: 0.85,
      },
    ],
    reden: redenBeispiele,
  },
  '17': {
    name: 'Annalena Baerbock',
    partei: 'Grüne',
    position: 'Bundesministerin des Auswärtigen',
    wahlkreis: 'Potsdam',
    schwerpunkte: ['Außenpolitik', 'Klimaschutz', 'Europa'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.84,
      vorfaelle: [
        {
          datum: '2024-02-10',
          beschreibung: 'Korrektur von Aussagen zur EU-Außenpolitik',
          quelle: 'Auswärtiges Amt',
          plattform: 'Pressemitteilung',
        },
      ],
    },
    vorhaben: [
      {
        titel: 'Feministische Außenpolitik',
        beschreibung: 'Stärkung der Rolle von Frauen in der internationalen Politik',
        status: 'in Bearbeitung',
        machbarkeit: 0.70,
      },
    ],
    reden: redenBeispiele,
  },
  '18': {
    name: 'Robert Habeck',
    partei: 'Grüne',
    position: 'Bundesminister für Wirtschaft und Klimaschutz',
    wahlkreis: 'Flensburg',
    schwerpunkte: ['Wirtschaft', 'Klimaschutz', 'Energie'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.86,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Energiewende beschleunigen',
        beschreibung: 'Ausbau erneuerbarer Energien und Netzinfrastruktur',
        status: 'in Bearbeitung',
        machbarkeit: 0.75,
      },
    ],
    reden: redenBeispiele,
  },
  '19': {
    name: 'Ricarda Lang',
    partei: 'Grüne',
    position: 'Parteivorsitzende',
    wahlkreis: 'Backnang',
    schwerpunkte: ['Soziales', 'Gleichstellung', 'Klimaschutz'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.83,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Kindergrundsicherung',
        beschreibung: 'Reform der Familienförderung',
        status: 'in Bearbeitung',
        machbarkeit: 0.70,
      },
    ],
    reden: redenBeispiele,
  },
  '20': {
    name: 'Omid Nouripour',
    partei: 'Grüne',
    position: 'Parteivorsitzender',
    wahlkreis: 'Frankfurt am Main',
    schwerpunkte: ['Außenpolitik', 'Integration', 'Sicherheit'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.87,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Integrationspolitik',
        beschreibung: 'Modernisierung des Einwanderungsrechts',
        status: 'geplant',
        machbarkeit: 0.75,
      },
    ],
    reden: redenBeispiele,
  },
  '21': {
    name: 'Katrin Göring-Eckardt',
    partei: 'Grüne',
    position: 'Vizepräsidentin des Bundestages',
    wahlkreis: 'Thüringen',
    schwerpunkte: ['Parlamentsarbeit', 'Soziales', 'Kirche'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.88,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Dialog mit Religionsgemeinschaften',
        beschreibung: 'Stärkung des interreligiösen Dialogs',
        status: 'in Bearbeitung',
        machbarkeit: 0.85,
      },
    ],
    reden: redenBeispiele,
  },
  '22': {
    name: 'Christian Lindner',
    partei: 'FDP',
    position: 'Bundesminister der Finanzen',
    wahlkreis: 'Nordrhein-Westfalen',
    schwerpunkte: ['Finanzen', 'Wirtschaft', 'Digitalisierung'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.82,
      vorfaelle: [
        {
          datum: '2024-01-25',
          beschreibung: 'Diskussion um Haushaltsplanung',
          quelle: 'Bundesfinanzministerium',
          plattform: 'Pressekonferenz',
        },
      ],
    },
    vorhaben: [
      {
        titel: 'Schuldenbremse einhalten',
        beschreibung: 'Konsolidierung des Bundeshaushalts',
        status: 'in Bearbeitung',
        machbarkeit: 0.65,
      },
    ],
    reden: redenBeispiele,
  },
  '23': {
    name: 'Marco Buschmann',
    partei: 'FDP',
    position: 'Bundesminister der Justiz',
    wahlkreis: 'Gelsenkirchen',
    schwerpunkte: ['Justiz', 'Bürgerrechte', 'Digitalisierung'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.89,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Digitalisierung der Justiz',
        beschreibung: 'Modernisierung der Gerichtsverfahren',
        status: 'in Bearbeitung',
        machbarkeit: 0.80,
      },
    ],
    reden: redenBeispiele,
  },
  '24': {
    name: 'Bettina Stark-Watzinger',
    partei: 'FDP',
    position: 'Bundesministerin für Bildung und Forschung',
    wahlkreis: 'Main-Taunus',
    schwerpunkte: ['Bildung', 'Forschung', 'Innovation'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.86,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Exzellenzstrategie',
        beschreibung: 'Förderung der Spitzenforschung',
        status: 'in Bearbeitung',
        machbarkeit: 0.85,
      },
    ],
    reden: redenBeispiele,
  },
  '25': {
    name: 'Wolfgang Kubicki',
    partei: 'FDP',
    position: 'Vizepräsident des Bundestages',
    wahlkreis: 'Schleswig-Holstein',
    schwerpunkte: ['Recht', 'Wirtschaft', 'Parlamentsarbeit'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.75,
      vorfaelle: [
        {
          datum: '2024-02-05',
          beschreibung: 'Kontroverse Äußerungen zur Coronapolitik',
          quelle: 'Deutscher Bundestag',
          plattform: 'Plenardebatte',
        },
      ],
    },
    vorhaben: [
      {
        titel: 'Parlamentsreform',
        beschreibung: 'Modernisierung der Geschäftsordnung',
        status: 'geplant',
        machbarkeit: 0.70,
      },
    ],
    reden: redenBeispiele,
  },
  '26': {
    name: 'Marie-Agnes Strack-Zimmermann',
    partei: 'FDP',
    position: 'Vorsitzende des Verteidigungsausschusses',
    wahlkreis: 'Düsseldorf',
    schwerpunkte: ['Verteidigung', 'Sicherheit', 'Europa'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.88,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Bundeswehrreform',
        beschreibung: 'Modernisierung der Streitkräfte',
        status: 'in Bearbeitung',
        machbarkeit: 0.75,
      },
    ],
    reden: redenBeispiele,
  },
  '27': {
    name: 'Gregor Gysi',
    partei: 'Linke',
    position: 'Mitglied des Bundestages',
    wahlkreis: 'Berlin-Treptow',
    schwerpunkte: ['Außenpolitik', 'Recht', 'Soziales'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.85,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Soziale Gerechtigkeit',
        beschreibung: 'Reform des Steuersystems',
        status: 'geplant',
        machbarkeit: 0.55,
      },
    ],
    reden: redenBeispiele,
  },
  '28': {
    name: 'Amira Mohamed Ali',
    partei: 'Linke',
    position: 'Mitglied des Bundestages',
    wahlkreis: 'Oldenburg',
    schwerpunkte: ['Verbraucherschutz', 'Soziales', 'Umwelt'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.84,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Verbraucherschutz stärken',
        beschreibung: 'Verschärfung der Verbraucherrechte',
        status: 'in Bearbeitung',
        machbarkeit: 0.70,
      },
    ],
    reden: redenBeispiele,
  },
  '29': {
    name: 'Janine Wissler',
    partei: 'Linke',
    position: 'Parteivorsitzende',
    wahlkreis: 'Frankfurt am Main',
    schwerpunkte: ['Soziales', 'Arbeit', 'Klimagerechtigkeit'],
    isFraktionsvorsitz: false,
    score: {
      wert: 0.83,
      vorfaelle: [],
    },
    vorhaben: [
      {
        titel: 'Mindestlohnerhöhung',
        beschreibung: 'Anhebung des gesetzlichen Mindestlohns',
        status: 'geplant',
        machbarkeit: 0.60,
      },
    ],
    reden: redenBeispiele,
  },
  '48': {
    name: 'Christian Dürr',
    partei: 'FDP',
    position: 'Fraktionsvorsitzender',
    wahlkreis: 'Delmenhorst',
    schwerpunkte: ['Wirtschaft', 'Finanzen', 'Digitalisierung'],
    isFraktionsvorsitz: true,
    score: {
      wert: 0.87,
      vorfaelle: [
        {
          datum: '2024-02-20',
          beschreibung: 'Korrektur von Aussagen zur Wirtschaftslage',
          quelle: 'Deutscher Bundestag',
          plattform: 'Plenardebatte'
        }
      ]
    },
    vorhaben: [
      {
        titel: 'Digitalisierung der Verwaltung',
        beschreibung: 'Beschleunigung der digitalen Transformation',
        status: 'in Bearbeitung',
        machbarkeit: 0.80
      },
      {
        titel: 'Bürokratieabbau',
        beschreibung: 'Vereinfachung von Verwaltungsprozessen für Unternehmen',
        status: 'in Bearbeitung',
        machbarkeit: 0.75
      }
    ],
    reden: [
      {
        id: '8',
        titel: 'Debatte zum Wachstumschancengesetz',
        datum: '2024-02-02',
        thema: 'Wirtschaft',
        zusammenfassung: 'Vorstellung der Maßnahmen zur Wirtschaftsförderung und Stärkung des Mittelstands',
        faktcheck: [
          {
            aussage: 'Das Gesetz entlastet die Wirtschaft um 32 Milliarden Euro',
            bewertung: 'falsch',
            erklärung: 'Nach Änderungen beträgt das Entlastungsvolumen etwa 3,2 Milliarden Euro pro Jahr.'
          }
        ]
      },
      {
        id: '9',
        titel: 'Generaldebatte zum Bundeshaushalt 2024',
        datum: '2024-01-31',
        thema: 'Haushalt',
        zusammenfassung: 'Verteidigung der Haushaltsplanung und Diskussion über Investitionen in Zukunftstechnologien',
        faktcheck: [
          {
            aussage: 'Deutschland hat die höchsten Investitionen in Digitalisierung in der EU',
            bewertung: 'teilweise wahr',
            erklärung: 'Deutschland liegt bei den absoluten Zahlen vorne, pro Kopf aber im Mittelfeld.'
          }
        ]
      },
      {
        id: '10',
        titel: 'Debatte zur Verwaltungsdigitalisierung',
        datum: '2024-02-15',
        thema: 'Digitalisierung',
        zusammenfassung: 'Präsentation der Digitalstrategie und Maßnahmen zur Modernisierung der Verwaltung',
        faktcheck: [
          {
            aussage: 'Nur 20% der Verwaltungsdienstleistungen sind vollständig digitalisiert',
            bewertung: 'wahr',
            erklärung: 'Laut Digitalindex der EU liegt Deutschland bei der Verwaltungsdigitalisierung unter dem EU-Durchschnitt.'
          }
        ]
      }
    ]
  },
}

export default function AbgeordnetenDetail() {
  const params = useParams()
  const abgeordneter = abgeordnetenDaten[params.id as string]

  if (!abgeordneter) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Abgeordneter nicht gefunden</h1>
            <p className="text-gray-600 mb-4">Der gesuchte Abgeordnete konnte leider nicht gefunden werden.</p>
            <Link
              href="/abgeordnete"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zur Übersicht
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getPartyColors = (partei: string): { from: string, to: string } => {
    switch (partei) {
      case 'CDU':
      case 'CDU/CSU':
        return { from: 'from-black', to: 'to-[#000000]' }
      case 'SPD':
        return { from: 'from-red-600', to: 'to-red-700' }
      case 'Grüne':
        return { from: 'from-green-600', to: 'to-green-700' }
      case 'FDP':
        return { from: 'from-yellow-400', to: 'to-yellow-500' }
      case 'Linke':
        return { from: 'from-[#BE3075]', to: 'to-[#990000]' }
      case 'AfD':
        return { from: 'from-blue-600', to: 'to-blue-700' }
      case 'BSW':
        return { from: 'from-[#B51C29]', to: 'to-[#8B0000]' }
      default:
        return { from: 'from-gray-500', to: 'to-gray-600' }
    }
  }

  const partyColors = getPartyColors(abgeordneter.partei)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header mit Farbverlauf basierend auf Parteifarbe */}
          <div className={`h-32 bg-gradient-to-r ${partyColors.from} ${partyColors.to}`}></div>
          
          <div className="p-6 -mt-16 relative">
            {/* Profilbild/Initial */}
            <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600 mb-4">
              {abgeordneter.name.charAt(0)}
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{abgeordneter.name}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r ${partyColors.from} ${partyColors.to}`}>
                    {abgeordneter.partei}
                  </span>
                  <span className="text-gray-500">{abgeordneter.position}</span>
                </div>
              </div>
              <div className={`text-lg font-semibold rounded-full px-4 py-2 ${
                abgeordneter.score.wert >= 0.9
                  ? 'bg-green-100 text-green-800'
                  : abgeordneter.score.wert >= 0.7
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {Math.round(abgeordneter.score.wert * 100)}%
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Wahlkreis</h2>
              <p className="mt-2 text-gray-600">{abgeordneter.wahlkreis}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Schwerpunkte</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {abgeordneter.schwerpunkte.map((schwerpunkt, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {schwerpunkt}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Dokumentierte Vorfälle</h2>
              <div className="mt-2 space-y-4">
                {abgeordneter.score.vorfaelle.map((vorfall, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{vorfall.datum}</span>
                      <span className="text-sm text-gray-500">{vorfall.plattform}</span>
                    </div>
                    <p className="mt-2">{vorfall.beschreibung}</p>
                    <p className="mt-1 text-sm text-gray-500">Quelle: {vorfall.quelle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Aktuelle Vorhaben</h2>
              <div className="mt-2 space-y-4">
                {abgeordneter.vorhaben.map((vorhaben, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{vorhaben.titel}</h3>
                        <p className="mt-1 text-gray-600">{vorhaben.beschreibung}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        vorhaben.machbarkeit >= 0.7
                          ? 'bg-green-100 text-green-800'
                          : vorhaben.machbarkeit >= 0.4
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {Math.round(vorhaben.machbarkeit * 100)}%
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        vorhaben.status === 'in Bearbeitung'
                          ? 'bg-blue-100 text-blue-800'
                          : vorhaben.status === 'abgeschlossen'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {vorhaben.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Letzte Reden</h2>
              <div className="mt-2 space-y-4">
                {abgeordneter.reden.map((rede) => (
                  <div key={rede.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{rede.titel}</h3>
                      <span className="text-gray-500">{rede.datum}</span>
                    </div>
                    <p className="mt-2 text-gray-600">{rede.zusammenfassung}</p>
                    <div className="mt-4 space-y-2">
                      {rede.faktcheck.map((check, index) => (
                        <div key={index} className="bg-white rounded p-3">
                          <p className="font-medium">Aussage: {check.aussage}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-sm ${
                              check.bewertung === 'wahr'
                                ? 'bg-green-100 text-green-800'
                                : check.bewertung === 'teilweise wahr'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {check.bewertung}
                            </span>
                            <p className="text-gray-600">{check.erklärung}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/abgeordnete"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </div>
  )
} 