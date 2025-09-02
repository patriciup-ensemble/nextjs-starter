export default function LandingHero() {
  return (
    <header id="home" className="position-relative text-white" style={{ height: 400, backgroundImage: 'url(https://picsum.photos/1600/600?blur=2)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="h-100 w-100" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
        <div className="container h-100 d-flex flex-column justify-content-center">
          <nav className="mb-3">
            <ul className="nav nav-pills bg-dark bg-opacity-50 rounded-2 p-2 gap-1">
              <li className="nav-item"><a className="nav-link text-white" href="/#about">About</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="/#events">Events</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="/#venues">Venues</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="/#jobs">Jobs</a></li>
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  href="/#contact"
                  data-bs-toggle="tooltip"
                  data-tooltip-interactive="true"
                  data-bs-placement="bottom"
                  data-bs-html="true"
                  data-bs-title='\
                    <div class="list-group list-group-flush">\
                      <a class="list-group-item list-group-item-action" href="/privacy-policy">Privacy policy</a>\
                      <a class="list-group-item list-group-item-action" href="/terms-of-use">Terms of use</a>\
                      <a class="list-group-item list-group-item-action" href="/privacy-policy#california-privacy-rights">California privacy rights</a>\
                    </div>'
                >
                  Contact
                </a>
              </li>
              <li className="nav-item"><a className="nav-link text-white" href="/#news">News</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="/#newsletter">Newsletter</a></li>
            </ul>
          </nav>
          <h1 className="display-4 fw-bold">Welcome to Our Cultural Hub</h1>
          <p className="lead">Discover events, venues, and stories — all in one place.</p>
        </div>
      </div>
    </header>
  );
}
