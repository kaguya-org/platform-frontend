import { firebaseAuth as firebaseAuthConfig, providers } from '@/config/firebase';
import { useToast } from '@/hooks/useToast';
import * as firebaseAuth from 'firebase/auth';
import { createContext } from 'react';

export type FirebaseAuthContextData = {
  popupSignInWithGithub: () => void;
  popupSignInWithGoogle: () => void;
}

export const FirebaseAuthContext = createContext<FirebaseAuthContextData | null>(null);

export const FirebaseAuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast()
  async function popupSignInWithGithub() {
    try {
      const response = await firebaseAuth.signInWithPopup(firebaseAuthConfig, providers.github.instace_provider);

    } catch {
      addToast({
        title: 'Erro na autenticação com o Github',
        description: 'Ocorreu um erro ao fazer login, tente novamente.',
        appearance: 'error',
      })
    } 
  }
  
  async function popupSignInWithGoogle() {
    try {
      const response = await firebaseAuth.signInWithPopup(firebaseAuthConfig, providers.google.instace_provider);

    } catch {
      addToast({
        title: 'Erro na autenticação com o Google',
        description: 'Ocorreu um erro ao fazer login, tente novamente.',
        appearance: 'error',
      })
    }
  }

  return (
    <FirebaseAuthContext.Provider
      value={{
        popupSignInWithGithub,
        popupSignInWithGoogle,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  )
}