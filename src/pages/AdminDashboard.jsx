import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../dashboard/component/Dashboard';
import News from '../pages/NewsAdmin';
import LawyerApprovalPanel from '../components/LawyerApprovalPanel';
import PdfUploader from "../pdf_uploader/component/PdfUploader";


const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('Dashboard');

    const renderContent = () => {
        switch (activeSection) {
            case 'Dashboard':
                return <Dashboard />;
            case 'News':
                return <News />;
            case 'Lawyers':
                return <LawyerApprovalPanel />;
            case 'PDF Library':
                return <PdfUploader/>;
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
