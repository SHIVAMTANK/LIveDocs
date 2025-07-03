import { useCallback, useRef } from "react";


//not send request to the server until the user stops typing for a certain amount of time
export function useDebounce<
  T extends (...args: Parameters<T>) => ReturnType<T>
>(callback: T, delay: number = 1000) { 
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}
