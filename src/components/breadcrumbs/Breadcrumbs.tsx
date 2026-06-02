'use client'

type Crumb = { label: string; href?: string }

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div
      className="border border-solid border-[var(--color-border)] px-2 py-2 mb-1 flex items-center gap-1.5 flex-wrap"
      style={{ fontSize: '0.8rem' }}
    >
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span style={{ color: 'var(--color-border)' }}>{'>'}</span>}
          {crumb.href
            ? <a href={crumb.href} style={{ color: 'var(--color-accent)' }}>{crumb.label}</a>
            : <span style={{ opacity: 0.6 }}>{crumb.label}</span>
          }
        </span>
      ))}
    </div>
  )
}
