'use client'

import { useState } from 'react'

export default function SpoilerImage({ src, alt }: { src: string; alt: string }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', cursor: revealed ? 'default' : 'pointer' }}
      onClick={() => !revealed && setRevealed(true)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          filter: revealed ? 'none' : 'blur(20px) brightness(0.8)',
          transform: revealed ? 'none' : 'scale(1.08)',
          transition: 'filter 0.4s ease, transform 0.4s ease',
          display: 'block',
        }}
      />
      {!revealed && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <span style={{
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            padding: '6px 16px',
            borderRadius: 3,
            fontSize: 13,
            letterSpacing: '0.04em',
          }}>
            spoiler — click to reveal
          </span>
        </div>
      )}
    </div>
  )
}
