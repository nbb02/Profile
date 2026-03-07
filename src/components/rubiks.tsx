import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Float, Environment } from "@react-three/drei"
import type { GLTF } from "three-stdlib"
import * as THREE from "three"
import modelUrl from "../assets/rubiks_cube/rubiks_cube.gltf?url"

export default function Rubiks() {
  function RubiksModel() {
    const gltf = useGLTF(modelUrl) as GLTF
    const { scene } = gltf
    const ref = useRef<THREE.Object3D>(null)

    const rotSpeed = { x: 0.2, y: 0.8, z: 0.15 }

    useFrame((_, delta) => {
      if (ref.current) {
        ref.current.rotation.x += delta * rotSpeed.x
        ref.current.rotation.y += delta * rotSpeed.y
        ref.current.rotation.z += delta * rotSpeed.z
      }
    })

    return <primitive ref={ref} object={scene} dispose={null} />
  }

  return (
    <Canvas
      camera={{ position: [0, 40, 5], fov: 20 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <hemisphereLight args={[0xffffff, 0x444444, 0.7]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Float speed={1.05} rotationIntensity={0.4} floatIntensity={0.8}>
          <RubiksModel />
        </Float>
      </Suspense>

      <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1.1} />
    </Canvas>
  )
}
