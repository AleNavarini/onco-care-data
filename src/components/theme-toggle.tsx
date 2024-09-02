import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
      ? 'dark'
      : 'light',
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center p-1 transition-colors duration-200 border border-gray-300 rounded dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
    >
      {theme === 'dark' ? (
        <SunIcon
          className="w-6 h-6"
          aria-label="Switch to light mode"
        />
      ) : (
        <MoonIcon
          className="w-6 h-6"
          aria-label="Switch to dark mode"
        />
      )}
    </button>
  );
}
