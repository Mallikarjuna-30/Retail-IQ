import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate or fall back to default
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
