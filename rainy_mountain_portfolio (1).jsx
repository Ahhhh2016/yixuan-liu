import { useEffect, useMemo, useState } from "react";

const NAV = [
  { label: "Home", path: "/" },
  { label: "Graphics Projects", path: "/graphics" },
  { label: "AI Projects", path: "/ai" },
  { label: "Blogs", path: "/blogs" },
  { label: "About", path: "/about" },
];

const GRAPHICS = [
  {
    title: "Path Tracer",
    meta: "Rendering · BRDF · Global Illumination",
    desc: "A gallery-like rendering project presented as if scenes are emerging from mountain mist.",
  },
  {
    title: "Visual Computing Experiments",
    meta: "Geometry · Shading · Simulation",
    desc: "Studies in light, surface, and form with restrained visual framing and large image-first cards.",
  },
  {
    title: "Interactive Worlds",
    meta: "Realtime Graphics · Web Visuals",
    desc: "Atmospheric experiments where code behaves like weather, terrain, and memory.",
  },
  {
    title: "Mesh Processing",
    meta: "Subdivision · Simplification · Geometry",
    desc: "Technical studies in topology, discretization, and form-preserving transformations.",
  },
  {
    title: "Shader Sketches",
    meta: "GLSL · Atmosphere · Motion",
    desc: "Small visual poems built from light, turbulence, and procedural landscape logic.",
  },
  {
    title: "Coursework Archive",
    meta: "Rendering · Vision · Simulation",
    desc: "A deeper archive page for assignments, milestones, comparisons, and process notes.",
  },
];

const AI = [
  {
    title: "Audio / AI Research",
    meta: "Self-Supervised Learning · Representation",
    desc: "Research prototypes and technical explorations with a quieter, editorial presentation.",
  },
  {
    title: "Agentic Product Experiments",
    meta: "UX · Systems · LLMs",
    desc: "Interfaces and systems where intelligence feels thoughtful, warm, and unobtrusive.",
  },
  {
    title: "Creative AI Tools",
    meta: "Tools · Interaction · Prototyping",
    desc: "Projects that connect artistic intuition with technical rigor.",
  },
  {
    title: "Model Training Notes",
    meta: "Evaluation · Fine-tuning · Experiments",
    desc: "A long-form area for training runs, ablations, observations, and implementation details.",
  },
  {
    title: "Research Prototypes",
    meta: "Multimodal · Retrieval · Interfaces",
    desc: "Early explorations that deserve their own space instead of being compressed into one section.",
  },
  {
    title: "Product-facing AI",
    meta: "Systems · UX · Deployment",
    desc: "A dedicated area for applied AI tools, product experiments, and technical writeups.",
  },
];

const BLOGS = [
  {
    title: "On Rendering and Mountain Distance",
    excerpt: "Notes on rendering, systems, and aesthetic interfaces, arranged like annotations beside a painted scroll.",
  },
  {
    title: "Field Journals in Rain",
    excerpt: "Field journals from graphics, AI, and product experiments, written with generous margins and breathing room.",
  },
  {
    title: "Essays on Quiet Technical Beauty",
    excerpt: "Long-form reflections written like essays on rain-washed paper, balancing precision with atmosphere.",
  },
  {
    title: "Build Logs and Fragments",
    excerpt: "A home for implementation notes, tiny discoveries, debugging stories, and visual references.",
  },
];

function useRoute() {
  const getPath = () => {
    if (typeof window === "undefined") return "/";
    return window.location.pathname || "/";
  };

  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    if (nextPath === path) return;
    window.history.pushState({}, "", nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPath(nextPath);
  };

  return { path, navigate };
}

function Background({ mouse, rainDrops, ripples }) {
  const fogShiftX = mouse.x * 18;
  const fogShiftY = mouse.y * 10;
  const farFogShiftX = mouse.x * 28;
  const farFogShiftY = mouse.y * 14;

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(175,194,211,0.35),_transparent_48%),linear-gradient(to_bottom,_rgba(255,255,255,0.35),_rgba(62,95,120,0.04),_rgba(245,246,244,1))]" />

      <div
        className="absolute inset-x-0 top-24 h-64 blur-3xl opacity-60 transition-transform duration-700 ease-out"
        style={{ transform: `translate(${fogShiftX}px, ${fogShiftY}px)`, animation: "fogFloat 9s ease-in-out infinite" }}
      >
        <div className="mx-auto h-full w-[82%] rounded-full bg-[#AFC2D3]/35" />
      </div>
      <div
        className="absolute inset-x-0 top-72 h-72 blur-3xl opacity-40 transition-transform duration-700 ease-out"
        style={{ transform: `translate(${farFogShiftX}px, ${farFogShiftY}px)`, animation: "fogFloat 13s ease-in-out infinite" }}
      >
        <div className="mx-auto h-full w-[72%] rounded-full bg-white/55" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[54vh] opacity-75">
        <div className="absolute bottom-0 left-[-6%] h-[40vh] w-[32%] rounded-t-[100%] bg-[#AFC2D3]/45 blur-sm" />
        <div className="absolute bottom-0 left-[16%] h-[52vh] w-[26%] rounded-t-[100%] bg-[#92ABC0]/38 blur-sm" />
        <div className="absolute bottom-0 left-[35%] h-[34vh] w-[24%] rounded-t-[100%] bg-[#7996AF]/32 blur-sm" />
        <div className="absolute bottom-0 right-[26%] h-[58vh] w-[22%] rounded-t-[100%] bg-[#7C96AB]/40 blur-sm" />
        <div className="absolute bottom-0 right-[6%] h-[48vh] w-[26%] rounded-t-[100%] bg-[#5E7790]/42 blur-sm" />
      </div>

      <svg viewBox="0 0 1440 900" className="absolute inset-0 h-full w-full opacity-[0.16] mix-blend-multiply">
        <path d="M1100 140C1180 210 1240 250 1320 300C1240 320 1170 380 1140 450C1090 390 1030 350 930 320C1025 280 1070 220 1100 140Z" fill="#3E5F78" />
        <path d="M1080 165C1160 220 1205 248 1265 286" stroke="#1E2328" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M1035 295C940 325 865 390 820 500" stroke="#1E2328" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M990 285C900 318 828 378 775 470" stroke="#3E5F78" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />
      </svg>

      {rainDrops.map((drop, i) => (
        <span
          key={i}
          className="absolute top-0 w-px rounded-full bg-[#5C748B]/30"
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
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            animation: `ripple 3.8s ease-out ${ripple.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Header({ path, navigate }) {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <button onClick={() => navigate("/")} className="text-sm uppercase tracking-[0.25em] text-[#3A4653] transition hover:text-[#1E2328]">
          Yixuan Liu
        </button>
        <div className="hidden gap-8 md:flex">
          {NAV.map((item) => {
            const active = path === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`group relative text-sm transition-colors ${active ? "text-[#1E2328]" : "text-[#3A4653] hover:text-[#1E2328]"}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#3E5F78] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

function PageShell({ eyebrow, title, description, children }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-10 md:pb-28 md:pt-10">
      <div className="mb-12 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.28em] text-[#6E8FA7]">{eyebrow}</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#1E2328] md:text-6xl">{title}</h1>
        {description ? <p className="mt-6 text-base leading-8 text-[#3A4653] md:text-lg">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function HomePage({ navigate, heroRainDrops }) {
  return (
    <section className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-6 pb-16 pt-8 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:pb-24 md:pt-14">
      <div>
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#3E5F78]/10 bg-white/45 px-4 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#6E8FA7]" />
          <span className="text-xs uppercase tracking-[0.24em] text-[#3A4653]">Rain over Mountains</span>
        </div>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#1E2328] md:text-7xl">
          A portfolio where code falls like rain
          <span className="block text-[#3E5F78]">through ink-wash mountains.</span>
        </h1>
        <div className="mt-7 max-w-2xl rounded-[24px] border border-[#1E2328]/8 bg-white/38 px-5 py-4 backdrop-blur-sm">
          <p className="text-base leading-8 text-[#2B3641] md:text-lg">山色入屏，微雨沾衣；以代码写光影，以思索记行旅。</p>
          <p className="mt-2 text-sm italic leading-7 text-[#5B6E80] md:text-[15px]">
            Mountains enter the screen, light rain touches the sleeve; with code I write light and form, with reflection I record the journey.
          </p>
        </div>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#3A4653] md:text-lg">
          Computer graphics, AI, and reflective technical writing presented in a calm East-Asian visual language: mist, paper, mountains, water, and motion that feels like weather.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button onClick={() => navigate("/graphics")} className="rounded-full bg-[#1E2328] px-6 py-3 text-sm text-[#F6F7F4] shadow-[0_12px_40px_rgba(30,35,40,0.12)] transition hover:-translate-y-0.5">
            Enter the mountains
          </button>
          <button onClick={() => navigate("/blogs")} className="rounded-full border border-[#1E2328]/10 bg-white/50 px-6 py-3 text-sm text-[#1E2328] backdrop-blur-sm transition hover:bg-white/70">
            Read the journals
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center md:justify-end">
        <div className="relative w-full max-w-md rounded-[28px] border border-[#1E2328]/8 bg-white/42 p-5 shadow-[0_18px_60px_rgba(40,55,70,0.08)] backdrop-blur-md">
          <div className="rounded-[24px] border border-[#1E2328]/8 bg-[#F8F8F6]/80 p-6">
            <div className="text-xs uppercase tracking-[0.26em] text-[#6E8FA7]">Current Atmosphere</div>
            <div className="mt-5 space-y-4">
              {[
                ["Weather", "Light rain / low mist"],
                ["Focus", "Graphics · AI · Writing"],
                ["Structure", "Multi-page mountain archive"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-[#1E2328]/6 pb-3 text-sm">
                  <span className="text-[#3A4653]">{k}</span>
                  <span className="text-[#1E2328]">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 h-32 rounded-[22px] bg-[linear-gradient(180deg,rgba(175,194,211,0.22),rgba(245,246,244,0.9))] p-4">
              <div className="relative h-full w-full overflow-hidden rounded-[18px]">
                <div className="absolute bottom-0 left-[-2%] h-16 w-28 rounded-t-[100%] bg-[#AFC2D3]/60" />
                <div className="absolute bottom-0 left-[20%] h-24 w-24 rounded-t-[100%] bg-[#7B97B0]/45" />
                <div className="absolute bottom-0 left-[42%] h-14 w-24 rounded-t-[100%] bg-[#5F7890]/45" />
                <div className="absolute bottom-0 right-[14%] h-28 w-24 rounded-t-[100%] bg-[#89A4BA]/55" />
                {heroRainDrops.map((drop, i) => (
                  <span
                    key={i}
                    className="absolute top-0 w-px bg-[#5C748B]/35"
                    style={{ left: `${drop.left}%`, height: "18px", animation: `rainFall ${drop.duration}s linear ${drop.delay}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardGridPage({ eyebrow, title, description, items }) {
  return (
    <PageShell eyebrow={eyebrow} title={title} description={description}>
      <div className="mb-8 max-w-3xl rounded-[26px] border border-[#1E2328]/8 bg-white/48 p-5 backdrop-blur-sm md:p-6">
        <p className="text-sm leading-7 text-[#3A4653]">
          This is now a dedicated page rather than a homepage section, so it can grow into a fuller archive with categories, filters, case studies, process logs, visual comparisons, and deeper technical notes.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, i) => (
          <article key={item.title} className="group rounded-[28px] border border-[#1E2328]/8 bg-white/58 p-5 shadow-[0_20px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/72">
            <div className="relative mb-5 h-56 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(175,194,211,0.32),rgba(245,246,244,0.95))]">
              <div className="absolute bottom-0 left-0 right-0 h-[72%]">
                <div className="absolute bottom-0 left-[-5%] h-24 w-32 rounded-t-[100%] bg-[#AFC2D3]/70" />
                <div className="absolute bottom-0 left-[18%] h-36 w-28 rounded-t-[100%] bg-[#7996AF]/55" />
                <div className="absolute bottom-0 left-[42%] h-20 w-28 rounded-t-[100%] bg-[#587089]/50" />
                <div className="absolute bottom-0 right-[10%] h-40 w-28 rounded-t-[100%] bg-[#6D879E]/55" />
              </div>
              <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full opacity-40">
                <path d="M300 35C320 70 350 88 390 105C350 112 318 136 305 170C284 134 258 116 208 104C252 92 283 70 300 35Z" fill="#1E2328" opacity="0.25" />
                <path d="M285 106C235 124 198 156 165 206" stroke="#1E2328" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.36" />
              </svg>
            </div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#6E8FA7]">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="mt-3 text-2xl tracking-[-0.03em] text-[#1E2328]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#3E5F78]">{item.meta}</p>
            <p className="mt-4 text-sm leading-7 text-[#3A4653]">{item.desc}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function BlogsPage() {
  return (
    <PageShell
      eyebrow="Blogs"
      title="Written on xuan paper in rain."
      description="A dedicated reading page with more vertical space, calmer pacing, and room for longer essay archives, journals, technical notes, and reflections."
    >
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <div className="rounded-[28px] border border-[#1E2328]/8 bg-white/45 p-6 backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.22em] text-[#6E8FA7]">Reading Atmosphere</div>
            <p className="mt-4 text-sm leading-7 text-[#3A4653]">
              This page should feel like reading reflective essays on lightly textured paper: soft edges, wide margins, slow rhythm, and a slightly archival calm.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[30px] border border-[#8A96A3]/20 bg-[#F8F7F2]/88 p-8 shadow-[0_18px_60px_rgba(40,55,70,0.06)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(175,194,211,0.08),transparent_32%)]" />
          <div className="absolute inset-0 opacity-[0.08] mix-blend-multiply bg-[linear-gradient(to_bottom,rgba(30,35,40,0.08)_1px,transparent_1px)] bg-[length:100%_26px]" />
          <div className="absolute inset-y-0 left-7 w-px bg-[#7A8793]/14" />
          <div className="absolute inset-y-8 right-6 w-24 rounded-full bg-white/35 blur-2xl" />

          <div className="relative space-y-8">
            {BLOGS.map((blog, i) => (
              <article key={blog.title} className="border-b border-[#1E2328]/6 pb-7 last:border-none last:pb-0">
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-[#6E8FA7]">
                  <span>Essay {String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-10 bg-[#6E8FA7]/35" />
                </div>
                <h3 className="mt-4 text-2xl tracking-[-0.03em] text-[#1E2328]">{blog.title}</h3>
                <p className="mt-4 max-w-2xl text-[17px] leading-9 text-[#3A4653]">{blog.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="A quiet, technical landscape."
      description="This portfolio blends graphics, AI, systems thinking, and reflective writing. In the multi-page version, About can become a fuller biography page with timeline, research interests, CV, links, and selected statements."
    >
      <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[34px] border border-[#1E2328]/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(245,246,244,0.78))] p-8 shadow-[0_18px_70px_rgba(40,55,70,0.07)] backdrop-blur-sm md:p-10">
          <p className="max-w-2xl text-base leading-8 text-[#3A4653]">
            The website is conceived as an interactive shanshui scroll: rain as animation, mountains as structure, mist as spacing, and ink as typography. Each major area now has its own page so you are no longer forced to compress your work into homepage fragments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#3A4653]">
            {["GitHub", "Scholar", "Resume", "Email", "CV Timeline", "Selected Talks"].map((item) => (
              <span key={item} className="rounded-full border border-[#1E2328]/10 bg-white/60 px-4 py-2">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(175,194,211,0.22),rgba(245,246,244,0.96))] p-6">
          <div className="absolute inset-x-8 top-8 h-24 rounded-full bg-white/40 blur-3xl" style={{ animation: "fogFloat 9s ease-in-out infinite" }} />
          <div className="absolute bottom-0 left-[-5%] h-28 w-36 rounded-t-[100%] bg-[#AFC2D3]/70" />
          <div className="absolute bottom-0 left-[20%] h-44 w-32 rounded-t-[100%] bg-[#7B97B0]/55" />
          <div className="absolute bottom-0 right-[18%] h-56 w-32 rounded-t-[100%] bg-[#5F7890]/58" />
          <svg viewBox="0 0 420 300" className="absolute inset-0 h-full w-full opacity-60">
            <path d="M310 48C338 88 368 111 404 130C364 139 333 165 319 203C295 165 270 146 221 132C260 117 293 92 310 48Z" fill="#1E2328" opacity="0.22" />
            <path d="M298 129C247 145 213 176 175 238" stroke="#1E2328" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.35" />
            <path d="M287 123C244 139 205 169 156 222" stroke="#3E5F78" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.48" />
          </svg>
        </div>
      </div>
    </PageShell>
  );
}

export default function RainyMountainPortfolio() {
  const { path, navigate } = useRoute();

  const rainDrops = useMemo(
    () =>
      Array.from({ length: 54 }).map((_, i) => ({
        left: (i * 97) % 100,
        height: 18 + (i % 5) * 10,
        duration: 1.6 + (i % 6) * 0.3,
        delay: (i % 9) * 0.28,
      })),
    []
  );

  const heroRainDrops = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        left: 8 + i * 9,
        duration: 1.8 + i * 0.1,
        delay: i * 0.18,
      })),
    []
  );

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([
    { id: 1, left: "14%", bottom: "3rem", size: 56, delay: 0 },
    { id: 2, left: "15%", bottom: "2.6rem", size: 80, delay: 1.2 },
    { id: 3, left: "78%", bottom: "4.5rem", size: 48, delay: 0.5 },
  ]);

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRipples((prev) => {
        const next = [
          ...prev,
          {
            id: Date.now() + Math.random(),
            left: `${8 + Math.random() * 84}%`,
            bottom: `${1.2 + Math.random() * 4.5}rem`,
            size: 30 + Math.random() * 62,
            delay: 0,
          },
        ];
        return next.slice(-14);
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  let page = null;
  if (path === "/graphics") {
    page = (
      <CardGridPage
        eyebrow="Graphics Projects"
        title="Rendered like distant peaks."
        description="A full graphics archive with room for case studies, milestone breakdowns, comparison renders, process notes, and technical writeups."
        items={GRAPHICS}
      />
    );
  } else if (path === "/ai") {
    page = (
      <CardGridPage
        eyebrow="AI-Related Projects"
        title="Intelligence drifting through fog."
        description="A dedicated page for models, product experiments, research prototypes, evaluation notes, and deployment-oriented AI work."
        items={AI}
      />
    );
  } else if (path === "/blogs") {
    page = <BlogsPage />;
  } else if (path === "/about") {
    page = <AboutPage />;
  } else {
    page = <HomePage navigate={navigate} heroRainDrops={heroRainDrops} />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#F6F7F4] text-[#1E2328] selection:bg-[#6E8FA7]/25">
      <style>{`
        @keyframes rainFall {
          0% { transform: translateY(-18vh); opacity: 0; }
          15% { opacity: 0.35; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
        @keyframes fogFloat {
          0%,100% { transform: translateX(0px); opacity: 0.32; }
          50% { transform: translateX(16px); opacity: 0.45; }
        }
        @keyframes ripple {
          0% { transform: scale(0.7); opacity: 0; }
          18% { opacity: 0.22; }
          100% { transform: scale(1.65); opacity: 0; }
        }
      `}</style>

      <Background mouse={mouse} rainDrops={rainDrops} ripples={ripples} />
      <Header path={path} navigate={navigate} />
      <main className="relative z-10">{page}</main>
    </div>
  );
}
