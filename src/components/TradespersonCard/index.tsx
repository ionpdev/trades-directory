import React from "react"

type Props = {
  name: string;
  rating: number;
  badges?: string[];
};

const TradespersonCard: React.FC<Props> = ({ name, rating, badges = [] }) => {
  return (
    <div className="p-4 rounded-lg bg-white shadow hover:shadow-md transition border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600">⭐ {rating.toFixed(1)} rating</p>

      {badges.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default TradespersonCard
