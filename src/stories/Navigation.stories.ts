import type { Meta, StoryObj } from "@storybook/nextjs"
import Navigation from "../components/Navigation"

const meta: Meta<typeof Navigation> = {
  title: "Components/Navigation",
  component: Navigation,
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

// Default Navigation (not logged in)
export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
  },
}

// Navigation on Home page
export const HomePage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
  },
}

// Navigation on Search page
export const SearchPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/search",
      },
    },
  },
}

// Navigation with logged in user (mocked)
export const LoggedIn: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
    msw: {
      handlers: [],
    },
  },
}

// Navigation on Dashboard page with logged in user
export const DashboardPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/dashboard",
      },
    },
  },
}
