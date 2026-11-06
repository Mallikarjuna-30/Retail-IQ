import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './navigation';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  // Match only internationalized pathnames, ignore static files, api routes, and Next.js internals
  matcher: ['/', '/(kn|hi|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};

