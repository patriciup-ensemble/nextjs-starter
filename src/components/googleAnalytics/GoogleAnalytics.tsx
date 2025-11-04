"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window.gtag === 'function') {
            // Use window.location to get full URL including search params (avoids Suspense requirement)
            const url = window.location.pathname + window.location.search;
            window.gtag('config', gaId, {
                page_path: url,
            });
        }
    }, [pathname, gaId]);

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