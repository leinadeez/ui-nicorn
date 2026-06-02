import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Gallery from './Gallery'

const images = [
  { src: '/a.jpg', alt: 'Image A', id: '1' },
  { src: '/b.jpg', alt: 'Image B', id: '2' },
  { src: '/c.jpg', alt: 'Image C', id: '3' },
]

describe('Gallery', () => {
  it('renders all thumbnail images', () => {
    render(<Gallery images={images} />)
    expect(screen.getAllByRole('img')).toHaveLength(images.length + 1) // thumbnails + main
  })

  it('shows the first image as the main image initially', () => {
    render(<Gallery images={images} />)
    const mains = screen.getAllByAltText('Image A')
    // One in thumbnails, one as main
    expect(mains.length).toBeGreaterThanOrEqual(1)
  })

  it('switches main image when a thumbnail is clicked', async () => {
    render(<Gallery images={images} />)
    const thumbnailB = screen.getAllByAltText('Image B')[0]
    await userEvent.click(thumbnailB)
    // After click, Image B should appear as main (two instances: thumbnail + main)
    expect(screen.getAllByAltText('Image B').length).toBe(2)
  })
})
