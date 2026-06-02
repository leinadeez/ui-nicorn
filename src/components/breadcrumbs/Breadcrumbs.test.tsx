import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Breadcrumbs from './Breadcrumbs'

describe('Breadcrumbs', () => {
  it('renders all crumb labels', () => {
    render(<Breadcrumbs crumbs={[{ label: 'home', href: '/' }, { label: 'posts' }]} />)
    expect(screen.getByText('home')).toBeInTheDocument()
    expect(screen.getByText('posts')).toBeInTheDocument()
  })

  it('renders a link for crumbs with href', () => {
    render(<Breadcrumbs crumbs={[{ label: 'home', href: '/' }]} />)
    const link = screen.getByRole('link', { name: 'home' })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders a plain span for crumbs without href', () => {
    render(<Breadcrumbs crumbs={[{ label: 'current' }]} />)
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText('current')).toBeInTheDocument()
  })

  it('renders separators between crumbs', () => {
    render(<Breadcrumbs crumbs={[{ label: 'home', href: '/' }, { label: 'posts' }, { label: 'entry' }]} />)
    const separators = screen.getAllByText('>')
    expect(separators).toHaveLength(2)
  })
})
