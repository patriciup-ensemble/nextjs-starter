import VideoPlayer, { VideoPlayerFragment } from '@/components/VideoPlayer';
import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';

/**
 * Let's define the GraphQL fragment needed for the component to function.
 *
 * GraphQL fragment colocation keeps queries near the components using them,
 * improving maintainability and encapsulation. Fragment composition enables
 * building complex queries from reusable parts, promoting code reuse and
 * efficiency. Together, these practices lead to more modular, maintainable, and
 * performant GraphQL implementations by allowing precise data fetching and
 * easier code management.
 *
 * Learn more: https://gql-tada.0no.co/guides/fragment-colocation
 */
export const VideoBlockFragment = graphql(
  /* GraphQL */ `
    fragment VideoBlockFragment on VideoBlockRecord {
      asset {
        title
        ...VideoPlayerFragment
      }
    }
  `,
  [VideoPlayerFragment],
);

type Props = {
  data: FragmentOf<typeof VideoBlockFragment>;
};

export default function VideoBlock({ data }: Props) {
  // Cast unmaskedData to the proper type
  const unmaskedData = readFragment(VideoBlockFragment, data) as {
    asset?: FragmentOf<typeof VideoPlayerFragment> & { title?: string };
  };

  if (!unmaskedData?.asset) return null;

  return (
    <figure>
      {/* Pass properly typed asset to VideoPlayer */}
      <VideoPlayer data={unmaskedData.asset} />
      {/* Only render title if it exists */}
      {/* {unmaskedData?.asset?.title && <figcaption>{unmaskedData.asset.title}</figcaption>} */}
    </figure>
  );
}