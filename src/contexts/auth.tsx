import { useBoolean } from '../hooks/useBoolean';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { UserType, slinkedApiToken, baseApi, api } from '../services/api';

type AuthContextData = {
  user: UserType.User | null;
  token: string | null;
  tokenIsValid: boolean;

  signIn(credentials: UserType.LoginParams): Promise<UserType.LoginResponse | undefined>;
  register(credentials: UserType.RegisterUserParams): Promise<UserType.RegisterUserResponse | undefined>;
  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const history = useHistory();
  
  const [user, setUser] = useState<UserType.User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenIsValid, setTokenIsValid] = useState(true);

  const loading = useBoolean(true);

  useEffect(() => {
    const getToken = localStorage.getItem(slinkedApiToken);
    setToken(getToken);
    
    baseApi.defaults.headers.common['Authorization'] = `Bearer ${getToken}`;

    api.user.geral.token.validate().then(response => {
      setTokenIsValid(response.data.validated);

      if(!(response.data.validated || token)) {
        setTokenIsValid(false);
      }
    });

    api.user.geral.getProfile().then(response => {
      setUser(response.data);
    })

    return () => loading.changeToFalse();
  }, []);

  async function signIn(credentials: UserType.LoginParams): Promise<UserType.LoginResponse | undefined> {
    const response = await api.user.geral.authenticate.login(credentials);

    const { token, user } = response.data;

    const userMapped = {
      ...user,
      user_roles: [{
        role: user.user_roles[0].role,
      }],
    };

    localStorage.setItem(slinkedApiToken, token);

    baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setToken(token);
    setUser(userMapped);
    setTokenIsValid(true);

    const responseModified = {
      user: userMapped,
      token,
    };

    return responseModified || undefined;
  }

  async function register(credentials: UserType.RegisterUserParams): Promise<UserType.RegisterUserResponse | undefined> {
    const response = await api.user.geral.register(credentials);

    // localStorage.setItem(slinkedApiToken, token);

    // baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // setToken(token);
    setUser(response.data.user);
    setTokenIsValid(true);

    return response.data || undefined;
  }

  function signOut(redirect?: {
    to?: string;
  }) {
    localStorage.removeItem(slinkedApiToken);

    if(redirect) {
      history.push(redirect.to || '/login');
    }
  }

  return (
    <AuthContext.Provider
      value={{signIn, register, signOut, user, token, tokenIsValid}}
    >
      {children}
    </AuthContext.Provider>
  )
}