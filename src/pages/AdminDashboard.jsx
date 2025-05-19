import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import News from '../pages/NewsAdmin';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('Dashboard');

    const renderContent = () => {
        switch (activeSection) {
            case 'Dashboard':
                return <Dashboard />;
            case 'News':
                return <News />;
            case 'Lawyers':
                return <div><h2>Lawyers Section</h2></div>;
            case 'PDF Library':
                return <div><h2>PDF Library Section</h2></div>;
            default:
                return <div><h2>Welcome!</h2></div>;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <div style={{ marginLeft: '250px', padding: '2rem', flexGrow: 1 }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
