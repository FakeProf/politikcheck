export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

        <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Datenschutz auf einen Blick</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Allgemeine Hinweise</h3>
              <p className="text-gray-600">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
                wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
                werden können.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Datenerfassung auf dieser Website</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Cookies</h3>
              <p className="text-gray-600">
                Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert.
                Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
              </p>

              <h3 className="text-lg font-medium text-gray-900">Server-Log-Dateien</h3>
              <p className="text-gray-600">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                die Ihr Browser automatisch an uns übermittelt.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Analyse-Tools und Werbung</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Google Analytics</h3>
              <p className="text-gray-600">
                Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die 
                Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Newsletter</h2>
            <p className="text-gray-600">
              Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine 
              E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der 
              angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Plugins und Tools</h2>
            <p className="text-gray-600">
              Auf unserer Website werden Social-Media-Plugins der unten aufgeführten Anbieter eingesetzt. 
              Die Plugins können Sie daran erkennen, dass sie mit dem entsprechenden Logo gekennzeichnet sind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Ihre Rechte</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten</li>
                <li>Die Berichtigung oder Löschung dieser Daten zu verlangen</li>
                <li>Die Verarbeitung einzuschränken</li>
                <li>Der Verarbeitung zu widersprechen</li>
                <li>Die Datenübertragbarkeit zu verlangen</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Kontakt</h2>
            <p className="text-gray-600">
              Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, 
              Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich bitte an:<br /><br />
              PolitikCheck GmbH<br />
              Datenschutzbeauftragter<br />
              Musterstraße 123<br />
              12345 Berlin<br />
              E-Mail: datenschutz@politikcheck.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 