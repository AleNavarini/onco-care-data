"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardDocumentCheckIcon, PresentationChartLineIcon, ScissorsIcon } from '@heroicons/react/24/outline';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const previousPathname = pathname.split('/')[1];
    const termination = pathname.split('/')[2];

    return (
        <div className="flex">
            <div className="h-screen flex flex-col items-start pr-2 border-r-2 text-gray-600 gap-3 py-4 px-2">
                <Link href={`/${previousPathname}/dashboards`}>
                    <PresentationChartLineIcon
                        className={`w-8 h-8 hover:text-blue-500 ${termination === 'dashboards' ? 'text-blue-500' : ''}`}
                    />
                </Link>
                <Link href={`/${previousPathname}/studies`}>
                    <ClipboardDocumentCheckIcon
                        className={`w-8 h-8 hover:text-blue-500 ${termination === 'studies' ? 'text-blue-500' : ''}`}
                    />
                </Link>
                <Link href={`/${previousPathname}/treatments`}>
                    <ScissorsIcon
                        className={`w-8 h-8 hover:text-blue-500 ${termination === 'treatments' ? 'text-blue-500' : ''}`}
                    />
                </Link>
            </div>
            <div>{children}</div>
        </div>

    );
}