import type { Meta, StoryObj } from '@storybook/react'
import Gallery from './Gallery'

const meta: Meta<typeof Gallery> = {
  title: 'Components/Gallery',
  component: Gallery,
}
export default meta
type Story = StoryObj<typeof Gallery>

export const Default: Story = {
  args: {
    images: [
      { src: 'https://picsum.photos/seed/a/300/200', alt: 'Photo A', id: '1' },
      { src: 'https://picsum.photos/seed/b/300/200', alt: 'Photo B', id: '2' },
      { src: 'https://picsum.photos/seed/c/300/200', alt: 'Photo C', id: '3' },
      { src: 'https://picsum.photos/seed/d/300/200', alt: 'Photo D', id: '4' },
    ],
  },
}
