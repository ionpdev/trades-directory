import TradespersonCard from "."

export default {
  title: "Components/TradespersonCard",
  component: TradespersonCard,
}

export const Default = {
  args: {
    name: "Jane Electrician",
    rating: 4.9,
    badges: ["Verified", "Top Rated"],
  },
}
