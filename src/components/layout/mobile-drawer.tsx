'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white h-full shadow-2xl animate-in slide-in-from-left duration-200">
        <button
          onClick={onClose}
          className="absolute right-3 top-4 p-2 text-gray-500 hover:text-gray-800 rounded-lg focus:outline-hidden"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>

        <Sidebar onNavigate={onClose} className="h-full w-full" />
      </div>
    </div>
  );
}

