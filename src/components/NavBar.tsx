"use client";

import { useState } from "react";
import { normalizeUrl } from "@/lib/normalizeUrl";

export type NavMenuItem = {
  label: string;
  url: string;
  newtab?: boolean;
  tooltiphtml?: string;
};

type Props = {
  logoUrl?: string;
  menuitems: NavMenuItem[];
  variant?: "hero" | "sticky";
};

export default function NavBar({ logoUrl, menuitems, variant = "hero" }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

  // Desktop sizing
  const isSticky = variant === "sticky";
  const desktopLogoHeight = isSticky ? 58 : 158;
  const desktopWrapperClasses = isSticky
    ? "d-none d-lg-flex align-items-center justify-content-between px-5"
    : "mb-5 mt-3 w-75 d-none d-lg-flex h-30 bg-transparent justify-content-between align-items-center";
  const desktopWrapperStyle = isSticky
    ? { height: 75, backgroundColor: "rgba(0,0,0,0.85)" }
    : undefined as any;

  return (
    <>
      {/* Desktop */}
      <nav className={desktopWrapperClasses} style={desktopWrapperStyle}>
        {logoUrl && <img src={logoUrl} height={desktopLogoHeight} alt="Logo" />}
        <ul className="nav nav-pills bg-transparent rounded-2 p-2 gap-1">
          {menuitems.map((item, idx) => {
            const labelLower = (item.label || '').trim().toLowerCase();
            const isContact = labelLower === 'contact';
            return (
              <li className={item.tooltiphtml ? "nav-item dropdown" : "nav-item"} key={idx}>
                {item.tooltiphtml ? (
                  <>
                    <a
                      className={`nav-link dropdown-toggle text-white`}
                      href={isContact ? normalizeUrl('#contact') : normalizeUrl(item.url?.trim())}
                      role="button"
                      aria-expanded="false"
                    >
                      {item.label}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li className="px-2 py-1" style={{listStyle: "none"}}>
                        <div dangerouslySetInnerHTML={{ __html: item.tooltiphtml || "" }} />
                      </li>
                    </ul>
                  </>
                ) : (
                  <a
                    className={`nav-link text-white`}
                    href={isContact ? normalizeUrl('#contact') : normalizeUrl(item.url?.trim())}
                    target={item.newtab ? "_blank" : undefined}
                    rel={item.newtab ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile */}
      <nav className={`d-flex d-lg-none flex-column ${isSticky ? '' : 'position-absolute top-0 start-0 end-0 '}`} style={isSticky ? { backgroundColor: 'rgba(0,0,0,0.85)' } : { zIndex: 5 }}>
        <div className={`d-flex align-items-center justify-content-center position-relative ${isSticky ? '' : 'py-2'}`} style={{ height: isSticky ? 45 : undefined, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <button
            type="button"
            aria-label="Toggle navigation"
            className="btn btn-link text-white position-absolute start-0"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            <i className="bi bi-list" style={{ fontSize: isSticky ? 22 : 28 }}></i>
          </button>
          {logoUrl && <img src={logoUrl} height={isSticky ? 28 : 50} alt="Logo" />}
        </div>

        {isMobileMenuOpen && (
          <div className={`bg-dark ${isSticky ? 'bg-opacity-75 border-top' : 'bg-opacity-75 rounded-2 mt-2 p-2'}`}>
            <ul className="list-unstyled m-0 py-2">
              {menuitems.map((item, idx) => {
                const labelLower = (item.label || '').trim().toLowerCase();
                const isContact = labelLower === 'contact';
                const hasSubmenu = Boolean(item.tooltiphtml);
                const isOpen = openSubmenuIndex === idx;
                return (
                  <li key={idx} className="mb-1">
                    <div className="d-flex align-items-center justify-content-between">
                      <a
                        className={`text-white text-decoration-none ${isSticky ? 'py-2 px-3' : 'py-2 px-1'} flex-grow-1`}
                        href={isContact ? normalizeUrl('#contact') : normalizeUrl(item.url?.trim())}
                        target={item.newtab ? "_blank" : undefined}
                        rel={item.newtab ? "noopener noreferrer" : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                      {hasSubmenu && (
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-white text-decoration-none"
                          aria-expanded={isOpen}
                          aria-label={`Toggle ${item.label} submenu`}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenSubmenuIndex((prev) => (prev === idx ? null : idx));
                          }}
                        >
                          <i className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                        </button>
                      )}
                    </div>
                    {hasSubmenu && isOpen && (
                      <div className="ps-4 py-2">
                        <div dangerouslySetInnerHTML={{ __html: item.tooltiphtml || "" }} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}



