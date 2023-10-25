import React, { useEffect, useState, useRef } from 'react'
import { Noise } from 'noisejs'

function Bubbles() {
  const CANVAS_WIDTH = 3000

  // The amplitude. The amount the noise affects the movement.
  const NOISE_AMOUNT = 10

  // The frequency. Smaller for flat slopes, higher for jagged spikes.
  const NOISE_SPEED = 0.003

  // Pixels to move per frame. At 60fps, this would be 18px a sec.
  const SCROLL_SPEED = 0.2

  const bubbles = [
    {
      s: 0.7,
      x: 1134,
      y: 45,
      name: 'crunchyroll'
    },
    {
      s: 0.7,
      x: 1620,
      y: 271,
      name: 'youtube'
    },
    {
      s: 0.7,
      x: 1761,
      y: 372,
      name: 'playstation'
    },
    {
      s: 0.6,
      x: 2499,
      y: 79,
      name: 'hma'
    },
    {
      s: 0.6,
      x: 2704,
      y: 334,
      name: 'express'
    },
    {
      s: 0.7,
      x: 2271,
      y: 356,
      name: 'deezer'
    },
    {
      s: 0.7,
      x: 795,
      y: 226,
      name: 'disneyplus'
    },
    {
      s: 0.7,
      x: 276,
      y: 256,
      name: 'netflix'
    },
    {
      s: 0.7,
      x: 1210,
      y: 365,
      name: 'spotify'
    },
    {
      s: 0.7,
      x: 444,
      y: 193,
      name: 'spotify'
    },
    {
      s: 0.6,
      x: 2545,
      y: 387,
      name: 'ai'
    },
    {
      s: 0.7,
      x: 1303,
      y: 193,
      name: 'cc'
    },
    {
      s: 0.6,
      x: 907,
      y: 88,
      name: 'ae'
    },
    {
      s: 0.7,
      x: 633,
      y: 320,
      name: 'xbox'
    },
    {
      s: 0.7,
      x: 323,
      y: 60,
      name: 'wakanim'
    },
    {
      s: 0.7,
      x: 129,
      y: 357,
      name: 'office'
    },
    {
      s: 0.6,
      x: 1440,
      y: 342,
      name: 'canva'
    },
    {
      s: 0.7,
      x: 1200,
      y: 293,
      name: 'ps'
    },
    {
      s: 0.6,
      x: 2135,
      y: 198,
      name: 'mcafee'
    },
    {
      s: 0.7,
      x: 200,
      y: 82,
      name: 'netflix'
    },
    {
      s: 0.7,
      x: 2654,
      y: 182,
      name: 'disneyplus'
    },
    {
      s: 0.7,
      x: 2783,
      y: 60,
      name: 'youtube'
    }
  ]

  const noise = new Noise()

  const animationRef = useRef()

  const bubblesRef = useRef(
    bubbles.map(bubble => ({
      ...bubble,
      noiseSeedX: Math.floor(Math.random() * 70000),
      noiseSeedY: Math.floor(Math.random() * 64000),
      xWithNoise: bubble.x,
      yWithNoise: bubble.y
    }))
  )

  const [isReady, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, 200)

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  function animate() {
    bubblesRef.current = bubblesRef.current.map((bubble, index) => {
      const newNoiseSeedX = bubble.noiseSeedX + NOISE_SPEED
      const newNoiseSeedY = bubble.noiseSeedY + NOISE_SPEED

      const randomX = noise.simplex2(newNoiseSeedX, 0)
      const randomY = noise.simplex2(newNoiseSeedY, 0)

      const newX = bubble.x - SCROLL_SPEED

      const newXWithNoise = newX + randomX * NOISE_AMOUNT
      const newYWithNoise = bubble.y + randomY * NOISE_AMOUNT

      const element = document.getElementById(`bubble-${index}`)

      if (element) {
        element.style.transform = `translate(${newXWithNoise}px, ${newYWithNoise}px) scale(${bubble.s})`
      }

      return {
        ...bubble,
        noiseSeedX: newNoiseSeedX,
        noiseSeedY: newNoiseSeedY,
        x: newX < -200 ? CANVAS_WIDTH : newX,
        xWithNoise: newXWithNoise,
        yWithNoise: newYWithNoise
      }
    })

    animationRef.current = requestAnimationFrame(animate)
  }

  return (
    <div style={{ zIndex: 0 }} className='bubbles-wrapper'>
      <div className='bubbles'>
        {bubbles.map((bubble, index) => (
          <div
            className={`bubble ${bubble.name}`}
            id={`bubble-${index}`}
            key={`${bubble.x} ${bubble.y}`}
            style={{
              transform: `translate(${bubble.x}px, ${bubble.y}px) scale(${bubble.s})`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Bubbles
