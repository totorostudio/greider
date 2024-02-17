import { useState, useEffect } from 'react';
import { getToken } from '../services';

export function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    setIsAuth(!!token);
    setIsLoading(false);
  }, []);

  return { isAuth, setIsAuth, isLoading };
}
