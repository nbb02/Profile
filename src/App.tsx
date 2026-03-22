import "./index.css"
import { Route, Routes } from "react-router"
import Profile from "./pages/Profile"
import Desktop from "./pages/Desktop"
import ViTech from "./components/desktop/vitech"
import Projects from "./pages/Projects"
import References from "./pages/Refences"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/desktop" element={<Desktop />} />
      <Route path="/vitech" element={<ViTech />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/references" element={<References />} />
    </Routes>
  )
}
