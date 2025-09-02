

import '../../global.css';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { graphql} from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';


import AboutPageUI from '@/components/AboutPage';
import Header, { SiteHeaderData } from '@/components/Header';





const query = graphql(`
  query AboutPageQuery {
    about {
      title
      aboutstructuredtext { value }
      sidenavigation {
        id
        label
        anchor
      }
      sidelinks {
        __typename
        ... on SidelinkitemRecord {
          id
          title
          url
        }
      }
    }
  }
`);
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



type SideNavigationItem = {
  id: string;
  label: string;
  anchor: string;
};
type SideLink = {
  id: string;
  title: string;
  url: string;
};

type AboutPageData = {
  about: {
    title: string;
    aboutstructuredtext: any;
    sidenavigation?: SideNavigationItem[];
    sidelinks?:SideLink[]
  };
};


export default async function Page() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { about } = await executeQuery(query, { includeDrafts: isDraftModeEnabled }) as AboutPageData;
  const headerData = await executeQuery(headerQuery, { includeDrafts: isDraftModeEnabled }) as SiteHeaderData;

  if (!about) notFound();
  
 
  
  

  return (
    
    <div >
       <Header data={headerData} />

    <AboutPageUI
      title={about.title}
      structuredText={about.aboutstructuredtext}
      sideNavItems={about.sidenavigation || []}
      sideLinks={about.sidelinks || []}
    />
   
  </div>

  );
}
