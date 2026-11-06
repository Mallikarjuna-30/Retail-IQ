'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/navigation';
import {
  ShieldCheck,
  Store,
  User,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { toast } from 'sonner';

type UserRole = 'shopkeeper' | 'customer' | 'admin';

export default function LoginPage() {
  const t = useTranslations();
  const tAuth = useTranslations('auth');
  const router = useRouter();

  const [activeRole, setActiveRole] = useState<UserRole>('shopkeeper');
  const [email, setEmail] = useState('shopkeeper@retailiq.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Switch role presets
  const handleRoleSelect = (role: UserRole) => {
    setActiveRole(role);
    if (role === 'shopkeeper') {
      setEmail('shopkeeper@retailiq.in');
      setPassword('password123');
    } else if (role === 'customer') {
      setEmail('customer@retailiq.in');
      setPassword('password123');
    } else if (role === 'admin') {
      setEmail('admin@retailiq.in');
      setPassword('admin123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success(tAuth('loginTitle') + ' - Demo Mode');
      if (activeRole === 'customer') {
        router.push('/rescue');
      } else {
        router.push('/dashboard');
      }
    }, 600);
  };

  const handleInstantDemoLogin = (role: UserRole) => {
    handleRoleSelect(role);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Signed in as ${role === 'shopkeeper' ? 'Shop Owner' : role === 'customer' ? 'Customer' : 'Admin'}!`);
      if (role === 'customer') {
        router.push('/rescue');
      } else {
        router.push('/dashboard');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0B0F19] flex flex-col justify-between text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{tAuth('backToHome')}</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-card border border-gray-200 dark:border-neutral-800 shadow-card p-6 sm:p-8">
          {/* Logo & Heading */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-sm shadow-emerald-200 dark:shadow-none">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {tAuth('loginTitle')}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {tAuth('loginSubtitle')}
            </p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 dark:bg-neutral-800 rounded-lg mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleRoleSelect('shopkeeper')}
              className={`py-2 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                activeRole === 'shopkeeper'
                  ? 'bg-white dark:bg-neutral-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{tAuth('tabShopkeeper')}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('customer')}
              className={`py-2 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                activeRole === 'customer'
                  ? 'bg-white dark:bg-neutral-900 text-blue-700 dark:text-blue-400 shadow-2xs font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{tAuth('tabCustomer')}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`py-2 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
                activeRole === 'admin'
                  ? 'bg-white dark:bg-neutral-900 text-purple-700 dark:text-purple-400 shadow-2xs font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{tAuth('tabAdmin')}</span>
            </button>
          </div>

          {/* Quick 1-Click Demo Login Bar */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/50 mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {tAuth('quickDemoTitle')}
              </span>
              <Badge variant="healthy" className="text-[10px] py-0 px-2">
                {tAuth('demoBadge')}
              </Badge>
            </div>
            <p className="text-[11px] text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed mb-2.5">
              {activeRole === 'shopkeeper' && tAuth('shopkeeperDemoDesc')}
              {activeRole === 'customer' && tAuth('customerDemoDesc')}
              {activeRole === 'admin' && tAuth('adminDemoDesc')}
            </p>
            <Button
              type="button"
              size="sm"
              onClick={() => handleInstantDemoLogin(activeRole)}
              className="w-full text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>1-Click Launch as {activeRole === 'shopkeeper' ? 'Shop Owner' : activeRole === 'customer' ? 'Customer' : 'Admin'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Standard Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {tAuth('emailLabel')}
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-white focus:bg-white dark:focus:bg-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {tAuth('passwordLabel')}
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info('Demo password is reset to: password123');
                  }}
                  className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {tAuth('forgotPassword')}
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2 pr-10 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg text-gray-900 dark:text-white focus:bg-white dark:focus:bg-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>{tAuth('rememberMe')}</span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-10 shadow-sm"
            >
              {isLoading ? 'Signing in...' : tAuth('signInButton')}
            </Button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-neutral-800 text-center text-xs text-gray-500 dark:text-gray-400">
            <span>{tAuth('dontHaveAccount')} </span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast.info('Store registration will be enabled in Phase 2.');
              }}
              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {tAuth('registerLink')}
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-gray-400 dark:text-neutral-500">
        © 2026 {t('brand')}. Retail Intelligence for Neighbourhood Stores.
      </footer>
    </div>
  );
}
