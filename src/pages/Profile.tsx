import * as SiIcons from "react-icons/si"
import type { IconType } from "react-icons"
import Rubiks from "../components/rubiks"
import Laptop from "../components/laptop"
import ProfessionalExperience from "../components/ProfessionalExperience"
import { FaLinkedin } from "react-icons/fa"
import { Link } from "react-router-dom"

type SkillItem = {
  id: string
  label: string
  img: string
}

type SkillCategory = {
  name: string
  items: SkillItem[]
}

const SKILL_CATEGORIES = [
  {
    name: "Frontend",
    items: [
      {
        id: "javascript",
        label: "JavaScript",
        img: "https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black",
      },
      {
        id: "react",
        label: "React",
        img: "https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black",
      },
      {
        id: "nextjs",
        label: "Next.js",
        img: "https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white",
      },
      {
        id: "css",
        label: "CSS3",
        img: "https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white",
      },
      {
        id: "scss",
        label: "SCSS",
        img: "https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white",
      },
      {
        id: "tailwind",
        label: "Tailwind",
        img: "https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white",
      },
      {
        id: "mui",
        label: "MUI",
        img: "https://img.shields.io/badge/MUI-0081CB?logo=mui&logoColor=white",
      },
      {
        id: "chartjs",
        label: "Chart.js",
        img: "https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white",
      },
    ],
  },
  {
    name: "Backend",
    items: [
      {
        id: "node",
        label: "Node.js",
        img: "https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white",
      },
      {
        id: "express",
        label: "Express",
        img: "https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white",
      },
      {
        id: "php",
        label: "PHP",
        img: "https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white",
      },
      {
        id: "laravel",
        label: "Laravel",
        img: "https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white",
      },
    ],
  },
  {
    name: "Databases & Caching",
    items: [
      {
        id: "mysql",
        label: "MySQL",
        img: "https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white",
      },
      {
        id: "postgres",
        label: "PostgreSQL",
        img: "https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white",
      },
      {
        id: "mongo",
        label: "MongoDB",
        img: "https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white",
      },
      {
        id: "redis",
        label: "Redis",
        img: "https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white",
      },
    ],
  },
  {
    name: "Realtime & Messaging",
    items: [
      {
        id: "websocket",
        label: "WebSocket",
        img: "https://img.shields.io/badge/WebSocket-010101?logo=socketdotio&logoColor=white",
      },
      {
        id: "bullmq",
        label: "BullMQ",
        img: "https://img.shields.io/badge/BullMQ-DC382D?logo=redis&logoColor=white",
      },
      {
        id: "firebase",
        label: "Firebase",
        img: "https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black",
      },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      {
        id: "aws",
        label: "AWS",
        img: "https://img.shields.io/badge/AWS-232F3E?logo=amazonaws&logoColor=white",
      },
      {
        id: "gcp",
        label: "GCP",
        img: "https://img.shields.io/badge/Google_Cloud-4285F4?logo=googlecloud&logoColor=white",
      },
      {
        id: "digitalocean",
        label: "DigitalOcean",
        img: "https://img.shields.io/badge/DigitalOcean-0080FF?logo=digitalocean&logoColor=white",
      },
      {
        id: "cloudflare",
        label: "Cloudflare",
        img: "https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white",
      },
    ],
  },
  {
    name: "Payments & Blockchain",
    items: [
      {
        id: "paymaya",
        label: "PayMaya",
        img: "https://img.shields.io/badge/PayMaya-00AEEF?logo=paymaya&logoColor=white",
      },
      {
        id: "paymongo",
        label: "PayMongo",
        img: "https://img.shields.io/badge/PayMongo-6F2CFF?logoColor=white",
      },
      {
        id: "polygon",
        label: "Polygon",
        img: "https://img.shields.io/badge/Polygon-8247E5?logo=polygon&logoColor=white",
      },
      {
        id: "metamask",
        label: "MetaMask",
        img: "https://img.shields.io/badge/MetaMask-F6851B?logo=metamask&logoColor=white",
      },
    ],
  },
]

const categories: SkillCategory[] = SKILL_CATEGORIES

function TechMarquee({ categories }: { categories: SkillCategory[] }) {
  const items = categories.flatMap((c) => c.items)
  const tripled = [...items, ...items, ...items]

  const ICON_NAME_BY_ID: Record<string, string> = {
    javascript: "SiJavascript",
    react: "SiReact",
    nextjs: "SiNextdotjs",
    css: "SiCss3",
    scss: "SiSass",
    tailwind: "SiTailwindcss",
    mui: "SiMaterialui",
    chartjs: "SiChartdotjs",
    node: "SiNodedotjs",
    express: "SiExpress",
    php: "SiPhp",
    laravel: "SiLaravel",
    mysql: "SiMysql",
    postgres: "SiPostgresql",
    mongo: "SiMongodb",
    redis: "SiRedis",
    websocket: "SiSocketdotio",
    firebase: "SiFirebase",
    aws: "SiAmazonaws",
    gcp: "SiGooglecloud",
    digitalocean: "SiDigitalocean",
    cloudflare: "SiCloudflare",
    polygon: "SiPolygon",
    metamask: "SiMetamask",
  }

  const renderItem = (it: SkillItem, i: number, size = 48) => {
    const iconName = ICON_NAME_BY_ID[it.id]
    const Comp = iconName
      ? ((SiIcons as Record<string, IconType>)[iconName] as IconType)
      : undefined
    if (Comp)
      return (
        <div key={it.id + "-" + i} className="tech-icon-pill" title={it.label}>
          <Comp size={size} />
        </div>
      )

    return (
      <div key={it.id + "-" + i} className="tech-icon-pill" title={it.label}>
        <img
          src={it.img}
          alt={it.label}
          style={{ width: size, height: size * 0.6, objectFit: "contain" }}
        />
      </div>
    )
  }

  return (
    <div className="w-full space-y-2 overflow-hidden">
      <style>{`
        .marquee{position:relative}
        .marquee-track{display:flex;gap:1rem;align-items:center;will-change:transform;width:max-content}
        @keyframes marqueeAnim{0%{transform:translateX(0)}100%{transform:translateX(-33.3333%)}}
        .marquee:hover .marquee-track{animation-play-state:paused}
      `}</style>

      {/* Row 1 -> */}
      <div className="marquee overflow-hidden">
        <div
          className="marquee-track"
          style={{ animation: `marqueeAnim 22s linear infinite` }}
        >
          {tripled.map((it, i) => renderItem(it, i, 56))}
        </div>
      </div>

      {/* Row 2 <- (reverse) */}
      {/* <div className="marquee overflow-hidden">
        <div
          className="marquee-track"
          style={{
            animation: `marqueeAnim 28s linear infinite`,
            animationDirection: "reverse",
          }}
        >
          {tripled.map((it, i) => renderItem(it, i + tripled.length, 48))}
        </div>
      </div> */}

      {/* Row 3 -> */}
      {/* <div className="marquee overflow-hidden">
        <div
          className="marquee-track"
          style={{ animation: `marqueeAnim 26s linear infinite` }}
        >
          {tripled.map((it, i) => renderItem(it, i + tripled.length * 2, 40))}
        </div>
      </div> */}
    </div>
  )
}

function Skills() {
  return (
    <div className="skills-root">
      {categories.map((cat) => (
        <div key={cat.name} className="skill-category surface-card mb-6 reveal">
          <h4 className="text-xl font-semibold tracking-tight text-slate-900">
            {cat.name}
          </h4>
          <div className="skill-list">
            <ul className="m-0 p-0 flex flex-wrap gap-2">
              {cat.items.map((it) => (
                <li key={it.id} className="skill-row">
                  <img
                    src={it.img}
                    alt={it.label}
                    style={{ objectFit: "contain" }}
                    className="min-h:[5em]"
                  />
                  {/* <span className="text-slate-700">{it.label}</span> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectsDetails() {
  return (
    <section className="surface-card reveal reveal-delay-2">
      <p className="section-kicker">Featured Work</p>
      <h2 className="section-title">Projects & Systems — Highlights</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="project-card">
            <h3 className="font-medium text-lg">
              Booking & Reservation Systems
            </h3>
            <p className="mt-2 text-slate-600 text-sm">
              End-to-end booking platforms with scheduling, availability
              management, role-based access, and transactional workflows.
            </p>
            <ul className="mt-3 list-disc list-inside text-sm text-slate-600">
              <li>Booking lifecycle management</li>
              <li>Admin & user dashboards</li>
              <li>Secure authentication and authorization</li>
              <li>Scalable REST APIs</li>
            </ul>
            <div className="mt-3 text-sm">
              <strong>Projects:</strong>
              <ul className="list-disc list-inside ml-5">
                <li>
                  <strong>arc</strong> — Places booking system
                </li>
                <li>
                  <strong>wrc</strong> — Events and social system
                </li>
              </ul>
            </div>
          </div>

          <div className="project-card">
            <h3 className="font-medium text-lg">
              Location-Based Real-Time Booking
            </h3>
            <p className="mt-2 text-slate-600 text-sm">
              Real-time, geo-aware booking systems for dispatching, tracking,
              and live updates using WebSockets, Redis, and Google Maps APIs.
            </p>
            <ul className="mt-3 list-disc list-inside text-sm text-slate-600">
              <li>Live location tracking & dispatch</li>
              <li>WebSocket-based real-time assignment</li>
              <li>Redis-backed performance optimizations</li>
              <li>BullMQ job queue management</li>
            </ul>
            <div className="mt-3 text-sm">
              <strong>Technologies:</strong> MySQL, Express.js, React, AWS,
              Redis, WebSocket, Cron, BullMQ, Google Maps APIs
            </div>
          </div>

          <div className="project-card">
            <h3 className="font-medium text-lg">
              Data Processing & Visualization
            </h3>
            <p className="mt-2 text-slate-600 text-sm">
              Systems for collecting, processing, and visualizing datasets for
              operational decision-making (dashboards, reports, POS analytics).
            </p>
            <div className="mt-3 text-sm">
              <strong>Notable:</strong>
              <ul className="list-disc list-inside ml-5">
                <li>POS and Inventory System — React + Firebase (Jan 2024)</li>
                <li>
                  Population Management System — Laravel + React (Jan 2024)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="project-card">
            <h3 className="font-medium text-lg">E-Commerce & Management</h3>
            <p className="mt-2 text-slate-600 text-sm">
              Full-stack e-commerce solutions and custom management systems with
              product flows, checkout, and payments.
            </p>
            <div className="mt-3 text-sm">
              <strong>Projects:</strong>
              <ul className="list-disc list-inside ml-5">
                <li>
                  <strong>rst</strong> — E-commerce platform
                </li>
                <li>4x Laravel e-commerce systems (Jan 2025)</li>
                <li>Multiple management systems (cra, pct, ia, pm)</li>
              </ul>
            </div>
          </div>

          <div className="project-card">
            <h3 className="font-medium text-lg">Social, Blockchain & Misc</h3>
            <p className="mt-2 text-slate-600 text-sm">
              Social modules, decentralized integrations, and tokenized
              transaction systems.
            </p>
            <ul className="mt-3 list-disc list-inside text-sm text-slate-600">
              <li>
                <strong>jm</strong> — Social system
              </li>
              <li>
                Exchange & Points System — Laravel + Node.js blockchain handler
                (MetaMask, Infura, Polygon)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Profile() {
  const TECH_GROUPS = [
    {
      title: "Frontend",
      badges: [
        "https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black",
        "https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black",
        "https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white",
        "https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white",
        "https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white",
        "https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white",
        "https://img.shields.io/badge/MUI-0081CB?logo=mui&logoColor=white",
        "https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white",
      ],
    },
    {
      title: "Backend & Data",
      badges: [
        "https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white",
        "https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white",
        "https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white",
        "https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white",
        "https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white",
        "https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white",
        "https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white",
        "https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white",
      ],
    },
    {
      title: "Realtime & Jobs",
      badges: [
        "https://img.shields.io/badge/WebSocket-010101?logo=socketdotio&logoColor=white",
        "https://img.shields.io/badge/BullMQ-DC382D?logo=redis&logoColor=white",
        "https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black",
        "https://img.shields.io/badge/Cron-4285F4?logo=clockify&logoColor=white",
      ],
    },
    {
      title: "Cloud & DevOps",
      badges: [
        "https://img.shields.io/badge/AWS-232F3E?logo=amazonaws&logoColor=white",
        "https://img.shields.io/badge/Google_Cloud-4285F4?logo=googlecloud&logoColor=white",
        "https://img.shields.io/badge/DigitalOcean-0080FF?logo=digitalocean&logoColor=white",
        "https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white",
        "https://img.shields.io/badge/Hostinger-6736C6?logo=hostinger&logoColor=white",
      ],
    },
    {
      title: "Geolocation & Payments",
      badges: [
        "https://img.shields.io/badge/Google_Maps-4285F4?logo=googlemaps&logoColor=white",
        "https://img.shields.io/badge/PayMaya-00AEEF?logo=paymaya&logoColor=white",
        "https://img.shields.io/badge/PayMongo-6B46C1?logo=paymongo&logoColor=white",
      ],
    },
    {
      title: "Blockchain",
      badges: [
        "https://img.shields.io/badge/MetaMask-F6851B?logo=metamask&logoColor=white",
        "https://img.shields.io/badge/Polygon-8247E5?logo=polygon&logoColor=white",
        "https://img.shields.io/badge/Infura-FF6B6B?logo=infura&logoColor=white",
      ],
    },
  ]

  return (
    <div className="app-shell min-h-screen antialiased">
      <Link
        to="/desktop"
        className="absolute right-1 top-1 p-2 border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-sky-700"
      >
        Desktop
      </Link>
      <div className="bg-grid" aria-hidden="true" />
      <div className="halo halo-1" aria-hidden="true" />
      <div className="halo halo-2" aria-hidden="true" />

      <header className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="hero-panel reveal">
          <p className="section-kicker">Portfolio</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            Hi there 👋, I&apos;m Nathaniel B. Berres
            <span className="hero-accent"> Software Engineer</span>
          </h1>
          <div className="mt-5 text-lg text-slate-600 max-w-4xl space-y-3 text-justify">
            <p>
              I&apos;m a Software Engineer passionate about building scalable,
              production-ready systems. I started my coding journey in August
              2022 and quickly moved from learning HTML to designing and
              delivering real-world location-based systems, booking platforms,
              and e-commerce backends.
            </p>
            <p>
              My background includes freelancing, internships, and full-time
              projects where I focused on reliability, observability, and
              pragmatic architectures. I enjoy end-to-end ownership — from
              designing APIs and job queues to building responsive frontends and
              live-tracking interfaces.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/nathaniel-berres-396397147"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-sky-700"
              title="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com/nbb02"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900"
              title="GitHub"
            >
              <SiIcons.SiGithub size={20} />
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-pill">
              <span className="stat-title">Experience</span>
              <span className="stat-value">Fullstack + Realtime</span>
            </div>
            <div className="stat-pill">
              <span className="stat-title">Core Focus</span>
              <span className="stat-value">Booking, APIs, Live Tracking</span>
            </div>
            <div className="stat-pill">
              <span className="stat-title">Primary Stack</span>
              <span className="stat-value">React, Node.js, Laravel, AWS</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-14 relative z-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="surface-card reveal reveal-delay-1">
            <p className="section-kicker">Core Tools</p>
            <h2 className="section-title">Tech Stack</h2>
            <p className="mt-2 text-slate-600">
              Key tools and technologies I use across frontend, backend,
              realtime, and cloud platforms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {TECH_GROUPS.map((group) => (
                <div key={group.title} className="tech-group">
                  <h4 className="font-medium text-slate-900">{group.title}</h4>
                  <div className="flex flex-wrap gap-2 mt-2 items-center">
                    {group.badges.map((badge) => (
                      <img
                        key={badge}
                        src={badge}
                        alt={group.title}
                        className="tech-badge"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2 h-full">
            <div className="h-full md:h-116">
              <Rubiks />
            </div>
          </div>
        </section>

        <div className="reveal reveal-delay-2 h-[40em]">
          <Laptop />
        </div>

        <div className="surface-card reveal reveal-delay-1">
          <TechMarquee categories={SKILL_CATEGORIES} />
        </div>

        <section className="surface-card reveal reveal-delay-2">
          <p className="section-kicker">Depth</p>
          <h2 className="section-title">Skills & Proficiency</h2>
          <div className="mt-5">
            <Skills />
          </div>
        </section>

        <div className="mt-6">
          <ProjectsDetails />
        </div>
      </main>

      <ProfessionalExperience />
    </div>
  )
}
