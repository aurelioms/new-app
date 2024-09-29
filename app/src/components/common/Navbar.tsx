import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);
    const getUserRole = useAuthStore((state) => state.getUserRole);
    const userRole = getUserRole();

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white font-bold text-lg">Task Manager</div>
                <div>
                    {isAuthenticated && (
                        <>
                            {userRole === 'ADMIN' && (
                                <Link to="/admin" className="text-white mx-2">Admin</Link>
                            )}
                            <Link to="/home" className="text-white mx-2">Home</Link>
                            <Link to="/create" className="text-white mx-2">Create Task</Link>
                            <button
                                onClick={logout}
                                className="text-white mx-2"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
