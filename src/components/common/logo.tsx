import Image from 'next/image';
import logo from '@/app/logo.svg';

export default function Logo() {
  return (
    <Image
      alt="Logo"
      src={logo}
      className="w-[50px] h-[50px] invert dark:invert-0"
      width={50}
      height={50}
    />
  );
}
