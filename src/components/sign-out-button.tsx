import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center justify-center p-1 transition-colors duration-200 border border-gray-300 rounded dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
    >
      <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
    </button>
  );
}
