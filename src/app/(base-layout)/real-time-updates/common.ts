import { TagFragment } from '@/lib/datocms/commonFragments';
import { graphql } from '@/lib/datocms/graphql';

/*
 * Define here the props that the page component will receive from Next.js
 * https://nextjs.org/docs/app/api-reference/file-conventions/page#props
 */
export type PageProps = {
  /*
   * If, as in this case, the page does not have dynamic route parameters, just
   * define the type in this way:
   */
  params: Record<never, never>;
};

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
export const query = graphql(
  /* GraphQL */ `
    query RealtimeUpdatesPageQuery {
      page {
        _seoMetaTags {
          ...TagFragment
        }
        title
        _firstPublishedAt
        structuredText {
          value
          links {
            ... on RecordInterface {
              id
              __typename
            }
            ... on PageRecord {
              title
            }
          }
        }
      }
    }
  `,
  [TagFragment],
);
