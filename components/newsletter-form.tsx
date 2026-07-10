"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";

type FormState = "idle" | "loading" | "success";

export function NewsletterForm() {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email looks incomplete — mind checking it?");
      return;
    }
    setError(null);
    setState("loading");
    // Demo site: no backend, simulate the round trip
    window.setTimeout(() => setState("success"), 900);
  };

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.22em] text-cream/60 uppercase">
        The Lab Report
      </p>
      <AnimatePresence mode="wait" initial={false}>
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="mt-4 flex items-start gap-3"
          >
            <CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-mint" />
            <p className="leading-relaxed text-cream/80">
              Subscribed. Your first Lab Report ships next month.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -12 }}
            onSubmit={handleSubmit}
            noValidate
            className="mt-4 flex flex-col gap-2"
          >
            <label htmlFor="lab-report-email" className="text-sm font-medium text-cream/90">
              Email address
            </label>
            <input
              id="lab-report-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="you@somewhere.com"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "lab-report-error" : "lab-report-helper"}
              className={`w-full rounded-xl border bg-white/10 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-cherry focus:outline-none ${
                error ? "border-cherry" : "border-white/15"
              }`}
            />
            {error ? (
              <p id="lab-report-error" className="text-sm text-blush-deep">
                {error}
              </p>
            ) : (
              <p id="lab-report-helper" className="text-sm text-cream/50">
                One email a month. Findings, flavors, zero spam.
              </p>
            )}
            <button
              type="submit"
              disabled={state === "loading"}
              className="mt-1 self-start rounded-full bg-cherry px-6 py-3 font-bold text-white transition-all duration-300 hover:bg-cherry-deep active:scale-[0.98] active:bg-cherry-press disabled:opacity-70"
            >
              {state === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
