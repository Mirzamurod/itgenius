import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import nextI18NextConfig from '../next-i18next.config.mjs'

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

// Initialize i18n only if not already initialized
if (!i18n.isInitialized) {
  const i18nConfig = {
    fallbackLng: nextI18NextConfig.i18n.defaultLocale,
    supportedLngs: nextI18NextConfig.i18n.locales,
    // defaultNS: 'common',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Tarjima fayllarining yo'li
    },
    // SSR safe: don't wait for resources during SSR
    initImmediate: !isBrowser,
  }

  // Use initReactI18next and LanguageDetector only in browser (requires React context and window)
  if (isBrowser) {
    i18n.use(HttpApi).use(LanguageDetector).use(initReactI18next).init(i18nConfig)
  } else {
    // Server-side: initialize without React integration and browser-specific features
    i18n.use(HttpApi).init(i18nConfig)
  }
}

export default i18n
