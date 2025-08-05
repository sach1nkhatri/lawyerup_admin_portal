import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/auth/component/Login';
import AdminDashboard from './features/pages/AdminDashboard';
import { ModalProvider } from './features/context/ModalContext';
import PrivateRoute from './features/utils/PrivateRoute';

function App() {
    return (
        <ModalProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </ModalProvider>
    );
}

export default App;
