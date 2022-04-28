import { ToastContainer } from '@/components/ToastContainer';
import React, { createContext, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

export type ToastContextProps = {
  addToast: (message: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  toasts: ToastMessage[];
}

export type ToastMessage = {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

export const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const newToast = {
        id,
        type,
        title,
        description,
      };

      if(toasts.length <= 6) { 
        setToasts(oldToasts => [...oldToasts, newToast]);
      }

    },
    [toasts],
  );

  const removeToast = useCallback((id: string) => {
    setToasts(toasts => toasts.filter(toast => toast.id !== id));
  }, []);


  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
        toasts,
      }}
    >
      {children}
      <ToastContainer messages={toasts} />
    </ToastContext.Provider>
  );
};



export { ToastProvider };
