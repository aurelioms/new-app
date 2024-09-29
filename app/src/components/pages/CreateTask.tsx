import React, { useState, FormEvent } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../common/MapComponent';

const CreateTask: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            await api.post('/tasks', { title, content, location, lat, lon });
            navigate('/home');
        } catch (error: any) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
        }
    };

    const handleLocationSelect = (lat: number, lon: number) => {
        setLat(lat);
        setLon(lon);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={4}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="flex space-x-4">
                    <div>
                        <label htmlFor="lat" className="block text-sm font-medium text-gray-700">
                            Latitude
                        </label>
                        <input
                            type="number"
                            id="lat"
                            value={lat || ''}
                            readOnly
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="lon" className="block text-sm font-medium text-gray-700">
                            Longitude
                        </label>
                        <input
                            type="number"
                            id="lon"
                            value={lon || ''}
                            readOnly
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                </div>
                <MapComponent onLocationSelect={handleLocationSelect} />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create Task
                </button>
            </form>

            {/* Error message display */}
            {errorMessage && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
                    <strong>Error:</strong> {errorMessage}
                </div>
            )}
        </div>
    );
};

export default CreateTask;