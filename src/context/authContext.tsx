import { signOut as firebaseSignOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { firebaseAuth, googleAuthProvider } from '../config/firebase';
import type { AuthStateProps } from '../types/auth.types';


interface AuthContextProps {
  authState: AuthStateProps;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [authState, setAuthState] = useState<AuthStateProps>({
    user: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        setAuthState({
          user: null,
          error: null,
          loading: false
        })
        return
      }
      setAuthState({
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.photoURL
        },
        error: null,
        loading: false,
      })
    }, (error) => {
      console.error("Erro na autenticação")
      setAuthState({ user: null, error: error.message, loading: false })
    })

    return () => unsubscribe();
  }, [])

  const signWithGoogle = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao tentar logar"
      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }

  const signOut = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    try {
      await firebaseSignOut(firebaseAuth)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao tentar logar"
      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }



  return (
    <AuthContext.Provider value={{ authState, signWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}