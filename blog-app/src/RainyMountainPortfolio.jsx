import { COMPUTER_ASCII } from './computerAscii.js';
import { NOTEBOOK_ASCII } from './notebookAscii.js';
import { UTAH_TEAPOT_ASCII } from './utahTeapotAscii.js';
import { SCROLL_ASCII } from './scrollAscii.js';
import { PHONOGRAPH_ASCII } from './phonographAscii.js';
import ReactMarkdown from 'react-markdown';
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { getProjectBySlug } from './projectContent.js';

const nav = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Tech blogs', path: '/tech-blogs' },
  { label: 'Graphics Tutorials', path: '/graphics-tutorials' },
  { label: 'Novels', path: '/novels' },
  { label: 'About', path: '/about' },
];

const graphics = [
    {
      title: "Path Tracer",
      slug: "path-tracer",
      meta: "Rendering · BRDF · Global Illumination",
      desc: "A gallery-like rendering project presented as if scenes are emerging from mountain mist.",
    },
    {
      title: "Visual Computing Experiments",
      slug: "visual-computing-experiments",
      meta: "Geometry · Shading · Simulation",
      desc: "Studies in light, surface, and form with restrained visual framing and large image-first cards.",
    },
    {
      title: "Interactive Worlds",
      slug: "interactive-worlds",
      meta: "Realtime Graphics · Web Visuals",
      desc: "Atmospheric experiments where code behaves like weather, terrain, and memory.",
    },
  ];

const ai = [
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
  ];

const blogs = [
    "Notes on rendering, systems, and aesthetic interfaces.",
    "Field journals from graphics, AI, and product experiments.",
    "Long-form reflections written like essays on rain-washed paper.",
  ];

const asciiCardsRaw = [
    {
      key: 'computer',
      ascii: COMPUTER_ASCII,
      href: '/projects',
      title: 'Projects',
      subtitle: 'computer',
    },
    {
      key: 'notebook',
      ascii: NOTEBOOK_ASCII,
      href: '/tech-blogs',
      title: 'Tech Blogs',
      subtitle: 'notebook',
    },
    {
      key: 'teapot',
      ascii: UTAH_TEAPOT_ASCII,
      href: '/graphics-tutorials',
      title: 'Graphics Tutorials',
      subtitle: 'teapot',
    },
    {
      key: 'scroll',
      ascii: SCROLL_ASCII,
      href: '/novels',
      title: 'Novels',
      subtitle: 'scroll',
    },
    {
      key: 'phonograph',
      ascii: PHONOGRAPH_ASCII,
      href: '/about',
      title: 'About',
      subtitle: 'phonograph',
    },
  ];

const sizeTuning = {
  computer: 0.82,
};

const asciiCards = asciiCardsRaw.map((card) => {
  const lines = card.ascii.split('\n');
  const cols = Math.max(...lines.map((line) => line.length));
  const rows = lines.length;

  // Approximate monospace glyph ratio to keep all ASCII cards similarly sized.
  const fontSizePx = Math.max(3.2, Math.min(7.2, Math.min(600 / (cols * 0.82), 180 / (rows * 0.82))));

  const tunedFontSizePx = fontSizePx * (sizeTuning[card.key] ?? 1);
  return { ...card, fontSizePx: tunedFontSizePx };
});

const markdownComponents = {
  h1: ({ children }) => <h1 className="mt-8 text-3xl font-semibold tracking-[-0.03em] text-[#1E2328] md:text-4xl">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-[#1E2328] md:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-6 text-xl font-semibold text-[#1E2328]">{children}</h3>,
  p: ({ children }) => <p className="mt-4 text-base leading-8 text-[#3A4653]">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-[#3A4653]">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-[#3A4653]">{children}</ol>,
  li: ({ children }) => <li className="leading-8">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-[#1E2328]">{children}</strong>,
  code: ({ inline, children }) =>
    inline ? (
      <code className="rounded bg-[#E8F3FB] px-1 py-0.5 text-[0.92em] text-[#1E2328]">{children}</code>
    ) : (
      <code className="block overflow-x-auto rounded-2xl bg-[#E8F3FB] p-4 text-sm text-[#1E2328]">{children}</code>
    ),
};

function HomePage() {
  return (
    <section className="mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col justify-center px-6 py-8 md:px-10 md:py-10">
      <div>
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#1E7FBF]/10 bg-white/45 px-4 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#5BAEE6]" />
          <span className="text-xs uppercase tracking-[0.24em] text-[#3A4653]">点击这里切换到中文</span>
        </div>
        <h1 className="w-full max-w-none text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#1E2328] md:text-7xl">
          Hi. Welcome.
          <span className="block text-[#1E7FBF]">I'm Yixuan Liu, who learns computer graphics, AI, and builds applications.</span>
        </h1>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {asciiCards.map((card) => (
          <Link
            key={card.key}
            to={card.href}
            aria-label={`Go to ${card.title}`}
            className="group relative min-w-0 overflow-hidden rounded-[24px] bg-transparent p-3 transition duration-300 hover:-translate-y-1 hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E7FBF]/45 md:p-4"
          >
            <div className="flex h-[178px] items-center justify-center overflow-hidden">
              <pre
                className="m-0 block origin-center whitespace-pre font-mono leading-[1.04] text-[#1E2328] transition-colors duration-300 group-hover:text-white group-focus-visible:text-white [font-variant-ligatures:none]"
                style={{ fontSize: `${card.fontSizePx}px`, transform: 'scaleY(0.75)' }}
              >
                {card.ascii}
              </pre>
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <div className="px-4 py-2 text-sm font-semibold tracking-wide text-black">{card.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">Graphics Projects</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Rendered like distant peaks.</h2>
          </div>
          <div className="hidden max-w-md text-sm leading-7 text-[#3A4653] md:block">
            Large visual cards, restrained text, and a gallery rhythm that lets images breathe like landscape scrolls.
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {graphics.map((item, i) => (
            <Link
              key={item.title}
              to={`/projects/${item.slug}`}
              className="group block rounded-[28px] border border-[#1E2328]/8 bg-white/55 p-5 shadow-[0_20px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E7FBF]/45"
            >
              <div className="relative mb-5 h-56 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(189,224,247,0.32),rgba(245,246,244,0.95))]">
                <div className="absolute bottom-0 left-0 right-0 h-[72%]">
                  <div className="absolute bottom-0 left-[-5%] h-24 w-32 rounded-t-[100%] bg-[#BDE0F7]/70" />
                  <div className="absolute bottom-0 left-[18%] h-36 w-28 rounded-t-[100%] bg-[#4FA4DC]/55" />
                  <div className="absolute bottom-0 left-[42%] h-20 w-28 rounded-t-[100%] bg-[#2A6FA8]/50" />
                  <div className="absolute bottom-0 right-[10%] h-40 w-28 rounded-t-[100%] bg-[#5BA3D8]/55" />
                </div>
                <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full opacity-40">
                  <path d="M300 35C320 70 350 88 390 105C350 112 318 136 305 170C284 134 258 116 208 104C252 92 283 70 300 35Z" fill="#1E2328" opacity="0.25" />
                  <path d="M285 106C235 124 198 156 165 206" stroke="#1E2328" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.36" />
                </svg>
                {Array.from({ length: 8 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="absolute top-0 w-px bg-[#4B97CD]/30"
                    style={{ left: `${10 + idx * 11}%`, height: '22px', animation: `rainFall ${1.8 + idx * 0.22}s linear ${idx * 0.12}s infinite` }}
                  />
                ))}
              </div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#5BAEE6]">0{i + 1}</div>
              <h3 className="mt-3 text-2xl tracking-[-0.03em] text-[#1E2328]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#1E7FBF]">{item.meta}</p>
              <p className="mt-4 text-sm leading-7 text-[#3A4653]">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">AI-Related Projects</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Intelligence drifting through fog.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {ai.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-[#1E2328]/8 bg-[#F4FAFE]/72 p-6 shadow-[0_16px_50px_rgba(40,55,70,0.05)] backdrop-blur-sm">
              <div className="mb-4 h-px w-14 bg-[#5BAEE6]/50" />
              <h3 className="text-2xl tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#1E7FBF]">{item.meta}</p>
              <p className="mt-4 text-sm leading-7 text-[#3A4653]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function TechBlogsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">Tech Blogs</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Written on rain-washed paper.</h2>
        </div>
        <div className="rounded-[30px] border border-[#1E2328]/8 bg-white/58 p-8 shadow-[0_18px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm">
          <div className="space-y-6">
            {blogs.map((line, i) => (
              <div key={line} className="border-b border-[#1E2328]/6 pb-6 last:border-none last:pb-0">
                <div className="text-xs uppercase tracking-[0.22em] text-[#5BAEE6]">Essay 0{i + 1}</div>
                <p className="mt-3 max-w-2xl text-lg leading-9 text-[#3A4653]">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GraphicsTutorialsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">Graphics Tutorials</div>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Step-by-step graphics notes.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {graphics.map((item, i) => (
          <article key={item.title} className="rounded-[28px] border border-[#1E2328]/8 bg-white/60 p-6 shadow-[0_16px_50px_rgba(40,55,70,0.05)] backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.22em] text-[#5BAEE6]">Tutorial 0{i + 1}</div>
            <h3 className="mt-3 text-2xl tracking-[-0.03em]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#1E7FBF]">{item.meta}</p>
            <p className="mt-4 text-sm leading-7 text-[#3A4653]">Guided walkthrough format for this topic, with implementation notes and visuals.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function NovelsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <div className="mb-10">
        <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">Novels</div>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Stories in the same atmosphere.</h2>
      </div>
      <div className="space-y-6 rounded-[30px] border border-[#1E2328]/8 bg-white/58 p-8 shadow-[0_18px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm">
        {['Rain over Silent Peaks', 'Letters Through Fog', 'The Last Teapot Sketch'].map((title, i) => (
          <article key={title} className="border-b border-[#1E2328]/6 pb-6 last:border-none last:pb-0">
            <div className="text-xs uppercase tracking-[0.22em] text-[#5BAEE6]">Novel 0{i + 1}</div>
            <h3 className="mt-3 text-2xl tracking-[-0.03em] text-[#1E2328]">{title}</h3>
            <p className="mt-3 text-base leading-8 text-[#3A4653]">A long-form fiction entry blending memory, landscape, and technology in a reflective voice.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <div className="rounded-[34px] border border-[#1E2328]/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(245,246,244,0.78))] p-8 shadow-[0_18px_70px_rgba(40,55,70,0.07)] backdrop-blur-sm md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">About</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">A quiet, technical landscape.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#3A4653]">
              This portfolio blends graphics, AI, systems thinking, and reflective writing. The website is conceived as an interactive shanshui scroll: rain as animation, mountains as structure, mist as spacing, and ink as typography.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#3A4653]">
              {['GitHub', 'Scholar', 'Resume', 'Email'].map((item) => (
                <span key={item} className="rounded-full border border-[#1E2328]/10 bg-white/60 px-4 py-2">{item}</span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(189,224,247,0.22),rgba(245,246,244,0.96))] p-6">
            <div className="absolute inset-x-8 top-8 h-24 rounded-full bg-white/40 blur-3xl" style={{ animation: 'fogFloat 9s ease-in-out infinite' }} />
            <div className="absolute bottom-0 left-[-5%] h-28 w-36 rounded-t-[100%] bg-[#BDE0F7]/70" />
            <div className="absolute bottom-0 left-[20%] h-44 w-32 rounded-t-[100%] bg-[#6FB8E5]/55" />
            <div className="absolute bottom-0 right-[18%] h-56 w-32 rounded-t-[100%] bg-[#2E7AB0]/58" />
            <svg viewBox="0 0 420 300" className="absolute inset-0 h-full w-full opacity-60">
              <path d="M310 48C338 88 368 111 404 130C364 139 333 165 319 203C295 165 270 146 221 132C260 117 293 92 310 48Z" fill="#1E2328" opacity="0.22" />
              <path d="M298 129C247 145 213 176 175 238" stroke="#1E2328" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.35" />
              <path d="M287 123C244 139 205 169 156 222" stroke="#1E7FBF" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.48" />
            </svg>
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="absolute top-0 w-px bg-[#4B97CD]/30"
                style={{ left: `${12 + i * 6}%`, height: '20px', animation: `rainFall ${1.7 + i * 0.14}s linear ${i * 0.16}s infinite` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : null;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <Link
        to="/projects"
        className="inline-block text-sm tracking-wide text-[#1E7FBF] transition-colors hover:text-[#0f5f96]"
      >
        ← Back to Projects
      </Link>
      <div className="mt-6 rounded-[30px] border border-[#1E2328]/8 bg-white/60 p-8 shadow-[0_18px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm md:p-10">
        <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">Project Detail</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#1E2328] md:text-5xl">{project.title}</h1>
        {project.meta && <p className="mt-3 text-sm text-[#1E7FBF]">{project.meta}</p>}
        {project.date && <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#3A4653]">{project.date}</p>}
        {project.summary && <p className="mt-6 text-base leading-8 text-[#3A4653]">{project.summary}</p>}

        <article className="mt-8 max-w-none">
          <ReactMarkdown components={markdownComponents}>{project.content}</ReactMarkdown>
        </article>
      </div>
    </section>
  );
}

function PortfolioLayout() {
  return (
    <div className="min-h-screen bg-[#EEF6FD] text-[#1E2328] overflow-hidden selection:bg-[#5BAEE6]/25">
      <style>{`
        @keyframes rainFall {
          0% { transform: translateY(-18vh); opacity: 0; }
          15% { opacity: 0.35; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
        @keyframes drift {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        @keyframes fogFloat {
          0%,100% { transform: translateX(0px); opacity: 0.32; }
          50% { transform: translateX(16px); opacity: 0.45; }
        }
        @keyframes ripple {
          0% { transform: scale(0.85); opacity: 0.0; }
          20% { opacity: 0.18; }
          100% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(164,214,245,0.45),_transparent_48%),linear-gradient(to_bottom,_rgba(255,255,255,0.5),_rgba(91,174,230,0.06),_rgba(238,246,253,1))]" />

        <div className="absolute inset-x-0 top-24 h-64 blur-3xl opacity-60" style={{ animation: 'fogFloat 9s ease-in-out infinite' }}>
          <div className="mx-auto h-full w-[82%] rounded-full bg-[#BDE0F7]/45" />
        </div>
        <div className="absolute inset-x-0 top-72 h-72 blur-3xl opacity-40" style={{ animation: 'fogFloat 13s ease-in-out infinite' }}>
          <div className="mx-auto h-full w-[72%] rounded-full bg-white/55" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[58vh] opacity-55 blur-[2px] bg-[linear-gradient(to_top,#BDE0F7_0%,rgba(189,224,247,0)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[46vh] opacity-70 blur-[1px] bg-[linear-gradient(to_top,#7EC3EC_0%,rgba(126,195,236,0)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[32vh] opacity-85 bg-[linear-gradient(to_top,rgba(59,143,199,0.55)_0%,rgba(59,143,199,0)_100%)]" />

        {Array.from({ length: 54 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 w-px rounded-full bg-[#4B97CD]/30"
            style={{
              left: `${(i * 97) % 100}%`,
              height: `${18 + (i % 5) * 10}px`,
              animation: `rainFall ${1.6 + (i % 6) * 0.3}s linear ${(i % 9) * 0.28}s infinite`,
            }}
          />
        ))}

        <div className="absolute bottom-12 left-[14%] h-14 w-14 rounded-full border border-[#5BAEE6]/20" style={{ animation: 'ripple 4s ease-out infinite' }} />
        <div className="absolute bottom-10 left-[15%] h-20 w-20 rounded-full border border-[#5BAEE6]/15" style={{ animation: 'ripple 4s ease-out 1.2s infinite' }} />
        <div className="absolute bottom-20 right-[20%] h-12 w-12 rounded-full border border-[#5BAEE6]/20" style={{ animation: 'ripple 3.8s ease-out 0.4s infinite' }} />
      </div>

      <header className="relative z-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
          <div className="text-sm tracking-[0.25em] text-[#3A4653] uppercase">Yixuan Liu</div>
          <div className="hidden gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="group relative text-sm text-[#3A4653] transition-colors hover:text-[#1E2328]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#1E7FBF] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/tech-blogs" element={<TechBlogsPage />} />
          <Route path="/graphics-tutorials" element={<GraphicsTutorialsPage />} />
          <Route path="/novels" element={<NovelsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function RainyMountainPortfolio() {
  return (
    <BrowserRouter>
      <PortfolioLayout />
    </BrowserRouter>
  );
}
