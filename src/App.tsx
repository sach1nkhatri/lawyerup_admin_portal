import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { ModalProvider } from './context/ModalContext'; // ✅ Import ModalProvider

function App() {
    return (
        <ModalProvider> {/* ✅ Wrap entire app */}
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </Router>
        </ModalProvider>
    );
}

export default App;
