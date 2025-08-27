import DraftModeToggler from '@/components/DraftModeToggler';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';
import "bootstrap/dist/css/bootstrap.min.css";



import './global.css';
import Script from 'next/script';

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

export async function generateMetadata() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const data = await executeQuery(query, { includeDrafts: isDraftModeEnabled });
  return toNextMetadata(data._site.faviconMetaTags);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="main-container">
        <header>
          <h1>DatoCMS + Next.js Starter Kit</h1>
          <nav>
            <a className="navlink" href="https://www.datocms.com/docs/next-js">
              📚 Full Integration Guide
            </a>
            <a className="navlink" href="/basic">
              🔧 Basic Route
            </a>
            <a className="navlink" href="/real-time-updates">
              ⚡️ Real-time Updates Route
            </a>
            <a className="navlink" href="/landing">
              ⚡️ Landing Page
            </a>
           
          </nav>
          <DraftModeToggler draftModeEnabled={draftMode().isEnabled} />
        </header>
        <main >{children}</main>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
