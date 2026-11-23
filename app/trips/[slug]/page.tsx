import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import {
  getAllTrips,
  getRelatedTrips,
  getTripBySlug,
  getTripGallery,
} from "@/lib/trips";
import { getCountryByIso2 } from "@/lib/countries";
import { TripHero } from "@/components/trip/TripHero";
import { QuickFacts } from "@/components/trip/QuickFacts";
import { ShareRow } from "@/components/trip/ShareRow";
import { RelatedTrips } from "@/components/trip/RelatedTrips";
import {
  Photo,
  Photos,
  PhotoBreak,
  TripPhotosProvider,
} from "@/components/trip/TripPhotos";
import { Reveal } from "@/components/ui/Reveal";
import { mdxComponents } from "@/components/trip/mdxComponents";
import { DayCard } from "@/components/trip/DayCard";
import type { TripPhoto } from "@/components/trip/TripPhotosContext";

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
  const gallery = (getTripGallery(slug) ?? []) as TripPhoto[];

  // Components available inside MDX.
  //
  // DayCard receives the gallery as a direct prop (`_gallery`) — React Context
  // from TripPhotosProvider doesn't propagate through MDXRemote's RSC
  // boundary, so context-based access returns null during SSG and no photos
  // would render in the prerendered HTML. We close over the page's `gallery`
  // value and pass it explicitly.
  // Bind the page's gallery into DayCard via the MDX components map.
  // Context alone wouldn't survive next-mdx-remote/rsc's RSC boundary
  // (gallery becomes undefined inside DayCard during SSG), so we close over
  // it explicitly.
  //
  // Note: MDX expression attributes (`day={1}`) get stripped by the parser
  // in some Hebrew/RTL contexts — that's why MDX files use string form
  // `day="1"` and DayCard parses to number internally.
  const components = {
    ...mdxComponents,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DayCard: (props: any) => <DayCard {...props} _gallery={gallery} />,
    Photo,
    Photos,
    PhotoBreak,
    Reveal,
  };

  return (
    <TripPhotosProvider gallery={gallery}>
      <article className="overflow-x-clip">
        <TripHero trip={trip} />
        <QuickFacts trip={trip} />

        {/* ARTICLE BODY — narrow reading column; full-bleed PhotoBreaks
            escape via w-screen translate-x while everything else stays
            constrained to this width */}
        <div className="mx-auto max-w-3xl content-surface px-5 sm:px-8 py-8 sm:py-12 my-8">
          {country && (
            <nav
              className="text-sm text-ink-muted mb-6"
              aria-label="breadcrumb"
            >
              <a href="/" className="hover:text-accent">
                בית
              </a>
              {" / "}
              <a
                href={`/countries/${country.slug}`}
                className="hover:text-accent"
              >
                {country.heName}
              </a>
              {" / "}
              <span className="text-ink">{trip.title}</span>
            </nav>
          )}

          <p className="font-display text-xl sm:text-2xl leading-relaxed text-ink mb-8">
            {trip.excerpt}
          </p>

          <div className="text-ink-soft">
            <MDXRemote
              source={trip.body}
              components={components}
              options={{
                mdxOptions: { remarkPlugins: [remarkGfm] },
              }}
            />
          </div>
        </div>

        {/* No trailing gallery: every photo belongs to the day it was taken on
            and renders inside that DayCard. If a photo stops appearing, it
            matched no day — fix the card's `photos` list or the filename,
            rather than reinstating a dump at the end of the page. */}

        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-10">
          <ShareRow title={trip.title} slug={trip.slug} />
          <RelatedTrips trips={related} />
        </div>
      </article>
    </TripPhotosProvider>
  );
}
