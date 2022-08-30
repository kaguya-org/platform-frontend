import { createContext, ReactNode, useEffect, useState } from 'react';
import { useBoolean } from '../hooks/useBoolean';
import { api, baseApi, kaguyaApiToken, UserType } from '../services/api';

type AuthContextData = {
  user: UserType.User | null;
  token: string | null;
  tokenIsValid: boolean;
  isSubAdmin: boolean;
  isAdmin: boolean;
  loading_page: boolean;

  signIn(credentials: UserType.LoginParams): Promise<UserType.LoginResponse | undefined>;
  register(credentials: UserType.RegisterUserParams): Promise<UserType.RegisterUserResponse | undefined>;
  signOut(): void;
  setUser: (user: UserType.User) => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserType.User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(kaguyaApiToken));

  const tokenIsValid = useBoolean(false);
  const loading_page = useBoolean(true);

  const isSubAdmin = !!user?.user_roles.some(user_role => user_role.role.permission <= 1)
  const isAdmin = !!user?.user_roles.some(user_role => user_role.role.permission === 0)

  async function validateToken() {
    try {
      loading_page.changeToTrue();
      
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
      signOut();
    } finally {
      loading_page.changeToFalse();
    }
  }

  async function getUserProfile() {
    try {
      const response = await api.user.geral.getProfile();
      
      setUser(response.data);
    } catch(error) {
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
    const response = await api.user.geral.authenticate.login(credentials);

    const { token, user } = response.data;

    baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setToken(token);
    setUser(user);
    tokenIsValid.changeToTrue();
    localStorage.setItem(kaguyaApiToken, token);

    return response.data;
  }

  async function register(credentials: UserType.RegisterUserParams): Promise<UserType.RegisterUserResponse | undefined> {
    const response = await api.user.geral.register(credentials);

    const { token, user } = response.data;

    baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setToken(token);
    setUser(user);
    tokenIsValid.changeToTrue();
    localStorage.setItem(kaguyaApiToken, token);

    return response.data;
  }

  function signOut() {
    localStorage.removeItem(kaguyaApiToken);
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
        setUser,
        user, 
        isSubAdmin,
        isAdmin,
        token, 
        tokenIsValid: tokenIsValid.state, 
        loading_page: loading_page.state,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}