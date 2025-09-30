
import '../../global.css';
import { graphql} from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { normalizeUrl } from '@/lib/normalizeUrl';
import AboutSection from '@/components/aboutSection/AboutSection';
import EventsSection, { EventItem } from '@/components/eventSection/EventSection';
import VenuesSection from '@/components/venueSection/VenueSection';
import HeroSection from '@/components/HeroSection';
import FooterSection, { FooterProps } from '@/components/footerSection/FooterSection';

export default async function Page() {
 

  type MenuItem = {
    label: string;
    url: string;
    newtab?: boolean;
  };
  
  type HeroBlock = {
    backgroundimage?: { url: string };
    overlayopacity?: number;
    title: string;
    logo?: { url: string };
    menuitems: MenuItem[];
  };
  

  const query = graphql(`
    query LandingPageQuery {
      landing {
        hero {
          backgroundimage {
            url
          }
          overlayopacity
          title
          logo {
            url
          }
          menuitems {
            ... on MenuitemRecord {
              label
              url
              newtab
              tooltiphtml
            }
          }
        }
        content {
      __typename
      ... on AboutSectionRecord {
        title
        content {
          value
        }
      }
      ... on EventsectionRecord {
        title
        events {
          ... on EventitemRecord {
            title
            date
            description
            isFeatured
            images {
              url
            }
            url
          }
        }
      }
      ... on VenuesectionRecord{
        title
  name
  description
  link
  image {
    url
  }
      }   
  
    }  
       footer{
          url
          logo{
            url
          }
          addressLine1
          addressLine2
          newsletterLink
          newsletterText
        }
      }
    }
  `);
  

  const data = await executeQuery(query);
  const hero = data.landing?.hero as HeroBlock;
  const contentBlocks = data.landing?.content || [];
  const footer = data.landing?.footer as FooterProps
 
  
  

  return (
    <>
     <HeroSection
        backgroundUrl={hero?.backgroundimage?.url}
        overlayOpacity={hero.overlayopacity}
        title={hero.title}
        logoUrl={hero.logo?.url}
        menuitems={hero.menuitems}
      />
      

{contentBlocks.map((block: any, i: number) => {
      switch (block.__typename) {
        case "AboutSectionRecord":
          return (
            <AboutSection
              key={i}
              title={block.title}
              content={block.content}
            />
          );

          case "EventsectionRecord":
           
            const events: EventItem[] = (block.events || []).map((ev: any) => ({
              title: ev.title,
              date: ev.date,
              description: ev.description,
              image: ev.images && ev.images.length > 0 ? { url: ev.images[0].url } : undefined,
              images: ev.images || undefined,
              url: ev.url ? normalizeUrl(ev.url) : undefined,
              isFeatured: ev.isFeatured || false,
            }));
          
            return <EventsSection key={i} title={block.title} events={events} />;

          case "VenuesectionRecord":
           
            return (
              <VenuesSection
                key={i}
                title={block.title}
                venue={{
                  name: block.name,
                  desc: block.description,
                  url: block.link || "",
                  image: block.image.url || "",  
                }}
              />
            );

    default:
      return null;
        }
      })}
<FooterSection
  logo={footer?.logo}
  addressLine1={footer.addressLine1}
  addressLine2={footer.addressLine2}
  url={footer.url}
  newsletterText={footer.newsletterText}
  newsletterLink={footer.newsletterLink}
  extraInfo={footer?.extraInfo}
/>
      
    </>
  );
}