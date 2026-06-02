import type { Meta, StoryObj } from '@storybook/react'
import IsotopeGallery from './IsotopeGallery'

const meta: Meta<typeof IsotopeGallery> = {
  title: 'Components/IsotopeGallery',
  component: IsotopeGallery,
}
export default meta
type Story = StoryObj<typeof IsotopeGallery>

export const WithLabels: Story = {
  args: {
    images: [
      { src: 'https://picsum.photos/seed/a/400/300', alt: 'Photo A', id: '1', label: 'nature' },
      { src: 'https://picsum.photos/seed/b/400/500', alt: 'Photo B', id: '2', label: 'city' },
      { src: 'https://picsum.photos/seed/c/400/250', alt: 'Photo C', id: '3', label: 'nature' },
      { src: 'https://picsum.photos/seed/d/400/400', alt: 'Photo D', id: '4', label: 'city' },
      { src: 'https://picsum.photos/seed/e/400/350', alt: 'Photo E', id: '5', label: 'nature' },
      { src: 'https://picsum.photos/seed/f/400/450', alt: 'Photo F', id: '6', label: 'city' },
    ],
  },
}

export const NoLabels: Story = {
  args: {
    images: [
      { src: 'https://picsum.photos/seed/a/400/300', alt: 'Photo A', id: '1' },
      { src: 'https://picsum.photos/seed/b/400/500', alt: 'Photo B', id: '2' },
      { src: 'https://picsum.photos/seed/c/400/250', alt: 'Photo C', id: '3' },
    ],
  },
}
