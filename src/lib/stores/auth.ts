import { writable } from 'svelte/store';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('demo_token'),
    isAuthenticated: !!localStorage.getItem('demo_token'),
    isLoading: true
};

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>(initialState);

    return {
        subscribe,

        login: async (email: string, password: string) => {
            update(s => ({ ...s, isLoading: true }));

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            const mockUser = {
                id: 'user-1',
                email: email,
                name: email.split('@')[0] || 'Demo User'
            };
            const mockToken = 'demo-jwt-token';

            localStorage.setItem('demo_token', mockToken);
            localStorage.setItem('demo_user', JSON.stringify(mockUser));

            set({
                user: mockUser,
                token: mockToken,
                isAuthenticated: true,
                isLoading: false
            });
            return { success: true };
        },

        register: async (email: string, password: string, name: string) => {
            update(s => ({ ...s, isLoading: true }));

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            const mockUser = {
                id: 'user-1',
                email: email,
                name: name
            };
            const mockToken = 'demo-jwt-token';

            localStorage.setItem('demo_token', mockToken);
            localStorage.setItem('demo_user', JSON.stringify(mockUser));

            set({
                user: mockUser,
                token: mockToken,
                isAuthenticated: true,
                isLoading: false
            });
            return { success: true };
        },

        logout: () => {
            localStorage.removeItem('demo_token');
            localStorage.removeItem('demo_user');
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false
            });
        },

        checkAuth: async () => {
            const token = localStorage.getItem('demo_token');
            const userStr = localStorage.getItem('demo_user');

            if (!token || !userStr) {
                set({ user: null, token: null, isAuthenticated: false, isLoading: false });
                return;
            }

            try {
                const user = JSON.parse(userStr);
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false
                });
            } catch (err) {
                localStorage.removeItem('demo_token');
                localStorage.removeItem('demo_user');
                set({ user: null, token: null, isAuthenticated: false, isLoading: false });
            }
        }
    };
}

export const authStore = createAuthStore();
