import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getAllTrips, getRelatedTrips, getTripBySlug } from "@/lib/trips";
import { getCountryByIso2 } from "@/lib/countries";
import { TripHero } from "@/components/trip/TripHero";
import { QuickFacts } from "@/components/trip/QuickFacts";
import { ShareRow } from "@/components/trip/ShareRow";
import { RelatedTrips } from "@/components/trip/RelatedTrips";
import { mdxComponents } from "@/components/trip/mdxComponents";

export async function generateStaticParams() {
  return getAllTrips().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return { title: "טיול לא נמצא" };
  return {
    title: trip.seoTitle ?? trip.title,
    description: trip.metaDescription ?? trip.excerpt,
    openGraph: {
      title: trip.title,
      description: trip.excerpt,
      type: "article",
      publishedTime: trip.publishedAt,
      modifiedTime: trip.updatedAt,
    },
  };
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  const country = getCountryByIso2(trip.country);
  const related = getRelatedTrips(trip, 3);

  return (
    <article>
      <TripHero trip={trip} />
      <QuickFacts trip={trip} />

      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-10 sm:py-14">
        {/* Country breadcrumb */}
        {country && (
          <nav className="text-sm text-ink-muted mb-6" aria-label="breadcrumb">
            <a href="/" className="hover:text-accent">בית</a>
            {" / "}
            <a href={`/countries/${country.slug}`} className="hover:text-accent">
              {country.heName}
            </a>
            {" / "}
            <span className="text-ink">{trip.title}</span>
          </nav>
        )}

        {/* Emotional hook (excerpt as lead paragraph) */}
        <p className="font-display text-xl sm:text-2xl leading-relaxed text-ink mb-10">
          {trip.excerpt}
        </p>

        {/* MDX body — contains the rest of the trip sections */}
        <div className="text-ink-soft">
          <MDXRemote
            source={trip.body}
            components={mdxComponents}
            options={{
              mdxOptions: { remarkPlugins: [remarkGfm] },
            }}
          />
        </div>

        <ShareRow title={trip.title} slug={trip.slug} />

        <RelatedTrips trips={related} />
      </div>
    </article>
  );
}
