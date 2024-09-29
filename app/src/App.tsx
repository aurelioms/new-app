import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import CreateTask from './components/pages/CreateTask';
import UpdateTask from './components/pages/UpdateTask';
import Navbar from './components/common/Navbar';
import Register from './components/pages/Register';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={<ProtectedRoute component={Home} allowedRoles={['USER', 'ADMIN']} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute component={Admin} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/create"
          element={<ProtectedRoute component={CreateTask} allowedRoles={['USER', 'ADMIN']} />}
        />
        <Route
          path="/update/:id"
          element={<ProtectedRoute component={UpdateTask} allowedRoles={['USER', 'ADMIN']} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
