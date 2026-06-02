import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import SpoilerImage from './SpoilerImage'

describe('SpoilerImage', () => {
  it('renders the image with blur filter initially', () => {
    render(<SpoilerImage src="/test.jpg" alt="test image" />)
    const img = screen.getByAltText('test image')
    expect(img.style.filter).toContain('blur')
  })

  it('shows the spoiler hint text initially', () => {
    render(<SpoilerImage src="/test.jpg" alt="test image" />)
    expect(screen.getByText(/spoiler — click to reveal/i)).toBeInTheDocument()
  })

  it('removes blur and hint text after click', async () => {
    render(<SpoilerImage src="/test.jpg" alt="test image" />)
    const container = screen.getByAltText('test image').parentElement!
    await userEvent.click(container)
    const img = screen.getByAltText('test image')
    expect(img.style.filter).toBe('none')
    expect(screen.queryByText(/spoiler — click to reveal/i)).toBeNull()
  })
})
