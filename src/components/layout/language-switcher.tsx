'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname, locales, type Locale } from '@/navigation';
import { Globe } from 'lucide-react';

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  kn: 'ಕನ್ನಡ',
  hi: 'हिंदी',
};

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Set cookie to persist locale preference
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg border border-gray-200 dark:border-neutral-700 text-xs font-medium">
      <Globe className="w-3.5 h-3.5 text-gray-500 dark:text-neutral-400 ml-1 mr-0.5" />
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <button
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            disabled={isPending}
            className={`px-2 py-1 rounded-md transition-all duration-150 ${
              isActive
                ? 'bg-white dark:bg-neutral-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-semibold'
                : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-neutral-700/60'
            } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={`Switch to ${localeLabels[locale]}`}
          >
            {localeLabels[locale]}
          </button>
        );
      })}
    </div>
  );
}

