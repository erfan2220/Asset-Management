//@ts-nocheck
import Cookies from 'js-cookie';
import en from './en.json';
import fa from './fa.json';

export const t = (key) => {
    const language = Cookies.get('language') || 'en';
    const translations = language === 'fa' ? fa : en;
    return translations[key] || key;
};
