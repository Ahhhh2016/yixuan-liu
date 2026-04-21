export default function RainyMountainPortfolio() {
  const nav = ["Home", "Graphics Projects", "AI Projects", "Blogs", "About"];

  const graphics = [
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

  return (
    <div className="min-h-screen bg-[#F6F7F4] text-[#1E2328] overflow-hidden selection:bg-[#6E8FA7]/25">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(175,194,211,0.35),_transparent_48%),linear-gradient(to_bottom,_rgba(255,255,255,0.35),_rgba(62,95,120,0.04),_rgba(245,246,244,1))]" />

        <div className="absolute inset-x-0 top-24 h-64 blur-3xl opacity-60" style={{ animation: 'fogFloat 9s ease-in-out infinite' }}>
          <div className="mx-auto h-full w-[82%] rounded-full bg-[#AFC2D3]/35" />
        </div>
        <div className="absolute inset-x-0 top-72 h-72 blur-3xl opacity-40" style={{ animation: 'fogFloat 13s ease-in-out infinite' }}>
          <div className="mx-auto h-full w-[72%] rounded-full bg-white/55" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[58vh] opacity-55 blur-[2px] bg-[linear-gradient(to_top,#AFC2D3_0%,rgba(175,194,211,0)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[46vh] opacity-70 blur-[1px] bg-[linear-gradient(to_top,#7C96AB_0%,rgba(124,150,171,0)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[32vh] opacity-85 bg-[linear-gradient(to_top,#5E7790_0%,rgba(94,119,144,0)_100%)]" />

        {Array.from({ length: 54 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 w-px rounded-full bg-[#5C748B]/30"
            style={{
              left: `${(i * 97) % 100}%`,
              height: `${18 + (i % 5) * 10}px`,
              animation: `rainFall ${1.6 + (i % 6) * 0.3}s linear ${(i % 9) * 0.28}s infinite`,
            }}
          />
        ))}

        <div className="absolute bottom-12 left-[14%] h-14 w-14 rounded-full border border-[#6E8FA7]/20" style={{ animation: 'ripple 4s ease-out infinite' }} />
        <div className="absolute bottom-10 left-[15%] h-20 w-20 rounded-full border border-[#6E8FA7]/15" style={{ animation: 'ripple 4s ease-out 1.2s infinite' }} />
        <div className="absolute bottom-20 right-[20%] h-12 w-12 rounded-full border border-[#6E8FA7]/20" style={{ animation: 'ripple 3.8s ease-out 0.4s infinite' }} />
      </div>

      <header className="relative z-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
          <div className="text-sm tracking-[0.25em] text-[#3A4653] uppercase">Yixuan Liu</div>
          <div className="hidden gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative text-sm text-[#3A4653] transition-colors hover:text-[#1E2328]"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#3E5F78] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <section id="home" className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-6 pb-16 pt-8 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:pb-24 md:pt-14">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#3E5F78]/10 bg-white/45 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#6E8FA7]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[#3A4653]">Rain over Mountains</span>
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#1E2328] md:text-7xl">
              A portfolio where code falls like rain
              <span className="block text-[#3E5F78]">through ink-wash mountains.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#3A4653] md:text-lg">
              Computer graphics, AI, and reflective technical writing presented in a calm East-Asian visual language: mist, paper, mountains, water, and motion that feels like weather.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#graphics-projects" className="rounded-full bg-[#1E2328] px-6 py-3 text-sm text-[#F6F7F4] shadow-[0_12px_40px_rgba(30,35,40,0.12)] transition hover:-translate-y-0.5">
                Enter the mountains
              </a>
              <a href="#about" className="rounded-full border border-[#1E2328]/10 bg-white/50 px-6 py-3 text-sm text-[#1E2328] backdrop-blur-sm transition hover:bg-white/70">
                Read the artist statement
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center md:justify-end">
            <div className="relative w-full max-w-md rounded-[28px] border border-[#1E2328]/8 bg-white/42 p-5 shadow-[0_18px_60px_rgba(40,55,70,0.08)] backdrop-blur-md">
              <div className="rounded-[24px] border border-[#1E2328]/8 bg-[#F8F8F6]/80 p-6">
                <div className="text-xs uppercase tracking-[0.26em] text-[#6E8FA7]">Current Atmosphere</div>
                <div className="mt-5 space-y-4">
                  {[
                    ['Weather', 'Light rain / low mist'],
                    ['Focus', 'Graphics · AI · Writing'],
                    ['Mood', 'Quiet, precise, poetic'],
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
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span
                        key={i}
                        className="absolute top-0 w-px bg-[#5C748B]/35"
                        style={{ left: `${8 + i * 9}%`, height: '18px', animation: `rainFall ${1.8 + i * 0.1}s linear ${i * 0.18}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="graphics-projects" className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[#6E8FA7]">Graphics Projects</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Rendered like distant peaks.</h2>
            </div>
            <div className="hidden max-w-md text-sm leading-7 text-[#3A4653] md:block">
              Large visual cards, restrained text, and a gallery rhythm that lets images breathe like landscape scrolls.
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {graphics.map((item, i) => (
              <article key={item.title} className="group rounded-[28px] border border-[#1E2328]/8 bg-white/55 p-5 shadow-[0_20px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/72">
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
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <span
                      key={idx}
                      className="absolute top-0 w-px bg-[#5C748B]/30"
                      style={{ left: `${10 + idx * 11}%`, height: '22px', animation: `rainFall ${1.8 + idx * 0.22}s linear ${idx * 0.12}s infinite` }}
                    />
                  ))}
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-[#6E8FA7]">0{i + 1}</div>
                <h3 className="mt-3 text-2xl tracking-[-0.03em] text-[#1E2328]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#3E5F78]">{item.meta}</p>
                <p className="mt-4 text-sm leading-7 text-[#3A4653]">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="ai-projects" className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-10">
            <div className="text-xs uppercase tracking-[0.28em] text-[#6E8FA7]">AI-Related Projects</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Intelligence drifting through fog.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {ai.map((item) => (
              <article key={item.title} className="rounded-[28px] border border-[#1E2328]/8 bg-[#F9FAF8]/72 p-6 shadow-[0_16px_50px_rgba(40,55,70,0.05)] backdrop-blur-sm">
                <div className="mb-4 h-px w-14 bg-[#6E8FA7]/50" />
                <h3 className="text-2xl tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#3E5F78]">{item.meta}</p>
                <p className="mt-4 text-sm leading-7 text-[#3A4653]">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="blogs" className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[#6E8FA7]">Blogs</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Written on rain-washed paper.</h2>
            </div>
            <div className="rounded-[30px] border border-[#1E2328]/8 bg-white/58 p-8 shadow-[0_18px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm">
              <div className="space-y-6">
                {blogs.map((line, i) => (
                  <div key={line} className="border-b border-[#1E2328]/6 pb-6 last:border-none last:pb-0">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#6E8FA7]">Essay 0{i + 1}</div>
                    <p className="mt-3 max-w-2xl text-lg leading-9 text-[#3A4653]">{line}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="rounded-[34px] border border-[#1E2328]/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(245,246,244,0.78))] p-8 shadow-[0_18px_70px_rgba(40,55,70,0.07)] backdrop-blur-sm md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-[#6E8FA7]">About</div>
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
              <div className="relative min-h-[280px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(175,194,211,0.22),rgba(245,246,244,0.96))] p-6">
                <div className="absolute inset-x-8 top-8 h-24 rounded-full bg-white/40 blur-3xl" style={{ animation: 'fogFloat 9s ease-in-out infinite' }} />
                <div className="absolute bottom-0 left-[-5%] h-28 w-36 rounded-t-[100%] bg-[#AFC2D3]/70" />
                <div className="absolute bottom-0 left-[20%] h-44 w-32 rounded-t-[100%] bg-[#7B97B0]/55" />
                <div className="absolute bottom-0 right-[18%] h-56 w-32 rounded-t-[100%] bg-[#5F7890]/58" />
                <svg viewBox="0 0 420 300" className="absolute inset-0 h-full w-full opacity-60">
                  <path d="M310 48C338 88 368 111 404 130C364 139 333 165 319 203C295 165 270 146 221 132C260 117 293 92 310 48Z" fill="#1E2328" opacity="0.22" />
                  <path d="M298 129C247 145 213 176 175 238" stroke="#1E2328" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.35" />
                  <path d="M287 123C244 139 205 169 156 222" stroke="#3E5F78" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.48" />
                </svg>
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute top-0 w-px bg-[#5C748B]/30"
                    style={{ left: `${12 + i * 6}%`, height: '20px', animation: `rainFall ${1.7 + i * 0.14}s linear ${i * 0.16}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
