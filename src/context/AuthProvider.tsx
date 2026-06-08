import { createContext, useState, type ReactNode } from 'react'
import type { AuthAdapter } from '../types/adapter'
import type { AuthUser, LoginCredentials, SignupData } from '../types/auth'

// usAuth() will expose this type to the components
export interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login(credentials: LoginCredentials): Promise<void>;
    signup(data: SignupData): Promise<void>;
    logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export interface AuthProviderProps {
    adapter: AuthAdapter;
    children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
    const adapter = props.adapter;
    const children = props.children;
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isAuthenticated = user !== null;

    const authState = {
        user,
        isAuthenticated,
        isLoading,
        error,
    };

    const authActions = {
        login: async () => {
            throw new Error("haven't implemented login yet");
        },
        signup: async () => {
            throw new Error ("haven't implemented signup yet");
        },
        logout: async () => {
            throw new Error ("haven't implemented logout yet");
        }
    };

    const value: AuthContextValue = {
        ...authState,
        ...authActions
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}