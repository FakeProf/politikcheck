'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Vorfall {
  datum: string
  beschreibung: string
  quelle: string
  plattform: string
  schwere: 'niedrig' | 'mittel' | 'hoch'  // Neue Eigenschaft für die Schwere
  typ: 'positiv' | 'negativ'              // Neue Eigenschaft für die Art des Vorfalls
}

interface Rede {
  datum: string
  thema: string
  zusammenfassung: string
  link: string
}

interface Umsetzbarkeitsanalyse {
  datum: string
  thema: string
  beschreibung: string
  machbarkeit: number
  kosten: number
}

interface Abgeordneter {
  id: string
  name: string
  partei: string
  position: string
  isFraktionsvorsitz: boolean
  wahlkreis: string
  schwerpunkte: string[]
  score: {
    wert: number
    vorfaelle: Vorfall[]
  }
  reden: Rede[]
  umsetzbarkeitsanalysen: Umsetzbarkeitsanalyse[]
}

// Beispieldaten aktualisieren
const abgeordnete: Abgeordneter[] = [
  {
    id: '1',
    name: 'Olaf Scholz',
    partei: 'SPD',
    position: 'Bundeskanzler',
    isFraktionsvorsitz: false,
    wahlkreis: 'Hamburg-Altona',
    schwerpunkte: ['Finanzen', 'Wirtschaft', 'Europa'],
    score: {
      wert: 0.85,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '2',
    name: 'Robert Habeck',
    partei: 'Grüne',
    position: 'Bundesminister für Wirtschaft und Klimaschutz',
    isFraktionsvorsitz: false,
    wahlkreis: 'Flensburg-Schleswig',
    schwerpunkte: ['Wirtschaft', 'Klimaschutz', 'Energie'],
    score: {
      wert: 0.82,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '3',
    name: 'Christian Lindner',
    partei: 'FDP',
    position: 'Bundesminister der Finanzen',
    isFraktionsvorsitz: false,
    wahlkreis: 'Nordrhein-Westfalen',
    schwerpunkte: ['Finanzen', 'Wirtschaft', 'Digitalisierung'],
    score: {
      wert: 0.78,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '4',
    name: 'Friedrich Merz',
    partei: 'CDU/CSU',
    position: 'Fraktionsvorsitzender',
    isFraktionsvorsitz: true,
    wahlkreis: 'Hochsauerlandkreis',
    schwerpunkte: ['Wirtschaft', 'Finanzen', 'Innenpolitik'],
    score: {
      wert: 0.76,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '5',
    name: 'Rolf Mützenich',
    partei: 'SPD',
    position: 'Fraktionsvorsitzender',
    isFraktionsvorsitz: true,
    wahlkreis: 'Köln',
    schwerpunkte: ['Außenpolitik', 'Verteidigung', 'Europa'],
    score: {
      wert: 0.81,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '6',
    name: 'Alice Weidel',
    partei: 'AfD',
    position: 'Fraktionsvorsitzende',
    isFraktionsvorsitz: true,
    wahlkreis: 'Bodensee',
    schwerpunkte: ['Finanzen', 'Migration', 'Europa'],
    score: {
      wert: 0.45,
      vorfaelle: [
        {
          datum: '2025-01-15',
          beschreibung: 'Kontroverse Aussagen zur Klimapolitik',
          quelle: 'Talkshow',
          plattform: 'Fernsehen',
          schwere: 'hoch',
          typ: 'negativ'
        },
        {
          datum: '2025-02-28',
          beschreibung: 'Kritik an Energiepolitik der Regierung',
          quelle: 'Bundestag',
          plattform: 'Plenardebatte',
          schwere: 'mittel',
          typ: 'negativ'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '7',
    name: 'Ralph Brinkhaus',
    partei: 'CDU/CSU',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Gütersloh I',
    schwerpunkte: ['Haushalt', 'Finanzen', 'Wirtschaft'],
    score: {
      wert: 0.89,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '8',
    name: 'Julia Klöckner',
    partei: 'CDU/CSU',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Bad Kreuznach',
    schwerpunkte: ['Wirtschaft', 'Landwirtschaft', 'Verbraucherschutz'],
    score: {
      wert: 0.82,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '9',
    name: 'Jens Spahn',
    partei: 'CDU/CSU',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Steinfurt I',
    schwerpunkte: ['Gesundheit', 'Wirtschaft', 'Europa'],
    score: {
      wert: 0.78,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '10',
    name: 'Ricarda Lang',
    partei: 'Grüne',
    position: 'Parteivorsitzende',
    isFraktionsvorsitz: false,
    wahlkreis: 'Backnang',
    schwerpunkte: ['Soziales', 'Gleichstellung', 'Klimaschutz'],
    score: {
      wert: 0.83,
      vorfaelle: [
        {
          datum: '2024-02-08',
          beschreibung: 'Erfolgreiche Klimaschutz-Initiative',
          quelle: 'Bundestagsprotokoll',
          plattform: 'Bundestag',
          schwere: 'hoch',
          typ: 'positiv'
        },
        {
          datum: '2024-03-14',
          beschreibung: 'Konstruktiver Dialog mit Bauernverbänden',
          quelle: 'Presseberichte',
          plattform: 'Verhandlungen',
          schwere: 'mittel',
          typ: 'positiv'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '11',
    name: 'Omid Nouripour',
    partei: 'Grüne',
    position: 'Parteivorsitzender',
    isFraktionsvorsitz: false,
    wahlkreis: 'Frankfurt am Main',
    schwerpunkte: ['Außenpolitik', 'Integration', 'Sicherheit'],
    score: {
      wert: 0.87,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '12',
    name: 'Katrin Göring-Eckardt',
    partei: 'Grüne',
    position: 'Vizepräsidentin des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Thüringen',
    schwerpunkte: ['Parlamentsarbeit', 'Soziales', 'Kirche'],
    score: {
      wert: 0.88,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '13',
    name: 'Franziska Brantner',
    partei: 'Grüne',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Heidelberg',
    schwerpunkte: ['Europa', 'Außenpolitik', 'Klimaschutz'],
    score: {
      wert: 0.79,
      vorfaelle: [
        {
          datum: '2025-01-22',
          beschreibung: 'Erfolgreiche Verhandlungen zu EU-Klimazielen',
          quelle: 'EU-Parlament',
          plattform: 'Europäische Union',
          schwere: 'hoch',
          typ: 'positiv'
        },
        {
          datum: '2025-03-01',
          beschreibung: 'Vorstellung einer Initiative für nachhaltige Mobilität',
          quelle: 'Bundestag',
          plattform: 'Pressekonferenz',
          schwere: 'mittel',
          typ: 'positiv'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '14',
    name: 'Katja Mast',
    partei: 'SPD',
    position: 'Parlamentarische Geschäftsführerin',
    isFraktionsvorsitz: false,
    wahlkreis: 'Pforzheim',
    schwerpunkte: ['Arbeit', 'Soziales', 'Gleichstellung'],
    score: {
      wert: 0.72,
      vorfaelle: [
        {
          datum: '2025-01-22',
          beschreibung: 'Vorstellung eines Konzepts zur Gleichstellung',
          quelle: 'Bundestag',
          plattform: 'Pressekonferenz',
          schwere: 'mittel',
          typ: 'positiv'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '15',
    name: 'Carsten Schneider',
    partei: 'SPD',
    position: 'Staatsminister für Ostdeutschland',
    isFraktionsvorsitz: false,
    wahlkreis: 'Erfurt',
    schwerpunkte: ['Ostdeutschland', 'Finanzen', 'Strukturpolitik'],
    score: {
      wert: 0.73,
      vorfaelle: [
        {
          datum: '2025-02-08',
          beschreibung: 'Vorstellung eines Förderprogramms für strukturschwache Regionen',
          quelle: 'Bundespressekonferenz',
          plattform: 'Pressekonferenz',
          schwere: 'hoch',
          typ: 'positiv'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '16',
    name: 'Gregor Gysi',
    partei: 'Linke',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Berlin-Treptow-Köpenick',
    schwerpunkte: ['Außenpolitik', 'Recht', 'Soziales'],
    score: {
      wert: 0.75,
      vorfaelle: [
        {
          datum: '2025-02-15',
          beschreibung: 'Rede zur internationalen Zusammenarbeit',
          quelle: 'Bundestag',
          plattform: 'Plenardebatte',
          schwere: 'hoch',
          typ: 'positiv'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '17',
    name: 'Sahra Wagenknecht',
    partei: 'BSW',
    position: 'Parteivorsitzende',
    isFraktionsvorsitz: false,
    wahlkreis: 'Düsseldorf',
    schwerpunkte: ['Wirtschaft', 'Soziales', 'Außenpolitik'],
    score: {
      wert: 0.68,
      vorfaelle: [
        {
          datum: '2025-01-10',
          beschreibung: 'Gründung einer neuen Partei',
          quelle: 'Bundespressekonferenz',
          plattform: 'Pressekonferenz',
          schwere: 'hoch',
          typ: 'positiv'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '18',
    name: 'Sevim Dağdelen',
    partei: 'BSW',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Bochum',
    schwerpunkte: ['Außenpolitik', 'Frieden', 'Migration'],
    score: {
      wert: 0.67,
      vorfaelle: [
        {
          datum: '2025-02-20',
          beschreibung: 'Kritik an Außenpolitik',
          quelle: 'Auswärtiger Ausschuss',
          plattform: 'Bundestag',
          schwere: 'mittel',
          typ: 'negativ'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '19',
    name: 'Fabio De Masi',
    partei: 'BSW',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Hamburg-Mitte',
    schwerpunkte: ['Finanzen', 'Wirtschaft', 'Steuern'],
    score: {
      wert: 0.71,
      vorfaelle: [
        {
          datum: '2025-01-25',
          beschreibung: 'Vorstellung eines Steuerkonzepts',
          quelle: 'Finanzausschuss',
          plattform: 'Bundestag',
          schwere: 'hoch',
          typ: 'positiv'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '20',
    name: 'Klaus Ernst',
    partei: 'BSW',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Schweinfurt',
    schwerpunkte: ['Wirtschaft', 'Arbeit', 'Energie'],
    score: {
      wert: 0.69,
      vorfaelle: [
        {
          datum: '2025-02-05',
          beschreibung: 'Kritik an Energiepolitik',
          quelle: 'Wirtschaftsausschuss',
          plattform: 'Bundestag',
          schwere: 'mittel',
          typ: 'negativ'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '21',
    name: 'Andrej Hunko',
    partei: 'BSW',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Aachen',
    schwerpunkte: ['Europa', 'Außenpolitik', 'Soziales'],
    score: {
      wert: 0.68,
      vorfaelle: [
        {
          datum: '2025-01-18',
          beschreibung: 'Kritik an EU-Politik',
          quelle: 'Europaausschuss',
          plattform: 'Bundestag',
          schwere: 'mittel',
          typ: 'negativ'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '22',
    name: 'Alexander Gauland',
    partei: 'AfD',
    position: 'Ehrenvorsitzender',
    isFraktionsvorsitz: false,
    wahlkreis: 'Frankfurt (Oder)',
    schwerpunkte: ['Innenpolitik', 'Migration', 'Europa'],
    score: {
      wert: 0.42,
      vorfaelle: [
        {
          datum: '2025-01-15',
          beschreibung: 'Umstrittene Äußerungen zur Migrationspolitik',
          quelle: 'Bundestag',
          plattform: 'Plenardebatte',
          schwere: 'hoch',
          typ: 'negativ'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '23',
    name: 'Beatrix von Storch',
    partei: 'AfD',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Berlin-Mitte',
    schwerpunkte: ['Familie', 'Innenpolitik', 'Europa'],
    score: {
      wert: 0.41,
      vorfaelle: [
        {
          datum: '2025-02-10',
          beschreibung: 'Umstrittene Äußerungen zur Familienpolitik',
          quelle: 'Familienausschuss',
          plattform: 'Bundestag',
          schwere: 'hoch',
          typ: 'negativ'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '24',
    name: 'Stephan Brandner',
    partei: 'AfD',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Erfurt',
    schwerpunkte: ['Recht', 'Innenpolitik', 'Kultur'],
    score: {
      wert: 0.40,
      vorfaelle: [
        {
          datum: '2025-01-20',
          beschreibung: 'Umstrittene Äußerungen zur Rechtspolitik',
          quelle: 'Rechtsausschuss',
          plattform: 'Bundestag',
          schwere: 'hoch',
          typ: 'negativ'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '25',
    name: 'Armin Laschet',
    partei: 'CDU/CSU',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Aachen',
    schwerpunkte: ['Europa', 'Wirtschaft', 'Integration'],
    score: {
      wert: 0.73,
      vorfaelle: [
        {
          datum: '2025-01-15',
          beschreibung: 'Rede zur europäischen Integration',
          quelle: 'Europaausschuss',
          plattform: 'Bundestag',
          schwere: 'mittel',
          typ: 'positiv'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '26',
    name: 'Annegret Kramp-Karrenbauer',
    partei: 'CDU/CSU',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Saarbrücken',
    schwerpunkte: ['Verteidigung', 'Sicherheit', 'Europa'],
    score: {
      wert: 0.72,
      vorfaelle: [
        {
          datum: '2025-02-10',
          beschreibung: 'Rede zur Verteidigungspolitik',
          quelle: 'Verteidigungsausschuss',
          plattform: 'Bundestag',
          schwere: 'mittel',
          typ: 'positiv'
        }
      ]
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '27',
    name: 'Markus Söder',
    partei: 'CDU/CSU',
    position: 'Ministerpräsident Bayern',
    isFraktionsvorsitz: false,
    wahlkreis: 'Nürnberg',
    schwerpunkte: ['Landespolitik', 'Wirtschaft', 'Digitalisierung'],
    score: {
      wert: 0.76,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '28',
    name: 'Daniel Günther',
    partei: 'CDU/CSU',
    position: 'Ministerpräsident Schleswig-Holstein',
    isFraktionsvorsitz: false,
    wahlkreis: 'Kiel',
    schwerpunkte: ['Landespolitik', 'Wirtschaft', 'Energie'],
    score: {
      wert: 0.79,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '29',
    name: 'Saskia Esken',
    partei: 'SPD',
    position: 'Parteivorsitzende',
    isFraktionsvorsitz: false,
    wahlkreis: 'Calw',
    schwerpunkte: ['Digitalisierung', 'Bildung', 'Soziales'],
    score: {
      wert: 0.75,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '30',
    name: 'Lars Klingbeil',
    partei: 'SPD',
    position: 'Parteivorsitzender',
    isFraktionsvorsitz: false,
    wahlkreis: 'Rotenburg I – Heidekreis',
    schwerpunkte: ['Digitales', 'Verteidigung', 'Jugend'],
    score: {
      wert: 0.77,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '31',
    name: 'Hubertus Heil',
    partei: 'SPD',
    position: 'Bundesminister für Arbeit und Soziales',
    isFraktionsvorsitz: false,
    wahlkreis: 'Gifhorn – Peine',
    schwerpunkte: ['Arbeit', 'Soziales', 'Rente'],
    score: {
      wert: 0.81,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '32',
    name: 'Karl Lauterbach',
    partei: 'SPD',
    position: 'Bundesminister für Gesundheit',
    isFraktionsvorsitz: false,
    wahlkreis: 'Leverkusen – Köln IV',
    schwerpunkte: ['Gesundheit', 'Forschung', 'Pandemiebekämpfung'],
    score: {
      wert: 0.74,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '33',
    name: 'Annalena Baerbock',
    partei: 'Grüne',
    position: 'Bundesministerin des Auswärtigen',
    isFraktionsvorsitz: false,
    wahlkreis: 'Potsdam',
    schwerpunkte: ['Außenpolitik', 'Klimaschutz', 'Europa'],
    score: {
      wert: 0.82,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '34',
    name: 'Cem Özdemir',
    partei: 'Grüne',
    position: 'Bundesminister für Ernährung und Landwirtschaft',
    isFraktionsvorsitz: false,
    wahlkreis: 'Stuttgart I',
    schwerpunkte: ['Landwirtschaft', 'Ernährung', 'Verkehr'],
    score: {
      wert: 0.80,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '35',
    name: 'Claudia Roth',
    partei: 'Grüne',
    position: 'Staatsministerin für Kultur und Medien',
    isFraktionsvorsitz: false,
    wahlkreis: 'Augsburg',
    schwerpunkte: ['Kultur', 'Medien', 'Menschenrechte'],
    score: {
      wert: 0.77,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '36',
    name: 'Marco Buschmann',
    partei: 'FDP',
    position: 'Bundesminister der Justiz',
    isFraktionsvorsitz: false,
    wahlkreis: 'Gelsenkirchen',
    schwerpunkte: ['Justiz', 'Bürgerrechte', 'Digitalisierung'],
    score: {
      wert: 0.79,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '37',
    name: 'Volker Wissing',
    partei: 'FDP',
    position: 'Bundesminister für Digitales und Verkehr',
    isFraktionsvorsitz: false,
    wahlkreis: 'Südpfalz',
    schwerpunkte: ['Verkehr', 'Digitales', 'Infrastruktur'],
    score: {
      wert: 0.76,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '38',
    name: 'Bettina Stark-Watzinger',
    partei: 'FDP',
    position: 'Bundesministerin für Bildung und Forschung',
    isFraktionsvorsitz: false,
    wahlkreis: 'Main-Taunus',
    schwerpunkte: ['Bildung', 'Forschung', 'Innovation'],
    score: {
      wert: 0.77,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '39',
    name: 'Marie-Agnes Strack-Zimmermann',
    partei: 'FDP',
    position: 'Vorsitzende des Verteidigungsausschusses',
    isFraktionsvorsitz: false,
    wahlkreis: 'Düsseldorf',
    schwerpunkte: ['Verteidigung', 'Sicherheit', 'Außenpolitik'],
    score: {
      wert: 0.81,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '40',
    name: 'Dietmar Bartsch',
    partei: 'Linke',
    position: 'Fraktionsvorsitzender',
    isFraktionsvorsitz: true,
    wahlkreis: 'Rostock',
    schwerpunkte: ['Soziales', 'Wirtschaft', 'Ostdeutschland'],
    score: {
      wert: 0.72,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '41',
    name: 'Amira Mohamed Ali',
    partei: 'BSW',
    position: 'Parteivorsitzende',
    isFraktionsvorsitz: false,
    wahlkreis: 'Oldenburg',
    schwerpunkte: ['Verbraucherschutz', 'Soziales', 'Wirtschaft'],
    score: {
      wert: 0.71,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '42',
    name: 'Sören Pellmann',
    partei: 'Linke',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Leipzig II',
    schwerpunkte: ['Soziales', 'Inklusion', 'Ostdeutschland'],
    score: {
      wert: 0.69,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '43',
    name: 'Janine Wissler',
    partei: 'Linke',
    position: 'Parteivorsitzende',
    isFraktionsvorsitz: false,
    wahlkreis: 'Frankfurt am Main II',
    schwerpunkte: ['Arbeit', 'Soziales', 'Klimagerechtigkeit'],
    score: {
      wert: 0.70,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '44',
    name: 'Tino Chrupalla',
    partei: 'AfD',
    position: 'Parteivorsitzender',
    isFraktionsvorsitz: true,
    wahlkreis: 'Görlitz',
    schwerpunkte: ['Innenpolitik', 'Wirtschaft', 'Migration'],
    score: {
      wert: 0.43,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '45',
    name: 'Peter Boehringer',
    partei: 'AfD',
    position: 'Mitglied des Bundestages',
    isFraktionsvorsitz: false,
    wahlkreis: 'Amberg',
    schwerpunkte: ['Haushalt', 'Finanzen', 'Europa'],
    score: {
      wert: 0.41,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '46',
    name: 'Britta Haßelmann',
    partei: 'Grüne',
    position: 'Fraktionsvorsitzende',
    isFraktionsvorsitz: true,
    wahlkreis: 'Bielefeld',
    schwerpunkte: ['Parlamentarische Arbeit', 'Demokratie', 'Gleichstellung'],
    score: {
      wert: 0.81,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '47',
    name: 'Katharina Dröge',
    partei: 'Grüne',
    position: 'Fraktionsvorsitzende',
    isFraktionsvorsitz: true,
    wahlkreis: 'Köln II',
    schwerpunkte: ['Wirtschaft', 'Klimaschutz', 'Soziale Gerechtigkeit'],
    score: {
      wert: 0.79,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  },
  {
    id: '48',
    name: 'Christian Dürr',
    partei: 'FDP',
    position: 'Fraktionsvorsitzender',
    isFraktionsvorsitz: true,
    wahlkreis: 'Oldenburg - Ammerland',
    schwerpunkte: ['Finanzen', 'Wirtschaft', 'Digitalisierung'],
    score: {
      wert: 0.78,
      vorfaelle: []
    },
    reden: [],
    umsetzbarkeitsanalysen: []
  }
]

// Funktionen für die Interaktion mit Abgeordneten
const shareProfile = async (abgeordneter: Abgeordneter) => {
  // Implementierung für das Teilen des Profils
  console.log('Teile Profil von:', abgeordneter.name);
};

const aktualisiereScores = () => {
  // Implementierung für die Score-Aktualisierung
  console.log('Aktualisiere Scores...');
};

// Score bei Komponenten-Initialisierung aktualisieren
aktualisiereScores()

// Hilfsfunktion für die Datumsformatierung hinzufügen
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE')
}

export default function Abgeordnete() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedParty, setSelectedParty] = useState<string>('')
  const [showOnlyFraktionsvorsitz, setShowOnlyFraktionsvorsitz] = useState(false)
  const [showScoreInfo, setShowScoreInfo] = useState<string | null>(null)
  const [scoreOrder, setScoreOrder] = useState<'desc' | 'asc'>('desc')
  const [displayCount, setDisplayCount] = useState(12)
  const [isScoreInfoExpanded, setIsScoreInfoExpanded] = useState(false)

  const getPartyColors = (partei: string): { from: string, to: string } => {
    switch (partei) {
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

  // Sortiere die Abgeordneten nach Score und dann alphabetisch
  const sortedAbgeordnete = [...abgeordnete].sort((a, b) => {
    if (scoreOrder === 'desc') {
      return b.score.wert - a.score.wert || a.name.localeCompare(b.name, 'de')
    } else {
      return a.score.wert - b.score.wert || a.name.localeCompare(b.name, 'de')
    }
  })

  const filteredAbgeordnete = sortedAbgeordnete.filter((abgeordneter) => {
    const matchesSearch = abgeordneter.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesParty = !selectedParty || abgeordneter.partei === selectedParty
    const matchesFraktionsvorsitz = !showOnlyFraktionsvorsitz || abgeordneter.isFraktionsvorsitz
    return matchesSearch && matchesParty && matchesFraktionsvorsitz
  })

  // Funktion zum Laden weiterer Profile
  const loadMore = () => {
    setDisplayCount(prevCount => prevCount + 12)
  }

  const getPartyColor = (party: string) => {
    switch (party) {
      case 'CDU/CSU':
        return 'text-black'
      case 'SPD':
        return 'text-[#E3000F]'
      case 'Grüne':
        return 'text-[#46962b]'
      case 'FDP':
        return 'text-[#FFED00]'
      case 'BSW':
        return 'text-[#FF0000]'
      case 'AfD':
        return 'text-[#009EE0]'
      case 'Linke':
        return 'text-[#BE3075]'
      default:
        return 'text-gray-700'
    }
  }

  // Neue Funktion für Hover-Handling
  const handleScoreHover = (abgeordneterId: string, isHovering: boolean) => {
    // Nur auf Desktop/Laptop reagieren
    if (window.matchMedia('(min-width: 768px)').matches) {
      setShowScoreInfo(isHovering ? abgeordneterId : null)
    }
  }

  // Funktion für Klick-Handling
  const handleScoreClick = (abgeordneterId: string) => {
    // Nur auf Mobile reagieren
    if (window.matchMedia('(max-width: 767px)').matches) {
      setShowScoreInfo(showScoreInfo === abgeordneterId ? null : abgeordneterId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Score-Erklärung */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <button 
            onClick={() => setIsScoreInfoExpanded(!isScoreInfoExpanded)}
            className="w-full flex items-start gap-2 sm:gap-4 text-left"
          >
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Über den Glaubwürdigkeits-Score</h2>
              <p className="text-sm sm:text-base text-gray-600">
                Der Glaubwürdigkeits-Score ist ein dynamischer Indikator, der die Vertrauenswürdigkeit und Effektivität der Abgeordneten bewertet.
              </p>
              <div className="flex items-center text-blue-600 mt-2">
                <span className="text-xs sm:text-sm font-medium">
                  {isScoreInfoExpanded ? 'Weniger anzeigen' : 'Mehr erfahren'}
                </span>
                <svg 
                  className={`ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transform transition-transform ${isScoreInfoExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </button>

          {isScoreInfoExpanded && (
            <div className="mt-4 sm:mt-6 ml-8 sm:ml-12">
              <div className="prose prose-sm sm:prose-base prose-blue">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Berechnung des Scores</h3>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1 sm:space-y-2">
                      <li>Basis-Score von 75% für alle Abgeordneten</li>
                      <li>Bewertung von dokumentierten Vorfällen nach:
                        <ul className="list-inside ml-4 space-y-1">
                          <li>Schwere (niedrig: 0,3 | mittel: 0,6 | hoch: 1,0)</li>
                          <li>Aktualität (höhere Gewichtung aktueller Vorfälle)</li>
                          <li>Art des Vorfalls (positiv/negativ)</li>
                        </ul>
                      </li>
                      <li>Zeitliche Gewichtung: Maximaler Einfluss nach einem Jahr halbiert</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Nutzen des Scores</h3>
                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1 sm:space-y-2">
                      <li>Transparente Bewertung politischer Arbeit</li>
                      <li>Objektive Vergleichbarkeit zwischen Abgeordneten</li>
                      <li>Nachvollziehbarkeit durch dokumentierte Vorfälle</li>
                      <li>Förderung der demokratischen Kontrolle</li>
                      <li>Motivation zur Verbesserung der politischen Arbeit</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-800">
                    <strong>Hinweis:</strong> Der Score wird kontinuierlich aktualisiert und basiert auf öffentlich verfügbaren Informationen. Tippen/Klicken Sie auf den Score eines Abgeordneten, um die konkreten Vorfälle einzusehen.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suchleiste und Filter */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Nach Abgeordneten suchen..."
                className="w-full px-4 py-2 text-sm sm:text-base rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-grow">
              <select
                className="px-4 py-2 text-sm sm:text-base rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                value={selectedParty}
                onChange={(e) => setSelectedParty(e.target.value)}
              >
                <option value="">Alle Parteien</option>
                <option value="CDU/CSU">CDU/CSU</option>
                <option value="SPD">SPD</option>
                <option value="Grüne">Grüne</option>
                <option value="FDP">FDP</option>
                <option value="AfD">AfD</option>
                <option value="Linke">Linke</option>
                <option value="BSW">BSW</option>
              </select>
              <select
                className="px-4 py-2 text-sm sm:text-base rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                value={scoreOrder}
                onChange={(e) => setScoreOrder(e.target.value as 'desc' | 'asc')}
              >
                <option value="desc">Höchster Score zuerst</option>
                <option value="asc">Niedrigster Score zuerst</option>
              </select>
              <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={showOnlyFraktionsvorsitz}
                  onChange={(e) => setShowOnlyFraktionsvorsitz(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm sm:text-base">Nur Fraktionsvorsitzende</span>
              </label>
            </div>
          </div>
        </div>

        {/* Abgeordneten-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAbgeordnete.slice(0, displayCount).map((abg) => (
            <div key={abg.id} className="bg-white rounded-xl shadow-lg relative transform transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className={`h-24 sm:h-32 bg-gradient-to-br ${getPartyColors(abg.partei).from} ${getPartyColors(abg.partei).to} opacity-75`}></div>
                <div className="absolute -bottom-10 sm:-bottom-12 left-4">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-xl sm:text-2xl">
                    {abg.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>
              
              <div className="pt-12 sm:pt-14 px-4 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{abg.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-gray-600">
                      <span className={`font-semibold ${getPartyColor(abg.partei)}`}>
                        {abg.partei}
                      </span>
                      {abg.isFraktionsvorsitz && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm">
                          Fraktionsvorsitz
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => handleScoreClick(abg.id)}
                      onMouseEnter={() => handleScoreHover(abg.id, true)}
                      onMouseLeave={() => handleScoreHover(abg.id, false)}
                      className={`text-base sm:text-lg font-semibold rounded-full px-3 py-1 ${
                        abg.score.wert >= 0.9
                          ? 'bg-green-100 text-green-800'
                          : abg.score.wert >= 0.7
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {Math.round(abg.score.wert * 100)}%
                    </button>
                    {abg.score.vorfaelle.length > 0 && showScoreInfo === abg.id && (
                      <div 
                        className="absolute z-[9999] bg-white border border-gray-200 rounded-lg shadow-xl p-4" 
                        style={{ 
                          width: '18rem',
                          maxHeight: '80vh',
                          overflowY: 'auto',
                          top: 'auto',
                          bottom: '100%',
                          right: '0',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <div className="relative">
                          <h4 className="font-semibold mb-2 text-sm sm:text-base">Dokumentierte Vorfälle:</h4>
                          <div className="space-y-3">
                            {abg.score.vorfaelle.map((vorfall, idx) => (
                              <div key={idx} className={`text-xs sm:text-sm ${vorfall.typ === 'positiv' ? 'text-green-600' : 'text-red-600'} bg-gray-50 p-2 rounded`}>
                                <div className="font-medium">{formatDate(vorfall.datum)}</div>
                                <div className="mt-1">{vorfall.beschreibung}</div>
                                <div className="mt-1 text-gray-500 text-xs">
                                  Schwere: {vorfall.schwere} | Quelle: {vorfall.quelle}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm sm:text-base text-gray-600">
                    <span className="font-medium">Wahlkreis:</span> {abg.wahlkreis}
                  </p>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-gray-900 mb-2">Schwerpunkte:</p>
                    <div className="flex flex-wrap gap-2">
                      {abg.schwerpunkte.map((schwerpunkt, idx) => (
                        <span
                          key={idx}
                          className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                        >
                          {schwerpunkt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex justify-between items-center">
                  <Link
                    href={`/abgeordnete/${abg.id}`}
                    className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Profil ansehen
                    <svg className="ml-1 sm:ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => shareProfile(abg)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    title="Profil teilen"
                  >
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAbgeordnete.length > displayCount && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <button
              onClick={loadMore}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              Weitere Profile anzeigen
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {filteredAbgeordnete.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg">Keine Abgeordneten gefunden, die den Filterkriterien entsprechen.</p>
          </div>
        )}
      </div>
    </div>
  )
} 