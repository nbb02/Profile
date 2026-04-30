import { useState } from "react"

const images = [
  {
    name: "Dashboard Overview",
    path: "/assets/projects/vitech/dashboard.png",
    description:
      "Main dashboard with sector filters, stacked bar charts, and summary panels",
  },
  {
    name: "Full Dashboard View",
    path: "/assets/projects/vitech/dashboard-full.png",
    description:
      "Complete dashboard with filters, alerts, and chart annotations",
  },
  {
    name: "Dual Series Dashboard",
    path: "/assets/projects/vitech/dashboard-2.png",
    description: "Focused comparison dashboard for 4PS vs SP sectors",
  },
  {
    name: "Dashboard Settings",
    path: "/assets/projects/vitech/dashboard-groupings.png",
    description: "Settings modal for panel configuration and toggles",
  },
  {
    name: "Export Dashboard",
    path: "/assets/projects/vitech/dashboard-export.png",
    description: "Printable dashboard with embedded charts and metadata",
  },
  {
    name: "Data Exploration",
    path: "/assets/projects/vitech/exploration-full.png",
    description: "Interactive map with popups and data table for exploration",
  },
  {
    name: "Members List",
    path: "/assets/projects/vitech/members-list.png",
    description:
      "Member management table with sorting and filtering capabilities",
  },
  {
    name: "QR Scanner",
    path: "/assets/projects/vitech/member-qr.png",
    description: "QR code scanner for member check-in with camera integration",
  },
  {
    name: "User Accounts",
    path: "/assets/projects/vitech/accounts.png",
    description: "Role-based user management with audit trails",
  },
  {
    name: "Sector Settings",
    path: "/assets/projects/vitech/settings-sectors.png",
    description: "Sector configuration with age limits and classifications",
  },
  {
    name: "Programs Management",
    path: "/assets/projects/vitech/settings-programs.png",
    description: "Program rules engine with threshold-based configurations",
  },
  {
    name: "Input Configurations",
    path: "/assets/projects/vitech/settings-inputs.png",
    description: "Dynamic input field configurations per sector",
  },
  {
    name: "Color Palette",
    path: "/assets/projects/vitech/settings-colors.png",
    description: "Customizable color schemes for dashboard theming",
  },
  {
    name: "Infrastructure Diagram",
    path: "/assets/projects/vitech/ViTech.drawio.png",
    description: "System architecture and deployment topology overview",
  },
]

function ImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <div>
      {/* Main Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group cursor-pointer rounded-lg overflow-hidden border border-slate-200/40 backdrop-blur-sm hover:border-indigo-300/40 transition-all duration-300 hover:shadow-lg"
            onClick={() => setSelectedIndex(idx)}
          >
            <div className="relative overflow-hidden bg-slate-50 h-64">
              {/* Blurred background image */}
              <img
                src={img.path}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
                aria-hidden="true"
              />
              {/* Main image */}
              <img
                src={img.path}
                alt={img.name}
                className="relative w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-3 w-full">
                  <p className="text-white text-sm font-medium">{img.name}</p>
                  <p className="text-slate-200 text-xs">{img.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-10 right-0 text-white hover:text-indigo-400 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <img
              src={images[selectedIndex].path}
              alt={images[selectedIndex].name}
              className="max-h-[80vh] w-auto object-contain rounded-lg"
            />

            {/* Info */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg font-semibold">
                {images[selectedIndex].name}
              </h3>
              <p className="text-slate-300 text-sm mt-1">
                {images[selectedIndex].description}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={() =>
                  setSelectedIndex(
                    selectedIndex === 0 ? images.length - 1 : selectedIndex - 1,
                  )
                }
                className="text-white hover:text-indigo-400 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="text-white text-sm">
                {selectedIndex + 1} / {images.length}
              </span>
              <button
                onClick={() =>
                  setSelectedIndex(
                    selectedIndex === images.length - 1 ? 0 : selectedIndex + 1,
                  )
                }
                className="text-white hover:text-indigo-400 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TechBadge({ tech }: { tech: string }) {
  const TECH_BADGES: Record<string, string> = {
    MySQL:
      "https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white",
    Laravel:
      "https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white",
    React:
      "https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black",
    "Material UI":
      "https://img.shields.io/badge/Material--UI-0081CB?logo=material-ui&logoColor=white",
    "Chart.js":
      "https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white",
    SCSS: "https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white",
    Hostinger:
      "https://img.shields.io/badge/Hostinger-6736C6?logo=hostinger&logoColor=white",
    DigitalOcean:
      "https://img.shields.io/badge/DigitalOcean-0080FF?logo=digitalocean&logoColor=white",
    CloudPanel:
      "https://img.shields.io/badge/CloudPanel-4A90E2?logo=cloud&logoColor=white",
    Docker:
      "https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white",
  }

  const badgeUrl = TECH_BADGES[tech] || null

  if (!badgeUrl) {
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

export default function ViTech() {
  const techStack = {
    backend: ["Laravel", "MySQL"],
    frontend: ["React", "Material UI", "Chart.js", "SCSS"],
    infrastructure: ["Hostinger", "DigitalOcean", "CloudPanel", "Docker"],
  }

  const keyFeatures = [
    {
      title: "Dynamic Dashboard Customization",
      description:
        "Highly configurable dashboards with sector toggles, settings modal, and user-defined color palettes for personalized data visualization.",
    },
    {
      title: "Interactive Data Exploration",
      description:
        "Map-based exploration with popups, sortable data tables, and real-time filtering for comprehensive population analysis.",
    },
    {
      title: "QR Scanner Integration",
      description:
        "Camera-based QR code scanning for member check-in with live webcam support and form integration.",
    },
    {
      title: "Role-Based Access Control",
      description:
        "Multi-level user management with role badges, audit trails, and granular permissions for secure administrative workflows.",
    },
    {
      title: "Advanced Reporting & Export",
      description:
        "Printable PDF reports, Excel/CSV exports, and chart-embedded documentation for comprehensive data dissemination.",
    },
    {
      title: "Programs & Rules Engine",
      description:
        "Threshold-based program configurations with dynamic rules for automated decision-making and eligibility determination.",
    },
  ]

  const bulletPoints = [
    "Developed a comprehensive population management system with dynamic dashboards, QR scanning, and advanced data visualization using Laravel, React, and MySQL.",
    "Implemented interactive data exploration with map integration, real-time filtering, and exportable reports for demographic analysis and administrative decision-making.",
    "Built role-based access control with audit trails and user management, ensuring secure multi-level administrative workflows.",
    "Created customizable dashboard theming with user-defined color palettes and configurable panel layouts for personalized user experiences.",
    "Integrated QR scanner functionality with camera permissions and form handling for efficient member check-in and data collection processes.",
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">
          ViTech Analytics Platform
        </h1>
        <p className="text-lg text-slate-700 max-w-3xl leading-relaxed">
          A comprehensive population management and analytics system featuring
          dynamic dashboards, QR scanner integration, interactive data
          exploration, and advanced reporting capabilities. Built as a capstone
          project demonstrating full-stack development with modern web
          technologies.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(techStack).map(([category, techs]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
                {category.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {techs.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="glass p-5 rounded-lg border border-slate-200/40 backdrop-blur-md hover:shadow-lg hover:border-indigo-300/40 transition-all duration-300"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Application Screenshots
        </h2>
        <p className="text-slate-700 mb-6">
          Click on any image to view full details
        </p>
        <ImageGallery />
      </div>

      {/* Highlights */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Resume Highlights</h2>
        <div className="space-y-3">
          {bulletPoints.map((point, idx) => (
            <div key={idx} className="flex gap-3 text-slate-700">
              <span className="text-indigo-600 flex-shrink-0 font-semibold">
                ✓
              </span>
              <span className="text-sm leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Journey footer */}
      <footer className="glass border border-slate-200/40 rounded-lg p-6 backdrop-blur-md">
        <h4 className="text-slate-900 font-semibold text-lg mb-3">
          Capstone Journey — 2024 🚀🎓
        </h4>
        <div className="text-sm text-slate-700 space-y-3">
          <p>
            Started around <strong>March 2024</strong>. I began with basic
            Node.js backend knowledge, then dove into <strong>Laravel</strong>{" "}
            and built ViTech alongside other school projects. It was an intense
            year of continuous development through vacations and holidays.
          </p>
          <p>
            The project went through multiple iterations and defenses (3-4
            times!) to meet requirements. I learned by digging through
            documentation, StackOverflow, and early AI assistants for code
            snippets.
          </p>
          <p>
            <strong>Technical highlights:</strong> Raw SCSS styling (no
            templates), Docker containerization for team collaboration, and
            deployment across multiple hosting providers (Hostinger,
            DigitalOcean).
          </p>
          <p>
            This capstone project represents a year of persistence, hands-on
            experimentation, and growth from basic concepts to a
            production-ready full-stack application.
          </p>
        </div>
      </footer>
    </div>
  )
}
