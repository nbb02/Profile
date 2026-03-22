import { useState, useRef, useCallback, type ReactNode } from "react"
import githubImg from "../assets/github.com_nbb02.png"
import Draggable from "react-draggable"
import ViTech from "./desktop/vitech"
import { FaGithub } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

interface AppDef {
  id: string
  label: string
  icon: string | ReactNode
  link?: string
  dock: boolean
  Content: () => ReactNode
}
interface WindowState {
  id: string
  pos: { x: number; y: number }
  size: { w: number; h: number }
}
interface IconState {
  id: string
  pos: { x: number; y: number }
}

const APPS: AppDef[] = [
  {
    id: "finder",
    label: "Files",
    icon: "📁",
    dock: true,
    Content: () => (
      <div style={s.appContent}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 12,
            padding: 16,
          }}
        >
          {[
            "Documents",
            "Downloads",
            "Pictures",
            "Music",
            "Videos",
            "Desktop",
          ].map((f) => (
            <div
              key={f}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                cursor: "pointer",
                padding: 8,
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>📂</span>
              <span style={{ fontSize: 12, color: "#333" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: "⚡",
    dock: true,
    Content: () => (
      <div
        style={{
          ...s.appContent,
          background: "#0d0d0d",
          fontFamily: "'Courier New',monospace",
          padding: 16,
        }}
      >
        <div style={{ color: "#00ff88", fontSize: 13, lineHeight: 1.8 }}>
          <div>
            <span style={{ color: "#666" }}>Last login: Sat Mar 21 2026</span>
          </div>
          <div>
            <span style={{ color: "#4fc3f7" }}>user@desktop</span>
            <span style={{ color: "#fff" }}>:~$ </span>ls -la
          </div>
          <div style={{ color: "#ccc" }}>drwxr-xr-x Documents/</div>
          <div style={{ color: "#ccc" }}>drwxr-xr-x Downloads/</div>
          <div style={{ color: "#ccc" }}>-rw-r--r-- readme.md</div>
          <div>
            <span style={{ color: "#4fc3f7" }}>user@desktop</span>
            <span style={{ color: "#fff" }}>
              :~${" "}
              <span style={{ borderRight: "2px solid #00ff88" }}>&nbsp;</span>
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "notes",
    label: "Notes",
    icon: "📝",
    dock: true,
    Content: () => (
      <textarea
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
          padding: 16,
          fontFamily: "'Georgia',serif",
          fontSize: 14,
          lineHeight: 1.7,
          resize: "none",
          background: "#fffef0",
          color: "#333",
          boxSizing: "border-box",
        }}
        defaultValue={"Dear Diary,\n\nToday was a beautiful day...\n"}
      />
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: "🎵",
    dock: true,
    Content: () => (
      <div
        style={{
          ...s.appContent,
          background: "linear-gradient(135deg,#1a0533,#0d1b2a)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#e91e63,#9c27b0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            boxShadow: "0 0 30px rgba(233,30,99,.5)",
          }}
        >
          🎵
        </div>
        <div style={{ color: "#fff", textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Neon Dreams</div>
          <div style={{ color: "#aaa", fontSize: 13 }}>Synthwave Artist</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["⏮", "⏸", "⏭"].map((b) => (
            <button
              key={b}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: 24,
              }}
            >
              {b}
            </button>
          ))}
        </div>
        <div
          style={{
            width: "80%",
            height: 4,
            background: "#333",
            borderRadius: 2,
          }}
        >
          <div
            style={{
              width: "40%",
              height: "100%",
              background: "#e91e63",
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    ),
  },
  {
    id: "photos",
    label: "Photos",
    icon: "🖼️",
    dock: true,
    Content: () => (
      <div
        style={{
          ...s.appContent,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 4,
          padding: 8,
          background: "#111",
          overflow: "auto",
        }}
      >
        {(["🌄", "🌊", "🌲", "🌸", "🌙", "🏔", "🌅", "🌺", "🦋"] as const).map(
          (e, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                borderRadius: 6,
                background: `hsl(${i * 40},60%,${30 + i * 3}%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              {e}
            </div>
          ),
        )}
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: "⚙️",
    dock: true,
    Content: () => (
      <div style={{ ...s.appContent, padding: 16 }}>
        {[
          { icon: "🎨", label: "Appearance", desc: "Themes, fonts, colors" },
          { icon: "🔊", label: "Sound", desc: "Volume, alerts" },
          { icon: "🌐", label: "Network", desc: "WiFi, Bluetooth" },
          { icon: "🔒", label: "Privacy", desc: "Permissions, security" },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span style={{ fontSize: 22 }}>{row.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#222" }}>
                {row.label}
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>{row.desc}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "profile",
    label: "Back to Profile",
    icon: "👤",
    link: "/",
    dock: false,
    Content: () => null,
  },
  {
    id: "github",
    label: "GitHub",
    icon: <FaGithub />,
    dock: false,
    Content: () => (
      <div
        style={{ flex: 1, overflow: "auto", padding: 12, background: "#fff" }}
      >
        <img
          src={githubImg}
          alt="GitHub"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>
    ),
  },
  {
    id: "vitech",
    label: "ViTech",
    icon: "💻",
    dock: false,
    Content: () => <ViTech />,
  },
]

const MIN_W = 280,
  MIN_H = 180

function useResize(
  win: WindowState,
  onUpdate: (p: Partial<WindowState>) => void,
) {
  return useCallback(
    (e: React.MouseEvent, edge: string) => {
      e.preventDefault()
      e.stopPropagation()
      const sx = e.clientX,
        sy = e.clientY
      const sw = win.size.w,
        sh = win.size.h
      const spx = win.pos.x,
        spy = win.pos.y

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - sx,
          dy = ev.clientY - sy
        let w = sw,
          h = sh,
          px = spx,
          py = spy
        if (edge.includes("e")) w = Math.max(MIN_W, sw + dx)
        if (edge.includes("s")) h = Math.max(MIN_H, sh + dy)
        if (edge.includes("w")) {
          w = Math.max(MIN_W, sw - dx)
          px = spx + (sw - w)
        }
        if (edge.includes("n")) {
          h = Math.max(MIN_H, sh - dy)
          py = spy + (sh - h)
        }
        onUpdate({ size: { w, h }, pos: { x: px, y: py } })
      }
      const onUp = () => {
        window.removeEventListener("mousemove", onMove)
        window.removeEventListener("mouseup", onUp)
      }
      window.addEventListener("mousemove", onMove)
      window.addEventListener("mouseup", onUp)
    },
    [win, onUpdate],
  )
}

function ResizeHandles({
  startResize,
}: {
  startResize: (e: React.MouseEvent, edge: string) => void
}) {
  const T = 6,
    C = 14
  const h = (style: React.CSSProperties, edge: string) => (
    <div
      key={edge}
      style={{ position: "absolute", zIndex: 20, ...style }}
      onMouseDown={(e) => startResize(e, edge)}
    />
  )
  return (
    <>
      {[
        h({ top: 0, left: C, right: C, height: T, cursor: "n-resize" }, "n"),
        h({ bottom: 0, left: C, right: C, height: T, cursor: "s-resize" }, "s"),
        h({ left: 0, top: C, bottom: C, width: T, cursor: "w-resize" }, "w"),
        h({ right: 0, top: C, bottom: C, width: T, cursor: "e-resize" }, "e"),
        h({ top: 0, left: 0, width: C, height: C, cursor: "nw-resize" }, "nw"),
        h({ top: 0, right: 0, width: C, height: C, cursor: "ne-resize" }, "ne"),
        h(
          { bottom: 0, left: 0, width: C, height: C, cursor: "sw-resize" },
          "sw",
        ),
        h(
          { bottom: 0, right: 0, width: C, height: C, cursor: "se-resize" },
          "se",
        ),
      ]}
    </>
  )
}

function AppWindow({
  app,
  win,
  zIndex,
  onClose,
  onFocus,
  onUpdate,
}: {
  app: AppDef
  win: WindowState
  zIndex: number
  onClose: () => void
  onFocus: () => void
  onUpdate: (p: Partial<WindowState>) => void
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const startResize = useResize(win, onUpdate)

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".win-titlebar"
      position={win.pos}
      onStart={onFocus}
      onStop={(_, d) => onUpdate({ pos: { x: d.x, y: d.y } })}
    >
      <div
        ref={nodeRef}
        style={{
          position: "absolute",
          width: win.size.w,
          height: win.size.h,
          zIndex,
        }}
        onMouseDown={onFocus}
      >
        <ResizeHandles startResize={startResize} />
        <div style={{ ...s.window, width: "100%", height: "100%" }}>
          <div className="win-titlebar" style={s.titleBar}>
            <span style={s.titleText}>
              {app.icon} {app.label}
            </span>
            <button style={s.closeBtn} onClick={onClose}>
              <span
                style={{ fontSize: "1.2em", color: "#900", fontWeight: 900 }}
              >
                <IoMdClose />
              </span>
            </button>
          </div>
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <app.Content />
          </div>
        </div>
      </div>
    </Draggable>
  )
}

function DesktopIcon({
  app,
  pos,
  onOpen,
  onMove,
}: {
  app: AppDef
  pos: { x: number; y: number }
  onOpen: (id: string) => void
  onMove: (id: string, x: number, y: number) => void
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const dragging = useRef(false)
  return (
    <Draggable
      nodeRef={nodeRef}
      position={pos}
      onStart={() => {
        dragging.current = false
      }}
      onDrag={() => {
        dragging.current = true
      }}
      onStop={(_, d) => onMove(app.id, d.x, d.y)}
    >
      <div
        ref={nodeRef}
        style={{ position: "absolute", width: 72, zIndex: 5, cursor: "grab" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          if (dragging.current) return
          if (app.link) {
            window.location.href = app.link
            return
          }
          onOpen(app.id)
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            padding: "8px 6px",
            borderRadius: 10,
            background: hovered
              ? "rgba(255,255,255,0.18)"
              : "rgba(255,255,255,0.04)",
            transition: "background .15s",
            userSelect: "none",
          }}
        >
          <span style={{ fontSize: 34, lineHeight: 1 }}>{app.icon}</span>
          <span
            style={{
              fontSize: 11,
              color: "#fff",
              fontWeight: 500,
              textShadow: "0 1px 4px rgba(0,0,0,.8)",
              textAlign: "center",
            }}
          >
            {app.label}
          </span>
        </div>
      </div>
    </Draggable>
  )
}

const ICON_POSITIONS: Record<string, { x: number; y: number }> = {
  finder: { x: 20, y: 20 },
  terminal: { x: 20, y: 116 },
  notes: { x: 20, y: 212 },
  music: { x: 20, y: 308 },
  photos: { x: 20, y: 404 },
  settings: { x: 20, y: 500 },
  vitech: { x: 20, y: 600 },
  profile: { x: window.innerWidth - 92, y: 20 },
  github: { x: window.innerWidth - 92, y: 116 },
}

const makeInitialIcons = (): IconState[] =>
  APPS.map((app) => ({
    id: app.id,
    pos:
      app.id === "profile"
        ? { x: window.innerWidth - 92, y: 20 }
        : (ICON_POSITIONS[app.id] ?? { x: 20, y: 20 }),
  }))

export default function Grid() {
  const [icons, setIcons] = useState<IconState[]>(makeInitialIcons)
  const [windows, setWindows] = useState<WindowState[]>(() => [
    {
      id: "github",
      size: { w: 800, h: 650 },
      pos: {
        x: Math.max(20, Math.round(window.innerWidth / 2 - 800 / 2)),
        y: Math.max(20, Math.round(window.innerHeight / 2 - 720 / 2)),
      },
    },
  ])
  const [zMap, setZMap] = useState<Record<string, number>>({})
  const topZ = useRef(20)
  const [dockHover, setDockHover] = useState<string | null>(null)

  const focusWindow = useCallback((id: string) => {
    const n = ++topZ.current
    setZMap((p) => ({ ...p, [id]: n }))
  }, [])

  const openApp = useCallback(
    (id: string) => {
      setWindows((prev) => {
        if (prev.find((w) => w.id === id)) return prev
        return [
          ...prev,
          {
            id,
            pos:
              id === "github"
                ? {
                    x: Math.max(
                      20,
                      Math.round(window.innerWidth / 2 - 800 / 2),
                    ),
                    y: Math.max(
                      20,
                      Math.round(window.innerHeight / 2 - 720 / 2),
                    ),
                  }
                : { x: 160 + Math.random() * 220, y: 60 + Math.random() * 120 },
            size:
              id === "vitech"
                ? { w: 1200, h: 720 }
                : id === "github"
                  ? { w: 800, h: 650 }
                  : { w: 480, h: 360 },
          },
        ]
      })
      setTimeout(() => focusWindow(id), 0)
    },
    [focusWindow],
  )

  const closeApp = (id: string) =>
    setWindows((p) => p.filter((w) => w.id !== id))

  const updateWindow = useCallback(
    (id: string, patch: Partial<WindowState>) =>
      setWindows((p) => p.map((w) => (w.id === id ? { ...w, ...patch } : w))),
    [],
  )

  const moveIcon = (id: string, x: number, y: number) =>
    setIcons((p) =>
      p.map((ic) => (ic.id === id ? { ...ic, pos: { x, y } } : ic)),
    )

  return (
    <div style={s.desktop}>
      <div style={s.wallpaper} />

      {/* Desktop icons */}
      {icons.map((ic) => {
        const app = APPS.find((a) => a.id === ic.id)!
        return (
          <DesktopIcon
            key={ic.id}
            app={app}
            pos={ic.pos}
            onOpen={openApp}
            onMove={moveIcon}
          />
        )
      })}

      {/* Windows — rendered directly without a pointerEvents:none wrapper */}
      {windows.map((win) => {
        const app = APPS.find((a) => a.id === win.id)
        if (!app) return null
        return (
          <AppWindow
            key={win.id}
            app={app}
            win={win}
            zIndex={zMap[win.id] ?? 20}
            onClose={() => closeApp(win.id)}
            onFocus={() => focusWindow(win.id)}
            onUpdate={(p) => updateWindow(win.id, p)}
          />
        )
      })}

      <div style={s.dock}>
        {APPS.filter((item) => item.dock).map((app) => (
          <button
            key={app.id}
            title={app.label}
            style={{
              ...s.dockBtn,
              transform:
                dockHover === app.id
                  ? "scale(1.3) translateY(-6px)"
                  : "scale(1)",
              outline: windows.find((w) => w.id === app.id)
                ? "2px solid rgba(255,255,255,.5)"
                : "none",
            }}
            onMouseEnter={() => setDockHover(app.id)}
            onMouseLeave={() => setDockHover(null)}
            onClick={() => openApp(app.id)}
          >
            {app.icon}
          </button>
        ))}
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  desktop: {
    height: "100vh",
    overflow: "hidden",
    fontFamily: "'Segoe UI',system-ui,sans-serif",
    position: "relative",
    userSelect: "none",
  },
  wallpaper: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage:
      "radial-gradient(ellipse at 20% 50%,rgba(120,40,200,.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(40,120,200,.12) 0%,transparent 50%)",
  },
  window: {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 20px 60px rgba(0,0,0,.4),0 0 0 1px rgba(255,255,255,.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  titleBar: {
    height: 36,
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    background: "linear-gradient(180deg,#f0f0f0,#e0e0e0)",
    borderBottom: "1px solid #ccc",
    cursor: "move",
    gap: 8,
    flexShrink: 0,
    userSelect: "none",
  },
  closeBtn: {
    width: 14,
    height: 14,
    border: "none",
    cursor: "pointer",
    flexShrink: 0,
    boxShadow: "0 0 0 .5px rgba(0,0,0,.2)",
    color: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  titleText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  appContent: { flex: 1, overflow: "auto", background: "#fafafa" },
  dock: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    background: "rgba(255,255,255,.1)",
    backdropFilter: "blur(20px)",
    borderTop: "1px solid rgba(255,255,255,.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    zIndex: 100,
    padding: "0 16px",
  },
  dockBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    cursor: "pointer",
    transition: "transform .15s",
    background: "rgba(255,255,255,.15)",
    backdropFilter: "blur(10px)",
    border: "none",
  },
}
