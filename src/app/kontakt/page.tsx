'use client'

import { useState } from 'react'

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    betreff: '',
    nachricht: '',
    kategorie: 'allgemein'
  })

  const [submitStatus, setSubmitStatus] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error'
    message: string
  }>({
    status: 'idle',
    message: ''
  })

  const [errors, setErrors] = useState<{
    [key: string]: string
  }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Bitte geben Sie Ihren Namen ein'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }

    if (!formData.betreff.trim()) {
      newErrors.betreff = 'Bitte geben Sie einen Betreff ein'
    }

    if (!formData.nachricht.trim()) {
      newErrors.nachricht = 'Bitte geben Sie eine Nachricht ein'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setSubmitStatus({
        status: 'error',
        message: 'Bitte korrigieren Sie die markierten Felder.'
      })
      return
    }

    setSubmitStatus({
      status: 'loading',
      message: 'Ihre Nachricht wird gesendet...'
    })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten')
      }

      setSubmitStatus({
        status: 'success',
        message: 'Vielen Dank für Ihre Nachricht! Wir haben Ihnen eine Bestätigungs-E-Mail gesendet und werden uns schnellstmöglich bei Ihnen melden.'
      })

      setFormData({
        name: '',
        email: '',
        betreff: '',
        nachricht: '',
        kategorie: 'allgemein'
      })
    } catch (error) {
      setSubmitStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Fehler für das geänderte Feld zurücksetzen
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-300 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Kontakt</h1>

        <div className="bg-gray-200 shadow-lg rounded-lg p-6 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kontaktieren Sie uns</h2>
            <p className="text-gray-800 mb-6">
              Haben Sie Fragen, Anregungen oder möchten Sie uns unterstützen? Füllen Sie einfach das Formular aus, 
              und wir melden uns schnellstmöglich bei Ihnen.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg bg-white border-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.name ? 'border-red-400' : 'border-gray-500'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  E-Mail *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg bg-white border-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.email ? 'border-red-400' : 'border-gray-500'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="kategorie" className="block text-sm font-medium text-gray-900">
                  Kategorie *
                </label>
                <select
                  name="kategorie"
                  id="kategorie"
                  value={formData.kategorie}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg bg-white border-2 border-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="allgemein">Allgemeine Anfrage</option>
                  <option value="factchecking">Fact-Checking</option>
                  <option value="expertise">Expertise anbieten</option>
                  <option value="fehler">Fehler melden</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>

              <div>
                <label htmlFor="betreff" className="block text-sm font-medium text-gray-900">
                  Betreff *
                </label>
                <input
                  type="text"
                  name="betreff"
                  id="betreff"
                  value={formData.betreff}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg bg-white border-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.betreff ? 'border-red-400' : 'border-gray-500'
                  }`}
                />
                {errors.betreff && (
                  <p className="mt-1 text-sm text-red-600">{errors.betreff}</p>
                )}
              </div>

              <div>
                <label htmlFor="nachricht" className="block text-sm font-medium text-gray-900">
                  Ihre Nachricht *
                </label>
                <textarea
                  name="nachricht"
                  id="nachricht"
                  rows={6}
                  value={formData.nachricht}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg bg-white border-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.nachricht ? 'border-red-400' : 'border-gray-500'
                  }`}
                />
                {errors.nachricht && (
                  <p className="mt-1 text-sm text-red-600">{errors.nachricht}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">* Pflichtfeld</p>
                <button
                  type="submit"
                  disabled={submitStatus.status === 'loading'}
                  className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    submitStatus.status === 'loading'
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                  }`}
                >
                  {submitStatus.status === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Wird gesendet...
                    </>
                  ) : (
                    'Nachricht senden'
                  )}
                </button>
              </div>
            </form>

            {submitStatus.status !== 'idle' && (
              <div
                className={`mt-4 p-4 rounded-md ${
                  submitStatus.status === 'success'
                    ? 'bg-green-200 text-green-900'
                    : submitStatus.status === 'error'
                    ? 'bg-red-200 text-red-900'
                    : 'bg-blue-200 text-blue-900'
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Weitere Kontaktmöglichkeiten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">E-Mail</h3>
                <p className="text-gray-800">
                  <a href="mailto:info@politikcheck.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                    info@politikcheck.com
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 