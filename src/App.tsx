import "./index.css"
import { Route, Routes } from "react-router-dom"
import Profile from "./pages/Profile"
import Desktop from "./pages/Desktop"
import Projects from "./pages/Projects"
import Overview from "./pages/Overview"
import References from "./pages/Refences"
import ViTech from "./components/desktop/vitech"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/desktop" element={<Desktop />} />
      <Route path="/projects" element={<Projects />}>
        <Route index element={<Overview />} />
        <Route path="vitech" element={<ViTech />} />
      </Route>
      <Route path="/references" element={<References />} />
    </Routes>
  )
}
