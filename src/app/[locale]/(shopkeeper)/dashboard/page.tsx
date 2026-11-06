import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/navigation';
import {
  Package,
  IndianRupee,
  AlertTriangle,
  ClockAlert,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatINR } from '@/lib/utils';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('dashboard');
  const tCommon = await getTranslations('common');

  // Determine time-aware greeting
  const hour = new Date().getHours();
  let greetingKey = 'greetingMorning';
  if (hour >= 12 && hour < 17) greetingKey = 'greetingAfternoon';
  else if (hour >= 17) greetingKey = 'greetingEvening';

  const greeting = t(greetingKey, { name: 'Ramesh' });

  // Format currency with locale
  const formattedInventoryValue = formatINR(184500, locale === 'kn' ? 'kn-IN' : locale === 'hi' ? 'hi-IN' : 'en-IN');
  const formattedLossAvoided = formatINR(14200, locale === 'kn' ? 'kn-IN' : locale === 'hi' ? 'hi-IN' : 'en-IN');

  const statCards = [
    {
      title: t('stats.totalProducts'),
      value: '248',
      delta: t('stats.deltaProducts'),
      icon: Package,
      tint: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/60',
      badgeColor: 'healthy',
    },
    {
      title: t('stats.inventoryValue'),
      value: formattedInventoryValue,
      delta: t('stats.deltaValue'),
      icon: IndianRupee,
      tint: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800/60',
      badgeColor: 'info',
    },
    {
      title: t('stats.lowStockItems'),
      value: '12',
      delta: t('stats.deltaLowStock'),
      icon: AlertTriangle,
      tint: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800/60',
      badgeColor: 'warning',
    },
    {
      title: t('stats.nearExpiryProducts'),
      value: '8',
      delta: t('stats.deltaNearExpiry'),
      icon: ClockAlert,
      tint: 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/60',
      badgeColor: 'danger',
    },
  ];

  const needsAttentionItems = [
    {
      name: 'Nandini GoodLife Milk (500ml)',
      category: 'Dairy',
      status: t('needsAttention.expiresInDays', { days: 2 }),
      badgeVariant: 'danger' as const,
      action: tCommon('restock'),
    },
    {
      name: 'Modern Brown Bread (400g)',
      category: 'Bakery',
      status: t('needsAttention.expiresInDays', { days: 3 }),
      badgeVariant: 'warning' as const,
      action: tCommon('view'),
    },
    {
      name: 'Fortune Sunflower Oil (1L)',
      category: 'Oils',
      status: tCommon('lowStock'),
      badgeVariant: 'warning' as const,
      action: tCommon('restock'),
    },
    {
      name: 'Aashirvaad Whole Wheat Atta (5kg)',
      category: 'Staples',
      status: tCommon('lowStock'),
      badgeVariant: 'warning' as const,
      action: tCommon('restock'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Greeting Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {greeting}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('subtext')}</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 px-3 py-2 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-2xs text-xs font-medium text-gray-700 dark:text-gray-300 w-fit">
          <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{new Date().toLocaleDateString(locale, { dateStyle: 'medium' })}</span>
        </div>
      </div>

      {/* Four Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-neutral-900 rounded-card p-5 border border-surface-border dark:border-neutral-800 shadow-card flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center border ${card.tint}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {card.value}
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{card.delta}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Store Health Score Banner & AI Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Health Score Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-card p-5 border border-surface-border dark:border-neutral-800 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {t('healthScore.title')}
              </h2>
            </div>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
              {t('healthScore.score')}
            </span>
          </div>

          <div className="space-y-3 py-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 dark:text-gray-400">{t('healthScore.lossAvoided')}</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formattedLossAvoided}</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-neutral-800 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full w-[88%]" />
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-neutral-800 text-xs">
            <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              {t('healthScore.biggestOpportunity')}
            </span>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('healthScore.opportunityText')}
            </p>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-emerald-800 dark:to-emerald-950 text-white rounded-card p-6 shadow-md flex flex-col justify-between border border-emerald-500/30">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-emerald-100 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{t('aiInsight.title')}</span>
            </div>
            <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-md backdrop-blur-xs font-medium">
              Real-time
            </span>
          </div>

          <p className="text-base sm:text-lg font-medium text-emerald-50 my-4 leading-relaxed">
            &ldquo;{t('aiInsight.description')}&rdquo;
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-emerald-100/90">
              Confidence score: 92% • Based on 90-day history
            </span>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-emerald-900 hover:bg-emerald-50 font-semibold shadow-xs"
            >
              {t('aiInsight.action')}
            </Button>
          </div>
        </div>
      </div>

      {/* Row: Needs Attention & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Needs Attention Table */}
        <div className="bg-white dark:bg-neutral-900 rounded-card p-5 border border-surface-border dark:border-neutral-800 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-neutral-800 mb-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('needsAttention.title')}
            </h2>
            <button className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1">
              <span>{tCommon('viewAll')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-neutral-800">
            {needsAttentionItems.map((item, idx) => (
              <div
                key={idx}
                className="py-3 flex items-center justify-between gap-3 first:pt-1 last:pb-1"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-neutral-500">{item.category}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant={item.badgeVariant}>{item.status}</Badge>
                  <Button variant="outline" size="sm" className="text-xs h-7 px-2.5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                    {item.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white dark:bg-neutral-900 rounded-card p-5 border border-surface-border dark:border-neutral-800 shadow-card">
          <div className="pb-3 border-b border-gray-100 dark:border-neutral-800 mb-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t('recentActivity.title')}
            </h2>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-xs">
              <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {t('recentActivity.stockUpdated')}
                </p>
                <span className="text-gray-400 dark:text-neutral-500 text-[11px]">10 minutes ago</span>
              </div>
            </li>
            <li className="flex items-start gap-3 text-xs">
              <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <Package className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {t('recentActivity.newProductAdded')}
                </p>
                <span className="text-gray-400 dark:text-neutral-500 text-[11px]">1 hour ago</span>
              </div>
            </li>
            <li className="flex items-start gap-3 text-xs">
              <div className="w-6 h-6 rounded-full bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                <ClockAlert className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {t('recentActivity.expiryAlert')}
                </p>
                <span className="text-gray-400 dark:text-neutral-500 text-[11px]">3 hours ago</span>
              </div>
            </li>
            <li className="flex items-start gap-3 text-xs">
              <div className="w-6 h-6 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {t('recentActivity.lowStockAlert')}
                </p>
                <span className="text-gray-400 dark:text-neutral-500 text-[11px]">5 hours ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
