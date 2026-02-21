import { useState,  useCallback } from 'react';
import { logger } from '../lib/logger';

export function useLocalStorage<T> (key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item) as T;
      }
      return initialValue;
    } catch (error) {
      logger.warn(`Failed to read localStorage key "${key}"`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T | undefined) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          if (valueToStore === undefined) {
            window.localStorage.removeItem(key);
          } else {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
        }
      } catch (error) {
        logger.error(`Failed to write localStorage key "${key}"`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(undefined);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      logger.error(`Failed to remove localStorage key "${key}"`, error);
    }
  }, [key]);

  return [storedValue, setValue, removeValue] as const;
}
