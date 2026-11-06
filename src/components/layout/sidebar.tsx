'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import {
  LayoutDashboard,
  Boxes,
  TrendingUp,
  ClockAlert,
  Percent,
  Store,
  FileText,
  Settings,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className = '', onNavigate }: SidebarProps) {
  const t = useTranslations();
  const tNav = useTranslations('nav');
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: tNav('dashboard'), icon: LayoutDashboard },
    { href: '/inventory', label: tNav('inventory'), icon: Boxes },
    { href: '/forecast', label: tNav('forecast'), icon: TrendingUp },
    { href: '/expiry', label: tNav('expiry'), icon: ClockAlert },
    { href: '/discounts', label: tNav('discounts'), icon: Percent },
    { href: '/rescue', label: tNav('rescue'), icon: Store },
    { href: '/reports', label: tNav('reports'), icon: FileText },
    { href: '/settings', label: tNav('settings'), icon: Settings },
  ];

  return (
    <aside
      className={`flex flex-col justify-between w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 h-screen select-none transition-colors duration-200 ${className}`}
    >
      {/* Top Header Logo */}
      <div>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-neutral-800">
          <Link
            href="/dashboard"
            onClick={onNavigate}
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-200 dark:shadow-none group-hover:bg-emerald-700 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight leading-none font-sans">
                {t('brand')}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase mt-1">
                Retail Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation List */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold shadow-2xs'
                    : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-800/60'
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-neutral-500 group-hover:text-gray-600'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom AI Banner Card */}
      <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-emerald-50 to-green-100/70 dark:from-emerald-950/50 dark:to-neutral-900/90 border border-emerald-200/60 dark:border-emerald-800/50 shadow-xs">
        <div className="flex items-center gap-2 mb-1.5 text-emerald-800 dark:text-emerald-300 font-semibold text-xs">
          <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center">
            <Sparkles className="w-3 h-3" />
          </div>
          <span>{tNav('aiTagline')}</span>
        </div>
        <p className="text-[11px] text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
          {tNav('aiSubtext')}
        </p>
      </div>
    </aside>
  );
}
