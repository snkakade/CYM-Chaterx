import { ArrowIcon } from "./ArrowIcon";

type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
};

export function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  return (
    <article className="insight-card reveal-item">
      <a href={`/insights/${insight.slug}`} aria-label={`Read ${insight.title}`}>
        <div className="insight-card-visual" aria-hidden="true">
          <span>0{index + 1}</span>
          <div className="chart-lines"><i /><i /><i /><i /></div>
        </div>
        <div className="insight-card-copy">
          <div><span>{insight.category}</span><span>{insight.readTime}</span></div>
          <h2>{insight.title}</h2>
          <p>{insight.excerpt}</p>
          <span className="insight-link">Read insight <ArrowIcon /></span>
        </div>
      </a>
    </article>
  );
}
