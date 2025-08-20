import HeadingWithAnchorLink from '@/components/HeadingWithAnchorLink';
import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql, type FragmentOf } from '@/lib/datocms/graphql';
import { isCode, isHeading } from 'datocms-structured-text-utils';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { StructuredText, renderNodeRule } from 'react-datocms';

/*
 * By using next/dynamic, the components will not be included in the page's
 * initial JavaScript bundle. It allows you to defer loading of Client
 * Components and imported libraries, and only include them in the client bundle
 * when they're needed.
 */
const Code = dynamic(() => import('@/components/Code'));

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
const query = graphql(
  /* GraphQL */ `
    query BasicPageQuery {
      page {
        _seoMetaTags {
          ...TagFragment
        }
        title
        _firstPublishedAt
        image {
          responsiveImage(sizes: "(max-width: 700px) 100vw, 700px") {
            ...ResponsiveImageFragment
          }
        }
        structuredText {
          value
        }
      }
    }
  `,
  [TagFragment, ResponsiveImageFragment],
);

/**
 * We use a helper to generate function that fits the Next.js
 * `generateMetadata()` format, automating the creation of meta tags based on
 * the `_seoMetaTags` present in a DatoCMS GraphQL query.
 */
export const generateMetadata = generateMetadataFn({
  query,
  // A callback that picks the SEO meta tags from the result of the query
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function Page() {
  const { isEnabled: isDraftModeEnabled } = draftMode();

  const { page } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  if (!page) {
    notFound();
  }
  console.log(page);

  const pageImage = (page as unknown as {
    image?: { responsiveImage?: FragmentOf<typeof ResponsiveImageFragment> };
  }).image;

  return (
    <>
      <h1>{page.title}</h1>
      {pageImage?.responsiveImage && (
        <ResponsiveImage data={pageImage.responsiveImage} />
      )}
      {/*
       * Structured Text is a JSON format similar to HTML, but with the advantage
       * of a significantly reduced and tailored set of possible tags
       * for editorial content, along with the capability to create hyperlinks
       * to other DatoCMS records and embed custom DatoCMS blocks.
       */}
      <StructuredText
        data={page.structuredText}
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
      <footer>Published at {page._firstPublishedAt}</footer>
    </>
  );
}
