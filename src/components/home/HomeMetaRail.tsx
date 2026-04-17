import { HOME_MANIFESTO } from "@/components/home/home-data";
import { LiveClock } from "@/components/home/LiveClock";
import { SplitCharButton } from "@/components/ui/SplitCharButton";
import Link from "next/link";

export function HomeMetaRail() {
  return (
    <nav
      className="section__text"
      style={{ mixBlendMode: "difference", opacity: 0.88 }}
    >
      <div className="overlay" />

      <div className="text__col is--no-grow">
        <div className="paragraph">
          Based in Connecticut + New York,
          <br />
          working globally.
        </div>
        <div className="tc__timedate">
          <LiveClock timezone="America/New_York" />
        </div>
      </div>

      <div className="text__col is--no-grow">
        <div className="paragraph is--tag">(my.expertise)</div>
        <div className="tc__expertise">
          <div className="paragraph">Website Dev + Website Design + Dev</div>
          <div data-square className="paragraph">
            SEO
          </div>
          <div data-square className="paragraph">
            Photography + Videography
          </div>
        </div>
      </div>

      <div className="text__col is--no-grow">
        <div className="paragraph">(social.contacts)</div>
        <div className="tc__links is--home">
          <div className="link-group">
            <Link
              data-underline-link="alt"
              href="/booking"
              className="paragraph"
            >
              Book a Session
            </Link>
          </div>
          <div className="link-group">
            <a
              data-underline-link="alt"
              href="https://www.instagram.com/sonderz_?igsh=MTJ3bnRwb2lwdjV1cQ%3D%3D&utm_source=qr"
              rel="noreferrer"
              target="_blank"
              className="paragraph"
            >
              Instagram
            </a>
          </div>
          <div className="link-group">
            <a
              data-underline-link="alt"
              href="https://www.morgandev.studio"
              rel="noreferrer"
              target="_blank"
              className="paragraph"
            >
              Website by Morgan Dev
            </a>
          </div>
        </div>
      </div>

      <div className="text__col is--no-grow">
        <div className="hero__desc">
          <p data-split="heading" className="paragraph is--intro-mobile">
            {HOME_MANIFESTO}
          </p>
        </div>
      </div>

      <div className="text__col is--cta">
        <div className="tc__utils is--home">
          <SplitCharButton
            href="/archive"
            label="THE ARCHIVE"
            className="is--full"
          />
          <SplitCharButton
            href="/the-profile"
            label="THE PROFILE"
            className="is--full"
          />
        </div>
      </div>
    </nav>
  );
}
