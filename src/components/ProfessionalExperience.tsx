import {
  Suspense,
  useLayoutEffect,
  useMemo,
  useRef,
  type RefObject,
} from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Center,
  Environment,
  Float,
  OrbitControls,
  useGLTF,
} from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"
import sunModelUrl from "../assets/sun/scene.gltf?url"
import moonModelUrl from "../assets/moon/scene.gltf?url"

type RoleItem = {
  title: string
  company: string
  range: string
  highlights: string[]
}

type SkyBody = "sun" | "moon"

type SkyOrbProps = {
  body: SkyBody
  className: string
  orbRef: RefObject<HTMLDivElement | null>
  modelUrl: string
  left: string
  top: string
  opacity: number
}

type SceneStyles = {
  sectionBackground: string
  themeVars: Record<string, string>
  sunLeft: string
  moonLeft: string
  sunTop: string
  moonTop: string
  sunOpacity: number
  moonOpacity: number
}

const ROLES: RoleItem[] = [
  {
    title: "Software Engineer (Co-Owner)",
    company: "WeMove Technology Inc.",
    range: "September 2025 - March 2026",
    highlights: [
      "Built and launched a logistics platform competing with Lalamove and Grab, reaching ~50k registered users.",
      "Designed backend services using Node.js, Express.js, and MySQL; implemented drop-off PIN verification and rider-customer bidding features.",
      "Deployed and managed AWS infrastructure (EC2, RDS, ElastiCache, S3, CloudFront, Lightsail) with monitoring via CloudWatch and a React-based frontend.",
      "Implemented a Dockerized observability stack with Redis Exporter, Node Exporter, Prometheus, Grafana, Loki, and HTTP statistics monitoring for infrastructure and application visibility.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Freelance",
    range: "January 2025 - September 2025",
    highlights: [
      "Developed and maintained web applications for clients using React, Laravel, and MySQL.",
      "Built full-stack solutions with Next.js and MongoDB, implementing responsive UI, REST APIs, and database integration.",
    ],
  },
  {
    title: "Intern to Junior Back-End Developer",
    company: "8Box Solutions Inc",
    range: "January 2025 - September 2025",
    highlights: [
      "Developed backend services using Node.js and Express.js integrated with MySQL.",
      "Assisted in server deployment, configuration, and maintenance using cPanel.",
    ],
  },
]

const MOTION_START = 0.18

function lerp(start: number, end: number, t: number) {
  return Math.round(start + (end - start) * t)
}

function mixColor(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number,
) {
  return `rgb(${lerp(a[0], b[0], t)} ${lerp(a[1], b[1], t)} ${lerp(a[2], b[2], t)})`
}

function mixRgba(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number,
  alpha: number,
) {
  return `rgba(${lerp(a[0], b[0], t)}, ${lerp(a[1], b[1], t)}, ${lerp(a[2], b[2], t)}, ${alpha})`
}

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

function toPercent(start: number, end: number, t: number) {
  return `${start + (end - start) * t}%`
}

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2
}

function arcPercent(start: number, control: number, end: number, t: number) {
  const inverse = 1 - t
  return `${inverse * inverse * start + 2 * inverse * t * control + t * t * end}%`
}

function buildSceneStyles(progress: number): SceneStyles {
  const sceneProgress = clamp((progress - MOTION_START) / (1 - MOTION_START))
  const daylightProgress = clamp(sceneProgress / 0.5)
  const moonlightProgress = clamp((sceneProgress - 0.5) / 0.5)

  const warmTop = [255, 245, 205] as const
  const warmBottom = [238, 252, 255] as const
  const duskTop = [57, 81, 135] as const
  const duskBottom = [22, 42, 82] as const
  const nightTop = [21, 32, 63] as const
  const nightBottom = [8, 17, 36] as const

  const bgTop =
    sceneProgress <= 0.5
      ? mixColor(warmTop, duskTop, sceneProgress / 0.5)
      : mixColor(duskTop, nightTop, (sceneProgress - 0.5) / 0.5)
  const bgBottom =
    sceneProgress <= 0.5
      ? mixColor(warmBottom, duskBottom, sceneProgress / 0.5)
      : mixColor(duskBottom, nightBottom, (sceneProgress - 0.5) / 0.5)
  const textProgress = clamp((sceneProgress - 0.58) / 0.22)
  const sunMotion = easeInOutSine(daylightProgress)
  const moonMotion = easeInOutSine(moonlightProgress)

  return {
    sectionBackground: `linear-gradient(160deg, ${bgTop}, ${bgBottom})`,
    themeVars: {
      "--experience-kicker": mixColor(
        [22, 78, 99],
        [148, 163, 184],
        textProgress,
      ),
      "--experience-title": mixColor(
        [15, 23, 42],
        [226, 232, 240],
        textProgress,
      ),
      "--experience-role-title": mixColor(
        [15, 23, 42],
        [248, 250, 252],
        textProgress,
      ),
      "--experience-role-meta": mixColor(
        [51, 65, 85],
        [219, 234, 254],
        textProgress,
      ),
      "--experience-role-body": mixColor(
        [15, 23, 42],
        [241, 245, 249],
        textProgress,
      ),
      "--experience-card-bg": mixRgba(
        [255, 255, 255],
        [255, 255, 255],
        textProgress,
        0.12 + (1 - textProgress) * 0.68,
      ),
      "--experience-card-border": mixRgba(
        [15, 23, 42],
        [226, 232, 240],
        textProgress,
        0.08 + textProgress * 0.17,
      ),
      "--experience-title-shadow": mixRgba(
        [15, 23, 42],
        [15, 23, 42],
        textProgress,
        0.08 + textProgress * 0.37,
      ),
    },
    sunLeft: toPercent(33, 108, sunMotion),
    moonLeft: toPercent(24, 68, moonMotion),
    sunTop: arcPercent(25, 9, 23, sunMotion),
    moonTop: arcPercent(29, 11, 21, moonMotion),
    sunOpacity: 1 - moonlightProgress,
    moonOpacity: sceneProgress > 0.5 ? moonlightProgress : 0,
  }
}

function SkyScene({ body, modelUrl }: { body: SkyBody; modelUrl: string }) {
  const modelRef = useRef<THREE.Group>(null)
  const gltf = useGLTF(modelUrl)
  const scale = body === "sun" ? 1.15 : 0.016
  const tilt = body === "sun" ? 0.22 : -0.18

  const preparedScene = useMemo(() => {
    const scene = gltf.scene.clone(true)

    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) {
        return
      }

      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material]

      materials.forEach((mat) => {
        const material = mat as THREE.MeshStandardMaterial
        if (material.map) {
          material.map.colorSpace = THREE.SRGBColorSpace
          material.map.anisotropy = 8
          material.map.needsUpdate = true
        }

        material.side = THREE.DoubleSide
        material.needsUpdate = true
      })
    })

    return scene
  }, [gltf.scene])

  useFrame((state, delta) => {
    if (!modelRef.current) {
      return
    }

    modelRef.current.rotation.y += delta * (body === "sun" ? 0.45 : 0.28)
    modelRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.7) * 0.08 + tilt
  })

  return (
    <Float
      speed={body === "sun" ? 1.5 : 1.15}
      rotationIntensity={0.35}
      floatIntensity={0.9}
    >
      <group ref={modelRef} scale={scale}>
        <Center>
          <primitive object={preparedScene} dispose={null} />
        </Center>
      </group>
    </Float>
  )
}

function SkyOrb({
  body,
  className,
  orbRef,
  modelUrl,
  left,
  top,
  opacity,
}: SkyOrbProps) {
  return (
    <div
      ref={orbRef}
      className={className}
      style={{ left, top, opacity }}
      aria-hidden="true"
    >
      <Canvas
        className="sky-model-canvas"
        camera={{ position: [0, 0, 9], fov: body === "sun" ? 32 : 30 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={1.8} />
        <pointLight
          position={[-4, -2, 4]}
          intensity={0.8}
          color={body === "sun" ? "#ffd166" : "#dbeafe"}
        />

        <Suspense fallback={null}>
          <Environment preset={body === "sun" ? "sunset" : "night"} />
          <SkyScene body={body} modelUrl={modelUrl} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(Math.PI * 2) / 3}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload(sunModelUrl)
useGLTF.preload(moonModelUrl)

export default function ProfessionalExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const sectionPanelRef = useRef<HTMLDivElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const moonRef = useRef<HTMLDivElement>(null)
  const initialScene = buildSceneStyles(0)

  useLayoutEffect(() => {
    const shell = sectionRef.current
    const panel = sectionPanelRef.current
    const sun = sunRef.current
    const moon = moonRef.current

    if (!shell || !panel || !sun || !moon) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const state = { progress: 0 }
    const renderScene = () => {
      const scene = buildSceneStyles(state.progress)

      panel.style.backgroundImage = scene.sectionBackground
      Object.entries(scene.themeVars).forEach(([key, value]) => {
        panel.style.setProperty(key, value)
      })

      gsap.set(sun, {
        left: scene.sunLeft,
        top: scene.sunTop,
        opacity: scene.sunOpacity,
      })
      gsap.set(moon, {
        left: scene.moonLeft,
        top: scene.moonTop,
        opacity: scene.moonOpacity,
      })
    }

    const ctx = gsap.context(() => {
      renderScene()

      gsap.to(state, {
        progress: 1,
        ease: "none",
        onUpdate: renderScene,
        scrollTrigger: {
          trigger: shell,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      })
    }, shell)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="professional-scroll-shell">
      <div
        className="professional-section"
        ref={sectionPanelRef}
        style={{ backgroundImage: initialScene.sectionBackground }}
      >
        <div className="professional-sky">
          <SkyOrb
            body="sun"
            className="sky-body sky-body-shell sky-sun"
            orbRef={sunRef}
            modelUrl={sunModelUrl}
            left={initialScene.sunLeft}
            top={initialScene.sunTop}
            opacity={initialScene.sunOpacity}
          />
          <SkyOrb
            body="moon"
            className="sky-body sky-body-shell sky-moon"
            orbRef={moonRef}
            modelUrl={moonModelUrl}
            left={initialScene.moonLeft}
            top={initialScene.moonTop}
            opacity={initialScene.moonOpacity}
          />
        </div>

        <div className="professional-content">
          <p className="section-kicker professional-kicker">Journey</p>
          <h2 className="section-title professional-title">
            Professional Experience
          </h2>

          <div className="mt-6 space-y-4">
            {ROLES.map((role) => (
              <article
                key={`${role.title}-${role.company}`}
                className="professional-role"
              >
                <h3 className="professional-role-title">{role.title}</h3>
                <p className="professional-role-meta">
                  {role.company} <span aria-hidden="true">|</span> {role.range}
                </p>
                <ul className="professional-role-list">
                  {role.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
