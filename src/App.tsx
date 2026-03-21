import "./index.css"
import { Route, Routes } from "react-router"
import Profile from "./pages/Profile"
import Desktop from "./pages/Desktop"
import ViTech from "./components/desktop/vitech"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/desktop" element={<Desktop />} />
      <Route path="/vitech" element={<ViTech />} />
    </Routes>
  )
}
