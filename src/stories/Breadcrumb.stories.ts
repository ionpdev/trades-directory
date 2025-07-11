import type { Meta, StoryObj } from "@storybook/nextjs"
import Breadcrumb from "../components/Breadcrumb"

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
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

// Home page (no breadcrumb shown)
export const HomePage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
  },
}

// Dashboard page
export const DashboardPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/dashboard",
      },
    },
  },
}

// Search page
export const SearchPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/search",
      },
    },
  },
}

// Nested dashboard page
export const NestedDashboard: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/dashboard/favorites",
      },
    },
  },
}

// Deep nested page
export const DeepNested: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/dashboard/work-history/details",
      },
    },
  },
}
