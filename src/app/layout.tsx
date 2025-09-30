import DraftModeToggler from '@/components/DraftModeToggler';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';
import './global.css';
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


export async function generateMetadata() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const data = await executeQuery(query, { includeDrafts: isDraftModeEnabled });
  return toNextMetadata(data._site.faviconMetaTags);
}



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        {/* <nav className="navbar bg-light border-bottom" >
          <div className="container-fluid px-3"> */}
           
            <div className="ms-auto">
              <DraftModeToggler draftModeEnabled={draftMode().isEnabled}  />
            </div>
          {/* </div>
        </nav> */}
        <main>{children}</main>
        <BackToTop />
      </body>
    </html>
  );
}
