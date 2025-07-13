import React, { useState } from 'react';
import Sidebar from '../../app/shared_component/Sidebar';
import Dashboard from '../dashboard/component/Dashboard';
import News from '../news_uploader/component/NewsAdmin';
import LawyerApprovalPanel from '../Lawyer_control/component/LawyerApprovalPanel';
import PdfUploader from "../pdf_uploader/component/PdfUploader";
import FaqManager from '../faq_manager/components/FaqManager';
import UserControlTabs from "../user_control/component/UserControlTabs";


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

            case 'Help&FAQ':
                return <FaqManager/>;

            case 'Registered User':
                return <UserControlTabs />;
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
