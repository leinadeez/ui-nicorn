'use client'

import { useState, useEffect } from 'react'
import type { Reactions } from '@leinadeez/not-my-types'

type ReactionType = keyof Reactions

const REACTIONS: { type: ReactionType; emoji: string }[] = [
  { type: 'happy', emoji: '😊' },
  { type: 'laughing', emoji: '😂' },
  { type: 'sad', emoji: '😢' },
  { type: 'angry', emoji: '😠' },
]

interface Props {
  postId: string
  initialReactions?: Partial<Reactions>
  apiUrl?: string
}

export default function PostReactions({ postId, initialReactions, apiUrl = 'http://localhost:3001' }: Props) {
  const [reactions, setReactions] = useState<Reactions>({
    happy: initialReactions?.happy ?? 0,
    sad: initialReactions?.sad ?? 0,
    angry: initialReactions?.angry ?? 0,
    laughing: initialReactions?.laughing ?? 0,
  })
  const [myReaction, setMyReaction] = useState<ReactionType | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(`reaction:${postId}`) as ReactionType | null
    setMyReaction(stored)
  }, [postId])

  async function handleClick(type: ReactionType) {
    const previous = myReaction
    const next = previous === type ? null : type

    setReactions(prev => {
      const updated = { ...prev }
      if (previous) updated[previous] = Math.max(0, updated[previous] - 1)
      if (next) updated[next] = updated[next] + 1
      return updated
    })
    setMyReaction(next)
    if (next) localStorage.setItem(`reaction:${postId}`, next)
    else localStorage.removeItem(`reaction:${postId}`)

    try {
      const res = await fetch(`${apiUrl}/posts/${postId}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: next, previous: previous ?? undefined }),
      })
      if (res.ok) {
        const data = await res.json()
        setReactions(data.reactions)
      }
    } catch {
      setReactions(prev => {
        const reverted = { ...prev }
        if (next) reverted[next] = Math.max(0, reverted[next] - 1)
        if (previous) reverted[previous] = reverted[previous] + 1
        return reverted
      })
      setMyReaction(previous)
      if (previous) localStorage.setItem(`reaction:${postId}`, previous)
      else localStorage.removeItem(`reaction:${postId}`)
    }
  }

  return (
    <div className="flex gap-2 mt-3 mb-1 flex-wrap">
      {REACTIONS.map(({ type, emoji }) => (
        <button
          key={type}
          onClick={() => handleClick(type)}
          style={{
            background: myReaction === type ? 'var(--color-accent)' : 'transparent',
            border: '1px solid var(--color-border)',
            color: myReaction === type ? 'var(--color-bg)' : 'var(--color-text)',
            borderRadius: '999px',
            padding: '2px 12px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            opacity: reactions[type] === 0 && myReaction !== type ? 0.45 : 1,
            transition: 'background 0.15s, color 0.15s, opacity 0.15s',
          }}
        >
          {emoji} {reactions[type]}
        </button>
      ))}
    </div>
  )
}
