import { useBoolean } from '../hooks/useBoolean';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserType, slinkedApiToken, baseApi, api } from '../services/api';

type AuthContextData = {
  user: UserType.User | null;
  token: string | null;
  tokenIsValid: boolean;

  loading_page: boolean;

  signIn(credentials: UserType.LoginParams): Promise<UserType.LoginResponse | undefined>;
  register(credentials: UserType.RegisterUserParams): Promise<UserType.RegisterUserResponse | undefined>;
  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserType.User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(slinkedApiToken));

  const tokenIsValid = useBoolean(false);
  const loading_page = useBoolean(true);

  async function validateToken() {
    try {
      const response = await api.user.geral.token.validate();

      const { validated } = response.data;

      tokenIsValid.setState(validated);

      if(!(validated || token)) {
        signOut();
      }

      return {
        validated
      };
    } catch(error) {
      console.log(error);
    } finally {
      loading_page.changeToFalse();
    }
  }

  async function getUserProfile() {
    try {
      const response = await api.user.geral.getProfile();
      
      setUser(response.data);
    } catch(error) {
      console.log(error);
    } finally {
      return loading_page.changeToFalse();
    }
  }

  async function initialMethods() {
    const validate_response = await validateToken();

    if(validate_response?.validated) {
      getUserProfile();
    }
  }

  useEffect(() => {
    baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    initialMethods();
  }, []);

  async function signIn(credentials: UserType.LoginParams): Promise<UserType.LoginResponse | undefined> {
    try {
      const response = await api.user.geral.authenticate.login(credentials);
  
      const { token, user } = response.data;
  
      baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      setToken(token);
      setUser(user);
      tokenIsValid.changeToTrue();
      localStorage.setItem(slinkedApiToken, token);
  
      return response.data || undefined;
    } catch(error) {
      console.log(error);
    }
  }

  async function register(credentials: UserType.RegisterUserParams): Promise<UserType.RegisterUserResponse | undefined> {
    try {
      const response = await api.user.geral.register(credentials);

      const { user } = response.data;

      setUser(user);
      tokenIsValid.changeToTrue();

      return response.data || undefined;
    } catch(error) {
      console.log(error);
    }
  }

  function signOut() {
    localStorage.removeItem(slinkedApiToken);
    tokenIsValid.changeToFalse();

    baseApi.defaults.headers.common['Authorization'] = '';

    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn, 
        register, 
        signOut, 
        user, 
        token, 
        tokenIsValid: tokenIsValid.state, 
        loading_page: loading_page.state,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}