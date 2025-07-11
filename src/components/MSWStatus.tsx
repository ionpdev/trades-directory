"use client"

import { useMSW } from "@/contexts/MSWContext"

export function MSWStatus() {
  const { isReady, error } = useMSW()

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`px-3 py-2 rounded-lg text-sm font-medium ${
          isReady
            ? "bg-green-100 text-green-800 border border-green-200"
            : "bg-yellow-100 text-yellow-800 border border-yellow-200"
        }`}
      >
        {isReady ? "🟢 MSW Ready" : "🟡 MSW Loading..."}
        {error && (
          <div className="text-xs text-red-600 mt-1">Error: {error}</div>
        )}
      </div>
    </div>
  )
}
