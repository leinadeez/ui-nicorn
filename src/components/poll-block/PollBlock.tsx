'use client'

import { useState, useEffect } from 'react'

interface Props {
  pollId: string
  question: string
  options: string[]
  apiUrl?: string
}

export default function PollBlock({ pollId, question, options, apiUrl = 'http://localhost:3001' }: Props) {
  const storageKey = `poll_voted_${pollId}`
  const [votes, setVotes] = useState<number[]>([])
  const [voted, setVoted] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored !== null) setVoted(Number(stored))

    fetch(`${apiUrl}/polls/${pollId}`)
      .then(r => r.json())
      .then(data => setVotes(data.votes ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [pollId, storageKey, apiUrl])

  async function handleVote(i: number) {
    if (voted !== null) return
    setVoted(i)
    localStorage.setItem(storageKey, String(i))

    setVotes(prev => {
      const next = prev.length ? [...prev] : Array(options.length).fill(0)
      next[i] = (next[i] ?? 0) + 1
      return next
    })

    try {
      const res = await fetch(`${apiUrl}/polls/${pollId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionIndex: i, optionCount: options.length }),
      })
      const data = await res.json()
      if (data.votes) setVotes(data.votes)
    } catch {}
  }

  const total = votes.reduce((s, v) => s + (v ?? 0), 0)

  return (
    <div className="border border-solid border-[var(--color-border)] px-3 py-3 my-2">
      <p style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.9rem' }}>{question}</p>
      {loading ? (
        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Loading…</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {options.map((opt, i) => {
            const count = votes[i] ?? 0
            const pct = total > 0 ? Math.round((count / total) * 100) : 0
            const isVoted = voted === i

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleVote(i)}
                disabled={voted !== null}
                style={{
                  textAlign: 'left',
                  background: 'none',
                  border: '1px solid var(--color-border)',
                  cursor: voted !== null ? 'default' : 'pointer',
                  padding: '0.4rem 0.6rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {voted !== null && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${pct}%`,
                    background: isVoted ? 'var(--color-accent)' : 'var(--color-border)',
                    opacity: 0.25,
                    transition: 'width 0.4s ease',
                  }} />
                )}
                <span style={{ position: 'relative', fontSize: '0.82rem', color: isVoted ? 'var(--color-accent)' : 'var(--color-foreground)' }}>
                  {opt}
                  {voted !== null && <span style={{ marginLeft: '0.5rem', opacity: 0.6 }}>{pct}%</span>}
                </span>
              </button>
            )
          })}
          {voted !== null && (
            <p style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: '0.25rem' }}>
              {total} {total === 1 ? 'vote' : 'votes'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
