import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { LoginParams } from '../services/apiParams';
import { User } from '../services/apiResponse';

type AuthContextData = {
  user: User | null;
  token: string | null;
  signIn(credentials: LoginParams): Promise<void>;
  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const slinkedToken = '@slinked:token';
  const getToken = localStorage.getItem(slinkedToken);

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(getToken);

  async function signIn(credentials: LoginParams): Promise<void> {
    const response = await api.authenticate.login(credentials);

    const { token, user } = response.data;

    localStorage.setItem(slinkedToken, token);

    setUser(user);
    setToken(token);
  }

  function signOut() {
    localStorage.removeItem(slinkedToken);

    setUser(null);

    window.location.href = '/';
    
    return;
  }

  return (
    <AuthContext.Provider
      value={{signIn, signOut, user, token}}
    >
      {children}
    </AuthContext.Provider>
  )
}