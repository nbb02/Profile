import OverviewSidebar from "../components/sidebar"
import { Outlet } from "react-router-dom"

export default function Projects() {
  return (
    <div className="min-h-screen relative p-4">
      <div className="bg-grid" aria-hidden="true" />
      <div className="halo halo-1" aria-hidden="true" />
      <div className="halo halo-2" aria-hidden="true" />

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

      <div className="relative z-10 w-full px-0 py-4">
        <div className="flex gap-8">
          <OverviewSidebar />

          <main className="flex-1 space-y-12">
            <div>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
