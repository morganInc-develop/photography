import type { CSSProperties } from "react";

const panelValues = [6, 5, 4, 3, 2, 1, 1, 1, 1, 1];

const wrapStyle = {
  "--blur": "3rem",
  "--ratio": "1.9",
} as CSSProperties;

export function ProgressiveBlur() {
  return (
    <>
      <div className="progressive-blur_wrap is--bottom" style={wrapStyle}>
        {panelValues.map((value, index) => (
          <div
            key={`bottom-${value}-${index}`}
            className={`progressive-blur_panel is-${index + 1}`}
            style={{ "--i": value } as CSSProperties}
          />
        ))}
      </div>
      <div className="progressive-blur_wrap is--top" style={wrapStyle}>
        {panelValues.map((value, index) => (
          <div
            key={`top-${value}-${index}`}
            className={`progressive-blur_panel is-${index + 1}`}
            style={{ "--i": value } as CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
