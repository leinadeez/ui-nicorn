# ui-nicorn

Reusable React component library extracted from the girlrobot blog. Published to GitHub Packages as `@leinadeez/ui-nicorn`.

## Components

| Component | Description |
|---|---|
| `Breadcrumbs` | `{ label, href? }[]` nav bar styled with the standard border pattern |
| `Gallery` | Grid of images with lightbox (prev/next + keyboard navigation) |
| `IsotopeGallery` | Masonry gallery with label-based filtering and Framer Motion FLIP animations |
| `PollBlock` | Embeddable poll with localStorage vote dedup, animated fill bars, and optimistic updates |
| `PostReactions` | Happy / sad / angry / laughing reaction buttons with optimistic UI and localStorage per-post tracking |
| `SpoilerImage` | Image hidden behind a click-to-reveal overlay |

## Installation

This package is published to GitHub Packages. You need a GitHub token with `read:packages` scope.

Add to your `.npmrc`:
```
@leinadeez:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install:
```bash
pnpm add @leinadeez/ui-nicorn
```

### Peer dependencies

```bash
pnpm add react react-dom framer-motion
```

## Usage

```tsx
import { Breadcrumbs, Gallery, IsotopeGallery, PollBlock, PostReactions, SpoilerImage } from '@leinadeez/ui-nicorn'
```

`PollBlock` and `PostReactions` accept an `apiUrl` prop (defaults to `http://localhost:3001`):

```tsx
<PollBlock apiUrl={process.env.NEXT_PUBLIC_API_URL} pollId="..." question="..." options={[...]} />
<PostReactions apiUrl={process.env.NEXT_PUBLIC_API_URL} postId="..." reactions={post.reactions} />
```

## Development

```bash
pnpm install
pnpm dev          # watch build
pnpm test         # Vitest + React Testing Library (22 tests)
pnpm storybook    # Storybook 8 on port 6006
```

