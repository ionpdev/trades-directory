import React from "react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { useRouter, usePathname } from "next/navigation"
import Breadcrumb from "@/components/Breadcrumb"

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}))

const mockUseRouter = useRouter as ReturnType<typeof vi.fn>
const mockUsePathname = usePathname as ReturnType<typeof vi.fn>

describe("Breadcrumb Component", () => {
  const mockPush = vi.fn()

  beforeEach(() => {
    mockPush.mockClear()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    })
  })

  it("should not render on home page", () => {
    mockUsePathname.mockReturnValue("/")

    const { container } = render(<Breadcrumb />)

    expect(container.firstChild).toBeNull()
  })

  it("should render breadcrumb for search page with Home and Search", () => {
    mockUsePathname.mockReturnValue("/search")

    render(<Breadcrumb />)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Search")).toBeInTheDocument()
  })

  it("should render breadcrumb for tradesperson profile page with Home, Search, and Profile", () => {
    mockUsePathname.mockReturnValue("/tradesperson/123")

    render(<Breadcrumb />)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Search")).toBeInTheDocument()
    expect(screen.getByText("Profile")).toBeInTheDocument()
  })

  it("should navigate when clicking breadcrumb items", () => {
    mockUsePathname.mockReturnValue("/search")

    render(<Breadcrumb />)

    const homeButton = screen.getByText("Home")
    fireEvent.click(homeButton)

    expect(mockPush).toHaveBeenCalledWith("/")
  })

  it("should disable current page breadcrumb item", () => {
    mockUsePathname.mockReturnValue("/search")

    render(<Breadcrumb />)

    const searchButton = screen.getByText("Search").closest("button")
    expect(searchButton).toBeDisabled()

    const homeButton = screen.getByText("Home").closest("button")
    expect(homeButton).not.toBeDisabled()
  })

  it("should handle complex nested paths", () => {
    mockUsePathname.mockReturnValue("/tradesperson/456")

    render(<Breadcrumb />)

    const breadcrumbItems = screen.getAllByRole("button")
    expect(breadcrumbItems).toHaveLength(3)

    fireEvent.click(screen.getByText("Search"))
    expect(mockPush).toHaveBeenCalledWith("/search")
  })

  it("should render with correct icons", () => {
    mockUsePathname.mockReturnValue("/tradesperson/789")

    render(<Breadcrumb />)

    const homeButton = screen.getByText("Home").closest("button")
    expect(homeButton?.querySelector("svg")).toBeInTheDocument()

    const searchButton = screen.getByText("Search").closest("button")
    expect(searchButton?.querySelector("svg")).toBeInTheDocument()

    const profileButton = screen.getByText("Profile").closest("button")
    expect(profileButton?.querySelector("svg")).toBeInTheDocument()
  })

  it("should render chevron separators between items", () => {
    mockUsePathname.mockReturnValue("/tradesperson/123")

    const { container } = render(<Breadcrumb />)

    const chevrons = container.querySelectorAll("svg")
    expect(chevrons.length).toBeGreaterThan(2)
  })

  it("should have proper accessibility attributes", () => {
    mockUsePathname.mockReturnValue("/search")

    const { container } = render(<Breadcrumb />)

    const nav = screen.getByRole("navigation") || container.querySelector("nav")
    expect(nav).toBeInTheDocument()

    const buttons = screen.getAllByRole("button")
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument()
    })
  })

  it("should show correct breadcrumb structure for different routes", () => {
    // Test dashboard route
    mockUsePathname.mockReturnValue("/dashboard")

    const { rerender } = render(<Breadcrumb />)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getAllByRole("button")).toHaveLength(1)

    mockUsePathname.mockReturnValue("/tradesperson/abc123")
    rerender(<Breadcrumb />)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Search")).toBeInTheDocument()
    expect(screen.getByText("Profile")).toBeInTheDocument()
  })
})
