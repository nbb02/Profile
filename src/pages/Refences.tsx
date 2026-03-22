export default function References() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        type="button"
        onClick={() => window.history.back()}
        aria-label="Go back"
        className="fixed left-6 top-6 w-10 h-10 rounded-lg glass flex items-center justify-center text-sm font-medium shadow-sm hover:scale-105 transition-transform"
      >
        ←
      </button>
      <h1 className="text-3xl font-bold mb-4">Credits & References</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Libraries & Tools</h2>
        <ul className="list-disc ml-6 mt-2 space-y-1 text-sm text-slate-700">
          <li>
            Three.js —{" "}
            <a
              href="https://threejs.org/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              threejs.org
            </a>
          </li>
          <li>
            React Three Fiber (renderer for React + three) —{" "}
            <a
              href="https://github.com/pmndrs/react-three-fiber"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              react-three-fiber
            </a>
          </li>
          <li>
            react-grid-layout & react-resizable (layout utilities) —{" "}
            <a
              href="https://github.com/react-grid-layout/react-grid-layout"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              react-grid-layout
            </a>
          </li>
          <li>
            react-icons —{" "}
            <a
              href="https://react-icons.github.io/react-icons/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              react-icons
            </a>
          </li>
          <li>
            GSAP for animations —{" "}
            <a
              href="https://greensock.com/gsap/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              greensock
            </a>
          </li>
          <li>
            Vite, Tailwind CSS, and TypeScript —
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {" "}
              Vite
            </a>
            ,
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {" "}
              TypeScript
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">3D Models & Assets</h2>
        <p className="text-sm text-slate-700 mt-2">
          Models used in this portfolio (local files available under{" "}
          <span className="font-mono">src/assets/</span>) and their sources:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1 text-sm text-slate-700">
          <li>
            Rubik's Cube — source:{" "}
            <a
              href="https://skfb.ly/opCGZ"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Sketchfab
            </a>
            . Local files and license:{" "}
            <a
              href="/src/assets/rubiks_cube/license.txt"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              src/assets/rubiks_cube/license.txt
            </a>
          </li>
          <li>
            Sun — source:{" "}
            <a
              href="https://skfb.ly/oy8RZ"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Sketchfab
            </a>
            . Local files and license:{" "}
            <a
              href="/src/assets/sun/license.txt"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              src/assets/sun/license.txt
            </a>
          </li>
          <li>
            Moon — source:{" "}
            <a
              href="https://skfb.ly/6TwGU"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Sketchfab
            </a>
            . Local files and license:{" "}
            <a
              href="/src/assets/moon/license.txt"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              src/assets/moon/license.txt
            </a>
          </li>
          <li>
            Laptop model (mac-draco.glb) — included locally at{" "}
            <span className="font-mono">src/assets/laptop/mac-draco.glb</span>.
            Example / reference:{" "}
            <a
              href="https://codesandbox.io/p/sandbox/9keg6"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              example usage
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Licenses & Notes</h2>
        <p className="text-sm text-slate-700 mt-2">
          Local license files are included alongside their model assets (see{" "}
          <span className="font-mono">src/assets/*/license.txt</span>). For
          third-party libraries, consult each project's repository or website
          (links above) for licensing details.
        </p>
      </section>
    </div>
  )
}
