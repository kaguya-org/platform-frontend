import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { AuthProvider } from './contexts/auth';
import { FirebaseAuthProvider } from './contexts/firebaseAuth';
import { ToastProvider } from './contexts/toast';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <FirebaseAuthProvider>
          <App />
        </FirebaseAuthProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
