import type { Meta, StoryObj } from '@storybook/react'
import PostReactions from './PostReactions'

const meta: Meta<typeof PostReactions> = {
  title: 'Components/PostReactions',
  component: PostReactions,
}
export default meta
type Story = StoryObj<typeof PostReactions>

export const Default: Story = {
  args: {
    postId: 'story-post',
    initialReactions: { happy: 12, laughing: 4, sad: 1, angry: 0 },
  },
}

export const NoReactions: Story = {
  args: {
    postId: 'story-post-empty',
    initialReactions: { happy: 0, laughing: 0, sad: 0, angry: 0 },
  },
}
