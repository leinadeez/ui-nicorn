'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { IsotopeImage } from '@leinadeez/not-my-types'

type Props = {
  images: IsotopeImage[]
}

export default function IsotopeGallery({ images }: Props) {
  const [cols, setCols] = useState(3)
  const [activeLabel, setActiveLabel] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const update = () =>
      setCols(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const labels = Array.from(
    new Set(images.map(img => img.label).filter((l): l is string => !!l))
  )
  const hasLabels = labels.length > 0

  const filtered = activeLabel
    ? images.filter(img => img.label === activeLabel)
    : images

  const colImages = Array.from({ length: cols }, (_, colIdx) =>
    filtered.filter((_, i) => i % cols === colIdx)
  )

  function handleLabelChange(label: string | null) {
    setActiveLabel(label)
    setLightboxIndex(null)
  }

  function openLightbox(img: IsotopeImage) {
    setLightboxIndex(filtered.findIndex(i => i.id === img.id))
  }

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft')
        setLightboxIndex(prev => (prev !== null ? Math.max(0, prev - 1) : null))
      if (e.key === 'ArrowRight')
        setLightboxIndex(prev =>
          prev !== null ? Math.min(filtered.length - 1, prev + 1) : null
        )
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, filtered.length])

  const lightboxImage = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <>
      {hasLabels && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          <FilterBtn label="all" active={activeLabel === null} onClick={() => handleLabelChange(null)} />
          {labels.map(label => (
            <FilterBtn key={label} label={label} active={activeLabel === label} onClick={() => handleLabelChange(label)} />
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 4, alignItems: 'start' }}>
        {colImages.map((colImgs, colIdx) => (
          <div key={colIdx} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <AnimatePresence mode="popLayout">
              {colImgs.map(img => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.2 }}
                  style={{ cursor: 'pointer', overflow: 'hidden' }}
                  onClick={() => openLightbox(img)}
                >
                  <img src={img.src} alt={img.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setLightboxIndex(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {lightboxIndex! > 0 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? i - 1 : null) }} style={navBtnStyle('left')}>←</button>
            )}
            <motion.img
              key={lightboxImage.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', display: 'block' }}
            />
            {lightboxIndex! < filtered.length - 1 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? i + 1 : null) }} style={navBtnStyle('right')}>→</button>
            )}
            <button onClick={e => { e.stopPropagation(); setLightboxIndex(null) }} style={{ position: 'absolute', top: 16, right: 16, ...overlayBtnStyle }}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ color: active ? 'var(--color-background)' : 'var(--color-accent)', background: active ? 'var(--color-accent)' : 'transparent', border: '1px solid var(--color-accent)', padding: '2px 10px', fontSize: '0.75rem', cursor: 'pointer', borderRadius: 2, transition: 'background 0.15s, color 0.15s' }}>
      {label}
    </button>
  )
}

const overlayBtnStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid rgba(255,255,255,0.3)',
  color: 'white',
  fontSize: '1.3rem',
  padding: '6px 13px',
  cursor: 'pointer',
  lineHeight: 1,
}

function navBtnStyle(side: 'left' | 'right'): React.CSSProperties {
  return { position: 'absolute', [side]: 16, ...overlayBtnStyle, zIndex: 1001 }
}
