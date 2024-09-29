import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<'ADMIN' | 'USER'>('USER');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match.");
            return;
        }

        try {
            await api.post('/register', { email, password, role });
            navigate('/home');
        } catch (error: any) {
            setErrorMessage(error.response.data.error || 'An unexpected error occurred.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-lg font-bold mb-4">Register</h2>
            {errorMessage && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
                    <strong>Error:</strong> {errorMessage}
                </div>
            )}
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
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full p-2 mb-4 border rounded"
            />
            <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                </label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'ADMIN' | 'USER')}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Register
            </button>
        </form>
    );
};

export default Register;
