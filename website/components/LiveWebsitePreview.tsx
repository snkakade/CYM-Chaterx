import { ArrowIcon } from "./ArrowIcon";
import { SectionLabel } from "./SectionLabel";

export function LiveWebsitePreview() {
  return (
    <section className="live-preview">
      <div className="live-preview-copy reveal-item">
        <SectionLabel tone="light" index="07">Live website preview</SectionLabel>
        <h2>See the digital experience <em>working as a sales asset.</em></h2>
        <p>The preview is live and navigable. It shows how CharterX combines yacht positioning, search intent, decision support and a clear enquiry path.</p>
        <a href="/ota-management">Open the full experience <ArrowIcon /></a>
      </div>
      <div className="browser-preview reveal-item">
        <div className="browser-preview-bar" aria-hidden="true">
          <span /><span /><span />
          <p>cymcharterx.com/ota-management</p>
        </div>
        <iframe
          src="/ota-management"
          title="Live preview of the CharterX OTA Management page"
          loading="lazy"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </section>
  );
}
