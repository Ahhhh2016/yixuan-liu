"use client";

/*
NEXT.JS APP ROUTER VERSION

Suggested folder structure:

/app
  layout.tsx
  page.tsx
  /graphics/page.tsx
  /ai/page.tsx
  /blogs/page.tsx
  /about/page.tsx

/components
  site.tsx

This file contains shared client components used by those pages.
The main fixes in this version are:
- added "use client" for Next.js App Router
- converted state and event handlers to explicit TypeScript types
- removed build-breaking implicit any / never[] inference issues
- stabilized ripple cleanup timers
*/

import React, {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type MouseState = {
  x: number;
  y: number;
  rawX: number;
  rawY: number;
};

type Ripple = {
  id: number;
  left: string;
  bottom: string;
  size: number;
  duration?: number;
  opacity?: number;
};

type RainDrop = {
  left: number;
  height: number;
  duration: number;
  delay: number;
};

type BlogRipple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

type PageShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

type ProjectCardProps = {
  title: string;
  meta: string;
  desc: string;
};

type BlogPaperProps = {
  title: string;
  excerpt: string;
  index?: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function Background(): JSX.Element {
  const rainDrops = useMemo<RainDrop[]>(
    () =>
      Array.from({ length: 54 }, (_, i) => ({
        left: (i * 97) % 100,
        height: 18 + (i % 5) * 10,
        duration: 1.6 + (i % 6) * 0.3,
        delay: (i % 9) * 0.28,
      })),
    []
  );

  const [mouse, setMouse] = useState<MouseState>({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [scrollY, setScrollY] = useState<number>(0);

  const frameRef = useRef<number | null>(null);
  const rippleIntervalRef = useRef<number | null>(null);
  const targetRef = useRef<MouseState>({ x: 0, y: 0, rawX: 0, rawY: 0 });

  useEffect(() => {
    const animate = () => {
      setMouse((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.08,
        y: prev.y + (targetRef.current.y - prev.y) * 0.08,
        rawX: targetRef.current.rawX,
        rawY: targetRef.current.rawY,
      }));

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMove = (e: globalThis.MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
        rawX: e.clientX,
        rawY: e.clientY,
      };
    };

    const handleScroll = () => {
      setScrollY(window.scrollY || 0);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    rippleIntervalRef.current = window.setInterval(() => {
      setRipples((prev) => {
        const next: Ripple = {
          id: Date.now() + Math.random(),
          left: `${8 + Math.random() * 84}%`,
          bottom: `${1 + Math.random() * 5}rem`,
          size: 30 + Math.random() * 60,
          duration: 3.8,
          opacity: 0.2,
        };
        return [...prev.slice(-13), next];
      });
    }, 1200);

    return () => {
      if (rippleIntervalRef.current !== null) {
        window.clearInterval(rippleIntervalRef.current);
      }
    };
  }, []);

  const fogShiftX = mouse.x * 16;
  const fogShiftY = mouse.y * 9;
  const mistShiftX = mouse.x * 28;
  const mistShiftY = mouse.y * 14;
  const nearMountainY = clamp(scrollY * 0.08, 0, 48);
  const midMountainY = clamp(scrollY * 0.14, 0, 84);
  const farMountainY = clamp(scrollY * 0.04, 0, 28);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(175,194,211,0.35),_transparent_48%),linear-gradient(to_bottom,_rgba(255,255,255,0.35),_rgba(62,95,120,0.04),_rgba(245,246,244,1))]" />

      <div
        className="absolute inset-x-0 top-16 h-48 blur-3xl opacity-55 transition-transform duration-700"
        style={{ transform: `translate(${fogShiftX}px, ${fogShiftY - scrollY * 0.03}px)` }}
      >
        <div className="mx-auto h-full w-[76%] rounded-full bg-white/50" />
      </div>

      <div
        className="absolute inset-x-0 top-24 h-64 blur-3xl opacity-60 transition-transform duration-700"
        style={{ transform: `translate(${mistShiftX}px, ${mistShiftY - scrollY * 0.05}px)` }}
      >
        <div className="mx-auto h-full w-[80%] rounded-full bg-[#AFC2D3]/35" />
      </div>

      <div
        className="absolute inset-x-0 top-72 h-72 blur-3xl opacity-40 transition-transform duration-700"
        style={{ transform: `translate(${fogShiftX * 0.6}px, ${fogShiftY * 0.8 - scrollY * 0.02}px)` }}
      >
        <div className="mx-auto h-full w-[70%] rounded-full bg-[#dce6ee]/45" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[58vh] opacity-80">
        <div
          className="absolute bottom-0 left-[-10%] h-[26vh] w-[42%] rounded-t-[100%] bg-[#c8d8e4]/50 blur-sm transition-transform duration-300"
          style={{ transform: `translateY(${farMountainY}px)` }}
        />
        <div
          className="absolute bottom-0 left-[10%] h-[34vh] w-[34%] rounded-t-[100%] bg-[#9fb7ca]/42 blur-sm transition-transform duration-300"
          style={{ transform: `translateY(${midMountainY}px)` }}
        />
        <div
          className="absolute bottom-0 left-[31%] h-[24vh] w-[26%] rounded-t-[100%] bg-[#6f8ca4]/30 blur-sm transition-transform duration-300"
          style={{ transform: `translateY(${farMountainY * 0.9}px)` }}
        />
        <div
          className="absolute bottom-0 right-[24%] h-[40vh] w-[24%] rounded-t-[100%] bg-[#7390a7]/42 blur-sm transition-transform duration-300"
          style={{ transform: `translateY(${midMountainY * 1.15}px)` }}
        />
        <div
          className="absolute bottom-0 right-[2%] h-[48vh] w-[28%] rounded-t-[100%] bg-[#56708a]/46 blur-sm transition-transform duration-300"
          style={{ transform: `translateY(${nearMountainY}px)` }}
        />
      </div>

      {rainDrops.map((drop, i) => (
        <span
          key={`${drop.left}-${i}`}
          className="absolute top-0 w-px bg-[#5C748B]/30"
          style={{
            left: `${drop.left}%`,
            height: `${drop.height}px`,
            animation: `rainFall ${drop.duration}s linear ${drop.delay}s infinite`,
          }}
        />
      ))}

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full border border-[#6E8FA7]/20"
          style={{
            left: ripple.left,
            bottom: ripple.bottom,
            width: ripple.size,
            height: ripple.size,
            animation: `ripple ${ripple.duration ?? 3.8}s ease-out infinite`,
            opacity: ripple.opacity ?? 0.2,
          }}
        />
      ))}
    </div>
  );
}

export function Header(): JSX.Element {
  const nav = [
    { label: "Home", path: "/" },
    { label: "Graphics", path: "/graphics" },
    { label: "AI", path: "/ai" },
    { label: "Blogs", path: "/blogs" },
    { label: "About", path: "/about" },
  ] as const;

  return (
    <header className="relative z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="text-sm uppercase tracking-[0.25em] text-[#3A4653] transition hover:text-[#1E2328]">
          Yixuan Liu
        </a>

        <div className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="text-sm text-[#3A4653] transition hover:text-[#1E2328]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function PageShell({ eyebrow, title, description, children, className = "" }: PageShellProps): JSX.Element {
  return (
    <section className={`mx-auto max-w-7xl px-6 pb-24 pt-10 ${className}`}>
      <div className="mb-12 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.28em] text-[#6E8FA7]">{eyebrow}</div>
        <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em]">{title}</h1>
        {description ? <p className="mt-6 text-lg text-[#3A4653]">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function ProjectCard({ title, meta, desc }: ProjectCardProps): JSX.Element {
  return (
    <article className="group rounded-[28px] border border-[#1E2328]/8 bg-white/60 p-5 shadow-[0_20px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm">
      <div className="relative mb-5 h-56 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(175,194,211,0.32),rgba(245,246,244,0.95))]">
        <div className="absolute bottom-0 left-[-4%] h-20 w-32 rounded-t-[100%] bg-[#bfd0dc]/55" />
        <div className="absolute bottom-0 left-[22%] h-28 w-24 rounded-t-[100%] bg-[#87a0b4]/45" />
        <div className="absolute bottom-0 right-[8%] h-36 w-28 rounded-t-[100%] bg-[#5f7890]/48" />
      </div>

      <h3 className="text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-[#3E5F78]">{meta}</p>
      <p className="mt-4 text-sm leading-7 text-[#3A4653]">{desc}</p>
    </article>
  );
}

export function BlogPaper({ title, excerpt, index = 1 }: BlogPaperProps): JSX.Element {
  const [ripples, setRipples] = useState<BlogRipple[]>([]);
  const timeoutIdsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutIdsRef.current = [];
    };
  }, []);

  const handleMove = (e: ReactMouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const next: BlogRipple = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      size: 36 + Math.random() * 22,
    };

    setRipples((prev) => [...prev.slice(-5), next]);

    const timeoutId = window.setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== next.id));
      timeoutIdsRef.current = timeoutIdsRef.current.filter((id) => id !== timeoutId);
    }, 1400);

    timeoutIdsRef.current.push(timeoutId);
  };

  return (
    <article
      onMouseMove={handleMove}
      className="relative overflow-hidden rounded-[30px] border border-[#8A96A3]/20 bg-[#F8F7F2]/88 p-8 shadow-[0_18px_60px_rgba(40,55,70,0.06)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(175,194,211,0.08),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(30,35,40,0.08)_1px,transparent_1px)] bg-[length:100%_26px] opacity-[0.08] mix-blend-multiply" />
      <div className="absolute inset-y-0 left-7 w-px bg-[#7A8793]/14" />
      <div className="absolute inset-y-8 right-6 w-24 rounded-full bg-white/35 blur-2xl" />

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full border border-[#6E8FA7]/20"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animation: "textRipple 1.3s ease-out forwards",
          }}
        />
      ))}

      <div className="relative">
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-[#6E8FA7]">
          <span>Essay {String(index).padStart(2, "0")}</span>
          <span className="h-px w-10 bg-[#6E8FA7]/35" />
        </div>
        <h3 className="mt-4 text-2xl tracking-[-0.03em] text-[#1E2328]">{title}</h3>
        <p className="mt-4 max-w-2xl text-[17px] leading-9 text-[#3A4653]">{excerpt}</p>
      </div>
    </article>
  );
}

export function GlobalStyles(): JSX.Element {
  return (
    <style>{`
      @keyframes rainFall {
        0% { transform: translateY(-18vh); opacity: 0; }
        15% { opacity: 0.35; }
        100% { transform: translateY(120vh); opacity: 0; }
      }

      @keyframes ripple {
        0% { transform: scale(0.7); opacity: 0; }
        18% { opacity: 0.22; }
        100% { transform: scale(1.65); opacity: 0; }
      }

      @keyframes textRipple {
        0% { transform: translate(-50%, -50%) scale(0.55); opacity: 0; }
        20% { opacity: 0.16; }
        100% { transform: translate(-50%, -50%) scale(1.9); opacity: 0; }
      }
    `}</style>
  );
}

/*
Smoke tests / usage examples

1) app/layout.tsx
import { Background, GlobalStyles, Header } from "@/components/site";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F6F7F4] text-[#1E2328]">
        <GlobalStyles />
        <Background />
        <Header />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}

2) app/blogs/page.tsx
import { BlogPaper, PageShell } from "@/components/site";

export default function BlogsPage() {
  return (
    <PageShell
      eyebrow="Blogs"
      title="Written on xuan paper in rain."
      description="Reflective notes, project journals, and technical essays."
    >
      <div className="grid gap-6">
        <BlogPaper
          index={1}
          title="On Rendering and Mountain Distance"
          excerpt="Notes on rendering and atmosphere."
        />
        <BlogPaper
          index={2}
          title="Field Journals in Rain"
          excerpt="Research fragments, experiments, and reflections."
        />
      </div>
    </PageShell>
  );
}

3) app/graphics/page.tsx
import { PageShell, ProjectCard } from "@/components/site";

export default function GraphicsPage() {
  return (
    <PageShell eyebrow="Graphics" title="Rendered like distant peaks.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ProjectCard title="Path Tracer" meta="Rendering" desc="Physically based rendering study." />
        <ProjectCard title="Mesh Simplification" meta="Geometry" desc="QEM-based geometry processing." />
      </div>
    </PageShell>
  );
}
*/
