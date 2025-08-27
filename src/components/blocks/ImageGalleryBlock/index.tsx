import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
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
export const ImageGalleryBlockFragment = graphql(
  /* GraphQL */ `
    fragment ImageGalleryBlockFragment on ImageGalleryBlockRecord {
      assets {
        id
        title
        responsiveImage(imgixParams: { w: 300 }, sizes: "300px") {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment],
);

type Props = {
  data: FragmentOf<typeof ImageGalleryBlockFragment>;
};

export default function ImageGalleryBlock({ data }: Props) {
  // Cast unmaskedData to the expected type
  const unmaskedData = readFragment(ImageGalleryBlockFragment, data) as {
    assets: Array<{
      id: string;
      title?: string;
      responsiveImage?: FragmentOf<typeof ResponsiveImageFragment>;
    }>;
  };

  if (!unmaskedData?.assets?.length) return null;

  return (
    <div className="gallery">
      <div>
        {unmaskedData.assets.map((asset) => (
          <figure key={asset.id}>
            {asset.responsiveImage && (
              <ResponsiveImage data={asset.responsiveImage} imgStyle={{ width: 'auto', height: '200px', objectFit: 'cover' }} />
            )}
            {asset.title && <figcaption>{asset.title}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}
