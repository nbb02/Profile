import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { useThree } from "@react-three/fiber"
import {
  Environment,
  useGLTF,
  useTexture,
  ContactShadows,
  OrbitControls,
  Html,
} from "@react-three/drei"
import { Suspense, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import type { GLTF } from "three-stdlib"
import laptopModelUrl from "../assets/laptop/mac-draco.glb"
import laptopScreenImage from "../assets/github.com_nbb02_4_35.png"
import { TbHandClick } from "react-icons/tb"

type LaptopGLTF = GLTF & {
  nodes: {
    Cube008: THREE.Mesh
    Cube008_1: THREE.Mesh
    Cube008_2: THREE.Mesh
    keyboard: THREE.Mesh
    Cube002: THREE.Mesh
    Cube002_1: THREE.Mesh
    touchbar: THREE.Mesh
  }
  materials: {
    aluminium: THREE.Material
    "matte.001": THREE.Material
    keys: THREE.Material
    trackpad: THREE.Material
    touchbar: THREE.Material
  }
}

const SCREEN_TEXTURE_FLIP_Y = false
const SCREEN_VIEWPORT_MAX_REPEAT_Y = 0.56

function getTextureOffsetY(scroll: number, maxOffset: number) {
  return SCREEN_TEXTURE_FLIP_Y ? maxOffset - scroll : scroll
}

function Model({ onScreenClick }: { onScreenClick?: () => void }) {
  const group = useRef<THREE.Group>(null)
  const screenScrollRef = useRef(0)
  const maxTextureOffsetRef = useRef(0)
  const isScreenHoveredRef = useRef(false)
  const screenMapRef = useRef<THREE.Texture | null>(null)
  const screenMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

  const { nodes, materials } = useGLTF(laptopModelUrl) as unknown as LaptopGLTF
  const maxAnisotropy = useThree((state) =>
    state.gl.capabilities.getMaxAnisotropy(),
  )
  const screenTexture = useTexture(laptopScreenImage)

  useEffect(() => {
    const material = screenMaterialRef.current
    if (!material) {
      return
    }

    const texture = screenTexture.clone()
    texture.flipY = SCREEN_TEXTURE_FLIP_Y
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.generateMipmaps = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.anisotropy = Math.min(16, maxAnisotropy)
    texture.needsUpdate = true

    const image = texture.image as
      | { width?: number; height?: number }
      | undefined
    const imageWidth = image?.width ?? 0
    const imageHeight = image?.height ?? 0

    if (!imageWidth || !imageHeight) {
      return
    }

    // Approximate physical display ratio of the laptop screen mesh.
    const screenAspect = 1.6
    const imageAspect = imageWidth / imageHeight
    // Keep a visible "window" smaller than the full image so wheel scrolling
    // is always meaningful even for wide screenshots.
    const repeatY = Math.min(
      SCREEN_VIEWPORT_MAX_REPEAT_Y,
      imageAspect / screenAspect,
    )

    texture.repeat.set(1, repeatY)
    maxTextureOffsetRef.current = Math.max(0, 1 - repeatY)

    // Start from the top of the screenshot.
    screenScrollRef.current = 0
    texture.offset.set(
      0,
      getTextureOffsetY(screenScrollRef.current, maxTextureOffsetRef.current),
    )
    material.map = texture
    material.needsUpdate = true
    screenMapRef.current = texture

    return () => {
      if (screenMapRef.current === texture) {
        screenMapRef.current = null
      }
      texture.dispose()
    }
  }, [maxAnisotropy, screenTexture])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!isScreenHoveredRef.current) {
        return
      }

      event.preventDefault()

      if (maxTextureOffsetRef.current <= 0) {
        return
      }

      const nextScroll = THREE.MathUtils.clamp(
        screenScrollRef.current + event.deltaY * 0.0006,
        0,
        maxTextureOffsetRef.current,
      )

      screenScrollRef.current = nextScroll
      const texture = screenMapRef.current
      if (!texture) {
        return
      }

      texture.offset.y = getTextureOffsetY(
        nextScroll,
        maxTextureOffsetRef.current,
      )
    }

    window.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel)
    }
  }, [])

  useFrame((state) => {
    if (!group.current) {
      return
    }

    const t = state.clock.getElapsedTime()

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.cos(t / 2) / 20 + 0.25,
      0.1,
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t / 4) / 20,
      0.1,
    )
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(t / 8) / 20,
      0.1,
    )
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      (-2 + Math.sin(t / 2)) / 2,
      0.1,
    )
  })

  return (
    <group ref={group} dispose={null}>
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          <mesh
            geometry={nodes["Cube008_2"].geometry}
            onPointerOver={(event) => {
              event.stopPropagation()
              isScreenHoveredRef.current = true
            }}
            onPointerOut={() => {
              isScreenHoveredRef.current = false
            }}
            onClick={(event) => {
              event.stopPropagation()
              if (onScreenClick) onScreenClick()
            }}
          >
            <meshBasicMaterial ref={screenMaterialRef} toneMapped={false} />
          </mesh>
        </group>
      </group>
      <Html
        position={[0, 2.6, 0]}
        transform
        occlude={false}
        style={{ pointerEvents: "none", width: "160px", textAlign: "center" }}
        center
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              padding: "8px 12px",
              borderRadius: 9999,
              background: "rgba(0,0,0,0.65)",
              color: "white",
              fontSize: 13,
              opacity: 0.95,
              animation: "fadeBlink 1.6s ease-in-out infinite",
            }}
          >
            <TbHandClick size={30} />
          </div>
        </div>
        <style>{`@keyframes fadeBlink{0%{opacity:0}30%{opacity:0.95}70%{opacity:0.6}100%{opacity:0}}`}</style>
      </Html>
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes["Cube002"].geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes["Cube002_1"].geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  )
}

useGLTF.preload(laptopModelUrl)

export default function Laptop() {
  const navigate = useNavigate()
  const navigateToDesktop = () => navigate("/desktop")

  return (
    <>
      <Canvas camera={{ position: [-5, 0, -15], fov: 55 }} dpr={[1, 2]}>
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
            <Model onScreenClick={() => navigateToDesktop()} />
          </group>
          <Environment preset="city" />
        </Suspense>
        <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </>
  )
}
