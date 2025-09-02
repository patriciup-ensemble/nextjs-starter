
import '../../global.css';
import LandingHero from '@/components/LandingHero';

export default function Page() {
  const events = [
    { id: 1, title: 'Opening Night', date: '2025-10-01', description: 'Kick-off event with live music.' },
    { id: 2, title: 'Art Expo', date: '2025-10-08', description: 'Local artists showcase.' },
    { id: 3, title: 'Tech Meetup', date: '2025-10-15', description: 'Talks and networking.' },
    { id: 4, title: 'Community Day', date: '2025-10-22', description: 'Workshops and food trucks.' },
  ];

  const venues = [
    { id: 'v1', name: 'Main Hall', img: 'https://picsum.photos/800/400?random=1', desc: 'Large capacity venue for concerts and conferences.' },
    { id: 'v2', name: 'Rooftop', img: 'https://picsum.photos/800/400?random=2', desc: 'Open-air space with skyline views.' },
    { id: 'v3', name: 'Studio', img: 'https://picsum.photos/800/400?random=3', desc: 'Cozy room for workshops and meetups.' },
  ];

  const news = [
    { id: 'n1', title: 'New season announced', date: '2025-09-10' },
    { id: 'n2', title: 'Venue refurb complete', date: '2025-08-22' },
    { id: 'n3', title: 'Volunteer program opens', date: '2025-08-01' },
  ];

  return (
    <>
      <LandingHero />

      {/* About */}
      <section id="about" className="py-5">
        <div className="container">
          <h2 className="mb-3">About</h2>
          <p className="fs-5">We are a vibrant space hosting events, exhibitions, and community gatherings. This section will be populated from DatoCMS.</p>
        </div>
      </section>

      {/* Events: 2x2 grid */}
      <section id="events" className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4">Events</h2>
          <div className="row g-4">
            {events.map(ev => (
              <div className="col-12 col-md-6" key={ev.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-1">{ev.title}</h5>
                    <div className="text-muted mb-2">{ev.date}</div>
                    <p className="card-text">{ev.description}</p>
                    <a href="#" className="btn btn-primary btn-sm">Read more</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section id="venues" className="py-5">
        <div className="container">
          <h2 className="mb-4">Venues</h2>
          <div className="row g-4">
            {venues.map(v => (
              <div className="col-12 col-md-4" key={v.id}>
                <div className="card h-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.img} className="card-img-top" alt={v.name} />
                  <div className="card-body">
                    <h5 className="card-title">{v.name}</h5>
                    <p className="card-text">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-3">Jobs</h2>
          <p>We are not hiring right now. Check back soon.</p>
        </div>
      </section>

      {/* News */}
      <section id="news" className="py-5">
        <div className="container">
          <h2 className="mb-3">News</h2>
          <ul className="list-group">
            {news.map(n => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={n.id}>
                <span>{n.title}</span>
                <span className="badge bg-secondary">{n.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-3">Newsletter</h2>
          <form className="row gy-2 gx-3 align-items-center">
            <div className="col-sm-5">
              <label htmlFor="newsletterName" className="form-label">Name</label>
              <input type="text" id="newsletterName" className="form-control" placeholder="Your name" />
            </div>
            <div className="col-sm-5">
              <label htmlFor="newsletterEmail" className="form-label">Email</label>
              <input type="email" id="newsletterEmail" className="form-control" placeholder="you@example.com" />
            </div>
            <div className="col-sm-2 d-grid">
              <label className="form-label invisible">Submit</label>
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="py-5 text-bg-dark">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-12 col-lg-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/800/400?random=4" alt="Contact" className="img-fluid rounded mb-3" />
              <address className="mb-0">
                <strong>Our Hub</strong><br />
                123 Main Street<br />
                City, Country<br />
                <a href="tel:+123456789" className="link-light d-block">+1 234 567 89</a>
                <a href="mailto:info@example.com" className="link-light">info@example.com</a>
              </address>
            </div>
            <div className="col-12 col-lg-6">
              <h3 className="mb-3">Get in touch</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="contactName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="contactName" placeholder="Your name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="contactEmail" placeholder="you@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactMessage" className="form-label">Message</label>
                  <textarea className="form-control" id="contactMessage" rows={5} placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}