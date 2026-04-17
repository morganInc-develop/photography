"use client";

import { useEffect, useMemo, useState } from "react";

type ClockParts = {
  hours: string;
  minutes: string;
  seconds: string;
  timezone: string;
};

const FALLBACK_TIME: ClockParts = {
  hours: "00",
  minutes: "00",
  seconds: "00",
  timezone: "ET",
};

function parseFormattedTime(value: string): ClockParts | null {
  const match = value.match(/(\d+):(\d+):(\d+)\s*([A-Za-z0-9+-]+)/);
  if (!match) {
    return null;
  }

  return {
    hours: match[1],
    minutes: match[2],
    seconds: match[3],
    timezone: match[4],
  };
}

export function LiveClock({
  timezone = "America/New_York",
}: {
  timezone?: string;
}) {
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat([], {
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
        second: "2-digit",
        timeZone: timezone,
        timeZoneName: "short",
      }),
    [timezone],
  );

  const [time, setTime] = useState<ClockParts>(FALLBACK_TIME);

  useEffect(() => {
    const update = () => {
      const parsed = parseFormattedTime(formatter.format(new Date()));
      if (parsed) {
        setTime(parsed);
      }
    };

    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, [formatter]);

  return (
    <p data-current-time={timezone} className="paragraph">
      <span data-current-time-hours>{time.hours}</span>:
      <span data-current-time-minutes>{time.minutes}</span>:
      <span data-current-time-seconds>{time.seconds}</span>{" "}
      <span data-current-time-timezone>{time.timezone}</span>
    </p>
  );
}
