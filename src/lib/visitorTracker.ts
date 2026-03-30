import {
  doc,
  increment,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"

const VISITOR_COOKIE = "portfolio_visitor_id"
const VISITOR_STORAGE = "portfolio_visitor_id"
const SESSION_STORAGE = "portfolio_session_id"
const LAST_TRACK_STORAGE = "portfolio_last_track"

function readCookie(cookieName: string): string | null {
  const escaped = cookieName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(cookieName: string, value: string, days: number): void {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString()
  document.cookie = `${cookieName}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function getOrCreateVisitorId(): string {
  const fromCookie = readCookie(VISITOR_COOKIE)
  const fromStorage = localStorage.getItem(VISITOR_STORAGE)
  const existing = fromCookie ?? fromStorage

  if (existing) {
    if (!fromCookie) setCookie(VISITOR_COOKIE, existing, 365)
    if (!fromStorage) localStorage.setItem(VISITOR_STORAGE, existing)
    return existing
  }

  const created = generateId()
  localStorage.setItem(VISITOR_STORAGE, created)
  setCookie(VISITOR_COOKIE, created, 365)
  return created
}

function getOrCreateSessionId(): { sessionId: string; isNewSession: boolean } {
  const existing = sessionStorage.getItem(SESSION_STORAGE)
  if (existing) {
    return { sessionId: existing, isNewSession: false }
  }

  const created = generateId()
  sessionStorage.setItem(SESSION_STORAGE, created)
  return { sessionId: created, isNewSession: true }
}

function shouldTrack(pathname: string): boolean {
  const raw = sessionStorage.getItem(LAST_TRACK_STORAGE)
  const now = Date.now()

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { path: string; timestamp: number }
      if (parsed.path === pathname && now - parsed.timestamp < 1500) {
        return false
      }
    } catch {
      // Ignore broken storage entries and continue tracking.
    }
  }

  sessionStorage.setItem(
    LAST_TRACK_STORAGE,
    JSON.stringify({ path: pathname, timestamp: now }),
  )

  return true
}

function parseClientInfo(userAgent: string): { browser: string; os: string } {
  const lower = userAgent.toLowerCase()

  let browser = "Unknown"
  if (lower.includes("edg/")) browser = "Edge"
  else if (lower.includes("firefox/")) browser = "Firefox"
  else if (lower.includes("chrome/")) browser = "Chrome"
  else if (lower.includes("safari/")) browser = "Safari"

  let os = "Unknown"
  if (lower.includes("windows")) os = "Windows"
  else if (lower.includes("mac os")) os = "macOS"
  else if (lower.includes("android")) os = "Android"
  else if (lower.includes("iphone") || lower.includes("ipad")) os = "iOS"
  else if (lower.includes("linux")) os = "Linux"

  return { browser, os }
}

export async function trackPageVisit(pathname: string): Promise<void> {
  if (typeof window === "undefined") return
  if (!shouldTrack(pathname)) return

  const visitorId = getOrCreateVisitorId()
  const { sessionId, isNewSession } = getOrCreateSessionId()
  const { browser, os } = parseClientInfo(navigator.userAgent)

  const visitorRef = doc(db, "visitors", visitorId)
  const globalRef = doc(db, "siteStats", "global")

  const referrer = document.referrer || "direct"

  const today = new Date().toISOString().split("T")[0]
  const dailyRef = doc(db, "dailyStats", today)

  await runTransaction(db, async (tx) => {
    const [visitorSnap, globalSnap, dailySnap] = await Promise.all([
      tx.get(visitorRef),
      tx.get(globalRef),
      tx.get(dailyRef),
    ])

    const isNewVisitor = !visitorSnap.exists()
    const visitorData = visitorSnap.exists()
      ? (visitorSnap.data() as Record<string, unknown>)
      : null
    const lastVisitDate = visitorData
      ? (visitorData["lastVisitDate"] as string | undefined)
      : undefined
    const isNewVisitorToday = !lastVisitDate || lastVisitDate !== today

    const visitorPayload = {
      visitorId,
      sessionId,
      browser,
      os,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${window.screen.width}x${window.screen.height}`,
      userAgent: navigator.userAgent,
      referrer,
      lastPath: pathname,
      lastSeen: serverTimestamp(),
      lastVisitDate: today,
      totalPageViews: increment(1),
      sessionCount: increment(isNewSession ? 1 : 0),
    }

    if (isNewVisitor) {
      tx.set(visitorRef, {
        ...visitorPayload,
        firstSeen: serverTimestamp(),
      })
    } else {
      tx.set(visitorRef, visitorPayload, { merge: true })
    }

    if (globalSnap.exists()) {
      tx.set(
        globalRef,
        {
          totalVisitors: increment(isNewVisitor ? 1 : 0),
          totalSessions: increment(isNewSession ? 1 : 0),
          totalPageViews: increment(1),
          lastUpdated: serverTimestamp(),
        },
        { merge: true },
      )
    } else {
      tx.set(globalRef, {
        totalVisitors: isNewVisitor ? 1 : 0,
        totalSessions: isNewSession ? 1 : 0,
        totalPageViews: 1,
        lastUpdated: serverTimestamp(),
      })
    }

    if (dailySnap.exists()) {
      tx.set(
        dailyRef,
        {
          date: today,
          visitorCount: increment(isNewVisitorToday ? 1 : 0),
          sessionCount: increment(isNewSession ? 1 : 0),
          pageViewCount: increment(1),
          lastUpdated: serverTimestamp(),
        },
        { merge: true },
      )
    } else {
      tx.set(dailyRef, {
        date: today,
        visitorCount: isNewVisitorToday ? 1 : 0,
        sessionCount: isNewSession ? 1 : 0,
        pageViewCount: 1,
        lastUpdated: serverTimestamp(),
      })
    }
  })
}
