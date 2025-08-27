

import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import { graphql, type FragmentOf } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode, isHeading } from 'datocms-structured-text-utils';
import HeadingWithAnchorLink from '@/components/HeadingWithAnchorLink';
import "bootstrap/dist/css/bootstrap.min.css";





const Code = dynamic(() => import('@/components/Code'));

// GraphQL query for the landing page
const query = graphql(
  /* GraphQL */ `
    query BasicPageQuery {
     landing  {
        _seoMetaTags {
          ...TagFragment
        }
        title
        heading
        carousel {
      __typename
      ... on CarouselslideRecord {
        id
        caption
        link
        image {
          url
          alt
        }
      }
    }
        image {
          responsiveImage {
            ...ResponsiveImageFragment
          }
        }
        secondaryimage {
          responsiveImage {
            ...ResponsiveImageFragment
          }
        }
         structuredtext {
          value
         
        }
      }
    }
  `,
  [TagFragment, ResponsiveImageFragment]
);


export const generateMetadata = generateMetadataFn({
  query,
  // A callback that picks the SEO meta tags from the result of the query
  pickSeoMetaTags: (data) => data.landing?._seoMetaTags,
});

export default async function Page() {
  const { isEnabled: isDraftModeEnabled } = draftMode();

  const { landing } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  

  if (!landing) {
    notFound();
  }


  const pageImage = (landing as unknown as {
    image?: { responsiveImage?: FragmentOf<typeof ResponsiveImageFragment> };
  }).image;

  const secondaryImage = (landing as unknown as {
    secondaryimage?: { responsiveImage?: FragmentOf<typeof ResponsiveImageFragment> };
  }).secondaryimage;

  
  return (
    <main className="main-container">
      <h1>{landing.title}</h1>
      <p style={{fontSize:'20px', fontWeight:700}}>{landing.heading}</p>
      <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    {landing.carousel.map((slide, i) => (
      <div key={slide.id} className={`carousel-item ${i === 0 ? "active" : ""}`}>
        <img
          src={slide?.image?.url}
          className="d-block w-80 h-100"
          alt={slide.image?.alt || "Slide"}
        />
        {slide.caption && (
          <div className="carousel-caption d-none d-md-block">
            <p>{slide.caption}</p>
          </div>
        )}
      </div>
    ))}
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon"></span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon"></span>
  </button>
</div>


      <StructuredText
        data={landing.structuredtext}
        customNodeRules={[
          renderNodeRule(isCode, ({ node, key }) => <Code key={key} node={node} />),
          renderNodeRule(isHeading, ({ node, key, children }) => (
            <HeadingWithAnchorLink node={node} key={key}>
              {children}
            </HeadingWithAnchorLink>
          )),
        ]}
       
      />
      {pageImage?.responsiveImage && (
        <ResponsiveImage data={pageImage.responsiveImage} />
      )}
       {secondaryImage?.responsiveImage && (
        <ResponsiveImage data={secondaryImage.responsiveImage} />
      )}

     
      {/*
       * Structured Text is a JSON format similar to HTML, but with the advantage
       * of a significantly reduced and tailored set of possible tags
       * for editorial content, along with the capability to create hyperlinks
       * to other DatoCMS records and embed custom DatoCMS blocks.
       */}
      
    </main>
  );
}