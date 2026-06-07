import type { AuthAdapter } from '../types/adapter';
import type { AuthSession, LoginCredentials, SignupData} from '../types/auth';

export interface RestAuthEndpoints {
    login: string;
    signup: string;
    session: string;
    logout: string;
}

export interface RestAuthAdapterConfig {
    baseUrl: string;
    endpoints: RestAuthEndpoints;
}

export function createRestAuthAdapter(config: RestAuthAdapterConfig): AuthAdapter {
    const baseUrl = config.baseUrl;
    const endpoints = config.endpoints;

    return {
        async login(credentials: LoginCredentials): Promise<AuthSession> {
            const loginUrl = `${baseUrl}${endpoints.login}`;

            const response = await fetch(loginUrl, {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${response.status}`)
            }

            return response.json() as Promise<AuthSession>;
        },

        async signup(data: SignupData): Promise<AuthSession> {
            const signupUrl = `${baseUrl}${endpoints.signup}`;

            const response = await fetch(signupUrl, {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Signup failed: ${response.status}`)
            }

            return response.json() as Promise<AuthSession>;
        },

        async getSession(): Promise<AuthSession | null> {
            const sessionUrl = `${baseUrl}${endpoints.session}`;

            const response = await fetch(sessionUrl, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 401 || response.status === 404) {
                return null;
            }

            if (!response.ok) {
                throw new Error(`Failed to get session: ${response.status}`)
            }

            return response.json() as Promise<AuthSession>;
        },

        async logout(): Promise<void> {
            const logoutUrl = `${baseUrl}${endpoints.logout}`;

            const response = await fetch(logoutUrl, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
            });

            if (!response.ok) {
                throw new Error(`Failed to logout: ${response.status}`)
            }
        },

    }
};