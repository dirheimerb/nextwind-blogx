'use client';
import React from 'react';
import { Session, User } from '@supabase/supabase-js';
import supabase from '../supabase';

// Define the shape of AuthState
interface AuthState {
  user: User | null;
  session: Session | null;
  isSessionActive: boolean;
}

// Defint the shate of AuthAction
type AuthAction =
  | { type: 'INITIAL_SESSION'; payload: Session }
  | { type: 'SIGNED_IN'; payload: Session }
  | { type: 'SIGNED_OUT' }
  | { type: 'USER_UPDATED'; payload: User }
  | { type: 'PASSWORD_RECOVERY'; payload: Session }
  | { type: 'TOKEN_REFRESHED'; payload: Session };

// Initialize context
export const AuthContext = React.createContext<AuthState | null>(null);
export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
export const AuthDispatchContext =
  React.createContext<React.Dispatch<any> | null>(null);

// AuthProvider props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Initialize context
export const initialState: AuthState = {
  user: null,
  session: null,
  isSessionActive: false,
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [sessions, dispatch] = React.useReducer(authReducer, initialState);

  const [session, setSession] = React.useState<Session | null>(null);
  const [user, setUser] = React.useState<any | null>(null);
  const [isSessionActive, setIsSessionActive] = React.useState<boolean>(false);

  const handleAuthChange = (event: string, session: Session | null) => {
    switch (event) {
      case 'SIGNED_IN':
        dispatch({
          type: 'SIGNED_IN',
          payload: session!,
        });
        break;
      case 'SIGNED_OUT':
        dispatch({
          type: 'SIGNED_OUT',
        });
        break;
      case 'USER_UPDATED':
        dispatch({
          type: 'USER_UPDATED',
          payload: session!.user,
        });
        break;
      case 'PASSWORD_RECOVERY':
        dispatch({
          type: 'PASSWORD_RECOVERY',
          payload: session!,
        });
        break;
      case 'TOKEN_REFRESHED':
        dispatch({
          type: 'TOKEN_REFRESHED',
          payload: session!,
        });
        break;
      case 'INITIAL_SESSION':
        dispatch({
          type: 'INITIAL_SESSION',
          payload: session!,
        });
        break;
      default:
        break;
    }

    if (
      [
        'SIGNED_IN',
        'TOKEN_REFRESHED',
        'PASSWORD_RECOVERY',
        'USER_UPDATED',
        'INITIAL_SESSION',
      ].includes(event)
    ) {
      sessionStorage.setItem(
        'supabase.auth.token',
        session?.access_token ?? '',
      );
      setSession(session);
      setUser(session?.user ?? null);
      setIsSessionActive(true);
    } else {
      sessionStorage.removeItem('supabase.auth.token');
      setSession(null);
      setUser(null);
      setIsSessionActive(false);
    }
  };

  React.useEffect(() => {
    const { data: authListener } =
      supabase.auth.onAuthStateChange(handleAuthChange);
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const getSessionAndUser = async () => {
      const { data: currentSession, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        return;
      }

      handleAuthChange('INITIAL_SESSION', currentSession?.session);
    };

    getSessionAndUser();
  }, []);

  // Memoize the context value to update when the session updates
  const value = React.useMemo(
    () => ({ session, user, isSessionActive }),
    [session, user, isSessionActive],
  );
  // Provide the context to your app
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

interface AuthReducerProps {
  state: AuthState;
  action: AuthAction;
}
// AuthReducer
function authReducer(state: any, action: AuthReducerProps['action']) {
  switch (action.type) {
    case 'INITIAL_SESSION':
      return {
        ...state,
        session: action.payload,
        isSessionActive: true,
      };
    case 'SIGNED_IN':
      return {
        ...state,
        session: action.payload,
        isSessionActive: true,
      };
    case 'SIGNED_OUT':
      return {
        ...state,
        session: null,
        isSessionActive: false,
      };
    case 'USER_UPDATED':
      return {
        ...state,
        session: action.payload,
      };
    case 'PASSWORD_RECOVERY':
      return {
        ...state,
        session: action.payload,
      };
    case 'TOKEN_REFRESHED':
      return {
        ...state,
        session: action.payload,
      };
    default:
      return state;
  }
}
