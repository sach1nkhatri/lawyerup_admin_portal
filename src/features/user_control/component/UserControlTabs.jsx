import React, { useState } from 'react';
import '../../user_control/css/UserControlTabs.css';
import UserTab from './UserTab';
import LawyerTab from './LawyerTab';
import PaymentTab from './PaymentTab';

const UserControlTabs = () => {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className="user-control-wrapper">
            <h2>🔐 Admin Control Panel</h2>

            <div className="tab-buttons">
                <button
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button
                    className={activeTab === 'lawyers' ? 'active' : ''}
                    onClick={() => setActiveTab('lawyers')}
                >
                    Lawyers
                </button>
                <button
                    className={activeTab === 'payments' ? 'active' : ''}
                    onClick={() => setActiveTab('payments')}
                >
                    Payment Confirmation
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'users' && <UserTab />}
                {activeTab === 'lawyers' && <LawyerTab />}
                {activeTab === 'payments' && <PaymentTab />}
            </div>
        </div>
    );
};

export default UserControlTabs;
