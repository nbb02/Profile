import { useState } from "react"
import type { ReactNode } from "react"
import ViTech from "../components/desktop/vitech"

type ProjectDef = {
  title: string
  code?: string
  role: "Backend" | "Fullstack" | "Tooling"
  description: string
  highlights?: string[]
  techs: string[]
}

type CategoryDef = {
  id: string
  title: string
  description: string
  icon?: string
  highlights?: string[]
  keyTechs: string[]
  projects: ProjectDef[]
}

// Tech badge mapping with shields.io URLs
const TECH_BADGES: Record<string, string> = {
  "Express.js":
    "https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white",
  MySQL: "https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white",
  Redis: "https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white",
  WebSocket:
    "https://img.shields.io/badge/WebSocket-010101?logo=socketdotio&logoColor=white",
  AWS: "https://img.shields.io/badge/AWS-232F3E?logo=amazonaws&logoColor=white",
  Prometheus:
    "https://img.shields.io/badge/Prometheus-E6522C?logo=prometheus&logoColor=white",
  Grafana:
    "https://img.shields.io/badge/Grafana-F2CC0C?logo=grafana&logoColor=black",
  BullMQ:
    "https://img.shields.io/badge/BullMQ-DC382D?logo=redis&logoColor=white",
  Docker:
    "https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white",
  "GitHub Actions":
    "https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=white",
  PayMongo:
    "https://img.shields.io/badge/PayMongo-6B46C1?logo=paymongo&logoColor=white",
  cPanel:
    "https://img.shields.io/badge/cPanel-FF6B35?logo=cpanel&logoColor=white",
  "AWS Lightsail":
    "https://img.shields.io/badge/AWS%20Lightsail-FF9900?logo=amazonaws&logoColor=white",
  Firebase:
    "https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black",
  React: "https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black",
  "Google Authentication":
    "https://img.shields.io/badge/Google-4285F4?logo=google&logoColor=white",
  Laravel:
    "https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white",
  "Next.js":
    "https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white",
  MongoDB:
    "https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white",
  Render:
    "https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white",
  Hostinger:
    "https://img.shields.io/badge/Hostinger-6736C6?logo=hostinger&logoColor=white",
  MetaMask:
    "https://img.shields.io/badge/MetaMask-F6851B?logo=metamask&logoColor=white",
  Infura:
    "https://img.shields.io/badge/Infura-FF6B6B?logo=infura&logoColor=white",
  Polygon:
    "https://img.shields.io/badge/Polygon-8247E5?logo=polygon&logoColor=white",
  Git: "https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white",
  GitHub:
    "https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white",
  WSL: "https://img.shields.io/badge/WSL-0A97F5?logo=windows&logoColor=white",
  VSCode:
    "https://img.shields.io/badge/VSCode-007ACC?logo=visualstudiocode&logoColor=white",
}

function TechBadge({ tech }: { tech: string }) {
  const badgeUrl = TECH_BADGES[tech] || null

  if (!badgeUrl) {
    // Fallback for techs without badges
    return (
      <span className="inline-flex items-center px-3 py-2 rounded-lg bg-slate-100/60 text-xs font-medium text-slate-700 border border-slate-200/60 backdrop-blur-sm hover:bg-slate-200/60 hover:shadow-md transition-all duration-300 cursor-default">
        {tech}
      </span>
    )
  }

  return (
    <img
      src={badgeUrl}
      alt={tech}
      className="h-7 hover:scale-110 hover:drop-shadow-lg transition-all duration-300 cursor-pointer"
      title={tech}
    />
  )
}

function ProjectCard({ p, onView }: { p: ProjectDef; onView?: () => void }) {
  return (
    <div className="project-card glass p-5 rounded-lg border border-slate-200/40 backdrop-blur-md hover:shadow-lg hover:border-indigo-300/40 transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">
              {p.title}
            </h3>
            {p.code && (
              <span className="text-xs font-mono bg-indigo-100/60 backdrop-blur-sm px-2 py-1 rounded text-slate-700 border border-indigo-200/40">
                {p.code}
              </span>
            )}
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap backdrop-blur-sm border ${
            p.role === "Fullstack"
              ? "bg-indigo-100/50 text-indigo-800 border-indigo-300/40"
              : p.role === "Backend"
                ? "bg-slate-100/50 text-slate-800 border-slate-300/40"
                : "bg-amber-100/50 text-amber-800 border-amber-300/40"
          }`}
        >
          {p.role}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-700">{p.description}</p>

      {p.highlights && p.highlights.length > 0 && (
        <div className="mt-4">
          <ul className="space-y-1.5 text-sm text-slate-700">
            {p.highlights.map((h, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-indigo-600 flex-shrink-0 font-semibold">
                  •
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-200/40">
        <div className="flex flex-wrap gap-2.5">
          {p.techs.map((t) => (
            <TechBadge key={t} tech={t} />
          ))}
        </div>
      </div>

      {/* Show a 'View details' button for the Population project */}
      {p.code === "population" && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => onView?.()}
            className="inline-flex items-center px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-semibold shadow hover:bg-indigo-700 transition-colors"
          >
            View details
          </button>
        </div>
      )}
    </div>
  )
}

function CategorySection({
  category,
  onView,
}: {
  category: CategoryDef
  onView?: (p: ProjectDef) => void
}) {
  return (
    <section className="space-y-5">
      {/* Category Header */}
      <div className="glass border border-slate-200/40 rounded-2xl p-8 backdrop-blur-md">
        <div className="border-l-4 border-indigo-500 pl-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {category.title}
          </h2>
          <p className="mt-2 text-base text-slate-700 max-w-3xl leading-relaxed">
            {category.description}
          </p>

          {category.highlights && category.highlights.length > 0 && (
            <div className="mt-5 space-y-2.5">
              {category.highlights.map((h, i) => (
                <div key={i} className="flex gap-3 text-sm text-slate-700">
                  <span className="text-teal-600 font-semibold flex-shrink-0">
                    ✓
                  </span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key Technologies */}
          <div className="mt-6 flex flex-wrap gap-3">
            {category.keyTechs.map((t) => (
              <TechBadge key={t} tech={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {category.projects.map((p) => (
          <ProjectCard
            key={`${category.id}-${p.title}`}
            p={p}
            onView={() => onView?.(p)}
          />
        ))}
      </div>
    </section>
  )
}

const CATEGORIES: CategoryDef[] = [
  {
    id: "real-time-booking",
    title: "Location-Based Real-Time Booking",
    description:
      "Real-time, geo-aware booking systems for dispatching, tracking, and live updates. These systems handle complex operational requirements with live location tracking, intelligent dispatch, and comprehensive monitoring.",
    highlights: [
      "Live location tracking & real-time dispatch",
      "WebSocket-based real-time assignment",
      "Redis-backed performance optimizations",
      "BullMQ job queue management",
      "Prometheus + Grafana monitoring & alerting",
    ],
    keyTechs: [
      "Express.js",
      "MySQL",
      "Redis",
      "WebSocket",
      "AWS",
      "Prometheus",
    ],
    projects: [
      {
        title: "Logistics Booking",
        code: "logistics",
        role: "Fullstack",
        description:
          "Production-grade real-time booking and dispatch platform with mobile integrations, live-tracking, and operational dashboards.",
        highlights: [
          "Mobile app integration and admin extension",
          "Live location tracking and real-time dispatching",
          "Deployment, CI/CD, and monitoring infrastructure",
          "Performance optimizations with Redis & BullMQ",
        ],
        techs: [
          "Express.js",
          "MySQL",
          "Redis",
          "BullMQ",
          "WebSocket",
          "Prometheus",
          "Grafana",
          "AWS",
          "Docker",
          "GitHub Actions",
        ],
      },
    ],
  },
  {
    id: "booking-systems",
    title: "Booking & Reservation Systems",
    description:
      "End-to-end booking platforms with scheduling, availability management, role-based access, and transactional workflows. Scalable systems designed for user and admin experiences.",
    highlights: [
      "Complete booking lifecycle management",
      "Admin & user dashboards",
      "Secure authentication and authorization",
      "Real-time updates and availability sync",
    ],
    keyTechs: ["Express.js", "MySQL", "WebSocket", "AWS Lightsail"],
    projects: [
      {
        title: "Places Booking",
        code: "arc",
        role: "Backend",
        description:
          "Venue and place booking platform with availability management, payments, and comprehensive admin workflows.",
        highlights: [
          "Complete backend API development",
          "Payment integration (PayMongo)",
          "Availability scheduling system",
        ],
        techs: ["Express.js", "MySQL", "PayMongo", "cPanel"],
      },
      {
        title: "Event Booking & Social System",
        code: "wrc",
        role: "Backend",
        description:
          "Event booking platform with lightweight social features, real-time assignment capabilities, and message flows.",
        highlights: [
          "Real-time event assignments",
          "Social interaction features",
          "Scalable message processing",
        ],
        techs: ["Express.js", "MySQL", "WebSocket", "AWS Lightsail"],
      },
    ],
  },
  {
    id: "data-processing",
    title: "Data Processing & Visualization",
    description:
      "Systems for collecting, processing, and visualizing datasets for operational decision-making. Includes dashboards, reports, inventory management, and POS analytics.",
    highlights: [
      "Real-time data aggregation and processing",
      "Interactive dashboards and analytics",
      "POS system with inventory tracking",
      "Firebase real-time synchronization",
    ],
    keyTechs: ["Firebase", "Laravel", "MySQL", "Analytics"],
    projects: [
      {
        title: "POS & Inventory System",
        code: "pos",
        role: "Fullstack",
        description:
          "Complete point-of-sale and inventory management system with Firebase-backed real-time features and Google authentication.",
        highlights: [
          "Real-time inventory tracking",
          "Point-of-sale transactions",
          "Firebase real-time database sync",
          "Google Sign-In authentication",
        ],
        techs: ["Firebase", "React", "Google Authentication"],
      },
      {
        title: "Population Management System",
        code: "population",
        role: "Fullstack",
        description:
          "Data processing and visualization system for population and demographic data management and analysis.",
        highlights: [
          "Data aggregation and processing",
          "Custom reporting tools",
          "Interactive visualizations",
        ],
        techs: ["Laravel", "React", "MySQL"],
      },
    ],
  },
  {
    id: "ecommerce-management",
    title: "E-Commerce & Management Systems",
    description:
      "Full-stack e-commerce solutions and custom management systems with product catalogs, checkout flows, payments, and administrative interfaces.",
    highlights: [
      "Complete product lifecycle management",
      "Custom admin dashboards and reporting",
    ],
    keyTechs: ["Next.js", "Laravel", "MongoDB", "MySQL"],
    projects: [
      {
        title: "E-Commerce System",
        role: "Fullstack",
        description:
          "Full-featured e-commerce platform with storefront and admin with serverless and managed hosting components.",
        highlights: [
          "Complete storefront implementation",
          "Admin dashboard for product management",
          "Serverless architecture components",
        ],
        techs: ["Next.js", "MongoDB", "Render"],
      },
      {
        title: "E-Commerce System 2 & 3",
        role: "Backend",
        description: "Full-featured e-commerce platform.",
        highlights: ["React frontend integrations"],
        techs: ["Laravel", "MySQL", "React", "Hostinger"],
      },
    ],
  },
  {
    id: "social-blockchain",
    title: "Social & Blockchain Systems",
    description:
      "Social modules, decentralized integrations, and tokenized transaction systems with blockchain interoperability.",
    highlights: [
      "MetaMask and Infura integration",
      "On-chain audit trails and transparency",
      "Polygon network integration",
      "Decentralized token exchanges",
    ],
    keyTechs: ["MetaMask", "Infura", "Polygon", "Express.js", "Laravel"],
    projects: [
      {
        title: "Social System",
        code: "jm",
        role: "Backend",
        description:
          "Social platform with user interactions, messaging, and community features.",
        highlights: [
          "User messaging and notifications",
          "Social graph and connections",
          "Activity feed and timelines",
        ],
        techs: ["Express.js", "MySQL", "AWS Lightsail"],
      },
      {
        title: "Points Exchange & Blockchain",
        code: "exchange",
        role: "Backend",
        description:
          "Tokenized points exchange system with blockchain integrations for deposits and withdrawals, enabling decentralized transactions.",
        highlights: [
          "MetaMask wallet integration",
          "Infura blockchain interaction",
          "On-chain transaction audit trails",
          "Polygon network support",
        ],
        techs: [
          "MetaMask",
          "Infura",
          "Polygon",
          "Laravel",
          "Express.js",
          "MySQL",
        ],
      },
    ],
  },
  {
    id: "dev-tools",
    title: "Development Tools & Infrastructure",
    description:
      "Developer tools, environment configurations, and DevOps practices used across all projects for efficient development and deployment.",
    keyTechs: ["Docker", "Git", "GitHub Actions", "WSL", "GitHub"],
    projects: [
      {
        title: "Development Environment Setup",
        role: "Tooling",
        description:
          "Comprehensive developer tools and workflow optimization using modern development practices and containerization.",
        highlights: [
          "Docker containerization and orchestration",
          "GitHub Actions CI/CD pipelines",
          "Version control management",
          "WSL development environment",
        ],
        techs: ["Git", "GitHub", "Docker", "GitHub Actions", "WSL", "VSCode"],
      },
    ],
  },
]

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)

  function openModalForProject(p: ProjectDef) {
    // currently only population maps to ViTech; extendable
    if (p.code === "population") {
      setModalContent(<ViTech />)
    } else {
      setModalContent(null)
    }
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setModalContent(null)
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Grid and Halos */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="halo halo-1" aria-hidden="true" />
      <div className="halo halo-2" aria-hidden="true" />

      {/* Background Gradient */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(
              circle at 15% 15%,
              rgba(245, 158, 11, 0.15),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 10%,
              rgba(13, 148, 136, 0.16),
              transparent 35%
            ),
            linear-gradient(120deg, #fffef9 0%, #f9f7f1 48%, #f3f7ff 100%)
          `,
          backgroundAttachment: "fixed",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-12">
        <button
          type="button"
          onClick={() => window.history.back()}
          aria-label="Go back"
          className="fixed left-6 top-6 w-10 h-10 rounded-lg glass flex items-center justify-center text-sm font-medium shadow-sm hover:scale-105 transition-transform"
        >
          ←
        </button>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-slate-900">
            Projects & Systems
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl font-medium">
            Featured work showcasing expertise across backend, fullstack, and
            DevOps domains
          </p>
        </div>

        <div className="space-y-16">
          {CATEGORIES.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onView={openModalForProject}
            />
          ))}

          {/* Top-level modal so it's not constrained by card overflow */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={closeModal}
              />
              <div className="relative z-10 w-[80vw] h-[80vh] overflow-auto bg-white rounded-lg shadow-lg p-4 box-border">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">
                    Population Management — Details
                  </h3>
                  <button
                    onClick={closeModal}
                    className="ml-4 inline-flex items-center px-3 py-1 rounded bg-slate-100 hover:bg-slate-200"
                  >
                    Close
                  </button>
                </div>
                <div className="vi-modal-content">{modalContent}</div>
              </div>
            </div>
          )}
        </div>

        {/* Floating "View more" button (bottom-right) */}
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
          aria-label="View more"
          className="fixed right-6 bottom-8 w-14 h-14 rounded-xl glass flex items-center justify-center text-sm font-semibold shadow-lg z-20 hover:scale-105 transition-transform"
        >
          More
        </button>
      </div>
    </div>
  )
}
