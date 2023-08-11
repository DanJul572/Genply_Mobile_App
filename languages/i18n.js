import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from "react-native-localize";
import english from './english.json';
import indonesia from './indonesia.json';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        return callback(RNLocalize.getLocales()[0].languageCode);
    },
    init: () => { },
    cacheUserLanguage: () => { }
}

i18next
    .use(languageDetector)
    .use(initReactI18next).init({
        fallbackLng: 'en',
        resources: {
            en: english,
            id: indonesia
        },
        react: {
            useSuspense: false
        },
        compatibilityJSON: 'v3'
    });

RNLocalize.addEventListener('change', ({ language }) => {
    i18next.changeLanguage(language);
});

export default i18next;