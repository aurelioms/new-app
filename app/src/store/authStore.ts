import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

type AuthState = {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    getUserRole: () => string | null;
};

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: !!localStorage.getItem('token'),
    login: (token: string) => {
        localStorage.setItem('token', token);
        set({ isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false });
    },
    getUserRole: () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: any = jwtDecode(token);
            return decoded.userRole;
        }
        return null;
    },
}));
