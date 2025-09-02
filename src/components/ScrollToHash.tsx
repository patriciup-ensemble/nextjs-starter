"use client";

import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    const scrollToCurrentHash = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      if (!hash) return;
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Retry shortly in case content hasn't rendered yet
        setTimeout(() => {
          const el2 = document.getElementById(id);
          if (el2) {
            el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      }
    };

    scrollToCurrentHash();
    window.addEventListener('hashchange', scrollToCurrentHash);
    return () => window.removeEventListener('hashchange', scrollToCurrentHash);
  }, []);

  return null;
}
