type Venue = {
    name: string;
    image: string;
    desc: string;
    url?: string;
  };
  
  type Props = {
    title: string;
    venue: Venue; // single venue, since it looks like a featured block
  };
  
  export default function VenuesSection({ title, venue }: Props) {
    return (
      <section id="venues" className="py-5">
        <div className="container">
          {/* Section Title */}
          <h2 className="mb-4">{title}</h2>
  
          {/* Venue Image */}
          <img
            src={venue.image}
            alt={venue.name}
            style={{ width: "100%", height: "700px", objectFit: "cover" }}
            className="rounded mb-4"
          />
  
          {/* Two-Column Layout */}
          <div className="row align-items-start">
            {/* Left column */}
            <div className="col-12 col-md-6">
              <h4 className="mb-2">
                <span style={{ color: "#333" }}>
                  <b>{venue.name}</b>
                </span>
              </h4>
              {/* Small separator */}
              <div
                className="separator"
                style={{
                  backgroundColor: "#252525",
                  height: "3px",
                  width: "60px",
                  marginTop: "8px",
                }}
              ></div>
            </div>
  
            {/* Right column */}
            <div className="col-12 col-md-6">
              <p className="mb-3">{venue.desc}</p>
              {venue.url && (
                <a
                  href={venue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                 
                >
                 { venue.url }
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
  