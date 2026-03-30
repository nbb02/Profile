import { useState, useEffect, useRef } from "react"
import dashboardImg from "../assets/cards/dashboard.png"
import paintImg from "../assets/cards/paint.png"
import vitechImg from "../assets/cards/ViTech.drawio.png"

type Card = {
  id: string
  image: string
}

const INITIAL_CARDS: Card[] = [
  {
    id: "dashboard",
    image: dashboardImg,
  },
  {
    id: "paint",
    image: paintImg,
  },
  {
    id: "vitech",
    image: vitechImg,
  },
]

const AUTO_SWITCH_INTERVAL = 5000 // 5 seconds
const PAUSE_DURATION = 8000 // 8 seconds pause after user interaction

export default function InteractiveCards() {
  const [cards, setCards] = useState<Card[]>(INITIAL_CARDS)
  const autoSwitchRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const autoSwitch = () => {
    setCards((prevCards) => {
      const newCards = [...prevCards]
      const [lastCard] = newCards.splice(prevCards.length - 1, 1)
      newCards.unshift(lastCard)
      return newCards
    })
  }

  const startAutoSwitch = () => {
    if (autoSwitchRef.current) clearInterval(autoSwitchRef.current)
    autoSwitchRef.current = setInterval(autoSwitch, AUTO_SWITCH_INTERVAL)
  }

  const pauseAutoSwitch = () => {
    if (autoSwitchRef.current) clearInterval(autoSwitchRef.current)

    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    pauseTimeoutRef.current = setTimeout(() => {
      startAutoSwitch()
    }, PAUSE_DURATION)
  }

  const handleCardClick = (id: string) => {
    const index = cards.findIndex((card) => card.id === id)
    if (index > 0) {
      const newCards = [...cards]
      const [clickedCard] = newCards.splice(index, 1)
      newCards.unshift(clickedCard)
      setCards(newCards)
      pauseAutoSwitch()
    }
  }

  useEffect(() => {
    startAutoSwitch()

    return () => {
      if (autoSwitchRef.current) clearInterval(autoSwitchRef.current)
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    }
  }, [])

  return (
    <section className="reveal reveal-delay-1 py-12">
      <div className="flex justify-center items-center h-96 relative">
        <style>{`
          .card-item {
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .card-background {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: blur(20px);
            z-index: -1;
          }
          .card-foreground {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        `}</style>

        <div className="relative w-full max-w-lg h-full">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="card-item absolute w-full h-full cursor-pointer rounded-xl overflow-hidden shadow-lg"
              style={{
                zIndex: cards.length - index,
                transform:
                  index === 0
                    ? "translateY(0) rotate(0deg) scale(1)"
                    : `translateY(${index * 30}px) rotateZ(${index * 8}deg)`,
              }}
            >
              <img
                src={card.image}
                alt={`${card.id}-bg`}
                className="card-background"
              />
              <img src={card.image} alt={card.id} className="card-foreground" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
