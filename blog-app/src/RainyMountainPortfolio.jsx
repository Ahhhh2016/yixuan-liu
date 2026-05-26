import { COMPUTER_ASCII } from './computerAscii.js';
import { NOTEBOOK_ASCII } from './notebookAscii.js';
import { UTAH_TEAPOT_ASCII } from './utahTeapotAscii.js';
import { SCROLL_ASCII } from './scrollAscii.js';
import { PHONOGRAPH_ASCII } from './phonographAscii.js';
import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { getProjectBySlug } from './projectContent.js';
import { getTutorialBySlug, tutorialDetails } from './tutorialContent.js';
import { getNovelBySlug, novelDetails } from './novelContent.js';
import { createComment, createProfile, getProfile, listComments } from './commentApi.js';
import { isSupabaseConfigured, supabase } from './supabaseClient.js';

/** Root-relative public URLs respect Vite `base` (e.g. GitHub Pages project sites). */
function publicAsset(path) {
  if (typeof path !== 'string') return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (!path.startsWith('/')) return path;
  const base = import.meta.env.BASE_URL;
  if (base === '/') return path;
  return `${base.replace(/\/$/, '')}${path}`;
}

const nav = [
  { label: 'Projects', path: '/projects' },
  { label: 'Tech blogs', path: '/tech-blogs' },
  { label: 'Graphics Tutorials', path: '/graphics-tutorials' },
  { label: 'Novels', path: '/novels' },
  { label: 'About', path: '/about' },
];

const graphics = [
    {
      title: "Monster Mash Reproduction",
      slug: "monster-mash",
      meta: "Sketch-based Modeling · ARAP · Deformation · Animation",
      desc: "A reproduction study of Google Research's Monster Mash workflow, from 2D sketch construction to layered deformation and interactive character animation.",
      cover: publicAsset('/images/projects/monster-mash/image-1.png'),
    },
    {
      title: "A Small Firework",
      slug: "a-small-firework",
      meta: "Three.js · Web Audio · GLSL · Particles · Procedural Art",
      desc: "Interactive particle fireworks and a shader-driven handheld sparkler in the browser, with synthesized launch, bloom, drift, scatter, and crackle sounds.",
      cover: publicAsset('/images/projects/a-small-firework.gif'),
    },
    {
      title: "Stippling Studio",
      slug: "stippling",
      meta: "NPR · Geometry Processing · Video Stylization · Reconstruction",
      desc: "A stippling-focused graphics project spanning weighted LBG, video stylization, multi-class stippling, color stippling, and learning-based reconstruction.",
      cover: publicAsset('/images/projects/stippling/cover.png'),
    },
    {
      title: "Luminary Studio",
      slug: "luminary",
      meta: "Realtime Graphics · OpenGL · Particles · Physics",
      desc: "A real-time Kongming lantern simulation with mesh rendering, particle flame effects, and atmospheric night-scene visuals.",
      cover: publicAsset('/images/projects/luminary/290371995-18363e4a-ea63-48aa-bbc0-dfb1ee8d89a2.png'),
    },
    {
      title: "Tea for Two - Flight Edition",
      slug: "teafortwoflightedition",
      meta: "Realtime Graphics · OpenGL · Stylized Rendering",
      desc: "A real-time first-person flight graphics final project featuring procedural terrain and water, shadow mapping, portal rendering, and stylized post-processing effects.",
      cover: publicAsset('/images/projects/tea-for-two-flight-edition-cover.png'),
    },
    {
      title: "Path Tracer",
      slug: "path-tracer",
      meta: "Rendering · BRDF · Global Illumination",
      desc: "An unbiased Monte Carlo path tracer that numerically solves the rendering equation to produce photorealistic images featuring soft shadows, color bleeding, caustics, and refraction.",
      cover: publicAsset('/images/projects/path-tracer/refraction.png'),
    },
    {
      title: "ARAP Mesh Deformation",
      slug: "arap",
      meta: "Geometry Processing · Sparse Solver · Interactive",
      desc: "As-Rigid-As-Possible surface modeling with cotangent Laplacians, SVD rotations, and a cached Cholesky solver — drag a vertex and watch the mesh respond like it has bones.",
      cover: publicAsset('/images/projects/arap/armadillo.gif'),
    },
    {
      title: "Half-Edge Mesh Toolkit",
      slug: "mesh",
      meta: "Geometry Processing · Half-Edge · Loop · QEM · Remesh",
      desc: "Atomic edge ops in amortized O(1), Loop subdivision, quadric-error simplification, isotropic remeshing, and bilateral denoising — all validated on a half-edge mesh with hashed lookups.",
      cover: publicAsset('/images/projects/mesh/simplify-cow.png'),
    },
    {
      title: "Real-Time FEM Soft-Body Simulation",
      slug: "sim-fem",
      meta: "Physics Simulation · FEM · Collision · OpenMP",
      desc: "Tetrahedral finite-element soft-body simulation with StVK elasticity, damping, collision handling, and interactive mouse-driven manipulation in real time.",
      cover: publicAsset('/images/projects/sim-fem/ezgif-4adbeb9cbe3097af.gif'),
    },
  ];

const ai = [
    {
      title: "MultiTranslator",
      meta: "DeepL · LibreTranslate · Web Speech API · Static + Serverless",
      desc: "A zero-dependency, single-file web translator: six languages via DeepL and LibreTranslate, optional Vercel proxy so API keys never ship to the client, and read-aloud through the browser’s Web Speech API. Open index.html locally or deploy to any static host.",
      href: "https://mt-translator.vercel.app/",
      repo: "https://github.com/Ahhhh2016/multi-translator",
      cover: publicAsset('/images/projects/multi-translator.jpg'),
    },
    {
      title: "DeskPet Seiko",
      meta: "Godot 4 · GDScript · Qwen API · macOS",
      desc: "An AI desktop pet: chat beside the pet with qwen-plus, study mode with a Pomodoro-style focus timer, idle sleep, drag to reposition, and settings for API keys and sound. Ships as a macOS .dmg (first launch may require “Open Anyway” in Gatekeeper).",
      repo: "https://github.com/Ahhhh2016/DeskPet-Seiko",
      cover: publicAsset('/images/projects/deskpet.jpg'),
    },
    {
      title: "WeekWise Training Plan",
      meta: "React · TypeScript · Vite · Express · GitHub AI",
      desc: "Chat with an AI fitness coach to generate a personalized 7-day training plan, edit slots inline, track daily completion, and print an A4-friendly layout. Bilingual UI (English / 中文).",
      href: "https://weekwise-trainingplan.vercel.app/",
      repo: "https://github.com/Ahhhh2016/weekwise-trainingplan",
      cover: publicAsset('/images/projects/weekplan.jpg'),
    },
    {
      title: "PomoKanban",
      meta: "Obsidian · TypeScript · Pomodoro · Kanban",
      desc: "A Pomodoro-enhanced Kanban plugin for Obsidian: markdown boards, integrated timers and stopwatch, automatic breaks and auto-rounds, per-card time logs, due dates, and estimates — install as “Pomodoro Kanban” from Community Plugins.",
      repo: "https://github.com/Ahhhh2016/pomokanban",
      cover: publicAsset('/images/projects/pomokanban.jpg'),
    },
    {
      title: "梦搭AI",
      meta: "Career · Web · AI Companion",
      desc: "A web companion for job search and career prep (Pony Resume). Browse and use the product online; source and collaboration live on GitHub.",
      href: "http://mengdaai.com/",
      repo: "https://github.com/xiyu97gogo/pony_resume",
      cover: publicAsset('/images/projects/mengdaai.jpg'),
    },
  ];

const techBlogPosts = [
    {
      title: '火山引擎GitHub CI + 对象存储 + CDN静态资源网站部署总结',
      date: 'Jan 26, 2026',
      dateTime: '2026-01-26',
      tags: ['DevOps', 'CDN', 'Volcano Engine'],
      summary: '哇 第一次接触带CDN的网站部署，好好玩。',
      href: 'https://blog.csdn.net/lyx_2016/article/details/157376921',
    },
    {
      title: '网站无法访问排查SOP',
      date: 'Jan 21, 2026',
      dateTime: '2026-01-21',
      tags: ['Networking', 'DNS', 'SOP'],
      summary:
        '从本机协议栈到 DNS 的分步排查：ping 127.0.0.1、本机 IP、网关、8.8.8.8、域名等，整理成可照着做的 SOP。',
      href: 'https://blog.csdn.net/lyx_2016/article/details/157189406',
    },
    {
      title: '尝试理清楚Github fork, tag, release和PR',
      date: 'Dec 25, 2025',
      dateTime: '2025-12-25',
      tags: ['GitHub', 'Obsidian', 'Open source'],
      summary:
        '以 Obsidian 插件上架为例，梳理 fork 与 clone、提 PR、tag/release 的含义，以及社区插件发布时要准备的文件。',
      href: 'https://blog.csdn.net/lyx_2016/article/details/156248736',
    },
    {
      title: '用Puppeteer实现PDF文档导出分页功能',
      date: 'Nov 13, 2025',
      dateTime: '2025-11-13',
      tags: ['React', 'Puppeteer', 'PDF'],
      summary:
        '从 react-pdf 的中文字体与分页问题，转到参考 magic-resume：抽取页面 HTML/CSS 由后端 Puppeteer 渲染导出 PDF。',
      href: 'https://blog.csdn.net/lyx_2016/article/details/154787139',
    },
  ];

const tutorials = tutorialDetails.length
  ? tutorialDetails
  : [
      {
        title: 'Path Tracer Tutorial',
        slug: 'path-tracer-tutorial',
        meta: 'Rendering · BRDF · Global Illumination',
        summary: 'Build a minimal but extensible path tracer from camera rays to indirect lighting.',
      },
      {
        title: 'Shading Basics Tutorial',
        slug: 'shading-basics',
        meta: 'Geometry · Shading · Simulation',
        summary: 'A practical walkthrough of core shading models and how to compare them visually.',
      },
      {
        title: 'Realtime WebGL Pipeline Tutorial',
        slug: 'realtime-webgl-pipeline',
        meta: 'Realtime Graphics · Web Visuals',
        summary: 'Organize a clean realtime rendering pipeline for browser-based graphics projects.',
      },
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
  computer: 1.00,
};

const verticalScaleTuning = {
  computer: 0.66,
  scroll: 0.66,
  teapot: 0.55,
};

const asciiCards = asciiCardsRaw.map((card) => {
  const lines = card.ascii.split('\n');
  const cols = Math.max(...lines.map((line) => line.length));
  const rows = lines.length;

  // Approximate monospace glyph ratio to keep all ASCII cards similarly sized.
  const fontSizePx = Math.max(3.2, Math.min(7.2, Math.min(600 / (cols * 0.82), 180 / (rows * 0.82))));

  const tunedFontSizePx = fontSizePx * (sizeTuning[card.key] ?? 1);
  const verticalScale = verticalScaleTuning[card.key] ?? 0.75;
  return { ...card, fontSizePx: tunedFontSizePx, verticalScale };
});

const markdownComponents = {
  h1: ({ children }) => <h1 className="mt-8 text-3xl font-semibold tracking-[-0.03em] text-[#1E2328] md:text-4xl">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-[#1E2328] md:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-6 text-xl font-semibold text-[#1E2328]">{children}</h3>,
  p: ({ children }) => <p className="mt-4 whitespace-pre-line text-base leading-8 text-[#3A4653]">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-[#3A4653]">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-[#3A4653]">{children}</ol>,
  li: ({ children }) => <li className="whitespace-pre-line leading-8">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-[#1E2328]">{children}</strong>,
  code: ({ className, children }) => {
    const isBlock = typeof className === 'string' && /\blanguage-/.test(className);
    if (isBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="rounded bg-[#E8F3FB] px-1 py-0.5 text-[0.92em] text-[#1E2328]">{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre className="mt-4 overflow-x-auto rounded-2xl bg-[#E8F3FB] p-4 text-sm leading-7 text-[#1E2328]">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-[#1E2328]/10">
      <table className="w-full border-collapse text-sm text-[#3A4653]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#E8F3FB] text-[#1E2328]">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-[#1E2328]/10">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children, style }) => (
    <th style={style} className="px-4 py-2 text-left font-semibold tracking-wide">{children}</th>
  ),
  td: ({ children, style }) => (
    <td style={style} className="px-4 py-2 align-top leading-7">{children}</td>
  ),
  img: ({ src, alt }) => {
    const widthMatch = typeof src === 'string' ? src.match(/[?&]w=(\d+)/) : null;
    const cleanSrc = widthMatch ? src.replace(/[?&]w=\d+/, '').replace(/\?$/, '') : src;
    const inlineStyle = widthMatch ? { maxWidth: `${widthMatch[1]}px` } : undefined;
    return (
      <figure className="mt-6">
        <img
          src={publicAsset(cleanSrc)}
          alt={alt || ''}
          loading="lazy"
          style={inlineStyle}
          className="mx-auto block w-full max-w-3xl rounded-2xl border border-[#1E2328]/10 object-contain shadow-[0_18px_60px_rgba(40,55,70,0.08)]"
        />
        {alt ? (
          <figcaption className="mt-2 text-center text-xs text-[#5A6772]">{alt}</figcaption>
        ) : null}
      </figure>
    );
  },
};

const novelMarkdownComponents = {
  ...markdownComponents,
  h1: ({ children }) => <h1 className="mt-10 text-3xl font-semibold text-[#1E2328] md:text-4xl">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-8 text-2xl font-semibold text-[#1E2328] md:text-3xl">{children}</h2>,
  p: ({ children }) => <p className="mt-5 whitespace-pre-line text-[17px] leading-9 text-[#283540] md:text-[18px]">{children}</p>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-[#1E7FBF]/35 bg-[#F4FAFE]/70 py-1 pl-5 text-[#3A4653]">
      {children}
    </blockquote>
  ),
  hr: () => <div className="my-10 h-px w-full bg-[#1E2328]/10" />,
};

const markdownPlugins = [remarkGfm, remarkMath];
const markdownRehypePlugins = [rehypeKatex, rehypeRaw, rehypeUnwrapImages];

function buildCommentTree(flatComments) {
  const byId = new Map();
  const roots = [];

  flatComments.forEach((item) => {
    byId.set(item.id, { ...item, replies: [] });
  });

  flatComments.forEach((item) => {
    const current = byId.get(item.id);
    if (item.parentId && byId.has(item.parentId)) {
      byId.get(item.parentId).replies.push(current);
    } else {
      roots.push(current);
    }
  });

  return roots;
}

function CommentsSection({ contentType, slug }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(() => isSupabaseConfigured);
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [pendingUsername, setPendingUsername] = useState('');
  const [message, setMessage] = useState('');
  const [activeReplyId, setActiveReplyId] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [error, setError] = useState('');
  const [hint, setHint] = useState('');

  async function refreshComments() {
    const rows = await listComments(contentType, slug);
    setComments(buildCommentTree(rows));
  }

  async function refreshProfile(userId) {
    const current = await getProfile(userId);
    setProfile(current);
  }

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return undefined;
    }

    let mounted = true;

    async function init() {
      setIsLoading(true);
      setError('');
      setHint('');
      setActiveReplyId('');
      setReplyMessage('');

      const [{ data: sessionData }, commentsResult] = await Promise.all([
        supabase.auth.getSession(),
        listComments(contentType, slug),
      ]);

      if (!mounted) {
        return;
      }

      setSession(sessionData.session);
      setComments(buildCommentTree(commentsResult));

      if (sessionData.session?.user?.id) {
        try {
          const current = await getProfile(sessionData.session.user.id);
          if (mounted) {
            setProfile(current);
            if (current?.username) {
              setPendingUsername(current.username);
            }
          }
        } catch (profileError) {
          if (mounted) {
            setError(profileError.message || '读取用户名失败，请稍后重试。');
          }
        }
      } else {
        setProfile(null);
      }

      if (mounted) {
        setIsLoading(false);
      }
    }

    init().catch((initError) => {
      if (mounted) {
        setError(initError.message || '初始化评论失败，请刷新重试。');
        setIsLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession?.user?.id) {
        setProfile(null);
        return;
      }
      refreshProfile(nextSession.user.id).catch((profileError) => {
        setError(profileError.message || '读取用户名失败，请稍后重试。');
      });
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [contentType, slug]);

  async function handleSendMagicLink(event) {
    event.preventDefault();
    const email = loginEmail.trim().toLowerCase();
    if (!email) {
      setError('请填写邮箱。');
      return;
    }

    setIsSendingLink(true);
    setError('');
    setHint('');
    try {
      const { error: sendError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.href },
      });
      if (sendError) {
        throw sendError;
      }
      setHint('登录链接已发送，请去邮箱点击链接完成登录。');
    } catch (sendError) {
      setError(sendError.message || '发送登录链接失败。');
    } finally {
      setIsSendingLink(false);
    }
  }

  async function handleCreateProfile(event) {
    event.preventDefault();
    if (!session?.user?.id) {
      return;
    }

    const username = pendingUsername.trim();
    if (!username) {
      setError('请先设置用户名。');
      return;
    }

    setIsCreatingProfile(true);
    setError('');
    try {
      const created = await createProfile(session.user.id, username);
      setProfile(created);
      setHint('用户名设置完成，可以发表评论了。');
    } catch (profileError) {
      if (profileError.code === '23505') {
        setError('该用户名已被占用，请换一个。');
      } else {
        setError(profileError.message || '保存用户名失败。');
      }
    } finally {
      setIsCreatingProfile(false);
    }
  }

  async function handleCreateComment(event, parentId = null) {
    event.preventDefault();
    if (!profile?.username) {
      setError('请先完成登录并设置用户名。');
      return;
    }

    const content = (parentId ? replyMessage : message).trim();
    if (!content) {
      setError(parentId ? '回复内容不能为空。' : '评论内容不能为空。');
      return;
    }

    setIsPosting(true);
    setError('');
    try {
      await createComment({
        contentType,
        contentSlug: slug,
        username: profile.username,
        message: content,
        parentId,
      });
      await refreshComments();
      if (parentId) {
        setReplyMessage('');
        setActiveReplyId('');
      } else {
        setMessage('');
      }
    } catch (postError) {
      setError(postError.message || '发表评论失败，请稍后重试。');
    } finally {
      setIsPosting(false);
    }
  }

  async function handleLogout() {
    if (!supabase) {
      return;
    }
    await supabase.auth.signOut();
    setHint('已退出登录。');
  }

  return (
    <section className="mt-10 rounded-[24px] border border-[#1E2328]/8 bg-white/65 p-6 shadow-[0_12px_40px_rgba(40,55,70,0.05)]">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#1E2328]">评论</h2>
      <p className="mt-2 text-sm text-[#3A4653]">支持评论与回复。登录后即可发布，用户名全站唯一。</p>

      {!isSupabaseConfigured && (
        <div className="mt-5 rounded-xl border border-[#e0b7b7] bg-[#fff3f3] px-4 py-3 text-sm text-[#9a3f3f]">
          未检测到 Supabase 配置，请先设置 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`。
        </div>
      )}

      {isSupabaseConfigured && !session && (
        <form onSubmit={handleSendMagicLink} className="mt-5 space-y-3 rounded-xl border border-[#1E2328]/10 bg-white/80 p-4">
          <div className="text-sm text-[#3A4653]">输入邮箱，系统会发送 Magic Link 登录链接。</div>
          <input
            type="email"
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-xl border border-[#1E2328]/10 bg-white px-4 py-2.5 text-sm text-[#1E2328] outline-none transition focus:border-[#1E7FBF]/45"
          />
          <button
            type="submit"
            disabled={isSendingLink}
            className="rounded-xl bg-[#1E7FBF] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17699e] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSendingLink ? '发送中...' : '发送登录链接'}
          </button>
        </form>
      )}

      {isSupabaseConfigured && session && !profile?.username && (
        <form onSubmit={handleCreateProfile} className="mt-5 space-y-3 rounded-xl border border-[#1E2328]/10 bg-white/80 p-4">
          <div className="text-sm text-[#3A4653]">首次登录请设置一个唯一用户名。</div>
          <input
            type="text"
            value={pendingUsername}
            onChange={(event) => setPendingUsername(event.target.value)}
            placeholder="唯一用户名"
            className="w-full rounded-xl border border-[#1E2328]/10 bg-white px-4 py-2.5 text-sm text-[#1E2328] outline-none transition focus:border-[#1E7FBF]/45"
          />
          <button
            type="submit"
            disabled={isCreatingProfile}
            className="rounded-xl bg-[#1E7FBF] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17699e] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isCreatingProfile ? '保存中...' : '保存用户名'}
          </button>
        </form>
      )}

      {isSupabaseConfigured && session && profile?.username && (
        <div className="mt-4 rounded-xl border border-[#1E2328]/10 bg-white/70 px-4 py-3 text-sm text-[#3A4653]">
          已登录：<span className="font-medium text-[#1E2328]">{profile.username}</span>
          <button type="button" onClick={handleLogout} className="ml-3 text-[#1E7FBF] hover:text-[#17699e]">
            退出
          </button>
        </div>
      )}

      {error && <div className="mt-3 text-sm text-[#b44343]">{error}</div>}
      {hint && <div className="mt-3 text-sm text-[#2d6a4f]">{hint}</div>}

      {isSupabaseConfigured && session && profile?.username && (
        <form onSubmit={(event) => handleCreateComment(event, null)} className="mt-5 space-y-3">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="写下你的评论..."
            rows={4}
            className="w-full rounded-xl border border-[#1E2328]/10 bg-white px-4 py-3 text-sm text-[#1E2328] outline-none transition focus:border-[#1E7FBF]/45"
          />
          <button
            type="submit"
            disabled={isPosting}
            className="rounded-xl bg-[#1E7FBF] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17699e] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPosting ? '发布中...' : '发布评论'}
          </button>
        </form>
      )}

      <div className="mt-7 space-y-3">
        {isLoading ? (
          <p className="text-sm text-[#3A4653]">评论加载中...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-[#3A4653]">还没有评论，来写第一条吧。</p>
        ) : (
          comments
            .slice()
            .reverse()
            .map((item) => (
              <article key={item.id} className="rounded-xl border border-[#1E2328]/8 bg-[#F8FCFF] p-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="font-medium text-[#1E2328]">{item.username}</span>
                  <span className="text-xs text-[#6f7e8d]">{new Date(item.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#3A4653]">{item.message}</p>
                {session && profile?.username && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveReplyId(item.id);
                      setReplyMessage('');
                    }}
                    className="mt-2 text-sm text-[#1E7FBF] transition hover:text-[#17699e]"
                  >
                    回复
                  </button>
                )}

                {item.replies.length > 0 && (
                  <div className="mt-3 space-y-2 border-l border-[#1E2328]/10 pl-3">
                    {item.replies.map((reply) => (
                      <div key={reply.id} className="rounded-lg bg-white/70 p-3">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                          <span className="font-medium text-[#1E2328]">{reply.username}</span>
                          <span className="text-xs text-[#6f7e8d]">{new Date(reply.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-[#3A4653]">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeReplyId === item.id && session && profile?.username && (
                  <form onSubmit={(event) => handleCreateComment(event, item.id)} className="mt-3 space-y-2 rounded-lg bg-white/60 p-3">
                    <textarea
                      value={replyMessage}
                      onChange={(event) => setReplyMessage(event.target.value)}
                      placeholder={`回复 @${item.username}`}
                      rows={3}
                      className="w-full rounded-lg border border-[#1E2328]/10 bg-white px-3 py-2 text-sm text-[#1E2328] outline-none transition focus:border-[#1E7FBF]/45"
                    />
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={isPosting}
                        className="rounded-lg bg-[#1E7FBF] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#17699e] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        发布回复
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveReplyId('');
                          setReplyMessage('');
                        }}
                        className="text-sm text-[#3A4653] transition hover:text-[#1E2328]"
                      >
                        取消
                      </button>
                    </div>
                  </form>
                )}
              </article>
            ))
        )}
      </div>
    </section>
  );
}

function HomePage() {
  const [isPlayingName, setIsPlayingName] = useState(false);

  const playNamePronunciation = () => {
    if (isPlayingName) return;
    setIsPlayingName(true);

    const fallbackToSpeech = () => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setIsPlayingName(false);
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance('Yixuan Liu');
        utter.lang = 'zh-CN';
        utter.rate = 0.95;
        utter.onend = () => setIsPlayingName(false);
        utter.onerror = () => setIsPlayingName(false);
        window.speechSynthesis.speak(utter);
      } catch {
        setIsPlayingName(false);
      }
    };

    try {
      const audio = new Audio(publicAsset('/name.m4a'));
      audio.onended = () => setIsPlayingName(false);
      audio.onerror = () => fallbackToSpeech();
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => fallbackToSpeech());
      }
    } catch {
      fallbackToSpeech();
    }
  };

  return (
    <section className="mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-center px-6 py-8 md:px-10 md:py-10">
      <div>
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#1E7FBF]/10 bg-white/45 px-4 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#5BAEE6]" />
          <span className="text-xs uppercase tracking-[0.24em] text-[#3A4653]">点击这里切换到中文</span>
        </div>
        <h1 className="w-full max-w-none text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#1E2328] md:text-6xl">
          Hi. Welcome.
          <span className="block text-[#1E7FBF]">
            I'm Yixuan Liu
            <button
              type="button"
              onClick={playNamePronunciation}
              aria-label="播放 Yixuan Liu 的发音"
              title="点击听名字发音"
              className={`ml-1.5 inline-flex h-5 w-5 -translate-y-2 items-center justify-center align-middle text-[#1E7FBF]/40 transition hover:text-[#1E7FBF] focus-visible:outline-none focus-visible:text-[#1E7FBF] md:h-6 md:w-6 ${isPlayingName ? 'animate-pulse text-[#1E7FBF]' : ''}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 md:h-4 md:w-4"
                aria-hidden="true"
              >
                <path d="M11 5L6 9H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </button>
            , a graphics-focused software engineer building real-time visual systems and AI-powered applications.
          </span>
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
                style={{ fontSize: `${card.fontSizePx}px`, transform: `scaleY(${card.verticalScale})` }}
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
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <Link
              to="/"
              className="inline-block text-xs uppercase tracking-[0.28em] text-[#5BAEE6] transition-colors hover:text-[#1E7FBF]"
            >
              ← Home
            </Link>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Graphics Projects</h2>
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
              <div
                className={`relative mb-5 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(189,224,247,0.32),rgba(245,246,244,0.95))] ${
                  item.cover ? 'aspect-square' : 'h-56'
                }`}
              >
                {item.cover ? (
                  <img
                    src={item.cover}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <>
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
                  </>
                )}
              </div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#5BAEE6]">0{i + 1}</div>
              <h3 className="mt-3 text-2xl tracking-[-0.03em] text-[#1E2328]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#1E7FBF]">{item.meta}</p>
              <p className="mt-4 text-sm leading-7 text-[#3A4653]">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">Apps & Plugins</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Shipped tools you can open today.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {ai.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-[#1E2328]/8 bg-[#F4FAFE]/72 p-6 shadow-[0_16px_50px_rgba(40,55,70,0.05)] backdrop-blur-sm">
              {item.cover ? (
                <div className="relative mb-5 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(189,224,247,0.32),rgba(245,246,244,0.95))] aspect-video">
                  <img
                    src={item.cover}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain object-top"
                  />
                </div>
              ) : null}
              <div className="mb-4 h-px w-14 bg-[#5BAEE6]/50" />
              <h3 className="text-2xl tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#1E7FBF]">{item.meta}</p>
              <p className="mt-4 text-sm leading-7 text-[#3A4653]">{item.desc}</p>
              {(item.href || item.repo) && (
                <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E7FBF] underline decoration-[#1E7FBF]/35 underline-offset-4 transition hover:text-[#155a8a]"
                    >
                      Live site
                    </a>
                  ) : null}
                  {item.repo ? (
                    <a
                      href={item.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E7FBF] underline decoration-[#1E7FBF]/35 underline-offset-4 transition hover:text-[#155a8a]"
                    >
                      GitHub README
                    </a>
                  ) : null}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function TechBlogsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
      <header className="border-b border-[#1E2328]/10 pb-10">
        <Link
          to="/"
          className="inline-block text-xs uppercase tracking-[0.28em] text-[#5BAEE6] transition-colors hover:text-[#1E7FBF]"
        >
          ← Home
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[#1E2328] md:text-4xl">Blogs</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#475569]">
          Engineering notes and write-ups; full posts are on CSDN (Chinese). Click a row to open in a new tab.
        </p>
      </header>

      <ol className="mt-0 list-none p-0">
        {techBlogPosts.map((item) => (
          <li key={item.href} className="border-b border-[#1E2328]/10 last:border-b-0">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-lg py-10 transition-colors hover:bg-[#1E2328]/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E7FBF]/35 focus-visible:ring-offset-2 sm:flex-row sm:gap-10 sm:px-3 sm:py-10"
            >
              <time
                dateTime={item.dateTime}
                className="shrink-0 font-[family-name:var(--font-mono)] text-[13px] font-medium tabular-nums tracking-tight text-[#64748B] sm:w-[7.5rem] sm:pt-1"
              >
                {item.date}
              </time>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-[1.125rem] font-semibold leading-snug tracking-tight text-[#0F172A] transition-colors group-hover:text-[#1E7FBF] md:text-xl">
                    {item.title}
                    <span className="ml-1 inline text-[#94A3B8] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                      ↗
                    </span>
                  </h2>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-[#1E2328]/10 bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[#64748B]">
                    CSDN
                  </span>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[#EEF6FC] px-2 py-0.5 text-[12px] font-medium text-[#1E7FBF]/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">{item.summary}</p>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function NovelsPage() {
  const firstNovel = novelDetails[0];
  const latestNovel = novelDetails[novelDetails.length - 1];
  const bookCover = firstNovel?.seriesCover || firstNovel?.cover;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <Link
        to="/"
        className="inline-block text-xs uppercase tracking-[0.28em] text-[#5BAEE6] transition-colors hover:text-[#1E7FBF]"
      >
        ← Home
      </Link>

      <div className="mt-6 mb-10 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">Novels</div>
      </div>

      {firstNovel ? (
        <div className="grid gap-6">
          <Link
            to="/novels/undefined-behavior"
            className="group grid gap-8 rounded-[28px] border border-[#1E2328]/8 bg-white/64 p-6 shadow-[0_22px_70px_rgba(40,55,70,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/82 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E7FBF]/45 md:grid-cols-[260px_minmax(0,1fr)] md:p-8"
          >
            <div className="relative overflow-hidden rounded-lg bg-[#111] shadow-[0_22px_56px_rgba(20,25,30,0.2)]">
              <img
                src={publicAsset(bookCover)}
                alt="Undefined Behavior / 未定义行为"
                loading="lazy"
                className="aspect-[1038/1515] h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center">
              <div className="text-xs uppercase tracking-[0.24em] text-[#5BAEE6]">Book</div>
              <h2 className="mt-3 text-3xl font-semibold text-[#1E2328] md:text-5xl">
                Undefined Behavior
                <span className="mt-1 block text-2xl md:text-4xl">未定义行为</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#3A4653]">
                一部技术悬疑单元剧。每集一个系统事故，每个 bug 背后都有一次没有被定义的决定。
              霍珀修别人修不了的东西，林爱达在每周三下午四点问她无法绕开的那个问题。第一季每周三 16:00（中国时间）更新。
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                <span className="rounded-md border border-[#1E2328]/10 bg-[#F8FAFC] px-3 py-1 text-[#3A4653]">
                  {novelDetails.length} episodes
                </span>
                {latestNovel ? (
                  <span className="rounded-md bg-[#EEF6FC] px-3 py-1 text-[#1E7FBF]">
                    Latest: {latestNovel.episode} · {latestNovel.title.replace(/^Ep\d+\s*/, '')}
                  </span>
                ) : null}
              </div>
              <div className="mt-7 inline-flex items-center text-sm font-medium text-[#1E7FBF]">
                Open book
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="rounded-[24px] border border-[#1E2328]/8 bg-white/58 p-8 shadow-[0_18px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm">
          <p className="text-center text-lg leading-8 text-[#3A4653] md:text-xl">to be published</p>
        </div>
      )}
    </section>
  );
}

const socialLinks = [
  {
    label: 'Email',
    href: 'yixuan_liu1@brown.edu',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <rect x="3" y="5" width="18" height="14" rx="2.4" />
        <path d="M3.5 7.2l8.5 5.6 8.5-5.6" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Ahhhh2016',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.005-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.652.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yixuan-liu1/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Bilibili',
    href: 'https://space.bilibili.com/13940022',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.751h1.166L5.775 4.855a1.25 1.25 0 1 1 1.767-1.768l2.652 2.652c.079.078.145.165.198.257h3.213c.053-.092.12-.179.198-.257l2.652-2.652a1.25 1.25 0 0 1 1.768 0zM18.25 8.496H5.75c-.69 0-1.25.56-1.25 1.25v7.5c0 .691.56 1.252 1.25 1.252h12.5c.69 0 1.25-.56 1.25-1.25v-7.5c0-.69-.56-1.25-1.25-1.25zM8.5 11a1.25 1.25 0 0 1 1.25 1.25v1.5a1.25 1.25 0 1 1-2.5 0v-1.5C7.25 11.56 7.81 11 8.5 11zm7 0a1.25 1.25 0 0 1 1.25 1.25v1.5a1.25 1.25 0 1 1-2.5 0v-1.5c0-.69.56-1.25 1.25-1.25z" />
      </svg>
    ),
  },
  {
    label: '小红书',
    href: 'https://www.rednote.com/user/profile/5f81eb15000000000101d1c2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <rect x="2.5" y="2.5" width="19" height="19" rx="4.2" stroke="currentColor" strokeWidth="1.6" />
        <text
          x="12"
          y="13"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          fontSize="7.2"
          fontWeight="700"
          fontFamily="'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
        >
          小红书
        </text>
      </svg>
    ),
  },
];

function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <div className="rounded-[34px] border border-[#1E2328]/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(245,246,244,0.78))] p-8 shadow-[0_18px_70px_rgba(40,55,70,0.07)] backdrop-blur-sm md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">About</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Yixuan Liu</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#3A4653]">
              I am a computer science master student at Brown University, focusing on visual computing. I received my BS in computer science from Southwest Jiaotong University and University of Leeds.
            </p>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-[#1E2328]">
              I am actively looking for full-time opportunities starting in winter 2026!
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={item.label}
                  title={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1E2328]/10 bg-white/60 text-[#3A4653] transition duration-300 hover:-translate-y-0.5 hover:border-[#1E7FBF]/35 hover:bg-white/90 hover:text-[#1E7FBF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E7FBF]/40"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(189,224,247,0.22),rgba(245,246,244,0.96))]">
            <img
              src={publicAsset('/about.jpg')}
              alt="Yixuan in front of a lake and mountains"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(238,246,253,0.12)_0%,rgba(238,246,253,0)_45%,rgba(40,55,70,0.18)_100%)]" />
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="pointer-events-none absolute top-0 w-px bg-white/50"
                style={{ left: `${8 + i * 7}%`, height: '22px', animation: `rainFall ${1.7 + i * 0.14}s linear ${i * 0.16}s infinite` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NovelDetailPage() {
  const { slug } = useParams();
  const novel = slug ? getNovelBySlug(slug) : null;
  const currentIndex = novel ? novelDetails.findIndex((item) => item.slug === novel.slug) : -1;

  if (!novel) {
    return <Navigate to="/novels" replace />;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <Link
        to="/novels"
        className="inline-block text-sm tracking-wide text-[#1E7FBF] transition-colors hover:text-[#0f5f96]"
      >
        ← Back to Novels
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="overflow-hidden rounded-lg bg-[#111] shadow-[0_18px_56px_rgba(20,25,30,0.2)]">
            <img
              src={publicAsset(novel.cover || novel.seriesCover)}
              alt={novel.title}
              loading="eager"
              className="aspect-[2/3] w-full object-cover"
            />
          </div>
          <div className="mt-4 rounded-[18px] border border-[#1E2328]/8 bg-white/62 p-4 text-sm leading-7 text-[#3A4653] shadow-[0_12px_36px_rgba(40,55,70,0.05)] backdrop-blur-sm">
            <div className="font-medium text-[#1E2328]">{novel.series}</div>
            {novel.episode ? <div className="mt-1 text-[#1E7FBF]">{novel.episode}</div> : null}
            {novel.date ? <time className="mt-1 block text-xs uppercase tracking-[0.18em] text-[#64748B]">{novel.date}</time> : null}
          </div>
          <nav className="mt-4 rounded-[18px] border border-[#1E2328]/8 bg-white/62 p-3 shadow-[0_12px_36px_rgba(40,55,70,0.05)] backdrop-blur-sm" aria-label="Episode list">
            <div className="px-2 pb-2 text-xs uppercase tracking-[0.22em] text-[#5BAEE6]">Episodes</div>
            <div className="space-y-1">
              {novelDetails.map((episode) => {
                const isCurrentEpisode = episode.slug === novel.slug;
                return (
                  <Link
                    key={episode.slug}
                    to={`/novels/${episode.slug}`}
                    className={`block rounded-xl px-3 py-2.5 transition-colors ${
                      isCurrentEpisode
                        ? 'bg-[#E8F3FB] text-[#1E7FBF]'
                        : 'text-[#3A4653] hover:bg-white/72 hover:text-[#1E7FBF]'
                    }`}
                  >
                    <span className="block text-xs font-medium uppercase tracking-[0.16em]">{episode.episode}</span>
                    <span className="mt-1 block text-sm leading-5 text-[#1E2328]">{episode.title.replace(/^Ep\d+\s*/, '')}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>

        <article className="min-w-0 rounded-[24px] border border-[#1E2328]/8 bg-white/72 p-6 shadow-[0_18px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm md:p-9">
          <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">Novel</div>
          <h1 className="mt-3 text-3xl font-semibold text-[#1E2328] md:text-5xl">{novel.title}</h1>
          {novel.meta ? <p className="mt-3 text-sm text-[#1E7FBF]">{novel.meta}</p> : null}
          {novel.summary ? <p className="mt-6 text-base leading-8 text-[#3A4653]">{novel.summary}</p> : null}

          <div className="mt-8 border-t border-[#1E2328]/10 pt-8">
            <ReactMarkdown
              remarkPlugins={markdownPlugins}
              rehypePlugins={markdownRehypePlugins}
              components={novelMarkdownComponents}
            >
              {novel.content}
            </ReactMarkdown>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[#1E2328]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {currentIndex > 0 ? (
              <Link
                to={`/novels/${novelDetails[currentIndex - 1].slug}`}
                className="text-sm font-medium text-[#1E7FBF] transition hover:text-[#0f5f96]"
              >
                ← Previous: {novelDetails[currentIndex - 1].episode}
              </Link>
            ) : <span />}
            {currentIndex >= 0 && currentIndex < novelDetails.length - 1 ? (
              <Link
                to={`/novels/${novelDetails[currentIndex + 1].slug}`}
                className="text-sm font-medium text-[#1E7FBF] transition hover:text-[#0f5f96]"
              >
                Next: {novelDetails[currentIndex + 1].episode} →
              </Link>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}

function NovelBookPage() {
  const firstNovel = novelDetails[0];

  if (!firstNovel) {
    return <Navigate to="/novels" replace />;
  }

  return <Navigate to={`/novels/${firstNovel.slug}`} replace />;
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
          <ReactMarkdown remarkPlugins={markdownPlugins} rehypePlugins={markdownRehypePlugins} components={markdownComponents}>{project.content}</ReactMarkdown>
        </article>
        <CommentsSection key={`project-${project.slug}`} contentType="project" slug={project.slug} />
      </div>
    </section>
  );
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractToc(content) {
  return content
    .split('\n')
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const title = line.replace(/^##\s+/, '').trim();
      return { title, id: slugifyHeading(title) };
    });
}

function flattenMarkdownText(children) {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(flattenMarkdownText).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return flattenMarkdownText(children.props.children);
  }
  return '';
}

function GraphicsTutorialDetailPage() {
  const { slug } = useParams();
  const tutorial = slug ? getTutorialBySlug(slug) : null;
  const toc = useMemo(() => (tutorial ? extractToc(tutorial.content) : []), [tutorial]);
  const [activeSectionId, setActiveSectionId] = useState('');
  const highlightedSectionId = activeSectionId || toc[0]?.id || '';

  useEffect(() => {
    if (!toc.length) {
      return undefined;
    }

    const observed = toc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!observed.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 1] }
    );

    observed.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [toc, slug]);

  if (!tutorial) {
    return <Navigate to="/graphics-tutorials" replace />;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <Link
        to="/"
        className="inline-block text-xs uppercase tracking-[0.28em] text-[#5BAEE6] transition-colors hover:text-[#1E7FBF]"
      >
        ← Home
      </Link>
      <div className="mt-6 grid gap-8 rounded-[30px] border border-[#1E2328]/8 bg-white/60 p-6 shadow-[0_18px_60px_rgba(40,55,70,0.06)] backdrop-blur-sm md:grid-cols-[260px_minmax(0,1fr)] md:p-8">
        <aside className="md:sticky md:top-8 md:self-start">
          <div className="text-xs uppercase tracking-[0.24em] text-[#5BAEE6]">教程目录</div>
          <nav className="mt-4 space-y-2">
            {tutorials.map((entry) => {
              const isCurrentArticle = entry.slug === tutorial.slug;
              return (
                <div key={entry.slug} className="rounded-lg">
                  <Link
                    to={`/graphics-tutorials/${entry.slug}`}
                    className={`block rounded-lg px-2 py-1 text-sm leading-6 transition-colors ${
                      isCurrentArticle ? 'bg-[#E8F3FB] font-medium text-[#1E7FBF]' : 'text-[#3A4653] hover:text-[#1E7FBF]'
                    }`}
                  >
                    {entry.title}
                  </Link>

                  {isCurrentArticle && (
                    <div className="mt-1 ml-3 border-l border-[#1E7FBF]/20 pl-3">
                      {toc.map((item) => {
                        const isActiveSection = item.id === highlightedSectionId;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={() => setActiveSectionId(item.id)}
                            className={`block rounded px-2 py-1 text-sm leading-6 transition-colors ${
                              isActiveSection ? 'bg-[#E8F3FB] text-[#1E7FBF]' : 'text-[#3A4653] hover:text-[#1E7FBF]'
                            }`}
                          >
                            {item.title}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        <article className="min-w-0">
          <div className="text-xs uppercase tracking-[0.28em] text-[#5BAEE6]">Graphics Tutorial</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#1E2328] md:text-5xl">{tutorial.title}</h1>
          {tutorial.meta && <p className="mt-3 text-sm text-[#1E7FBF]">{tutorial.meta}</p>}
          {tutorial.date && <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#3A4653]">{tutorial.date}</p>}
          {tutorial.summary && <p className="mt-6 text-base leading-8 text-[#3A4653]">{tutorial.summary}</p>}

          <div className="mt-8">
            <ReactMarkdown
              remarkPlugins={markdownPlugins}
              rehypePlugins={markdownRehypePlugins}
              components={{
                ...markdownComponents,
                h2: ({ children }) => {
                  const headingText = flattenMarkdownText(children);
                  const id = slugifyHeading(headingText);
                  return (
                    <h2 id={id} className="mt-8 scroll-mt-24 text-2xl font-semibold tracking-[-0.02em] text-[#1E2328] md:text-3xl">
                      {children}
                    </h2>
                  );
                },
              }}
            >
              {tutorial.content}
            </ReactMarkdown>
          </div>
          <CommentsSection key={`tutorial-${tutorial.slug}`} contentType="tutorial" slug={tutorial.slug} />
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
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-sm tracking-[0.25em] text-[#3A4653] uppercase transition-colors hover:text-[#1E2328]"
            aria-label="Yixuan Liu — home"
          >
            <img
              src={publicAsset('/favicon.svg')}
              alt=""
              aria-hidden="true"
              className="h-7 w-7 shrink-0 rounded-[6px] shadow-sm"
            />
            <span>Yixuan Liu</span>
          </Link>
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
          <Route
            path="/graphics-tutorials"
            element={<Navigate to={`/graphics-tutorials/${tutorials[0].slug}`} replace />}
          />
          <Route path="/graphics-tutorials/:slug" element={<GraphicsTutorialDetailPage />} />
          <Route path="/novels" element={<NovelsPage />} />
          <Route path="/novels/undefined-behavior" element={<NovelBookPage />} />
          <Route path="/novels/:slug" element={<NovelDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function RainyMountainPortfolio() {
  const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <BrowserRouter basename={routerBasename || undefined}>
      <PortfolioLayout />
    </BrowserRouter>
  );
}
