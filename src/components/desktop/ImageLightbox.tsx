import { useEffect } from "react"

export default function ImageLightbox({
  src,
  onClose,
}: {
  src: string | null
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  if (!src) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative max-h-[95vh] max-w-[95vw] w-auto p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 z-20 px-2 py-1 bg-black text-white rounded"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          Close
        </button>

        <div
          className="overflow-auto"
          style={{ maxHeight: "92vh", maxWidth: "92vw" }}
        >
          <img
            src={src}
            alt="full"
            className="block max-w-full h-auto mx-auto"
          />
        </div>
      </div>
    </div>
  )
}
