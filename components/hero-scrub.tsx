"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { MagneticButton } from "./magnetic-button";

function ScrollCue() {
  return (
    <>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-white/60"
      >
        <ArrowDown size={16} weight="bold" className="text-[#531a30]" />
      </motion.span>
      <span className="font-mono text-[11px] tracking-[0.22em] text-[#531a30] uppercase">
        Scroll to detonate
      </span>
    </>
  );
}

const FRAME_COUNT = 96;
const VIDEO_SRC = "/hero/explosion.mp4";
const STILL_START = "/hero/still-start.png";
const STILL_END = "/hero/still-end.png";

type Stills = { start: HTMLImageElement; end: HTMLImageElement | null };

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function seekTo(video: HTMLVideoElement, t: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      video.removeEventListener("seeked", done);
      reject(new Error("seek timeout"));
    }, 4000);
    const done = () => {
      clearTimeout(timer);
      video.removeEventListener("seeked", done);
      resolve();
    };
    video.addEventListener("seeked", done);
    video.currentTime = t;
  });
}

/**
 * Pull evenly spaced frames out of the mp4 in the browser
 * (seek + capture), so no server-side frame extraction is needed.
 */
async function extractFrames(
  src: string,
  count: number,
  state: { cancelled: boolean },
): Promise<ImageBitmap[] | null> {
  if (typeof createImageBitmap === "undefined") return null;
  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = src;
  video.load();
  try {
    await new Promise<void>((resolve, reject) => {
      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error("video failed to load"));
    });
  } catch {
    return null;
  }
  const duration = video.duration;
  if (!Number.isFinite(duration) || duration <= 0) return null;

  const frames: ImageBitmap[] = [];
  const abort = () => {
    frames.forEach((f) => f.close());
    video.removeAttribute("src");
    video.load();
  };
  for (let i = 0; i < count; i++) {
    if (state.cancelled) {
      abort();
      return null;
    }
    const t = Math.min((i / (count - 1)) * duration, duration - 1 / 30);
    try {
      await seekTo(video, Math.max(t, 0));
      frames.push(await createImageBitmap(video));
    } catch {
      abort();
      return null;
    }
  }
  video.removeAttribute("src");
  video.load();
  return frames;
}

/**
 * Cover-fit draw. focalY biases the vertical crop: 0.5 centers,
 * lower values reveal more of the image's top (pushing the dish
 * lower in the viewport, clear of the headline).
 */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap | HTMLImageElement,
  cw: number,
  ch: number,
  zoom = 1,
  focalY = 0.5,
) {
  const iw = img.width;
  const ih = img.height;
  if (!iw || !ih) return;
  const s = Math.max(cw / iw, ch / ih) * zoom;
  const dw = iw * s;
  const dh = ih * s;
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) * focalY, dw, dh);
}

const FOCAL_Y = 0.32;

export function HeroScrub() {
  const outerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const framesRef = useRef<ImageBitmap[] | null>(null);
  const stillsRef = useRef<Stills | null>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.0005,
  });

  const cueOpacity = useTransform(smooth, [0, 0.08], [1, 0]);
  const introOpacity = useTransform(smooth, [0, 0.16], [1, 0]);
  const introY = useTransform(smooth, [0, 0.16], [0, -36]);
  const finaleOpacity = useTransform(smooth, [0.82, 0.94], [0, 1]);
  const finaleY = useTransform(smooth, [0.82, 0.94], [28, 0]);
  const finalePointer = useTransform(smooth, (v) =>
    v > 0.8 ? ("auto" as const) : ("none" as const),
  );

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const p = progressRef.current;
    ctx.clearRect(0, 0, cw, ch);

    const frames = framesRef.current;
    if (frames && frames.length > 1) {
      const idx = Math.min(
        frames.length - 1,
        Math.max(0, Math.round(p * (frames.length - 1))),
      );
      drawCover(ctx, frames[idx], cw, ch, 1, FOCAL_Y);
      return;
    }

    const stills = stillsRef.current;
    if (stills) {
      if (stills.end) {
        // Two-still fallback: crossfade through the "detonation" midpoint
        const t = Math.min(1, Math.max(0, (p - 0.3) / 0.32));
        const alpha = t * t * (3 - 2 * t);
        drawCover(ctx, stills.start, cw, ch, 1, FOCAL_Y);
        if (alpha > 0) {
          ctx.globalAlpha = alpha;
          drawCover(ctx, stills.end, cw, ch, 1 + 0.06 * alpha, FOCAL_Y);
          ctx.globalAlpha = 1;
        }
      } else {
        // Start frame only: gentle zoom while the footage is pending
        drawCover(ctx, stills.start, cw, ch, 1 + 0.08 * p, FOCAL_Y);
      }
      return;
    }

    // No media yet: honest lab-style placeholder
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = Math.min(cw, ch) * 0.34;
    ctx.strokeStyle = "rgba(46,37,48,0.25)";
    ctx.lineWidth = 2 * dpr;
    ctx.setLineDash([8 * dpr, 10 * dpr]);
    ctx.beginPath();
    ctx.arc(cw / 2, ch / 2, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(cw / 2 - r * 0.2, ch / 2);
    ctx.lineTo(cw / 2 + r * 0.2, ch / 2);
    ctx.moveTo(cw / 2, ch / 2 - r * 0.2);
    ctx.lineTo(cw / 2, ch / 2 + r * 0.2);
    ctx.stroke();
    ctx.fillStyle = "rgba(119,105,122,0.9)";
    ctx.font = `${11 * dpr}px ui-monospace, Menlo, monospace`;
    ctx.textAlign = "center";
    ctx.fillText("SAMPLE 001 - AWAITING FOOTAGE", cw / 2, ch / 2 + r + 28 * dpr);
  }, []);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      paint();
    });
  }, [paint]);

  useMotionValueEvent(smooth, "change", (v) => {
    progressRef.current = v;
    scheduleDraw();
  });

  // Load stills immediately, then upgrade to real video frames when available
  useEffect(() => {
    const state = { cancelled: false };
    let owned: ImageBitmap[] | null = null;
    (async () => {
      const [start, end] = await Promise.all([
        loadImage(STILL_START),
        loadImage(STILL_END),
      ]);
      if (state.cancelled) return;
      if (start) {
        stillsRef.current = { start, end };
        scheduleDraw();
      }
      const frames = await extractFrames(VIDEO_SRC, FRAME_COUNT, state);
      if (!frames) return;
      if (state.cancelled) {
        frames.forEach((f) => f.close());
        return;
      }
      owned = frames;
      framesRef.current = frames;
      scheduleDraw();
    })();
    return () => {
      state.cancelled = true;
      framesRef.current = null;
      owned?.forEach((f) => f.close());
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [scheduleDraw]);

  // Keep the canvas backing store in sync with its on-screen size
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ro = new ResizeObserver(([entry]) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = entry.contentRect;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      scheduleDraw();
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, [scheduleDraw]);

  return (
    <section ref={outerRef} id="experiment" className="relative h-[320vh]">
      <div className="sticky top-0 h-[100dvh] min-h-[900px] overflow-hidden">
        {/* Pastel stage matching the footage background, so the square clip blends in */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#f7e5e8_0%,#efe9f1_45%,#dcebf5_100%)]" />

        {/* Scrub canvas, full-bleed cover */}
        <div ref={stageRef} className="absolute inset-0">
          <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
        </div>
        <p className="sr-only">
          Slow-motion replay of a banana split exploding into scoops, cherries and
          sprinkles, scrubbed by scrolling.
        </p>

        {/* Intro copy */}
        <div className="relative z-10 mx-auto h-full max-w-7xl px-6">
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="pointer-events-none flex h-full flex-col items-center justify-center text-center md:pb-36"
          >
            {/* Glyph halos alone keep type readable over the full-bleed footage */}
            <div className="px-6 py-8 md:px-12 md:py-10">
              <p className="hero-eyebrow-shadow font-mono text-[11px] font-bold tracking-[0.22em] text-[#531a30] uppercase">
                Experiment N.047 — Controlled Detonation
              </p>
              <h1 className="hero-headline-shadow font-display mx-auto mt-5 max-w-6xl text-[44px] leading-none font-extrabold tracking-tighter text-balance text-[#531a30] sm:text-[56px] md:text-[80px]">
                The banana split, studied at the particle level.
              </h1>
              <div className="mx-auto mt-6">
                <p className="hero-body-shadow mx-auto max-w-[42ch] leading-relaxed font-semibold text-[#FF3483]">
                  Three scoops, one banana, and a controlled detonation of
                  flavor. Scroll to run the slow-motion replay.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
                  <ScrollCue />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Desktop cue: bottom-center */}
          <motion.div
            style={{ opacity: cueOpacity }}
            className="pointer-events-none absolute bottom-9 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 md:flex"
          >
            <ScrollCue />
          </motion.div>
        </div>

        {/* Finale */}
        <motion.div
          style={{ opacity: finaleOpacity, y: finaleY, pointerEvents: finalePointer }}
          className="absolute inset-x-6 bottom-24 z-20 flex flex-col items-center gap-6 text-center md:bottom-16"
        >
          <p className="font-display text-4xl font-extrabold tracking-tighter text-[#531a30] md:text-6xl">
            Findings: delicious.
          </p>
          <MagneticButton
            href="#flavors"
            className="inline-block rounded-full bg-cherry px-7 py-3.5 font-bold text-white transition-colors duration-300 hover:bg-cherry-deep active:bg-cherry-press"
          >
            Review the flavors
          </MagneticButton>
        </motion.div>

        {/* Fade into the page background (also covers the clip's corner watermark) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_bottom,transparent_0%,rgba(251,247,242,0.85)_55%,#fbf7f2_80%)]" />
      </div>
    </section>
  );
}
