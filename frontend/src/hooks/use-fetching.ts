import { useState} from 'react';

type CallbackFunction = () => Promise<void>;

export const useFetching = (callback: CallbackFunction) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  };

  return {fetching, isLoading, error};
}
