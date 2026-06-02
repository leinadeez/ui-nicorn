'use client'

import { useState } from 'react'
import type { GalleryImage } from '@leinadeez/not-my-types'

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div>
      <div style={{ width: '100%', display: 'block', overflowX: 'auto' }}>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, width: images.length * 150 }}>
          {images.map((img, i) => (
            <li
              key={img.id}
              onClick={() => setCurrent(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                border: `1px solid ${i === current ? 'var(--color-border)' : hovered === i ? 'var(--color-accent)' : 'var(--color-background)'}`,
                cursor: 'pointer',
                width: 150,
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} style={{ width: 150, height: 'auto', display: 'block' }} />
            </li>
          ))}
        </ul>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={images[current].src} alt={images[current].alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
    </div>
  )
}
