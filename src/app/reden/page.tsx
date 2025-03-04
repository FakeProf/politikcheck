'use client'

import { useState } from 'react'

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
}

// Beispieldaten (später durch API-Calls ersetzt)
const reden: Rede[] = [
  {
    id: '1',
    titel: 'Rede zur Klimapolitik',
    datum: '2024-03-01',
    redner: 'Robert Habeck',
    partei: 'Grüne',
    thema: 'Klimaschutz',
    faktcheck: [
      {
        aussage: 'Deutschland hat die höchsten CO2-Einsparungen in der EU',
        bewertung: 'teilweise wahr',
        erklärung:
          'Deutschland hat zwar absolute Einsparungen erreicht, pro Kopf liegt es aber im Mittelfeld.',
        quellen: ['Umweltbundesamt', 'Eurostat'],
      },
    ],
  },
  {
    id: '2',
    titel: 'Debatte zur Wirtschaftspolitik',
    datum: '2024-03-05',
    redner: 'Christian Lindner',
    partei: 'FDP',
    thema: 'Wirtschaft',
    faktcheck: [
      {
        aussage: 'Die Schuldenbremse verhindert Investitionen in die Zukunft',
        bewertung: 'teilweise wahr',
        erklärung: 'Während die Schuldenbremse die Kreditaufnahme begrenzt, sind Investitionen durch Umschichtungen im Haushalt weiterhin möglich.',
        quellen: ['Bundesfinanzministerium', 'Sachverständigenrat'],
      },
    ],
  },
  {
    id: '3',
    titel: 'Rede zur sozialen Gerechtigkeit',
    datum: '2024-03-08',
    redner: 'Sahra Wagenknecht',
    partei: 'BSW',
    thema: 'Soziales',
    faktcheck: [
      {
        aussage: 'Die Reallöhne sind in den letzten 20 Jahren gesunken',
        bewertung: 'falsch',
        erklärung: 'Die Reallöhne sind im Durchschnitt gestiegen, wenn auch mit Schwankungen und unterschiedlich nach Branchen.',
        quellen: ['Statistisches Bundesamt', 'Institut für Arbeitsmarkt- und Berufsforschung'],
      },
    ],
  },
  {
    id: '4',
    titel: 'Debatte zur Migrationspolitik',
    datum: '2024-03-10',
    redner: 'Friedrich Merz',
    partei: 'CDU',
    thema: 'Migration',
    faktcheck: [
      {
        aussage: 'Deutschland nimmt mehr Flüchtlinge auf als alle anderen EU-Länder',
        bewertung: 'teilweise wahr',
        erklärung: 'In absoluten Zahlen stimmt dies, pro Kopf haben andere Länder mehr Flüchtlinge aufgenommen.',
        quellen: ['UNHCR', 'Eurostat'],
      },
    ],
  },
  {
    id: '5',
    titel: 'Rede zur Gesundheitspolitik',
    datum: '2024-03-12',
    redner: 'Karl Lauterbach',
    partei: 'SPD',
    thema: 'Gesundheit',
    faktcheck: [
      {
        aussage: 'Die Krankenhausreform wird 5000 Kliniken retten',
        bewertung: 'falsch',
        erklärung: 'Die genaue Anzahl der betroffenen Kliniken ist noch unklar, die genannte Zahl ist nicht belegbar.',
        quellen: ['Bundesgesundheitsministerium', 'Deutsche Krankenhausgesellschaft'],
      },
    ],
  },
  {
    id: '6',
    titel: 'Debatte zur Digitalisierung',
    datum: '2024-03-15',
    redner: 'Dorothee Bär',
    partei: 'CSU',
    thema: 'Digitalisierung',
    faktcheck: [
      {
        aussage: 'Deutschland ist bei der Digitalisierung Schlusslicht in Europa',
        bewertung: 'teilweise wahr',
        erklärung: 'In einigen Bereichen liegt Deutschland zurück, in anderen wie Industrie 4.0 ist es führend.',
        quellen: ['EU-Digitalindex', 'Bitkom'],
      },
    ],
  },
  {
    id: '7',
    titel: 'Rede zur Verteidigungspolitik',
    datum: '2024-03-18',
    redner: 'Marie-Agnes Strack-Zimmermann',
    partei: 'FDP',
    thema: 'Verteidigung',
    faktcheck: [
      {
        aussage: 'Die Bundeswehr ist nicht einsatzbereit',
        bewertung: 'teilweise wahr',
        erklärung: 'Es gibt erhebliche Ausrüstungsmängel, aber Teile der Truppe sind voll einsatzfähig.',
        quellen: ['Wehrbeauftragter des Bundestages', 'Bundesverteidigungsministerium'],
      },
    ],
  },
  {
    id: '8',
    titel: 'Debatte zum Klimaschutz',
    datum: '2024-03-20',
    redner: 'Annalena Baerbock',
    partei: 'Grüne',
    thema: 'Klimaschutz',
    faktcheck: [
      {
        aussage: 'Das 1,5-Grad-Ziel ist noch erreichbar',
        bewertung: 'teilweise wahr',
        erklärung: 'Technisch möglich, aber erfordert sofortige und drastische Maßnahmen weltweit.',
        quellen: ['IPCC', 'Deutsches Klimakonsortium'],
      },
    ],
  },
  {
    id: '9',
    titel: 'Rede zur Rentenpolitik',
    datum: '2024-03-22',
    redner: 'Hubertus Heil',
    partei: 'SPD',
    thema: 'Soziales',
    faktcheck: [
      {
        aussage: 'Die Rente ist bis 2045 sicher',
        bewertung: 'teilweise wahr',
        erklärung: 'Die Grundsicherung ist gewährleistet, das Rentenniveau könnte aber sinken.',
        quellen: ['Deutsche Rentenversicherung', 'Bundesarbeitsministerium'],
      },
    ],
  },
  {
    id: '10',
    titel: 'Debatte zur Bildungspolitik',
    datum: '2024-03-25',
    redner: 'Bettina Stark-Watzinger',
    partei: 'FDP',
    thema: 'Bildung',
    faktcheck: [
      {
        aussage: 'Deutschland investiert zu wenig in Bildung',
        bewertung: 'wahr',
        erklärung: 'Im OECD-Vergleich liegt Deutschland bei den Bildungsausgaben unter dem Durchschnitt.',
        quellen: ['OECD', 'Kultusministerkonferenz'],
      },
    ],
  },
  {
    id: '11',
    titel: 'Rede zur Europapolitik',
    datum: '2024-03-27',
    redner: 'Norbert Röttgen',
    partei: 'CDU',
    thema: 'Europa',
    faktcheck: [
      {
        aussage: 'Die EU-Erweiterung gefährdet die Handlungsfähigkeit',
        bewertung: 'teilweise wahr',
        erklärung: 'Ohne Reformen der Entscheidungsprozesse könnte die Handlungsfähigkeit leiden.',
        quellen: ['EU-Kommission', 'European Council on Foreign Relations'],
      },
    ],
  },
  {
    id: '12',
    titel: 'Debatte zur Energiepolitik',
    datum: '2024-03-29',
    redner: 'Robert Habeck',
    partei: 'Grüne',
    thema: 'Energie',
    faktcheck: [
      {
        aussage: 'Deutschland kann bis 2030 80% erneuerbaren Strom erreichen',
        bewertung: 'teilweise wahr',
        erklärung: 'Ziel ist ambitioniert, aber technisch möglich bei beschleunigtem Ausbau.',
        quellen: ['Bundeswirtschaftsministerium', 'Fraunhofer ISE'],
      },
    ],
  },
  {
    id: '13',
    titel: 'Rede zur Verkehrspolitik',
    datum: '2024-04-01',
    redner: 'Volker Wissing',
    partei: 'FDP',
    thema: 'Verkehr',
    faktcheck: [
      {
        aussage: 'E-Fuels sind eine klimafreundliche Alternative',
        bewertung: 'teilweise wahr',
        erklärung: 'E-Fuels können klimaneutral sein, sind aber energetisch weniger effizient als direkte E-Mobilität.',
        quellen: ['Umweltbundesamt', 'Agora Verkehrswende'],
      },
    ],
  },
  {
    id: '14',
    titel: 'Debatte zur Innenpolitik',
    datum: '2024-04-03',
    redner: 'Nancy Faeser',
    partei: 'SPD',
    thema: 'Inneres',
    faktcheck: [
      {
        aussage: 'Die Kriminalität in Deutschland steigt stark an',
        bewertung: 'falsch',
        erklärung: 'Die Gesamtkriminalität ist langfristig rückläufig, nur in einzelnen Bereichen gibt es Anstiege.',
        quellen: ['Bundeskriminalamt', 'Polizeiliche Kriminalstatistik'],
      },
    ],
  },
  {
    id: '15',
    titel: 'Rede zur Agrarpolitik',
    datum: '2024-04-05',
    redner: 'Cem Özdemir',
    partei: 'Grüne',
    thema: 'Landwirtschaft',
    faktcheck: [
      {
        aussage: 'Bio-Landwirtschaft kann die Welternährung nicht sichern',
        bewertung: 'teilweise wahr',
        erklärung: 'Bio allein reicht nicht, aber ein Mix aus verschiedenen nachhaltigen Methoden ist möglich.',
        quellen: ['FAO', 'Thünen-Institut'],
      },
    ],
  },
  {
    id: '16',
    titel: 'Debatte zur Familienpolitik',
    datum: '2024-04-08',
    redner: 'Lisa Paus',
    partei: 'Grüne',
    thema: 'Familie',
    faktcheck: [
      {
        aussage: 'Die Kindergrundsicherung reduziert Kinderarmut um 50%',
        bewertung: 'teilweise wahr',
        erklärung: 'Positive Effekte sind zu erwarten, die genaue Wirkung ist aber noch nicht belegt.',
        quellen: ['Bundesfamilienministerium', 'DIW Berlin'],
      },
    ],
  },
  {
    id: '17',
    titel: 'Rede zur Wohnungspolitik',
    datum: '2024-04-10',
    redner: 'Kevin Kühnert',
    partei: 'SPD',
    thema: 'Wohnen',
    faktcheck: [
      {
        aussage: 'Wir brauchen 400.000 neue Wohnungen pro Jahr',
        bewertung: 'wahr',
        erklärung: 'Diese Zahl wird von Experten als notwendig erachtet, um den Bedarf zu decken.',
        quellen: ['Pestel-Institut', 'Bundesbauministerium'],
      },
    ],
  },
  {
    id: '18',
    titel: 'Debatte zur Außenpolitik',
    datum: '2024-04-12',
    redner: 'Annalena Baerbock',
    partei: 'Grüne',
    thema: 'Außenpolitik',
    faktcheck: [
      {
        aussage: 'China ist eine systemische Rivalität für Europa',
        bewertung: 'wahr',
        erklärung: 'Die EU hat China offiziell als systemischen Rivalen eingestuft.',
        quellen: ['EU-Strategie-Papier', 'Auswärtiges Amt'],
      },
    ],
  },
  {
    id: '19',
    titel: 'Rede zur Finanzpolitik',
    datum: '2024-04-15',
    redner: 'Christian Lindner',
    partei: 'FDP',
    thema: 'Finanzen',
    faktcheck: [
      {
        aussage: 'Die Inflation ist dauerhaft besiegt',
        bewertung: 'falsch',
        erklärung: 'Zwar ist die Inflation gesunken, aber verschiedene Risiken bleiben bestehen.',
        quellen: ['Bundesbank', 'EZB'],
      },
    ],
  },
  {
    id: '20',
    titel: 'Debatte zur Arbeitsmarktpolitik',
    datum: '2024-04-17',
    redner: 'Hubertus Heil',
    partei: 'SPD',
    thema: 'Arbeit',
    faktcheck: [
      {
        aussage: 'Das Bürgergeld schafft negative Arbeitsanreize',
        bewertung: 'teilweise wahr',
        erklärung: 'In bestimmten Konstellationen können Fehlanreize entstehen, diese sind aber nicht systemisch.',
        quellen: ['IAB', 'Bundesagentur für Arbeit'],
      },
    ],
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

export default function Reden() {
  const [selectedThema, setSelectedThema] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterBewertung, setFilterBewertung] = useState<'alle' | 'falsch' | 'teilweise wahr'>('alle')

  // Filtere Reden basierend auf Thema, Suchbegriff und Bewertung
  const filteredReden = reden.filter(
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

  return (
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
          {filteredReden.map((rede) => (
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
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {rede.titel}
                  </h2>
                </div>
                <div className="mt-2 text-sm text-gray-500">
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
                  <p className="mt-1">Thema: {rede.thema}</p>
                </div>

                {/* Fact-Checking */}
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Fact-Checking
                  </h3>
                  <div className="mt-2 space-y-4">
                    {rede.faktcheck.map((check, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 