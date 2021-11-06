import { createContext, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { api, baseApi, slinkedApiToken } from '../services/api';
import { LoginParams } from '../services/apiParams';
import { User, LoginResponse} from '../services/apiResponse';

type AuthContextData = {
  user: User | null;
  token: string | null;
  tokenIsValid: boolean | undefined;

  signIn(credentials: LoginParams): Promise<LoginResponse | undefined>;
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

  useEffect(() => {
    const getToken = localStorage.getItem(slinkedApiToken);
    setToken(getToken);

    const getUser = localStorage.getItem('user');

    baseApi.defaults.headers.common['Authorization'] = `Bearer ${getToken}`;

    api.user.token.validate().then(response => {
      setTokenIsValid(response.data.validated);
    });

    setUser(getUser ? JSON.parse(getUser) : null);
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

  function signOut(redirect?: boolean) {
    localStorage.removeItem(slinkedApiToken);

    if(redirect) {
      history.push('/login');
    }
  }

  return (
    <AuthContext.Provider
      value={{signIn, signOut, user, token, tokenIsValid}}
    >
      {children}
    </AuthContext.Provider>
  )
}