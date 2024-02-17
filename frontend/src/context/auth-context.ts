import { createContext, Dispatch, SetStateAction } from 'react';

interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
