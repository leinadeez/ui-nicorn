import type { Meta, StoryObj } from '@storybook/react'
import Breadcrumbs from './Breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
}
export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  args: { crumbs: [{ label: 'home', href: '/' }, { label: 'posts', href: '/posts' }, { label: 'my post' }] },
}

export const TwoCrumbs: Story = {
  args: { crumbs: [{ label: 'home', href: '/' }, { label: 'about' }] },
}
