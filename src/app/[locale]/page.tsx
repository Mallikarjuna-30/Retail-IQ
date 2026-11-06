import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/navigation';
import { Link } from '@/navigation';
import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Percent,
  Store,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Package,
  ClockAlert,
  Bot,
  MapPin,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('landing');
  const tRoot = await getTranslations();

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-200 dark:shadow-none group-hover:bg-emerald-700 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight leading-none">
                {tRoot('brand')}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase mt-1">
                Retail Intelligence
              </span>
            </div>
          </Link>

          {/* Center Links (desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <a href="#features" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('navFeatures')}
            </a>
            <a href="#how-it-works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('navHowItWorks')}
            </a>
            <a href="#roles" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('navBenefits')}
            </a>
            <Link href="/rescue" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>{t('navStockRescue')}</span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded-full font-semibold">
                Live
              </span>
            </Link>
          </nav>

          {/* Right Controls: Theme Toggle, Language Switcher, Sign In Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle showLabels={false} />
            <LanguageSwitcher />

            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex text-xs h-9 font-medium dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
              >
                {t('ctaLogin')}
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                size="sm"
                className="text-xs h-9 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5"
              >
                <span>{t('ctaExplore')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md flex items-center justify-center gap-2 h-12 px-6"
              >
                <span>{t('ctaExplore')}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/rescue">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-700 font-semibold h-12 px-6 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('ctaCustomer')}</span>
              </Button>
            </Link>

            <Link href="/login">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium h-12 px-5"
              >
                {t('ctaLogin')}
              </Button>
            </Link>
          </div>

          {/* Highlight KPI Pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-800/90 px-4 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('pillLossAvoided')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-800/90 px-4 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('pillFreshness')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-800/90 px-4 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('pillZeroWaste')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-16 sm:py-24 bg-white dark:bg-neutral-900 border-y border-gray-200 dark:border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t('featuresTitle')}
            </h2>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
              {t('featuresSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-card border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('feature1Title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('feature1Desc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-card border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
              <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
                <ClockAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('feature2Title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('feature2Desc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-card border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('feature3Title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('feature3Desc')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-card border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('feature4Title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('feature4Desc')}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-card border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('feature5Title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('feature5Desc')}
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-card border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('feature6Title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('feature6Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t('howItWorksTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-card border border-gray-200 dark:border-neutral-700 shadow-2xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wider uppercase">
                Step 01
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2">
                {t('step1Title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('step1Desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-6 rounded-card border border-gray-200 dark:border-neutral-700 shadow-2xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wider uppercase">
                Step 02
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2">
                {t('step2Title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('step2Desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-6 rounded-card border border-gray-200 dark:border-neutral-700 shadow-2xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wider uppercase">
                Step 03
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2">
                {t('step3Title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Switcher Cards */}
      <section id="roles" className="py-16 bg-gray-100/60 dark:bg-neutral-900/60 border-t border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t('rolesTitle')}
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {t('rolesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Shopkeeper Portal */}
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-card border border-gray-200 dark:border-neutral-700 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('roleShopkeeperTitle')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {t('roleShopkeeperDesc')}
                </p>
              </div>
              <Link href="/dashboard">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2">
                  <span>{t('roleShopkeeperAction')}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Customer Portal */}
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-card border border-gray-200 dark:border-neutral-700 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-5">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('roleCustomerTitle')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {t('roleCustomerDesc')}
                </p>
              </div>
              <Link href="/rescue">
                <Button variant="outline" className="w-full border-gray-300 dark:border-neutral-600 text-gray-800 dark:text-white font-semibold flex items-center justify-center gap-2">
                  <span>{t('roleCustomerAction')}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-neutral-800 py-10 bg-white dark:bg-neutral-900 text-xs text-gray-500 dark:text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 dark:text-white text-sm">RetailIQ</span>
            <span>•</span>
            <span>{t('footerTagline')}</span>
          </div>
          <div>{t('rights')}</div>
        </div>
      </footer>
    </div>
  );
}
