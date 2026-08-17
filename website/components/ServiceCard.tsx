import { ArrowIcon } from "./ArrowIcon";
import { ServiceIcon } from "./ServiceIcon";

type Service = {
  number: string;
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
};

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card magnetic-card reveal-item">
      <div className="service-card-top"><span>{service.number}</span><ServiceIcon type={service.icon} /></div>
      <p className="service-card-label">{service.eyebrow}</p>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <a href={service.slug}>Explore service <ArrowIcon /></a>
    </article>
  );
}
