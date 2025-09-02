"use client";

import { useEffect } from "react";

export default function PopoverInit() {
  useEffect(() => {
    let disposers: Array<() => void> = [];

    const run = async () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      const { Tooltip } = await import('bootstrap');

      const triggers = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"][data-tooltip-interactive="true"]')) as HTMLElement[];
      triggers.forEach((trigger) => {
        let hideTimeout: ReturnType<typeof setTimeout> | null = null;

        const tooltip = new Tooltip(trigger, {
          trigger: 'manual',
          html: true,
          sanitize: false,
          container: 'body',
          placement: 'bottom',
          delay: { show: 0, hide: 100 },
        });

        const show = () => {
          if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
          }
          tooltip.show();
          const id = trigger.getAttribute('aria-describedby');
          if (!id) return;
          const tipEl = document.getElementById(id);
          if (!tipEl) return;
          const onEnter = () => {
            if (hideTimeout) {
              clearTimeout(hideTimeout);
              hideTimeout = null;
            }
          };
          const onLeave = () => {
            hideTimeout = setTimeout(() => tooltip.hide(), 150);
          };
          tipEl.addEventListener('mouseenter', onEnter);
          tipEl.addEventListener('mouseleave', onLeave);
          disposers.push(() => {
            tipEl.removeEventListener('mouseenter', onEnter);
            tipEl.removeEventListener('mouseleave', onLeave);
          });
        };

        const scheduleHide = () => {
          hideTimeout = setTimeout(() => tooltip.hide(), 150);
        };

        trigger.addEventListener('mouseenter', show);
        trigger.addEventListener('focus', show);
        trigger.addEventListener('mouseleave', scheduleHide);
        trigger.addEventListener('blur', scheduleHide);

        disposers.push(() => {
          trigger.removeEventListener('mouseenter', show);
          trigger.removeEventListener('focus', show);
          trigger.removeEventListener('mouseleave', scheduleHide);
          trigger.removeEventListener('blur', scheduleHide);
          tooltip.dispose();
        });
      });
    };

    run();

    return () => {
      disposers.forEach((d) => d());
    };
  }, []);

  return null;
}
