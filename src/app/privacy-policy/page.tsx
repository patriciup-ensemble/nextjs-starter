import LandingHero, { MenuItem } from '@/components/HeroSection';
import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { draftMode } from 'next/headers';
import ScrollToHash from '@/components/ScrollToHash';

export const metadata = {
  title: 'Privacy Policy',
};
type HeroBlock = {
  backgroundimage?: { url: string };
  overlayopacity?: number;
  title: string;
  logo?: { url: string };
  menuitems: MenuItem[];
};

export default async function PrivacyPolicyPage() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const query = graphql(`
    query LandingHeroForPolicy {
      landing {
        hero {
          backgroundimage { url }
          overlayopacity
          title
          logo { url }
          menuitems { ... on MenuitemRecord { label url newtab tooltiphtml } }
        }
      }
    }
  `);
  const data = await executeQuery(query, { includeDrafts: isDraftModeEnabled });
  const hero = data.landing?.hero as HeroBlock;

  return (
    <>
      <ScrollToHash />
      {hero && (
        <LandingHero
          backgroundUrl={hero.backgroundimage?.url}
          overlayOpacity={hero.overlayopacity}
          title={hero.title}
          logoUrl={hero.logo?.url}
          menuitems={hero.menuitems}
        />
      )}
      <div className="container py-5">
        <h1 className="mb-4">Privacy Policy</h1>
        <p className="lead">This is mock content for the privacy policy. Replace with actual content from your CMS.</p>

        <h2 className="mt-5">Information we collect</h2>
        <p>Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, anLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.d more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing LLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.</p>

        <h2 className="mt-5">How we use information</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem IpsuLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.m passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Aliquam erat volutpat. Nulla facilisi. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus.</p>

        <h2 id="california-privacy-rights" className="mt-5">California privacy rights</h2>
        <p>Residents of California have specific rights regarding their personal information. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

        <h2 className="mt-5">Data security</h2>
        <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.</p>
      </div>
    </>
  );
}
