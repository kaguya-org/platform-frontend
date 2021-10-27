import { createContext, ReactNode, useEffect, useState } from 'react';
import { api, baseApi } from '../services/api';
import { LoginParams } from '../services/apiParams';
import { User, LoginResponse } from '../services/apiResponse';

type AuthContextData = {
  user: User | null;
  token: string;
  signIn(credentials: LoginParams): Promise<void>;
  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState('');

  const slinkedToken = '@slikend:token'

  useEffect(() => {

  }, []);

  async function signIn(credentials: LoginParams): Promise<void> {
    const response = await api.authenticate.login(credentials);

    const { token, user } = response.data;

    localStorage.setItem(slinkedToken, token);

    baseApi.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
    setToken(token);
  }

  function signOut() {
    localStorage.removeItem(slinkedToken);

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{signIn, signOut, user, token}}
    >
      {children}
    </AuthContext.Provider>
  )
}