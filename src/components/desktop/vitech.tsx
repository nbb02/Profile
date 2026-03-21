import { useState } from "react"
import dashboard from "../../assets/projects/vitech/dashboard.png"
import dashboardFull from "../../assets/projects/vitech/dashboard-full.png"
import dashboard2 from "../../assets/projects/vitech/dashboard-2.png"
import dashboardGroupings from "../../assets/projects/vitech/dashboard-groupings.png"
import dashboardExport from "../../assets/projects/vitech/dashboard-export.png"
import explorationFull from "../../assets/projects/vitech/exploration-full.png"
import membersList from "../../assets/projects/vitech/members-list.png"
import memberQr from "../../assets/projects/vitech/member-qr.png"
import accounts from "../../assets/projects/vitech/accounts.png"
import settingsSectors from "../../assets/projects/vitech/settings-sectors.png"
import settingsPrograms from "../../assets/projects/vitech/settings-programs.png"
import settingsInputs from "../../assets/projects/vitech/settings-inputs.png"
import settingsColors from "../../assets/projects/vitech/settings-colors.png"
import drawio from "../../assets/projects/vitech/ViTech.drawio.png"
import ImageLightbox from "./ImageLightbox"

const sections = [
  {
    id: "dashboard",
    src: dashboard,
    name: "dashboard.png",
    path: "src/assets/projects/vitech/dashboard.png",
    callouts: [
      {
        title: "Top filters",
        text: "Sector toggles (4PS/PWD/SC/SP) and mode selector (Categorical) for dataset switching.",
      },
      {
        title: "Main stacked bar chart",
        text: "Counts per barangay with stacked sector series; insight caption under chart.",
      },
      {
        title: "Summary panels",
        text: "Pie (distribution), horizontal sex chart, birth-months chart — each with insight text.",
      },
      {
        title: "Classification area",
        text: "Large strip for PWD classifications with pie and legend.",
      },
      {
        title: "Export/Print",
        text: "Buttons for report generation; charts included in printable reports.",
      },
    ],
  },
  {
    id: "dashboard-full",
    src: dashboardFull,
    name: "dashboard-full.png",
    path: "src/assets/projects/vitech/dashboard-full.png",
    callouts: [
      {
        title: "Right-side filters",
        text: "Barangays, sex, age sliders and export/options that dynamically filter charts and tables.",
      },
      {
        title: "Alerts area",
        text: "Red/yellow badges for Alerts/Warnings and CTA buttons to view lists.",
      },
      {
        title: "Chart annotations",
        text: "Short auto-generated insight lines below charts suggesting programs.",
      },
    ],
  },
  {
    id: "dashboard-2",
    src: dashboard2,
    name: "dashboard-2.png",
    path: "src/assets/projects/vitech/dashboard-2.png",
    callouts: [
      {
        title: "Two-series chart",
        text: "Focused comparison (4PS vs SP) across barangays.",
      },
      {
        title: "Compact summaries",
        text: "Three-panel compact layout useful for print or tighter screens.",
      },
    ],
  },
  {
    id: "dashboard-groupings",
    src: dashboardGroupings,
    name: "dashboard-groupings.png",
    path: "src/assets/projects/vitech/dashboard-groupings.png",
    callouts: [
      {
        title: "Settings modal",
        text: "Central 'Settings' modal with categorical and population toggles to enable/disable panels.",
      },
      {
        title: "Add / Close",
        text: "Close and Add buttons for quick adjustments to the modal.",
      },
    ],
  },
  {
    id: "dashboard-export",
    src: dashboardExport,
    name: "dashboard-export.png",
    path: "src/assets/projects/vitech/dashboard-export.png",
    callouts: [
      {
        title: "Printable header",
        text: "Logo, title, and metadata (date, created by) appear in print preview.",
      },
      {
        title: "Charts + tables",
        text: "Charts embedded with a tabular dataset per barangay for PDF export.",
      },
    ],
  },
  {
    id: "exploration-full",
    src: explorationFull,
    name: "exploration-full.png",
    path: "src/assets/projects/vitech/exploration-full.png",
    callouts: [
      {
        title: "Map with popups",
        text: "Leaflet map shows per-barangay popup summaries (sex, civil status, counts).",
      },
      {
        title: "Data table",
        text: "Right-side table lists members with pill-style ID badges and classification tags.",
      },
      {
        title: "Export control",
        text: "Export control near the map for geodata/table export.",
      },
    ],
  },
  {
    id: "members-list",
    src: membersList,
    name: "members-list.png",
    path: "src/assets/projects/vitech/members-list.png",
    callouts: [
      {
        title: "Columns & badges",
        text: "ID, classification badges, DOB, age — sortable and filterable.",
      },
      {
        title: "Toolbar controls",
        text: "Columns, Density, Font, Reset, Filters for table customization.",
      },
    ],
  },
  {
    id: "member-qr",
    src: memberQr,
    name: "member-qr.png",
    path: "src/assets/projects/vitech/member-qr.png",
    callouts: [
      {
        title: "QR scanner",
        text: "Camera-based QR scanner area with 'Scan Member QR' button.",
      },
      {
        title: "Camera permission",
        text: "Browser camera permission dialog visible — indicates live webcam support.",
      },
      {
        title: "Member form",
        text: "Fields below scanner for name and barangay checkboxes.",
      },
    ],
  },
  {
    id: "accounts",
    src: accounts,
    name: "accounts.png",
    path: "src/assets/projects/vitech/accounts.png",
    callouts: [
      {
        title: "Role badges",
        text: "Colored role/status badges identify user types (Super Admin, Employee, etc.).",
      },
      {
        title: "Audit columns",
        text: "Contact, email, employee ID, created/modified metadata columns for auditing.",
      },
    ],
  },
  {
    id: "settings-sectors",
    src: settingsSectors,
    name: "settings-sectors.png",
    path: "src/assets/projects/vitech/settings-sectors.png",
    callouts: [
      {
        title: "Sector cards",
        text: "Display name, completion counts, age limits and classification lists for PWD.",
      },
    ],
  },
  {
    id: "settings-programs",
    src: settingsPrograms,
    name: "settings-programs.png",
    path: "src/assets/projects/vitech/settings-programs.png",
    callouts: [
      {
        title: "Programs table",
        text: "Program rules (dataset, type, percentage) with Edit/Delete actions.",
      },
    ],
  },
  {
    id: "settings-inputs",
    src: settingsInputs,
    name: "settings-inputs.png",
    path: "src/assets/projects/vitech/settings-inputs.png",
    callouts: [
      {
        title: "Input configurations",
        text: "Define options (Religion, Nationality) and Required/Not Applicable toggles per sector.",
      },
    ],
  },
  {
    id: "settings-colors",
    src: settingsColors,
    name: "settings-colors.png",
    path: "src/assets/projects/vitech/settings-colors.png",
    callouts: [
      {
        title: "Color palette",
        text: "Assign colors to sectors and manage palette entries with Reset/Add.",
      },
    ],
  },
]

export default function ViTech() {
  const [modalSrc, setModalSrc] = useState<string | null>(null)

  const openModal = (src: string) => setModalSrc(src)
  const closeModal = () => setModalSrc(null)

  return (
    <div className="p-6 flex-1 overflow-auto">
      <h2 className="text-teal-800 mb-2 text-2xl font-semibold">
        ViTech — Annotated Screenshots
      </h2>
      <p className="text-gray-600 mb-4">
        Scrollable full-size screenshots with concise callouts. Click an image
        to open in a new tab if your environment supports it.
      </p>

      {/* Tech stack */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 p-2 bg-white border rounded">
          <img
            src="https://altnix.com/_next/static/media/mySQL.d519545a.png"
            alt="MySQL"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-medium">MySQL</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white border rounded">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1280px-Laravel.svg.png"
            alt="Laravel"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-medium">Laravel</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white border rounded">
          <img
            src="https://www.jotform.com/blog/wp-content/uploads/2017/01/react-js.png"
            alt="React"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-medium">React</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white border rounded">
          <img
            src="https://i.pcmag.com/imagery/reviews/00D41dN2ZXA5ptFGCsYXvoG-14..v1622753202.jpg"
            alt="Hostinger"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-medium">Hostinger</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white border rounded">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWqhA1gv1uj0tWN1kJubhhPruf29_rk7D6ig&s"
            alt="DigitalOcean"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-medium">DigitalOcean</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white border rounded">
          <img
            src="https://cdn.worldvectorlogo.com/logos/cloudpanel-1.svg"
            alt="Cloudpanel"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-medium">Cloudpanel</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white border rounded">
          <img
            src="https://miro.medium.com/0*CE0kwLuVV8mKt2uO.png"
            alt="Material UI"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-medium">Material UI</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white border rounded">
          <img
            src="https://www.chartjs.org/media/logo-title.svg"
            alt="Chart.js"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-medium">Chart.js</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white border rounded">
          <img
            src="https://i0.wp.com/techprimelab.com/wp-content/uploads/2020/06/SCSS-or-CSS.jpg?fit=1024%2C576&ssl=1"
            alt="SCSS"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm font-medium">SCSS</span>
        </div>
      </div>

      {/* Summary header */}
      <div className="mb-6 p-4 bg-white border border-slate-200 rounded">
        <h3 className="text-xl font-semibold text-teal-800">
          Capstone 2024-2025
        </h3>
        <p className="text-teal-700 font-medium">
          Population Management System with Visualization
        </p>
        <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>
            <strong>Very dynamic customization</strong> — settings modal, user
            palettes, input configs and program rules.
          </li>
          <li>
            <strong>Role-based access</strong> and user/account management with
            badges and audit metadata.
          </li>
          <li>
            <strong>Interactive dashboards</strong> — stacked charts, pies,
            annotations, alerts and export/print-ready reports.
          </li>
          <li>
            <strong>Data exploration</strong> with map popups and exportable
            tables.
          </li>
          <li>
            <strong>Member management</strong> with QR scanner / camera
            integration and mass exports.
          </li>
          <li>
            <strong>Programs & rules engine</strong> — threshold-based programs
            and configurable actions (Edit/Delete).
          </li>
          <li>
            <strong>Exports:</strong> printable PDF reports and Excel/CSV export
            for datasets.
          </li>
          <li>
            <strong>Styling:</strong> Raw SCSS hand-written for all UI (no
            template) — worked more like a pragmatic, handcrafted approach.
          </li>
        </ul>
      </div>

      {sections.map((s) => (
        <section
          key={s.id}
          className="flex gap-4 border border-slate-200 p-3 mb-4 rounded-lg"
        >
          <div className="flex-1 min-w-[260px] w-full border border-slate-200 p-2 bg-slate-50">
            <img
              src={s.src}
              alt={s.name}
              className="block w-full h-auto cursor-pointer"
              onClick={() => openModal(s.src)}
            />
          </div>
          <aside className="w-80 max-h-[42rem] overflow-auto p-2">
            <h3 className="text-teal-700 mb-2 text-lg">{s.name}</h3>
            <div className="text-sm text-teal-800 break-words mb-2">
              {s.path}
            </div>
            {s.callouts.map((c, idx) => (
              <div
                key={idx}
                className="my-2 p-2 border-l-4 border-teal-700 bg-white"
              >
                <strong className="block mb-1">{`${idx + 1}. ${c.title}`}</strong>
                <div className="text-sm text-gray-700">{c.text}</div>
              </div>
            ))}
          </aside>
        </section>
      ))}

      <section className="flex gap-4 border border-slate-200 p-3 mb-4 rounded-lg items-start">
        <div className="flex-1 min-w-[260px] w-full border border-slate-200 p-2 bg-slate-50">
          <img
            src={drawio}
            alt="ViTech infrastructure diagram"
            className="block w-full h-auto max-h-[80vh] object-contain"
          />
        </div>
        <aside className="w-80 max-h-[42rem] overflow-auto p-2">
          <h3 className="text-teal-700 mb-2 text-lg">
            ViTech.drawio.png — Infrastructure
          </h3>
          <div className="text-sm text-teal-800 break-words mb-2">
            src/assets/projects/vitech/ViTech.drawio.png
          </div>
          <div className="my-2 p-2 border-l-4 border-teal-700 bg-white">
            <strong className="block mb-1">Notes</strong>
            <p className="text-sm text-gray-700">
              Infrastructure diagram and deployment topology overview.
            </p>
          </div>
        </aside>
      </section>

      {modalSrc && <ImageLightbox src={modalSrc} onClose={closeModal} />}

      {/* Journey footer */}
      <footer className="mt-6 p-4 bg-slate-50 border-t border-slate-200 rounded text-sm text-gray-800">
        <h4 className="text-teal-800 font-semibold">
          Journey — Capstone 2024 🚀🎓
        </h4>
        <p className="mt-2">
          Started around <strong>Mar 2024</strong>. I began with a bit of
          Node.js backend knowledge, then dove into <strong>Laravel</strong> and
          built ViTech alongside other school projects (POS inventory, art
          gallery). It was an intense year — worked continuously (yes, even
          through vacations 😅) to finish the fullstack system.
        </p>
        <p className="mt-2">
          Funny bits: I ported parts to <strong>vanilla PHP</strong> to run on
          another server . I also re-defended the project <em>3–4 times</em> —
          apparently "too much" can still feel like "not enough" 😂
        </p>
        <p className="mt-2">
          Doing this before "vibe coding" was a thing — I learned by digging
          through docs, asking StackOverflow, and using early AI assistants for
          small snippets (nothing as powerful as today's models). Mostly it was
          hands-on experimentation. What a ride — Capstone 2024 🏁🥳
        </p>
        <p className="mt-2">
          Styling note: I wrote raw SCSS for the whole UI (no template) —
          slapped styles together like a caveman at times; it may not be
          polished, but it was built with persistence and hard work.
        </p>
        <p className="mt-2">
          Also learned Docker to share the project with teammates for local use
          (since the server isn't permanent). It took over two weeks of
          trial-and-error to make the containers behave — worth the headache
          😂🐳
        </p>
      </footer>
    </div>
  )
}
