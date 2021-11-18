import { useBoolean } from '../hooks/useBoolean';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import { api, baseApi, slinkedApiToken } from '../services/api';
import { LoginParams, RegisterUserParams } from '../services/apiParams';
import { User, LoginResponse, RegisterUserResponse} from '../services/apiResponse';

type AuthContextData = {
  user: User | null;
  token: string | null;
  tokenIsValid: boolean;

  signIn(credentials: LoginParams): Promise<LoginResponse | undefined>;
  register(credentials: RegisterUserParams): Promise<RegisterUserResponse | undefined>;
  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const history = useHistory();
  
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenIsValid, setTokenIsValid] = useState(true);

  const loading = useBoolean(true);

  useEffect(() => {
    const getToken = localStorage.getItem(slinkedApiToken);
    setToken(getToken);
    
    baseApi.defaults.headers.common['Authorization'] = `Bearer ${getToken}`;

    api.user.token.validate().then(response => {
      setTokenIsValid(response.data.validated);

      if(!(response.data.validated || token)) {
        setTokenIsValid(false);
      }
    });

    api.user.getProfile().then(response => {
      setUser(response.data);
    })

    return () => loading.changeToFalse();
  }, []);

  async function signIn(credentials: LoginParams): Promise<LoginResponse | undefined> {
    const response = await api.authenticate.login(credentials);

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

  async function register(credentials: RegisterUserParams): Promise<RegisterUserResponse | undefined> {
    const response = await api.user.register(credentials);

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