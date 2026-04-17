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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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
            className="border border-black/10 bg-white"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
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
            <div className="flex flex-col gap-4 border-b border-black/10 p-6 md:p-8">
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
              {/* Invisible sentinel for native form validation */}
              <input
                type="text"
                name="projectType"
                value={form.projectType}
                onChange={() => {}}
                required
                aria-hidden="true"
                tabIndex={-1}
                className="pointer-events-none h-0 w-0 opacity-0 absolute"
              />
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-3 border-b border-black/10 p-6 md:p-8">
              <label
                htmlFor="budget"
                className="block text-[0.58rem] uppercase tracking-[0.2em] text-black/40"
                style={mono}
              >
                ESTIMATED BUDGET
              </label>
              <select
                id="budget"
                name="budget"
                required
                value={form.budget}
                onChange={handleChange}
                className="block w-full cursor-pointer appearance-none bg-transparent text-[0.95rem] text-black outline-none"
                style={sans}
              >
                <option value="" disabled>
                  Select a range
                </option>
                <option value="under-1k">Under $1,000</option>
                <option value="1k-3k">$1,000 – $3,000</option>
                <option value="3k-7k">$3,000 – $7,000</option>
                <option value="7k-15k">$7,000 – $15,000</option>
                <option value="15k-plus">$15,000+</option>
                <option value="tbd">To be discussed</option>
              </select>
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
                {status === "submitting" ? "SENDING…" : "ALL FIELDS REQUIRED"}
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
                  {[
                    ...(status === "submitting" ? "SENDING…" : "SEND INQUIRY"),
                  ].map((char, i) => (
                    <span
                      key={i}
                      style={{
                        transitionDelay: `${i * 0.01}s`,
                        whiteSpace: char === " " ? "pre" : "normal",
                      }}
                    >
                      {char}
                    </span>
                  ))}
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
            MADE INVINCIBLE © 2024
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
