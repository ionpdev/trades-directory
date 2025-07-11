import React from "react"
import { render, screen } from "@testing-library/react"
import TradespersonCard from "."

describe("TradespersonCard", () => {
  it("renders name and rating", () => {
    render(<TradespersonCard name="Jane Electrician" rating={4.9} />)
    expect(screen.getByText("Jane Electrician")).toBeInTheDocument()
    expect(screen.getByText(/4.9/)).toBeInTheDocument()
  })

  it("renders badges when provided", () => {
    render(
      <TradespersonCard
        name="Mike Builder"
        rating={4.5}
        badges={["Certified"]}
      />
    )
    expect(screen.getByText("Certified")).toBeInTheDocument()
  })
})
