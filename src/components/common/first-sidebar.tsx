import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  HomeIcon,
  ChartPieIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import ThemeToggle from '../theme-toggle';
import SignOutButton from '../sign-out-button';
import UserAvatar from '../ui/user-avatar';

export default function FirstSidebar() {
  const activePath = usePathname();
  return (
    <div className="fixed top-0 bottom-0 left-0 flex flex-col items-center justify-between w-16 h-screen px-2 border border-r-2">
      <div className="flex flex-col items-center gap-3 py-4 text-gray-600">
        <Link href="/" className={`w-full flex justify-center`}>
          <HomeIcon
            className={`w-8 h-8 hover:text-blue-500 ${activePath === '/' ? 'text-blue-500' : ''}`}
          />
        </Link>
        <Link href="/diseases" className={`w-full flex justify-center`}>
          <ChartPieIcon
            className={`w-8 h-8 hover:text-blue-500 ${activePath === '/diseases' ? 'text-blue-500' : ''}`}
          />
        </Link>
        <Link href="/manage" className={`w-full flex justify-center `}>
          <Cog6ToothIcon
            className={`w-8 h-8 hover:text-blue-500 ${activePath === '/manage' ? 'text-blue-500' : ''}`}
          />
        </Link>
      </div>
      <div className="flex flex-col items-center gap-3 py-4 border-t">
        <Link href={`/profile`}>
          <UserAvatar />
        </Link>
        <ThemeToggle />
        <SignOutButton />
      </div>
    </div>
  );
}
