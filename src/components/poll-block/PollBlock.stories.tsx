import type { Meta, StoryObj } from '@storybook/react'
import PollBlock from './PollBlock'

const meta: Meta<typeof PollBlock> = {
  title: 'Components/PollBlock',
  component: PollBlock,
}
export default meta
type Story = StoryObj<typeof PollBlock>

export const Default: Story = {
  args: {
    pollId: 'story-poll',
    question: 'What is your favourite theme?',
    options: ['Matrix', 'Frutiger Aero', 'São Paulo', 'Candy'],
  },
}
