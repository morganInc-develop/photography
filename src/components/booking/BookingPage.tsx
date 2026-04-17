"use client";

import Link from "next/link";
import { SplitCharButton } from "@/components/ui/SplitCharButton";
import { motion } from "framer-motion";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const mono = {
  fontFamily:
    '"SFMono-Regular", "IBM Plex Mono", "Cascadia Mono", "Courier New", monospace',
};
const display = { fontFamily: '"Easegeometricb", Impact, sans-serif' };
const sans = { fontFamily: '"Host Grotesk", system-ui, sans-serif' };

const PROJECT_TYPES = [
  "PORTRAITURE",
  "CAMPAIGN",
  "SHORT-FORM FILM",
  "EDITORIAL",
  "OTHER",
];

/* const PACKAGES = [
  {
    key: "starter",
    name: "STARTER",
    price: "$100",
    tag: "Photo + Film",
    items: [
      "1-hour session",
      "20 professionally edited photos",
      "60-sec cinematic highlight reel",
      "2 outfit changes",
      "Basic color grading",
      "Digital delivery gallery",
    ],
  },
  {
    key: "signature",
    name: "SIGNATURE",
    price: "$500",
    tag: "Photo + Film",
    items: [
      "3-hour session",
      "60 professionally edited photos",
      "3-min cinematic short film",
      "Unlimited outfit changes",
      "2 locations",
      "Advanced color grade & retouch",
      "Print-ready files + online gallery",
      "Social media content cuts",
    ],
  },
  {
    key: "premium",
    name: "PREMIUM",
    price: "$1,000",
    tag: "Photo + Film",
    items: [
      "Full-day session (6+ hrs)",
      "120+ professionally edited photos",
      "5-min cinematic film + social cut",
      "Unlimited outfits & looks",
      "Up to 3 locations",
      "Premium grade & full retouching",
      "USB + print-ready + online gallery",
      "Social content suite (5+ cuts)",
      "72-hr priority delivery",
    ],
  },
] as const; */

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

type SubmitStatus = "idle" | "submitting" | "success";

export default function BookingPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleProjectType(type: string) {
    setForm((prev) => ({ ...prev, projectType: type }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="relative min-h-screen bg-[#f3f3f3]" style={sans}>
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav
        className="relative flex items-center justify-between border-b border-black/8 px-6 py-4 md:px-10"
        style={{ zIndex: 10 }}
      >
        {/* Left: home */}
        <Link
          href="/"
          data-underline-link="alt"
          className="text-[0.72rem] uppercase tracking-[0.14em] text-black/70 hover:text-black"
          style={mono}
        >
          MADE INVINCIBLE
        </Link>

        {/* Right: archive + profile */}
        <div className="flex items-center gap-6">
          <Link
            href="/the-archive"
            data-underline-link="alt"
            className="text-[0.72rem] uppercase tracking-[0.14em] text-black/70 hover:text-black"
            style={mono}
          >
            THE ARCHIVE
          </Link>
          <Link
            href="/the-profile"
            data-underline-link="alt"
            className="text-[0.72rem] uppercase tracking-[0.14em] text-black/70 hover:text-black"
            style={mono}
          >
            THE PROFILE
          </Link>
        </div>
      </nav>

      {/* ── Page body ──────────────────────────────────────────────────── */}
      <div
        className="relative mx-auto max-w-[860px] px-6 pb-24 pt-14 md:px-10 md:pt-20"
        style={{ zIndex: 0 }}
      >
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease }}
        >
          <p
            className="mb-3 text-[0.62rem] uppercase tracking-[0.2em] text-black/40"
            style={mono}
          >
            COMMISSIONS — LIMITED AVAILABILITY
          </p>
          <h1
            className="text-[clamp(3rem,9vw,7rem)] uppercase leading-[0.9] tracking-[-0.02em] text-black"
            style={display}
          >
            BOOK A
            <br />
            SESSION
          </h1>
          <p
            className="mt-6 max-w-[44ch] text-[0.95rem] leading-[1.6] text-black/55"
            style={sans}
          >
            Tell us about your project. Every inquiry is reviewed personally and
            we respond within two business days.
          </p>
        </motion.div>

        {/* ── Success state ─────────────────────────────────────────────── */}
        {status === "success" ? (
          <motion.div
            className="flex flex-col gap-5 border border-black/10 bg-white p-8 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-[0.6rem] uppercase tracking-[0.2em] text-black/35"
              style={mono}
            >
              INQUIRY RECEIVED
            </p>
            <p
              className="text-[1.5rem] uppercase leading-[1.2] tracking-[-0.02em] text-black"
              style={display}
            >
              WE&apos;LL BE IN TOUCH SHORTLY.
            </p>
            <p
              className="max-w-[42ch] text-[0.9rem] leading-[1.6] text-black/55"
              style={sans}
            >
              Thanks for reaching out. A member of the studio will review your
              brief and respond to{" "}
              <span className="text-black">{form.email || "your email"}</span>{" "}
              within two business days.
            </p>
            <div className="mt-1">
              <SplitCharButton href="/" label="BACK TO HOME" />
            </div>
          </motion.div>
        ) : (
          /* ── Form ─────────────────────────────────────────────────────── */
          <motion.form
            onSubmit={handleSubmit}
            className="border border-black/10 bg-white overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
          >
            {/* Name + Email */}
            <div className="flex flex-col border-b border-black/10 md:flex-row">
              <div className="flex flex-1 flex-col gap-3 border-b border-black/10 p-6 md:border-b-0 md:border-r md:p-8">
                <label
                  htmlFor="name"
                  className="block text-[0.58rem] uppercase tracking-[0.2em] text-black/40"
                  style={mono}
                >
                  YOUR NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full bg-transparent text-[0.95rem] text-black placeholder:text-black/25 outline-none"
                  style={sans}
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
                <label
                  htmlFor="email"
                  className="block text-[0.58rem] uppercase tracking-[0.2em] text-black/40"
                  style={mono}
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full bg-transparent text-[0.95rem] text-black placeholder:text-black/25 outline-none"
                  style={sans}
                />
              </div>
            </div>

            {/* Project type */}
            <div className="relative flex flex-col gap-4 border-b border-black/10 p-6 md:p-8">
              <p
                className="text-[0.58rem] uppercase tracking-[0.2em] text-black/40"
                style={mono}
              >
                PROJECT TYPE
              </p>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleProjectType(type)}
                    className={`cursor-pointer border px-4 py-2 text-[0.68rem] uppercase tracking-[0.12em] transition-colors duration-150 ${
                      form.projectType === type
                        ? "border-black bg-black text-white"
                        : "border-black/20 bg-transparent text-black/55 hover:border-black/50 hover:text-black"
                    }`}
                    style={mono}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input
                type="text"
                name="projectType"
                value={form.projectType}
                onChange={() => {}}
                required
                aria-hidden="true"
                tabIndex={-1}
                className="pointer-events-none absolute bottom-0 left-0 h-0 w-0 opacity-0"
              />
            </div>

            {/* Budget */}
            <div className="relative flex flex-col gap-4 border-b border-black/10 p-6 md:p-8">
              <p
                className="text-[0.58rem] uppercase tracking-[0.2em] text-black/40"
                style={mono}
              >
                BUDGET
              </p>
              <div>
                {(() => {
                  const selected = form.budget === "1-300";
                  return (
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, budget: "1-300" }))
                      }
                      className={`flex w-full flex-col border text-left transition-colors duration-150 md:max-w-xs ${
                        selected
                          ? "border-black bg-black text-white"
                          : "border-black/15 bg-white text-black hover:border-black/40"
                      }`}
                    >
                      <div
                        className={`border-b px-4 pt-4 pb-3 ${selected ? "border-white/15" : "border-black/10"}`}
                      >
                        <p
                          className={`text-[0.55rem] uppercase tracking-[0.2em] ${selected ? "text-white/50" : "text-black/35"}`}
                          style={mono}
                        >
                          Photo + Film
                        </p>
                        <p
                          className={`mt-1 text-[0.78rem] uppercase tracking-[0.12em] font-medium ${selected ? "text-white" : "text-black"}`}
                          style={mono}
                        >
                          ESSENTIAL
                        </p>
                        <p
                          className={`mt-2 text-[1.5rem] leading-none font-semibold tracking-[-0.03em] ${selected ? "text-white" : "text-black"}`}
                          style={sans}
                        >
                          $1 – $300
                        </p>
                      </div>
                      <ul className="flex flex-col gap-1.5 px-4 py-3">
                        {[
                          "Up to 1-hour session",
                          "10 professionally edited photos",
                          "30-sec cinematic highlight clip",
                          "1 outfit / look",
                          "Basic color grading",
                          "Digital delivery gallery",
                        ].map((item) => (
                          <li
                            key={item}
                            className={`flex items-start gap-1.5 text-[0.73rem] leading-[1.4] ${selected ? "text-white/80" : "text-black/55"}`}
                            style={sans}
                          >
                            <span
                              className={`mt-[0.2em] shrink-0 text-[0.55rem] ${selected ? "text-white/40" : "text-black/30"}`}
                            >
                              ◆
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })()}
              </div>
              {/* — Tiered packages (commented out for now) —
              <div className="flex flex-col gap-3 md:flex-row">
                {PACKAGES.map((pkg) => {
                  const selected = form.budget === pkg.key;
                  return (
                    <button
                      key={pkg.key}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, budget: pkg.key }))
                      }
                      className={`flex flex-col border text-left transition-colors duration-150 md:flex-1 ${
                        selected
                          ? "border-black bg-black text-white"
                          : "border-black/15 bg-white text-black hover:border-black/40"
                      }`}
                    >
                      <div
                        className={`border-b px-4 pt-4 pb-3 ${selected ? "border-white/15" : "border-black/10"}`}
                      >
                        <p
                          className={`text-[0.55rem] uppercase tracking-[0.2em] ${selected ? "text-white/50" : "text-black/35"}`}
                          style={mono}
                        >
                          {pkg.tag}
                        </p>
                        <p
                          className={`mt-1 text-[0.78rem] uppercase tracking-[0.12em] font-medium ${selected ? "text-white" : "text-black"}`}
                          style={mono}
                        >
                          {pkg.name}
                        </p>
                        <p
                          className={`mt-2 text-[1.5rem] leading-none font-semibold tracking-[-0.03em] ${selected ? "text-white" : "text-black"}`}
                          style={sans}
                        >
                          {pkg.price}
                        </p>
                      </div>
                      <ul className="flex flex-col gap-1.5 px-4 py-3">
                        {pkg.items.map((item) => (
                          <li
                            key={item}
                            className={`flex items-start gap-1.5 text-[0.73rem] leading-[1.4] ${selected ? "text-white/80" : "text-black/55"}`}
                            style={sans}
                          >
                            <span
                              className={`mt-[0.2em] shrink-0 text-[0.55rem] ${selected ? "text-white/40" : "text-black/30"}`}
                            >
                              ◆
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
              */}
              <input
                type="text"
                name="budget"
                value={form.budget}
                onChange={() => {}}
                required
                aria-hidden="true"
                tabIndex={-1}
                className="pointer-events-none absolute bottom-0 left-0 h-0 w-0 opacity-0"
              />
            </div>

            {/* Brief */}
            <div className="flex flex-col gap-3 border-b border-black/10 p-6 md:p-8">
              <label
                htmlFor="message"
                className="block text-[0.58rem] uppercase tracking-[0.2em] text-black/40"
                style={mono}
              >
                YOUR BRIEF
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project, timeline, references, and anything else that helps us understand your vision."
                value={form.message}
                onChange={handleChange}
                className="block w-full resize-none bg-transparent text-[0.95rem] text-black placeholder:text-black/25 outline-none"
                style={sans}
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between p-6 md:p-8">
              <p
                className="text-[0.62rem] uppercase tracking-[0.14em] text-black/30"
                style={mono}
              >
                {status === "submitting" ? "SENDING\u2026" : "ALL FIELDS REQUIRED"}
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-animate-chars disabled:cursor-not-allowed disabled:opacity-40"
                style={{ width: "auto" }}
              >
                <div className="btn-animate-chars__bg" />
                <span
                  data-button-animate-chars
                  className="btn-animate-chars__text paragraph"
                >
                  {
                    [...(status === "submitting" ? "SENDING\u2026" : "SEND INQUIRY")].map(
                      (char, i) => (
                        <span
                          key={i}
                          style={{
                            transitionDelay: `${i * 0.01}s`,
                            whiteSpace: char === " " ? "pre" : "normal",
                          }}
                        >
                          {char}
                        </span>
                      ),
                    )
                  }
                </span>
              </button>
            </div>
          </motion.form>
        )}

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between">
          <p
            className="text-[0.65rem] uppercase tracking-[0.14em] text-black/30"
            style={mono}
          >
            MADE INVINCIBLE &copy; 2024
          </p>
          <p
            className="text-[0.65rem] uppercase tracking-[0.14em] text-black/30"
            style={mono}
          >
            PHOTOGRAPHY &amp; FILM STUDIO
          </p>
        </div>
      </div>
    </div>
  );
}
