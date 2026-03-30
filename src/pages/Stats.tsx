import { useEffect, useState } from "react"
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Timestamp,
} from "firebase/firestore"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { db } from "../lib/firebase"

type GlobalStats = {
  totalVisitors: number
  totalSessions: number
  totalPageViews: number
  lastUpdated?: Timestamp
}

type VisitorItem = {
  id: string
  visitorId: string
  totalPageViews: number
  sessionCount: number
  lastPath: string
  browser: string
  os: string
  language: string
  timezone: string
  referrer: string
  lastSeen?: Timestamp
}

type DailyStats = {
  date: string
  visitorCount: number
  sessionCount: number
  pageViewCount: number
}

function numberOrZero(value: unknown): number {
  return typeof value === "number" ? value : 0
}

function toVisitorItem(
  docSnap: QueryDocumentSnapshot<DocumentData>,
): VisitorItem {
  const data = docSnap.data()

  return {
    id: docSnap.id,
    visitorId: typeof data.visitorId === "string" ? data.visitorId : docSnap.id,
    totalPageViews: numberOrZero(data.totalPageViews),
    sessionCount: numberOrZero(data.sessionCount),
    lastPath: typeof data.lastPath === "string" ? data.lastPath : "-",
    browser: typeof data.browser === "string" ? data.browser : "Unknown",
    os: typeof data.os === "string" ? data.os : "Unknown",
    language: typeof data.language === "string" ? data.language : "-",
    timezone: typeof data.timezone === "string" ? data.timezone : "-",
    referrer: typeof data.referrer === "string" ? data.referrer : "direct",
    lastSeen: data.lastSeen as Timestamp | undefined,
  }
}

function formatDate(value?: Timestamp): string {
  if (!value) return "-"
  return value.toDate().toLocaleString()
}

export default function Stats() {
  const [globalStats, setGlobalStats] = useState<GlobalStats>({
    totalVisitors: 0,
    totalSessions: 0,
    totalPageViews: 0,
  })
  const [visitors, setVisitors] = useState<VisitorItem[]>([])
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([])
  const [todayVisitorCount, setTodayVisitorCount] = useState<number | null>(
    null,
  )

  useEffect(() => {
    const globalRef = doc(db, "siteStats", "global")
    const visitorsQuery = query(
      collection(db, "visitors"),
      orderBy("totalPageViews", "desc"),
      limit(25),
    )
    const dailyQuery = query(
      collection(db, "dailyStats"),
      orderBy("date", "desc"),
      limit(30),
    )
    const today = new Date().toISOString().split("T")[0]
    const todayVisitorQuery = query(
      collection(db, "visitors"),
      where("lastVisitDate", "==", today),
    )

    const stopGlobal = onSnapshot(globalRef, (snap) => {
      const data = snap.data()
      if (!data) return

      setGlobalStats({
        totalVisitors: numberOrZero(data.totalVisitors),
        totalSessions: numberOrZero(data.totalSessions),
        totalPageViews: numberOrZero(data.totalPageViews),
        lastUpdated: data.lastUpdated as Timestamp | undefined,
      })
    })

    const stopVisitors = onSnapshot(visitorsQuery, (snap) => {
      setVisitors(snap.docs.map(toVisitorItem))
    })

    const stopDaily = onSnapshot(dailyQuery, (snap) => {
      const sorted = snap.docs
        .map((doc) => {
          const data = doc.data()
          return {
            date: typeof data.date === "string" ? data.date : doc.id,
            visitorCount: numberOrZero(data.visitorCount),
            sessionCount: numberOrZero(data.sessionCount),
            pageViewCount: numberOrZero(data.pageViewCount),
          }
        })
        .sort((a, b) => a.date.localeCompare(b.date))
      setDailyStats(sorted)
    })

    const stopTodayVisitors = onSnapshot(todayVisitorQuery, (snap) => {
      setTodayVisitorCount(snap.size)
    })

    return () => {
      stopGlobal()
      stopVisitors()
      stopDaily()
      stopTodayVisitors()
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-6 backdrop-blur">
          <h1 className="text-3xl font-bold">Visitor Stats</h1>
          <p className="mt-2 text-slate-300">
            Live Firebase monitor for unique visitors, sessions, and page views.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Last updated: {formatDate(globalStats.lastUpdated)}
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-cyan-500/20 bg-slate-900 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Unique visitors
            </p>
            <p className="mt-1 text-3xl font-semibold text-cyan-300">
              {globalStats.totalVisitors.toLocaleString()}
            </p>
          </article>
          <article className="rounded-xl border border-cyan-500/20 bg-slate-900 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Sessions
            </p>
            <p className="mt-1 text-3xl font-semibold text-emerald-300">
              {globalStats.totalSessions.toLocaleString()}
            </p>
          </article>
          <article className="rounded-xl border border-cyan-500/20 bg-slate-900 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Page views
            </p>
            <p className="mt-1 text-3xl font-semibold text-fuchsia-300">
              {globalStats.totalPageViews.toLocaleString()}
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-4 md:p-6">
          <h2 className="text-xl font-semibold">
            Visitors Per Day (Last 30 days)
          </h2>
          <div className="mt-4 h-80">
            {dailyStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={(() => {
                    const merged = [...dailyStats]
                    if (todayVisitorCount != null) {
                      const today = new Date().toISOString().split("T")[0]
                      const idx = merged.findIndex((d) => d.date === today)
                      if (idx >= 0)
                        merged[idx] = {
                          ...merged[idx],
                          visitorCount: todayVisitorCount,
                        }
                      else
                        merged.push({
                          date: today,
                          visitorCount: todayVisitorCount,
                          sessionCount: 0,
                          pageViewCount: 0,
                        })
                      merged.sort((a, b) => a.date.localeCompare(b.date))
                    }
                    return merged
                  })()}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#475569"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#94a3b8"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#cbd5e1" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitorCount"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: "#06b6d4", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Visitors"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No daily stats yet. Visit your site to generate data.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-4 md:p-6">
          <h2 className="text-xl font-semibold">Top Visitors</h2>
          <p className="mt-1 text-sm text-slate-400">
            Persisted by cookie/local storage visitor ID and tracked live from
            Firestore.
          </p>

          <div className="mt-4 overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-2 pr-4">Visitor ID</th>
                  <th className="py-2 pr-4">Views</th>
                  <th className="py-2 pr-4">Sessions</th>
                  <th className="py-2 pr-4">Last path</th>
                  <th className="py-2 pr-4">Browser / OS</th>
                  <th className="py-2 pr-4">Language</th>
                  <th className="py-2 pr-4">Timezone</th>
                  <th className="py-2 pr-4">Referrer</th>
                  <th className="py-2 pr-4">Last seen</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.id} className="border-b border-slate-800/70">
                    <td className="py-2 pr-4 text-cyan-300">
                      {visitor.visitorId}
                    </td>
                    <td className="py-2 pr-4">{visitor.totalPageViews}</td>
                    <td className="py-2 pr-4">{visitor.sessionCount}</td>
                    <td className="py-2 pr-4">{visitor.lastPath}</td>
                    <td className="py-2 pr-4">
                      {visitor.browser} / {visitor.os}
                    </td>
                    <td className="py-2 pr-4">{visitor.language}</td>
                    <td className="py-2 pr-4">{visitor.timezone}</td>
                    <td className="py-2 pr-4 max-w-[220px] truncate">
                      {visitor.referrer}
                    </td>
                    <td className="py-2 pr-4">
                      {formatDate(visitor.lastSeen)}
                    </td>
                  </tr>
                ))}
                {visitors.length === 0 ? (
                  <tr>
                    <td className="py-6 text-slate-400" colSpan={9}>
                      No visitor data yet. Open your site in another tab and
                      refresh to generate activity.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
