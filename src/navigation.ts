import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'kn', 'hi'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  kn: 'ಕನ್ನಡ',
  hi: 'हिंदी',
};

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

