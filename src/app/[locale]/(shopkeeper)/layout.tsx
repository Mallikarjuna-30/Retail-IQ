'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { MobileDrawer } from '@/components/layout/mobile-drawer';

export default function ShopkeeperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0B0F19] text-neutral-900 dark:text-neutral-100 flex transition-colors duration-200">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64">
        <Sidebar className="h-full" />
      </div>

      {/* Mobile Slide-over Drawer */}
      <MobileDrawer
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Topbar onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

