import type { Meta, StoryObj } from "@storybook/nextjs"
import HeroSection from "../components/HeroSection"

const meta: Meta<typeof HeroSection> = {
  title: "Components/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

// Default Hero Section
export const Default: Story = {}

// Hero Section with different content variations
export const AlternateContent: Story = {}
