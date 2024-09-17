'use client';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <div className="absolute top-0 right-0 flex items-end justify-end w-full px-4 py-2 md:hidden z-50">
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className="p-2 border rounded-md"
      >
        <Bars3Icon className="w-6 h-6 bg-background" />
      </button>
    </div>
  );
}
