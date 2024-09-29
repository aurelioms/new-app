import React, { useState } from 'react';
import api from '../../api/api';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            const { token } = response.data;
            login(token);
            navigate('/home');
        } catch (error: any) {
            console.error(error.response.data.error);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Login
            </button>
            <button
                type="button"
                onClick={handleRegister}
                className="w-full p-2 mt-4 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
                Register
            </button>
        </form>
    );
};

export default Login;
