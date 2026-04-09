import { HOME_MANIFESTO } from "@/components/home/home-data";
import { LiveClock } from "@/components/home/LiveClock";
import { SplitCharButton } from "@/components/ui/SplitCharButton";

export function HomeMetaRail() {
  return (
    <nav className="section__text">
      <div className="overlay" />

      <div className="text__col is--no-grow">
        <div className="paragraph">
          Based in Italy,
          <br />
          working globally.
        </div>
        <div className="tc__timedate">
          <LiveClock timezone="Europe/Rome" />
        </div>
      </div>

      <div className="text__col is--no-grow">
        <div className="paragraph is--tag">(my.expertise)</div>
        <div className="tc__expertise">
          <div className="paragraph">Art Direction</div>
          <div data-square className="paragraph">
            Web Design + Dev
          </div>
          <div data-square className="paragraph">
            Webflow Development
          </div>
        </div>
      </div>

      <div className="text__col is--no-grow">
        <div className="paragraph">(social.contacts)</div>
        <div className="tc__links is--home">
          <div className="link-group">
            <a
              data-underline-link="alt"
              href="https://www.awwwards.com/nicolaromei/"
              rel="noreferrer"
              target="_blank"
              className="paragraph"
            >
              Awwards
            </a>
          </div>
          <div className="link-group">
            <a
              data-underline-link="alt"
              href="https://www.linkedin.com/in/nicolaromei/"
              rel="noreferrer"
              target="_blank"
              className="paragraph"
            >
              Linkedin
            </a>
          </div>
          <div className="link-group">
            <a
              data-underline-link="alt"
              href="mailto:info@nicolaromei.com?subject=New%20project%20together"
              className="paragraph"
            >
              contacts
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
