import type { Metadata } from 'next';
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Kannada } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/navigation';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme/theme-context';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-devanagari',
  display: 'swap',
});

const kannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-kannada',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RetailIQ - AI-Powered Retail Intelligence & Stock Rescue',
  description:
    'AI-powered inventory risk prediction and local stock recovery platform for small neighbourhood retailers in India.',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering in next-intl
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${devanagari.variable} ${kannada.variable}`}
    >
      <body className="min-h-screen bg-[#F9FAFB] text-neutral-900 font-sans antialiased tabular-nums">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
