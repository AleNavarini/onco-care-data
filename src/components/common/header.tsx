'use client';
import { toggleSidebar } from '@/utils';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <div className="relative top-0 right-0 flex items-end justify-end w-full px-4 py-2 md:hidden">
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className="p-2 border rounded-md"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>
    </div>
  );
}
