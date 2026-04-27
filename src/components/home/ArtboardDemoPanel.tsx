"use client";

import {
  FEATURED_ARTISTS,
  type FeaturedArtist,
} from "@/components/home/home-data";
import { SplitCharButton } from "@/components/ui/SplitCharButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ArtboardDemoPanelProps = {
  visible: boolean;
};

function ArtistCard({ artist }: { artist: FeaturedArtist }) {
  return (
    <article className="hero__artist-card">
      <div className="hero__artist-media">
        <div className="hero__artist-main">
          <Image
            src={artist.heroImageSrc}
            alt={artist.heroImageAlt}
            fill
            sizes="(max-width: 767px) 100vw, 32vw"
            className="object-cover"
          />
        </div>

        <div className="hero__artist-strip" aria-hidden="true">
          {artist.gallery.map((src, index) => (
            <div key={`${artist.name}-${src}`} className="hero__artist-thumb">
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 767px) 28vw, 10vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="hero__artist-copy">
        <p className="paragraph hero__artist-kicker">
          CT SHUTDOWN / UNDERGROUND CONCERT
        </p>
        <h2 className="hero__artist-name">{artist.name}</h2>
        <p className="paragraph hero__artist-description">
          {artist.description}
        </p>

        <div className="hero__artist-links">
          {artist.links.map((link) => (
            <a
              key={`${artist.name}-${link.label}`}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="hero__artist-link paragraph"
              data-underline-link="alt"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hero__artist-actions">
          <SplitCharButton
            href={`/photography?collection=${encodeURIComponent(artist.collectionSlug)}`}
            label="VIEW SET"
          />
        </div>
      </div>

      <div className="hero__artist-video">
        <iframe
          src={artist.videoEmbedSrc}
          title={artist.videoTitle}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </article>
  );
}

export function ArtboardDemoPanel({ visible }: ArtboardDemoPanelProps) {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  if (!visible) {
    return null;
  }

  return (
    <div className="hero__tab-wrap" style={{ opacity: visible ? 1 : 0 }}>
      <div className="hero__mobile-bar">
        <div className="hero__mobile-nav">
          <SplitCharButton href="/archive" label="THE ARCHIVE" />
          <SplitCharButton href="/the-profile" label="THE PROFILE" />
        </div>
        <button
          type="button"
          className="hero__panel-toggle"
          onClick={() => setIsPanelCollapsed((value) => !value)}
          aria-label={isPanelCollapsed ? "Expand panel" : "Collapse panel"}
        >
          <p className="paragraph">{isPanelCollapsed ? "+" : "−"}</p>
        </button>
      </div>

      {!isPanelCollapsed ? (
        <section className="hero__tab">
          <div className="hero__feature-head">
            <div>
              <p className="paragraph hero__feature-kicker">
                MOST RECENT WORK / LIVE DOCUMENTATION
              </p>
              <h2 className="hero__feature-title">CT Shutdown</h2>
            </div>

            <div className="hero__feature-copy">
              <p className="paragraph">
                Three performers from CT Shutdown, brought forward on the
                artboard with stills, writeups, and embedded performance clips.
              </p>
              <Link
                href="/photography"
                className="hero__feature-link paragraph"
                data-underline-link="alt"
              >
                OPEN PHOTOGRAPHY INDEX
              </Link>
            </div>
          </div>

          <div className="hero__feature-grid">
            {FEATURED_ARTISTS.map((artist) => (
              <ArtistCard key={artist.name} artist={artist} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
