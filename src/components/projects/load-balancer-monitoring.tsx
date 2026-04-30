import { useState } from "react"

const images = [
  {
    name: "Load Balancer Visualizer",
    path: "/assets/projects/load-balancer-monitoring/Load Balancer Visualizer.png",
    description:
      "NGINX load balancing distribution across multiple backend instances",
  },
  {
    name: "HTTP Monitoring",
    path: "/assets/projects/load-balancer-monitoring/HTTP Monitoring.png",
    description:
      "Prometheus metrics dashboard showing request rates and latency",
  },
  {
    name: "Docker Monitoring",
    path: "/assets/projects/load-balancer-monitoring/Docker Monitoring.png",
    description: "cAdvisor container resource usage and performance metrics",
  },
  {
    name: "Docker Desktop",
    path: "/assets/projects/load-balancer-monitoring/Docker Desktop.png",
    description: "Multi-service Docker Compose stack architecture",
  },
  {
    name: "Postgresql Exporter",
    path: "/assets/projects/load-balancer-monitoring/Postgresql Exporter.png",
    description: "PostgreSQL database health and performance telemetry",
  },
  {
    name: "Redis Exporter",
    path: "/assets/projects/load-balancer-monitoring/Redis Exporter.png",
    description: "Redis cache metrics and operation tracking",
  },
  {
    name: "Node Exporter",
    path: "/assets/projects/load-balancer-monitoring/Node Exporter.png",
    description: "Host-level resource utilization and system metrics",
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
    "Node.js":
      "https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white",
    Express:
      "https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white",
    "Socket.IO":
      "https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white",
    JWT: "https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white",
    PostgreSQL:
      "https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white",
    Redis:
      "https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white",
    NGINX:
      "https://img.shields.io/badge/NGINX-009639?logo=nginx&logoColor=white",
    Docker:
      "https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white",
    Prometheus:
      "https://img.shields.io/badge/Prometheus-E6522C?logo=prometheus&logoColor=white",
    Grafana:
      "https://img.shields.io/badge/Grafana-F2CC0C?logo=grafana&logoColor=black",
    Loki: "https://img.shields.io/badge/Loki-F2CC0C?logo=grafana&logoColor=black",
    Promtail:
      "https://img.shields.io/badge/Promtail-E6522C?logo=prometheus&logoColor=white",
    cAdvisor:
      "https://img.shields.io/badge/cAdvisor-4285F4?logo=google&logoColor=white",
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

export default function LoadBalancerMonitoring() {
  const techStack = {
    backend: ["Node.js", "Express", "Socket.IO", "JWT"],
    datastores: ["PostgreSQL", "Redis"],
    infrastructure: ["NGINX", "Docker"],
    observability: ["Prometheus", "Grafana", "Loki", "Promtail", "cAdvisor"],
  }

  const keyFeatures = [
    {
      title: "Multi-Instance Load Balancing",
      description:
        "Three backend instances routed through NGINX with instance-level response headers for visibility and request distribution.",
    },
    {
      title: "Real-Time Socket.IO",
      description:
        "Cross-instance event propagation using Socket.IO with Redis adapter for seamless distributed communication.",
    },
    {
      title: "JWT Authentication",
      description:
        "Protected endpoints with JWT-based authentication flow for secure API access.",
    },
    {
      title: "Resilience Testing",
      description:
        "Toggleable failure mode simulation to test system behavior and monitor resilience signals.",
    },
    {
      title: "Centralized Observability",
      description:
        "Full observability stack with application metrics, service exporters, infrastructure monitoring, and structured logging.",
    },
    {
      title: "Production-Ready Architecture",
      description:
        "Stateless replicas, separation of concerns, externalized configuration, and persistent volumes.",
    },
  ]

  const bulletPoints = [
    "Designed and implemented a Dockerized multi-instance backend architecture behind NGINX with JWT-protected APIs and Socket.IO realtime messaging.",
    "Built a full observability stack (Prometheus, Grafana, Loki, Promtail) with app-level instrumentation and service exporters for PostgreSQL/Redis.",
    "Added structured logging and performance/error metrics (latency histograms, request counters, in-flight tracking) to support production-style troubleshooting.",
    "Implemented resilience testing via toggleable failure mode and validated behavior through centralized dashboards and logs.",
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">
          Load Balancer + Observability Platform
        </h1>
        <p className="text-lg text-slate-700 max-w-3xl leading-relaxed">
          A containerized, multi-instance backend system demonstrating
          distributed architecture patterns, production-grade observability, and
          failure resilience testing. The project showcases both core
          distributed-system behavior and comprehensive monitoring/logging
          implementation.
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
          Monitoring & Dashboards
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

      {/* Architecture Highlights */}
      <div className="glass border border-slate-200/40 rounded-lg p-6 backdrop-blur-md">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Architecture Highlights
        </h2>
        <ul className="space-y-3 text-sm text-slate-700">
          <li className="flex gap-3">
            <span className="text-indigo-600 font-semibold flex-shrink-0">
              •
            </span>
            <span>
              <strong>Horizontal Scalability:</strong> Stateless backend
              replicas behind NGINX reverse proxy
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600 font-semibold flex-shrink-0">
              •
            </span>
            <span>
              <strong>Separation of Concerns:</strong> App logic, data layer,
              cache layer, and observability independently deployed
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600 font-semibold flex-shrink-0">
              •
            </span>
            <span>
              <strong>Production Operations:</strong> Externalized environment
              configuration, persistent volumes, and log rotation
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-600 font-semibold flex-shrink-0">
              •
            </span>
            <span>
              <strong>Full Observability:</strong> Application metrics, service
              exporters, infrastructure monitoring, and centralized logging
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
