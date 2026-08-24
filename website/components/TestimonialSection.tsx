import { ArrowIcon } from "./ArrowIcon";
import { SectionLabel } from "./SectionLabel";

const proofSlots = [
  {
    quote: "The difference should be felt in the quality of every enquiry, not just the number appearing in an inbox.",
    focus: "Enquiry quality",
  },
  {
    quote: "Owners need one clear commercial rhythm across listings, pricing, follow-up and direct demand.",
    focus: "Commercial clarity",
  },
  {
    quote: "Good management gives the onboard team more space to deliver the experience guests actually remember.",
    focus: "Owner time",
  },
] as const;

export function TestimonialSection() {
  return (
    <section className="testimonial-section section-shell">
      <div className="testimonial-intro reveal-item">
        <SectionLabel index="06">Client proof</SectionLabel>
        <h2>Trust is built in the <em>operating detail.</em></h2>
        <p>Three prepared proof positions keep this section credible until CharterX has approved, attributable client feedback.</p>
        <a href="/contact#enquiry-form">Share a client reference <ArrowIcon /></a>
      </div>
      <div className="testimonial-grid">
        {proofSlots.map((item, index) => (
          <article className="testimonial-card reveal-item" key={item.focus}>
            <div><span>0{index + 1}</span><span>Proof position</span></div>
            <blockquote>“{item.quote}”</blockquote>
            <footer>
              <strong>{item.focus}</strong>
              <span>Replace with verified client attribution</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
