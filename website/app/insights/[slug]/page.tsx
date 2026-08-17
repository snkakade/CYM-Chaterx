import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { FinalCTA } from "@/components/FinalCTA";
import { SectionLabel } from "@/components/SectionLabel";
import { insights } from "@/data/site";
import { socialImage, twitterImage } from "@/data/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = insights.find((entry) => entry.slug === slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: { type: "article", title: insight.title, description: insight.excerpt, url: `/insights/${slug}`, images: [socialImage] },
    twitter: { card: "summary_large_image", title: insight.title, description: insight.excerpt, images: [twitterImage] },
  };
}

export default async function InsightArticle({ params }: Props) {
  const { slug } = await params;
  const insight = insights.find((entry) => entry.slug === slug);
  if (!insight) notFound();
  return (
    <>
      <article className="article-page">
        <header className="article-header section-shell">
          <SectionLabel>{insight.category}</SectionLabel>
          <h1>{insight.title}</h1>
          <p>{insight.excerpt}</p>
          <div><span>{insight.readTime}</span><span>Commercial field note</span></div>
        </header>
        <div className="article-body section-shell">
          <aside><span>In this note</span><a href="#why">Why it matters</a><a href="#signals">Signals to watch</a><a href="#next">A practical next step</a></aside>
          <div>
            <p className="article-lead">A yacht can be exceptional on the water and still be difficult to discover, understand, or book. The commercial experience around the vessel deserves the same attention as the operating experience on board.</p>
            <h2 id="why">Why it matters</h2>
            <p>Prospective guests make a series of small confidence decisions. They assess the imagery, relevance, availability, value, response, and clarity of the next step. When these signals disagree, intent fades quietly.</p>
            <blockquote>Commercial performance improves when every part of the journey gives the guest a consistent reason to continue.</blockquote>
            <h2 id="signals">Signals to watch</h2>
            <p>Look beyond raw traffic or platform impressions. Useful signals include the quality of enquiries, response time, follow-up consistency, calendar accuracy, conversion by source, and the reasons promising conversations do not progress.</p>
            <ul><li>Is the vessel positioned for a clear guest and occasion?</li><li>Do your listings and website answer the practical questions that delay an enquiry?</li><li>Can your team trace a lead from source through to booking value?</li><li>Does each lost enquiry lead to a useful operating insight?</li></ul>
            <h2 id="next">A practical next step</h2>
            <p>Choose one part of the journey and review it as a guest would. Record the friction without solving it immediately. The pattern will usually reveal a tighter, more commercially useful priority than a broad redesign or another disconnected campaign.</p>
            <ButtonLink href="/contact">Request a Growth Review</ButtonLink>
          </div>
        </div>
      </article>
      <FinalCTA />
    </>
  );
}
