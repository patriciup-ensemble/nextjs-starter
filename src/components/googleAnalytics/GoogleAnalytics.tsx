"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window.gtag === 'function') {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
            // Use config to update page path (this automatically sends a page_view)
            window.gtag('config', gaId, {
                page_path: url,
            });
        }
    }, [pathname, searchParams, gaId]);

    useEffect(() => {
        // Track hash changes (for anchor link navigation)
        const handleHashChange = () => {
            if (typeof window.gtag === 'function') {
                const url = window.location.pathname + window.location.search + window.location.hash;
                window.gtag('config', gaId, {
                    page_path: url,
                });
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [gaId]);

    return null;
}