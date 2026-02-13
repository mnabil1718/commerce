/**
 * Hooks to fix hydration issues with zustand persistence middleware
 */
import { useState, useEffect } from 'react'

const useStore = <S, F>(
  store: <T>(selector: (state: S) => T) => T, 
  selector: (state: S) => F
) => {
  const result = store(selector);
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(() => result);
  }, [result]);

  return data;
};

export default useStore
