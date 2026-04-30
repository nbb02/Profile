import "./index.css"
import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Profile from "./pages/Profile"
import Desktop from "./pages/Desktop"
import Projects from "./pages/Projects"
import Overview from "./pages/Overview"
import References from "./pages/Refences"
import ViTech from "./components/desktop/vitech"
import Stats from "./pages/Stats"
import { trackPageVisit } from "./lib/visitorTracker"
import LoadBalancerMonitoring from "./components/projects/load-balancer-monitoring"

function VisitorTracking() {
  const location = useLocation()

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`
    void trackPageVisit(path)
  }, [location.pathname, location.search, location.hash])

  return null
}

export default function App() {
  return (
    <>
      <VisitorTracking />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/desktop" element={<Desktop />} />
        <Route path="/projects" element={<Projects />}>
          <Route index element={<Overview />} />
          <Route path="vitech" element={<ViTech />} />
          <Route
            path="load-balancer-monitoring"
            element={<LoadBalancerMonitoring />}
          />
        </Route>
        <Route path="/references" element={<References />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </>
  )
}
