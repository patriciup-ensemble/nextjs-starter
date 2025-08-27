import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { VideoPlayer as DatoVideoPlayer, type VideoPlayerProps } from 'react-datocms';

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
export const VideoPlayerFragment = graphql(/* GraphQL */ `
  fragment VideoPlayerFragment on VideoFileField {
    video {
      muxPlaybackId
      title
      width
      height
      blurUpThumb
    }
  }
`);

type Props = Omit<VideoPlayerProps, 'data'> & {
  data: FragmentOf<typeof VideoPlayerFragment>;
};

export default function VideoPlayer({ data, ...other }: Props) {
  // Cast unmaskedData to the correct type
  const unmaskedData = readFragment(VideoPlayerFragment, data) as {
    video?: {
      muxPlaybackId: string;
      title?: string;
      width?: number;
      height?: number;
      blurUpThumb?: string;
    };
  };

  if (!unmaskedData?.video) return null;

  return (
    <DatoVideoPlayer
      data={unmaskedData.video}
      accentColor="var(--color-accent)"
      {...other}
    />
  );
}
