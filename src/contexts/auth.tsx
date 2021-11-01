import { AxiosError } from 'axios';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { api, baseApi } from '../services/api';
import { LoginParams } from '../services/apiParams';
import { User, LoginResponse } from '../services/apiResponse';

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
  const slinkedToken = '@slikend:token';
  const getToken = localStorage.getItem(slinkedToken);

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(getToken);
  const history = useHistory();

  async function signIn(credentials: LoginParams): Promise<void> {
    const response = await api.authenticate.login(credentials);

    const { token, user } = response.data;

    localStorage.setItem(slinkedToken, token);

    setUser(user);
    setToken(token);
  }

  const signOut = useCallback(() => {
    history.push('/');

    localStorage.removeItem(slinkedToken);
    
    setUser(null);
    
    return;
  }, [history]);

  useEffect(() => {
    baseApi.interceptors.response.use((response) => {
      return response;
    }, (error: AxiosError) => {
      if(!error.response?.status && (error.response?.statusText === 'xhr' || 'preflight')) {
        // window.location.reload();
        // return false;
        signOut();

        return;
      };

      if(error.response?.status === 401 || error.response?.statusText === '401 Unauthorized') {
        signOut();
        return; 
      }

      return Promise.reject(error);
    });

  }, [history, token, baseApi, signOut]);


  return (
    <AuthContext.Provider
      value={{signIn, signOut, user, token}}
    >
      {children}
    </AuthContext.Provider>
  )
}