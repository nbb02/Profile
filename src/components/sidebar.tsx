import { NavLink, useNavigate } from "react-router-dom"

const linkClass = (active: boolean) =>
  `w-full text-left px-3 py-2 rounded-lg font-medium border transition-colors ${
    active
      ? "bg-indigo-50 text-indigo-700 border-indigo-200/40"
      : "bg-transparent text-slate-700 border-transparent hover:bg-slate-50"
  }`

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="w-64 shrink-0 pt-4">
      <div className="glass p-6 rounded-2xl border border-slate-200/40 backdrop-blur-md sticky top-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Go back"
          className="fixed left-6 top-6 w-10 h-10 rounded-lg glass flex items-center justify-center text-sm font-medium shadow-sm hover:scale-105 transition-transform"
        >
          ←
        </button>
        <h2 className="text-lg font-bold text-slate-900 pt-15">Overview</h2>
        <p className="mt-2 text-sm text-slate-700">
          This page shows featured projects and systems.
        </p>

        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/projects"
                end
                className={({ isActive }) => linkClass(isActive)}
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects/vitech"
                className={({ isActive }) => linkClass(isActive)}
              >
                ViTech
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
