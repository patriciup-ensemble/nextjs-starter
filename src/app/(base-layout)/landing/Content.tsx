import type { ResultOf } from '@/lib/datocms/graphql';
import type { ContentComponentType } from '@/lib/datocms/realtime/generatePageComponent';
import Link from 'next/link';
import type { PageProps, query } from './common';

const Content: ContentComponentType<PageProps, ResultOf<typeof query>> = ({ data }) => {
  const landing = data.landing;

  const heroTitle = landing?.title || 'Build content-rich apps, faster.';
  const heroSubtitle =
    landing?.text ||
    'A minimal, production-ready starter featuring typed GraphQL, real-time content updates, and SEO integration.';

  const primaryLabel = landing?.primarycta?.label || landing?.primaryCta || 'Get started (Basic)';
  const primaryUrl = landing?.primarycta?.url || '/basic';

  const secondaryLabel = landing?.secondarycta?.label || landing?.secondaryCta || 'See real-time updates';
  const secondaryUrl = landing?.secondarycta?.url || '/real-time-updates';

  return (
    <>
      <section className="hero">
        <p className="pill">Next.js 14 + DatoCMS</p>
        <h1>{heroTitle}</h1>
        <p className="subtitle">{heroSubtitle}</p>
        <div className="actions">
          <Link href={primaryUrl} className="button">
            {primaryLabel}
          </Link>
          <Link href={secondaryUrl} className="button button--secondary">
            {secondaryLabel}
          </Link>
          <a className="button button--ghost" href="https://www.datocms.com/docs/next-js">
            Docs
          </a>
        </div>
      </section>
    </>
  );
};

export default Content;


