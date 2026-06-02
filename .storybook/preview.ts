import type { Preview } from '@storybook/react'

const preview: Preview = {
  decorators: [
    Story => {
      document.documentElement.style.setProperty('--color-accent', '#a855f7')
      document.documentElement.style.setProperty('--color-border', '#4b2d6b')
      document.documentElement.style.setProperty('--color-background', '#0d0010')
      document.documentElement.style.setProperty('--color-foreground', '#f0e6ff')
      return Story()
    },
  ],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0d0010' }],
    },
  },
}

export default preview
