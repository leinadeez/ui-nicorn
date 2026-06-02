import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import IsotopeGallery from './IsotopeGallery'

vi.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, layout: _l, initial: _i, animate: _a, exit: _e, transition: _t, ...props }: any) => <div {...props}>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: ({ layout: _l, initial: _i, animate: _a, exit: _e, transition: _t, ...props }: any) => <img {...props} />,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const images = [
  { src: '/a.jpg', alt: 'Image A', id: '1', label: 'cats' },
  { src: '/b.jpg', alt: 'Image B', id: '2', label: 'dogs' },
  { src: '/c.jpg', alt: 'Image C', id: '3', label: 'cats' },
]

describe('IsotopeGallery', () => {
  it('renders all images initially', () => {
    render(<IsotopeGallery images={images} />)
    expect(screen.getByAltText('Image A')).toBeInTheDocument()
    expect(screen.getByAltText('Image B')).toBeInTheDocument()
    expect(screen.getByAltText('Image C')).toBeInTheDocument()
  })

  it('shows filter buttons when labels are present', () => {
    render(<IsotopeGallery images={images} />)
    expect(screen.getByText('all')).toBeInTheDocument()
    expect(screen.getByText('cats')).toBeInTheDocument()
    expect(screen.getByText('dogs')).toBeInTheDocument()
  })

  it('filters images when a label button is clicked', async () => {
    render(<IsotopeGallery images={images} />)
    await userEvent.click(screen.getByText('cats'))
    expect(screen.getByAltText('Image A')).toBeInTheDocument()
    expect(screen.getByAltText('Image C')).toBeInTheDocument()
    expect(screen.queryByAltText('Image B')).toBeNull()
  })

  it('shows all images when all button is clicked', async () => {
    render(<IsotopeGallery images={images} />)
    await userEvent.click(screen.getByText('dogs'))
    await userEvent.click(screen.getByText('all'))
    expect(screen.getByAltText('Image A')).toBeInTheDocument()
    expect(screen.getByAltText('Image B')).toBeInTheDocument()
    expect(screen.getByAltText('Image C')).toBeInTheDocument()
  })

  it('does not show filter buttons when no labels are present', () => {
    const unlabelled = images.map(({ label: _, ...img }) => img)
    render(<IsotopeGallery images={unlabelled} />)
    expect(screen.queryByText('all')).toBeNull()
  })
})
