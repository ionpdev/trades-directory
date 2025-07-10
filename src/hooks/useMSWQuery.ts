import { useEffect, useCallback, useRef } from "react";
import {
  useLazyQuery,
  type LazyQueryHookOptions,
  type OperationVariables,
} from "@apollo/client";
import { useMSW } from "@/contexts/MSWContext";
import type { DocumentNode } from "graphql";

/**
 * Custom hook that wraps useLazyQuery and only executes queries when MSW is ready
 * This prevents race conditions between MSW initialization and GraphQL queries
 */
export function useLazyQueryWithMSW<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(query: DocumentNode, options?: LazyQueryHookOptions<TData, TVariables>) {
  const { isReady } = useMSW();
  const [executeQuery, result] = useLazyQuery<TData, TVariables>(
    query,
    options
  );

  // Use a ref to store the latest executeQuery to avoid recreating the callback
  const executeQueryRef = useRef(executeQuery);
  executeQueryRef.current = executeQuery;

  // Return a wrapped execute function that checks MSW readiness
  const executeWhenReady = useCallback(
    (executeOptions?: Parameters<typeof executeQuery>[0]) => {
      if (isReady) {
        return executeQueryRef.current(executeOptions);
      } else {
        console.warn("[MSW] Query attempted before MSW is ready, deferring...");
        // Return a promise that resolves when MSW is ready
        return new Promise<void>((resolve) => {
          const checkReady = () => {
            if (isReady) {
              executeQueryRef.current(executeOptions);
              resolve();
            } else {
              setTimeout(checkReady, 100); // Check every 100ms
            }
          };
          checkReady();
        });
      }
    },
    [isReady]
  ); // Only depend on isReady

  return [executeWhenReady, result] as const;
}

/**
 * Hook to automatically execute a query when MSW is ready
 * Useful for queries that should run immediately on component mount
 */
export function useQueryOnMSWReady<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  query: DocumentNode,
  options?: LazyQueryHookOptions<TData, TVariables>,
  executeOptions?: Parameters<
    ReturnType<typeof useLazyQuery<TData, TVariables>>[0]
  >[0]
) {
  const { isReady } = useMSW();
  const [executeQuery, result] = useLazyQuery<TData, TVariables>(
    query,
    options
  );

  // Memoize the execute function to prevent infinite loops
  const memoizedExecuteQuery = useCallback(() => {
    if (isReady) {
      executeQuery(executeOptions);
    }
  }, [isReady, executeQuery, executeOptions]);

  useEffect(() => {
    memoizedExecuteQuery();
  }, [memoizedExecuteQuery]);

  return [executeQuery, result] as const;
}
