'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Search, Bell, Menu } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from '@/components/theme/theme-toggle';

interface TopbarProps {
  onOpenMobileNav: () => void;
  shopName?: string;
  userName?: string;
}

export function Topbar({
  onOpenMobileNav,
  userName = 'Ramesh Kumar',
}: TopbarProps) {
  const tTopbar = useTranslations('topbar');

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs border-b border-gray-200 dark:border-neutral-800 px-4 sm:px-6 flex items-center justify-between transition-colors duration-200">
      {/* Mobile Hamburger & Search Box */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg focus:outline-hidden"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-gray-400 dark:text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={tTopbar('searchPlaceholder')}
            className="w-full pl-9 pr-12 py-2 text-sm bg-gray-50 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:bg-white dark:focus:bg-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-400 dark:text-neutral-500 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded">
            Ctrl+K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Theme Toggle, Notifications, Language Switcher, User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle Bar / Button */}
        <ThemeToggle />

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Notification Bell with red dot */}
        <button
          className="relative p-2 text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg focus:outline-hidden transition-colors"
          aria-label={tTopbar('notifications')}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white dark:ring-neutral-900 animate-pulse" />
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-neutral-800 hidden sm:block" />

        {/* User Avatar Chip */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-semibold flex items-center justify-center text-sm shadow-2xs">
            {userName.charAt(0)}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">
              {userName}
            </span>
            <span className="text-[11px] text-gray-500 dark:text-neutral-400 leading-none">
              {tTopbar('ownerRole')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

