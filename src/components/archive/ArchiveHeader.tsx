import Link from "next/link";

type ArchiveHeaderProps = {
  mobile?: boolean;
  showPhotoLinks?: boolean;
};

function CurrentTime({ className = "paragraph-8" }: { className?: string }) {
  return (
    <p data-current-time="America/New_York" className={className}>
      <span data-current-time-hours>00</span>:
      <span data-current-time-minutes>00</span>:
      <span data-current-time-seconds>00</span>{" "}
      <span data-current-time-timezone>ET</span>
    </p>
  );
}

export default function ArchiveHeader({
  mobile = false,
  showPhotoLinks = false,
}: ArchiveHeaderProps) {
  if (mobile) {
    return (
      <>
        <div className="wm__top">
          <div className="text__col is--dark">
            <Link href="/" className="link-group is--dark">
              <p
                data-underline-link="alt"
                className="paragraph-8"
                data-archive-header-item
              >
                back to artboard™
              </p>
            </Link>
          </div>
          <div className="text__col is--dark">
            <div className="tc__timedate" data-archive-header-item>
              <CurrentTime className="paragraph-8" />
            </div>
          </div>
        </div>
        <div className="wm__top wm__top--profile">
          <div className="text__col is--dark" />
          <div className="text__col is--dark">
            <Link href="/the-profile" className="link-group is--dark">
              <p
                data-underline-link="alt"
                className="paragraph-8"
                data-archive-header-item
              >
                THE PROFILE
              </p>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <nav className="works__tl is--dark is--difference">
      <div className="text__col is--dark">
        <div className="text__col">
          <Link href="/" className="link-group is--dark">
            <p
              data-underline-link="alt"
              className="paragraph-8"
              data-archive-header-item
            >
              back to artboard™
            </p>
          </Link>
          <div className="tc__timedate" data-archive-header-item>
            <CurrentTime className="paragraph-8" />
          </div>
        </div>
      </div>

      <div className="text__col is--dark text__col--profile">
        {showPhotoLinks && (
          <>
            <Link href="/the-archive" className="link-group is--dark">
              <p
                data-underline-link="alt"
                className="paragraph-8"
                data-archive-header-item
              >
                THE ARCHIVE
              </p>
            </Link>
            <Link href="/booking" className="link-group is--dark">
              <p
                data-underline-link="alt"
                className="paragraph-8"
                data-archive-header-item
              >
                BOOK A SESSION
              </p>
            </Link>
          </>
        )}
        <Link href="/the-profile" className="link-group is--dark">
          <p
            data-underline-link="alt"
            className="paragraph-8"
            data-archive-header-item
          >
            THE PROFILE
          </p>
        </Link>
      </div>
    </nav>
  );
}
