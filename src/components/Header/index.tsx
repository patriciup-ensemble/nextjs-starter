"use client";


type SubMenuItem = {
  label: string;
  url: string;
  newtab: boolean;
};

type MenuItem = {
  label: string;
  url: string;
  newtab: boolean;
  submenu?: SubMenuItem[];
};

export type SiteHeaderData = {
  siteHeader: {
    logo: {
      url: string;
      alt?: string | null;
    };
    menuitems: MenuItem[];
  };
};

type HeaderProps = {
  data: SiteHeaderData;
};

export default function Header({ data }: HeaderProps) {
  const logoUrl = data?.siteHeader?.logo?.url;
  const logoAlt = data?.siteHeader?.logo?.alt || "Logo";
  const menuItems = data?.siteHeader?.menuitems || [];

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="/">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={logoAlt} height={32} />
          ) : (
            "Site"
          )}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menuItems.map((item) => {
              const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
              if (!hasSubmenu) {
                return (
                  <li className="nav-item" key={item.label}>
                    <a
                      className="nav-link"
                      href={item.url}
                      target={item.newtab ? "_blank" : "_self"}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              }

              const dropdownId = `dropdown-${item.label.replace(/\s+/g, "-").toLowerCase()}`;
              return (
                <li className="nav-item dropdown" key={item.label}>
                  <a
                    className="nav-link dropdown-toggle"
                    href={item.url || "#"}
                    id={dropdownId}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    target={item.newtab ? "_blank" : "_self"}
                  >
                    {item.label}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby={dropdownId}>
                    {item.submenu!.map((sub) => (
                      <li key={`${item.label}-${sub.label}`}>
                        <a
                          className="dropdown-item"
                          href={sub.url}
                          target={sub.newtab ? "_blank" : "_self"}
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
