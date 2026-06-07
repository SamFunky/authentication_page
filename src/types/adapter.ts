import type { AuthSession, LoginCredentials, SignupData } from './auth';

export interface AuthAdapter {
    login(credentials: LoginCredentials): Promise<AuthSession>;
    signup(data: SignupData): Promise<AuthSession>;
    getSession(): Promise<AuthSession | null>;
    logout(): Promise<void>;
}