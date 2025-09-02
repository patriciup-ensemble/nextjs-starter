import DraftModeToggler from '@/components/DraftModeToggler';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';
import './global.css';
import Header, { SiteHeaderData } from '@/components/Header';
import PopoverInit from '@/components/PopoverInit';
import BackToTop from '@/components/BackToTop';

const query = graphql(
  /* GraphQL */ `
    query query {
      _site {
        faviconMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [TagFragment],
);

const layoutQuery = graphql(
  `
    query LayoutQuery {
      siteconfig {
        backgroundimage {
          url
        }
      }
    }
  `,
  [],
);

const headerQuery = graphql(`
  query HeaderMenu {
    siteHeader {
      logo {
        url
        alt
      }
      menuitems {
        ... on MenuItemBlockRecord {
          label
          url
          newtab
          submenu {
            ... on MenuItemBlockRecord {
              label
              url
              newtab
            }
          }
        }
      }
    }
  }
`);

export async function generateMetadata() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const data = await executeQuery(query, { includeDrafts: isDraftModeEnabled });
  return toNextMetadata(data._site.faviconMetaTags);
}

type LayoutQueryData = {
  siteConfig: {
    backgroundimage?: { url: string };
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const data = await executeQuery(layoutQuery, {
    includeDrafts: isDraftModeEnabled,
  });
  const headerData = (await executeQuery(headerQuery, { includeDrafts: isDraftModeEnabled })) as SiteHeaderData;

  const backgroundUrl = data?.siteconfig?.backgroundimage?.url;

  return (
    <html lang="en">
      <body>
        <PopoverInit />
        <Header data={headerData} />
        <nav className="navbar bg-light border-bottom">
          <div className="container-fluid px-3">
            <ul className="nav nav-pills gap-2">
              <li className="nav-item"><a className="nav-link" href="/#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="/#events">Events</a></li>
              <li className="nav-item"><a className="nav-link" href="/#venues">Venues</a></li>
              <li className="nav-item"><a className="nav-link" href="/#jobs">Jobs</a></li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/#contact"
                  id="contactTooltipLink"
                  data-bs-toggle="tooltip"
                  data-tooltip-interactive="true"
                  data-bs-placement="bottom"
                  data-bs-html="true"
                  data-bs-title='\
                    <div class="list-group list-group-flush">\
                      <a class="list-group-item list-group-item-action" href="/privacy-policy">Privacy policy</a>\
                      <a class="list-group-item list-group-item-action" href="/terms-of-use">Terms of use</a>\
                      <a class="list-group-item list-group-item-action" href="/privacy-policy#california-privacy-rights">California privacy rights</a>\
                    </div>'
                >
                  Contact
                </a>
              </li>
              <li className="nav-item"><a className="nav-link" href="/#news">News</a></li>
              <li className="nav-item"><a className="nav-link" href="/#newsletter">Newsletter</a></li>
            </ul>
            <div className="ms-auto">
              <DraftModeToggler draftModeEnabled={draftMode().isEnabled} />
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <BackToTop />
      </body>
    </html>
  );
}
