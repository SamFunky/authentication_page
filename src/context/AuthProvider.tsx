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
        login: async (credentials: LoginCredentials) => {
            setIsLoading(true);
            setError(null);

            try {
                const session = await adapter.login(credentials);
                setUser(session.user)
            } catch (error) {
                const message = error instanceof Error ? error.message : "Login Failed";
                setError(message);
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        signup: async (data: SignupData) => {
            setIsLoading(true);
            setError(null);

            try {
                const session = await adapter.signup(data);
                setUser(session.user);
            } catch (error) {
                const message = error instanceof Error ? error.message : "Signup Failed";
                setError(message);
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        logout: async () => {
            setIsLoading(true);
            setError(null);

            try {
                await adapter.logout();
                setUser(null);
            } catch (error) {
                const message = error instanceof Error ? error.message : "Logout failed"
                setError(message);
                throw error;
            } finally {
                setIsLoading(false);
            }
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