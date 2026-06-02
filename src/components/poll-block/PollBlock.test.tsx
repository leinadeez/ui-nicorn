import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PollBlock from './PollBlock'

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

const defaultProps = {
  pollId: 'poll-1',
  question: 'Favourite colour?',
  options: ['Red', 'Blue', 'Green'],
}

describe('PollBlock', () => {
  it('renders the question and options after loading', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ json: async () => ({ votes: [0, 0, 0] }) } as Response)
    render(<PollBlock {...defaultProps} />)
    expect(screen.getByText('Favourite colour?')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('Red')).toBeInTheDocument())
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Green')).toBeInTheDocument()
  })

  it('disables options after voting', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ json: async () => ({ votes: [1, 0, 0] }) } as Response)
    render(<PollBlock {...defaultProps} />)
    await waitFor(() => screen.getByText('Red'))
    await userEvent.click(screen.getByText('Red'))
    const buttons = screen.getAllByRole('button')
    buttons.forEach(btn => expect(btn).toBeDisabled())
  })

  it('saves vote to localStorage', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ json: async () => ({ votes: [1, 0, 0] }) } as Response)
    render(<PollBlock {...defaultProps} />)
    await waitFor(() => screen.getByText('Red'))
    await userEvent.click(screen.getByText('Red'))
    expect(localStorage.getItem('poll_voted_poll-1')).toBe('0')
  })
})
