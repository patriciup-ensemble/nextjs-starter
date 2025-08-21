import { TagFragment } from '@/lib/datocms/commonFragments';
import { graphql } from '@/lib/datocms/graphql';

export type PageProps = {
  params: Record<never, never>;
};

export const query = graphql(
  /* GraphQL */ `
    query LandingPageQuery {
      landing {
        _seoMetaTags {
          ...TagFragment
        }
        title
        text
        primaryCta
        secondaryCta
        primarycta {
          label
          url
        }
        secondarycta {
          label
          url
        }
      }
    }
  `,
  [TagFragment],
);


