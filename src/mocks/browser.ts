import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

export const worker = setupWorker(...handlers)

// Configure the worker for better debugging
worker.events.on("request:start", ({ request }) => {
  console.log("[MSW] %s %s", request.method, request.url)
})

worker.events.on("request:match", ({ request }) => {
  console.log("[MSW] Matched %s %s", request.method, request.url)
})

worker.events.on("request:unhandled", ({ request }) => {
  console.log("[MSW] Unhandled %s %s", request.method, request.url)
})
