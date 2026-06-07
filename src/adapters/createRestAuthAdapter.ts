import type { AuthAdapter } from '../types/adapter';

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

export function createRestAuthAdapter(
    config: RestAuthAdapterConfig
): AuthAdapter {
    // stuff will go here in a min
    throw new Error('temp implementation')
}