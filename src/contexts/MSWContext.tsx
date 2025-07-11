"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface MSWContextType {
  isReady: boolean;
  error: string | null;
}

const MSWContext = createContext<MSWContextType>({
  isReady: false,
  error: null,
})

export const useMSW = () => {
  const context = useContext(MSWContext)
  if (!context) {
    throw new Error("useMSW must be used within an MSWProvider")
  }
  return context
}

interface MSWProviderProps {
  children: React.ReactNode;
}

export const MSWProvider: React.FC<MSWProviderProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[MSW] Starting worker in development mode...")

      import("@/mocks/start")
        .then((mod) => {
          if (mod.worker) {
            return mod.worker.start()
          } else {
            throw new Error("Worker not found in module")
          }
        })
        .then(() => {
          console.log("[MSW] Worker started successfully")
          setIsReady(true)
        })
        .catch((err) => {
          console.error("[MSW] Failed to start worker:", err)
          setError(err.message)
          // In case of error, still set ready to true so app can function
          setIsReady(true)
        })
    } else {
      // In production, MSW is not needed, so mark as ready immediately
      setIsReady(true)
    }
  }, [])

  return (
    <MSWContext.Provider value={{ isReady, error }}>
      {children}
    </MSWContext.Provider>
  )
}
