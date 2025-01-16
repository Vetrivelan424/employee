/**
  * handling the expensive rendering in  method.
  * @name useDebounce
  * @param {any} value - The value to be string.
  * @returns {string} - The  value as a value.
  * @version 1.0.0
 */


import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

// Usage:
//
// Usage Instructions:
// 1. Import the hook: import useDebounce from './useDebounce';
// 2. Use the hook in your component: const debouncedValue = useDebounce(inputValue, 500);
// 3. The first argument is the value you want to debounce, and the second argument is the delay in milliseconds.
