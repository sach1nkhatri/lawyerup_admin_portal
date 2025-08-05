import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logoIcon from '../assets/logo2.png';
import logoText from '../assets/logo.png';
import dashboardIcon from '../assets/dashboard.png';
import lawyerIcon from '../assets/hammerwhite.png';
import pdfIcon from '../assets/pdfweb.png';
import logoutIcon from '../assets/logout.png';
import NewsletterIcon from '../assets/newsWhite.png';
import usersIcon from '../assets/user.png';
import iconHelp from '../assets/faq.png';
import ReportIcon from '../assets/report.png';

const Sidebar = ({ activeSection, setActiveSection }) => {
    const navigate = useNavigate();

    const menuItems = [
        { icon: dashboardIcon, label: 'Dashboard' },
        {icon: NewsletterIcon, label: 'News' },
        { icon: lawyerIcon, label: 'Lawyers' },
        { icon: pdfIcon, label: 'PDF Library' },
        {icon: usersIcon, label: 'Registered User' },
        { icon: iconHelp, label: 'Help&FAQ' },
        {icon: ReportIcon, label: 'User Report' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('lawyerup_token'); // clear only token (or clear all if needed)
        localStorage.removeItem('lawyerup_user');  // if you're storing user info
        navigate('/login'); // or replace('/login') to avoid going back
    };

    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <img src={logoIcon} alt="Logo" className="sidebar-logo" />
                <img src={logoText} alt="LawyerUp" className="sidebar-text-logo" />
            </div>

            <div className="sidebar-menu">
                {menuItems.map((item, idx) => (
                    <div
                        key={idx}
                        className={`sidebar-item ${activeSection === item.label ? 'active' : ''}`}
                        onClick={() => setActiveSection(item.label)}
                    >
                        <img src={item.icon} alt={item.label} className="sidebar-icon" />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="sidebar-footer" onClick={handleLogout}>
                <img src={logoutIcon} alt="Logout" className="sidebar-icon" />
                <span>Logout</span>
            </div>
        </div>
    );
};

export default Sidebar;
