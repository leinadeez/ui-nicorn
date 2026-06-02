import type { Meta, StoryObj } from '@storybook/react'
import SpoilerImage from './SpoilerImage'

const meta: Meta<typeof SpoilerImage> = {
  title: 'Components/SpoilerImage',
  component: SpoilerImage,
}
export default meta
type Story = StoryObj<typeof SpoilerImage>

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/seed/spoiler/800/450',
    alt: 'A spoiler image',
  },
}
