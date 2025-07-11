import { useEffect, useCallback, useRef } from "react"
import {
  useLazyQuery,
  type LazyQueryHookOptions,
  type OperationVariables,
} from "@apollo/client"
import type { DocumentNode } from "graphql"
import { useMSW } from "@/contexts/MSWContext"

export const useLazyQueryWithMSW = <
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  query: DocumentNode,
  options?: LazyQueryHookOptions<TData, TVariables>
) => {
  const { isReady } = useMSW()
  const [executeQuery, result] = useLazyQuery<TData, TVariables>(query, options)

  // Use a ref to store the latest executeQuery to avoid recreating the callback
  const executeQueryRef = useRef(executeQuery)
  executeQueryRef.current = executeQuery

  const executeWhenReady = useCallback(
    (executeOptions?: Parameters<typeof executeQuery>[0]) => {
      if (isReady) {
        return executeQueryRef.current(executeOptions)
      } else {
        console.warn("[MSW] Query attempted before MSW is ready, deferring...")
        return new Promise<void>((resolve) => {
          const checkReady = () => {
            if (isReady) {
              executeQueryRef.current(executeOptions)
              resolve()
            } else {
              setTimeout(checkReady, 100)
            }
          }
          checkReady()
        })
      }
    },
    [isReady]
  )

  return [executeWhenReady, result] as const
}

export const useQueryOnMSWReady = <
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  query: DocumentNode,
  options?: LazyQueryHookOptions<TData, TVariables>,
  executeOptions?: Parameters<
    ReturnType<typeof useLazyQuery<TData, TVariables>>[0]
  >[0]
) => {
  const { isReady } = useMSW()
  const [executeQuery, result] = useLazyQuery<TData, TVariables>(query, options)

  const memoizedExecuteQuery = useCallback(() => {
    if (isReady) {
      executeQuery(executeOptions)
    }
  }, [isReady, executeQuery, executeOptions])

  useEffect(() => {
    memoizedExecuteQuery()
  }, [memoizedExecuteQuery])

  return [executeQuery, result] as const
}
