import { FirebaseAuthContext } from '@/contexts/firebaseAuth';
import { useContext } from 'react';

export function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);

  if(!context) {
    throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
  }

  return  context;
}