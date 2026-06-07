import type { AuthAdapter } from '../types/adapter';
import type { AuthSession, LoginCredentials } from '../types/auth';

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

        async signup() {
            throw new Error('signup - no implementation yet');
        },

        async getSession() {
            throw new Error('getSession - no implementation yet');
        },

        async logout() {
            throw new Error('logout - no implementation yet');
        }

    }
};