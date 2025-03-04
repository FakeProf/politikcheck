import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Rechtliche Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Rechtliches</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/impressum" className="text-gray-500 hover:text-gray-900">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-gray-500 hover:text-gray-900">
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link href="/nutzungsbedingungen" className="text-gray-500 hover:text-gray-900">
                  Nutzungsbedingungen
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Kontakt</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/kontakt" className="text-gray-500 hover:text-gray-900">
                  Kontaktformular
                </Link>
              </li>
              <li>
                <a href="mailto:info@politikcheck.com" className="text-gray-500 hover:text-gray-900">
                  info@politikcheck.com
                </a>
              </li>
            </ul>
          </div>

          {/* Über uns */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Über uns</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/ueber-uns" className="text-gray-500 hover:text-gray-900">
                  Über PolitikCheck
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-500 hover:text-gray-900">
                  Häufige Fragen
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} PolitikCheck.com - Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </footer>
  )
} 