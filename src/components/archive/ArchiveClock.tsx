"use client";

import { useEffect, useState } from "react";

function getTime() {
  return new Intl.DateTimeFormat([], {
    timeZone: "America/New_York",
    timeZoneName: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function ArchiveClock() {
  const [time, setTime] = useState("00:00:00 ET");

  useEffect(() => {
    setTime(getTime());
    const interval = window.setInterval(() => setTime(getTime()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return <p className="paragraph">{time}</p>;
}
