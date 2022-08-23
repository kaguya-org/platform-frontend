import { BrowserRouter } from 'react-router-dom';
import { Routers } from './Routers';

export function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routers /> 
      </BrowserRouter>
    </>
  );
}