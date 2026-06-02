import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PostReactions from './PostReactions'

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('PostReactions', () => {
  it('renders all four reaction buttons', () => {
    render(<PostReactions postId="post-1" />)
    expect(screen.getByText(/😊/)).toBeInTheDocument()
    expect(screen.getByText(/😂/)).toBeInTheDocument()
    expect(screen.getByText(/😢/)).toBeInTheDocument()
    expect(screen.getByText(/😠/)).toBeInTheDocument()
  })

  it('displays initial reaction counts', () => {
    render(<PostReactions postId="post-1" initialReactions={{ happy: 5, laughing: 3, sad: 1, angry: 0 }} />)
    expect(screen.getByText(/😊 5/)).toBeInTheDocument()
    expect(screen.getByText(/😂 3/)).toBeInTheDocument()
  })

  it('optimistically updates count on click', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false } as Response)
    render(<PostReactions postId="post-1" initialReactions={{ happy: 2, laughing: 0, sad: 0, angry: 0 }} />)
    await userEvent.click(screen.getByText(/😊 2/))
    expect(screen.getByText(/😊 3/)).toBeInTheDocument()
  })

  it('saves reaction to localStorage', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false } as Response)
    render(<PostReactions postId="post-1" />)
    await userEvent.click(screen.getByText(/😊/))
    expect(localStorage.getItem('reaction:post-1')).toBe('happy')
  })
})
