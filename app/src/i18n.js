import i18n from 'i18next';
import en from '../global/languages/en';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	resources: {
		en
	},
	fallbackLng: 'en',
	debug: false,
	ns: ['translations'],
	defaultNS: 'translations',
	keySeparator: false,
	interpolation: {
		escapeValue: false,
		formatSeparator: ','
	},
	react: {
		wait: true
	}
});
export default i18n;
