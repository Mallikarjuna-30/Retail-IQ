import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Indian Rupees with Indian numbering system (Lakhs, Crores)
 * e.g., ₹ 1,84,500
 */
export function formatINR(amount: number, locale: string = 'en-IN'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format numbers in Indian locale with tabular numerals
 */
export function formatNumber(value: number, locale: string = 'en-IN'): string {
  return new Intl.NumberFormat(locale).format(value);
}

