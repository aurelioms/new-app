import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Task } from '../../types/task';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data.data);
        } catch (error: any) {
            console.error(error.message || 'An unexpected error occurred.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Tasks List</h2>

            <div className="grid grid-cols-4 gap-4 mb-4">
                <p className="font-semibold text-gray-600">Title</p>
                <p className="font-semibold text-gray-600">Content</p>
                <p className="font-semibold text-gray-600">Location</p>
            </div>

            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200 grid grid-cols-4 gap-4 items-center"
                    >
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p className="text-gray-700">{task.content}</p>
                        <p className="text-gray-500">{task.location}</p>

                        <Link
                            to={`/update/${task.id}`}
                            className="bg-blue-500 text-white text-center rounded px-2 py-2 hover:bg-blue-600 whitespace-nowrap"
                        >
                            Update
                        </Link>
                    </li>
                ))}
                {tasks.length === 0 && (
                    <li className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                        <p className="text-gray-500">No tasks available.</p>
                    </li>
                )}
            </ul>
        </div>


    );
};

export default Home;
