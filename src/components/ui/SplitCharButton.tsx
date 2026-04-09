"use client";

import Link from "next/link";
import { MouseEventHandler } from "react";

type SplitCharButtonProps = {
  className?: string;
  href?: string;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  rel?: string;
  target?: string;
};

function SplitText({ label }: { label: string }) {
  return (
    <span
      data-button-animate-chars
      className="btn-animate-chars__text paragraph"
    >
      {[...label].map((char, index) => (
        <span
          key={`${char}-${index}`}
          style={{
            transitionDelay: `${index * 0.01}s`,
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export function SplitCharButton({
  className,
  href,
  label,
  onClick,
  rel,
  target,
}: SplitCharButtonProps) {
  const composedClass = `btn-animate-chars${className ? ` ${className}` : ""}`;

  if (onClick || href === undefined || href === "#") {
    return (
      <button type="button" className={composedClass} onClick={onClick}>
        <div className="btn-animate-chars__bg" />
        <SplitText label={label} />
      </button>
    );
  }

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        className={composedClass}
        href={href}
        onClick={onClick}
        rel={rel}
        target={target}
      >
        <div className="btn-animate-chars__bg" />
        <SplitText label={label} />
      </a>
    );
  }

  return (
    <Link className={composedClass} href={href} onClick={onClick}>
      <div className="btn-animate-chars__bg" />
      <SplitText label={label} />
    </Link>
  );
}
