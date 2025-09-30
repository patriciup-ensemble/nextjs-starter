import { StructuredText } from "react-datocms";

export type AboutProps = {
  title: string;
  content: { value: any };
};

export default function AboutSection({ title, content }: AboutProps) {
  return (
    <section
      id="about"
      className="py-5 w-100 mb-3 d-flex flex-column align-items-center justify-content-center text-center"
    >
      <div className="container" style={{ maxWidth: "48%" }}>
        <h2 className="mb-3">{title}</h2>
        <div
                className="separator mt-5 mb-5"
                style={{
                  backgroundColor: "#f4cf58",
                  height: "8px",
                  width: "30px",
                  margin: "10px auto",
                }}
              ></div>
        <div className="fs-5 text-muted text-start">
          <StructuredText data={content} />
        </div>
      </div>
    </section>
  );
}
