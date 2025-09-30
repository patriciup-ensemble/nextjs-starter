import LandingHero, { MenuItem } from '@/components/HeroSection';
import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { draftMode } from 'next/headers';

export const metadata = {
  title: 'Newsletters',
};

type HeroBlock = {
  backgroundimage?: { url: string };
  overlayopacity?: number;
  title: string;
  logo?: { url: string };
  menuitems: MenuItem[];
};

export default async function NewslettersPage() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const query = graphql(`
    query LandingHeroForNewsletters {
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
        <h1 className="mb-3">Subscribe to our Newsletters</h1>
        <p className="text-muted mb-4">Stay up to date. Choose what you want to receive.</p>

        <form className="row g-3" action="#" method="post">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">First name</label>
            <input type="text" className="form-control" id="firstName" name="firstName" placeholder="John" required />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">Last name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Doe" required />
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="you@example.com" required />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="weekly" id="subWeekly" name="subscriptions" />
              <label className="form-check-label" htmlFor="subWeekly">
                Weekly updates
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="events" id="subEvents" name="subscriptions" />
              <label className="form-check-label" htmlFor="subEvents">
                Event announcements
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="promotions" id="subPromotions" name="subscriptions" />
              <label className="form-check-label" htmlFor="subPromotions">
                Promotions and special offers
              </label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </div>
        </form>
      </div>
    </>
  );
}



