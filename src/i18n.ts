import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
import { i18nResources as resources } from './app-config/I18n';

i18n
  // passes i18n down to react-i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    // we do not use keys in form messages.welcome
    keySeparator: false,
    interpolation: {
      // react already safes from xss
      escapeValue: false,
    },
  });

export default i18n;
