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
    <>
      <h1>{landing.title}</h1>
      <p style={{fontSize:'20px', fontWeight:700}}>{landing.heading}</p>
      <StructuredText
        data={landing.structuredtext}
        customNodeRules={
          /*
           * Although the component knows how to convert all "standard" elements
           * (headings, bullet lists, etc.) into HTML, it's possible to
           * customize the rendering of each node.
           */
          [
            renderNodeRule(isCode, ({ node, key }) => <Code key={key} node={node} />),
            renderNodeRule(isHeading, ({ node, key, children }) => (
              <HeadingWithAnchorLink node={node} key={key}>
                {children}
              </HeadingWithAnchorLink>
            )),
          ]
        }
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
      
    </>
  );
}