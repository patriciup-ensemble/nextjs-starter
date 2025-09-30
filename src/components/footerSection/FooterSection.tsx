import ContactForm from "../contactForm/ContactForm";


export type FooterProps = {
    logo?: { url: string };
    addressLine1?: string;
    addressLine2?: string;
    url?: string;
    newsletterText?: string;
    newsletterLink?: string;
    extraInfo?: any;
  };
  

export default function Footer({ logo,
    addressLine1,
    addressLine2,
    url,
    newsletterText,
    newsletterLink,
    extraInfo,}: FooterProps) {
  return (
    <footer id="contact" className="py-5 text-bg-dark h-800">
      <div className="container p-100 mt-5">
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column align-items-start mb-5">
              {logo && <img src={logo.url} alt="Contact" className="img-fluid rounded mb-3" />}
              <button type="button" className="btn btn-outline-warning mt-5">
              <a
    href={newsletterLink}
   
    rel="noopener noreferrer"
   className="text-decoration-none text-reset mt-5"
  >
    {newsletterText}
  </a>
              </button>
            </div>

            <address className="mb-0">
              <h2>CONTACT</h2>
              <div
                className="separator mt-5 mb-5"
                style={{
                  backgroundColor: "#f4cf58",
                  height: "8px",
                  width: "30px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              ></div>
              { addressLine1}<br />
             { addressLine2}<br />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-icon d-inline-block mt-3"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </address>
          </div>
          <div className="col-12 col-lg-6">
            <h3 className="mb-3">Get in touch</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </footer>
  );
}
