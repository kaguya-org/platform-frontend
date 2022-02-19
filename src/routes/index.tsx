import { BrowserRouter } from 'react-router-dom';

import { Loading } from '@/components';
import { useAuth } from '@/hooks';

import { Routers } from './Routers';

export function AppRoutes() {
  const { loading_page } = useAuth();

  return (
    <>
      {loading_page ? (
        <Loading size={'72px'} />
      ) : (
        <BrowserRouter>
          <Routers /> 
        </BrowserRouter>
      )}
    </>
  );
}