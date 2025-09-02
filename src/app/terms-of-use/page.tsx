import LandingHero from '@/components/LandingHero';

export const metadata = {
  title: 'Terms of Use',
};

export default function TermsOfUsePage() {
  return (
    <>
      <LandingHero />
      <div className="container py-5">
        <h1 className="mb-4">Terms of Use</h1>
        <p className="lead">These are mock terms. Replace with actual legal content from your CMS.</p>

        <h2 className="mt-5">Acceptance of terms</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus.</p>

        <h2 className="mt-5">User obligations</h2>
        <p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>

        <h2 className="mt-5">Limitation of liability</h2>
        <p>Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>

        <h2 className="mt-5">Governing law</h2>
        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      </div>
    </>
  );
}
