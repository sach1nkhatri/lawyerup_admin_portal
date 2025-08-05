import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import PlanCard from '../component/PlanCard';
import RegisteredUser from '../component/RegisteredUser';
import UserReport from '../component/UserReport';
import RevenueChart from '../component/RevenueChart';
import calculateRevenue from '../utils/calculateRevenue';
import API from '../../../app/api/api_endpoints';
import '../css/dashboard.css';

const Dashboard = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [latest, setLatest] = useState(null);
    const [lifetimeData, setLifetimeData] = useState(null);
    const [viewMode, setViewMode] = useState('monthly'); // 'monthly' or 'lifetime'

    useEffect(() => {
        const socketURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
        const socket = io(socketURL, {
            transports: ['websocket'], // ensure real-time connection
        });

        socket.on('analyticsUpdate', (data) => {
            if (data?.months?.length) {
                setAnalyticsData(data.months);
                setLatest(data.months[data.months.length - 1]);
            }
        });

        // Axios fallback load for lifetime
        axios.get(API.ANALYTICS.LIFETIME)
            .then((res) => setLifetimeData(res.data.lifetime))
            .catch((err) => console.error('⚠️ Lifetime analytics fetch failed', err));

        return () => {
            socket.disconnect();
        };
    }, []);

    const current = viewMode === 'lifetime' ? lifetimeData : latest;

    if (!current) return <p className="loading-msg">Loading dashboard...</p>;

    const revenueData = calculateRevenue({
        basic: current.basic || current.plans?.basic,
        premium: current.premium || current.plans?.premium
    });

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2 className="dashboard-title">
                    LawyerUp Overview – {viewMode === 'monthly' ? latest?.month : 'Lifetime'}
                </h2>
                <button
                    className="toggle-button"
                    onClick={() => setViewMode(prev => (prev === 'monthly' ? 'lifetime' : 'monthly'))}
                >
                    {viewMode === 'monthly' ? 'Switch to Lifetime' : 'View Current Month'}
                </button>
            </div>

            <div className="dashboard-row">
                <PlanCard
                    title="Free Users"
                    value={viewMode === 'monthly' ? current.free : current.plans?.free}
                    trend="↑"
                    bg="blue"
                    icon="👤"
                />
                <PlanCard
                    title="Basic Plan Users"
                    value={(current.basic || current.plans?.basic)?.total || 0}
                    trend="↑"
                    bg="yellow"
                    icon="📘"
                    tiers={current.basic || current.plans?.basic}
                    revenue={revenueData.basic}
                />
                <PlanCard
                    title="Premium Plan Users"
                    value={(current.premium || current.plans?.premium)?.total || 0}
                    trend="↑"
                    bg="purple"
                    icon="⚖️"
                    tiers={current.premium || current.plans?.premium}
                    revenue={revenueData.premium}
                />
            </div>

            <div className="dashboard-row">
                <RegisteredUser
                    title="User Registrations"
                    value={viewMode === 'monthly' ? current.registeredUsers : current.totalUsers}
                    description="Total registered users"
                />
                <RegisteredUser
                    title="Lawyer Registrations"
                    value={viewMode === 'monthly' ? current.lawyers?.total : current.totalLawyers}
                    description="Verified legal professionals"
                    breakdown={
                        viewMode === 'monthly'
                            ? [
                                { label: 'Junior Lawyers', value: current.lawyers?.junior || 0 },
                                { label: 'Senior Lawyers', value: current.lawyers?.senior || 0 }
                            ]
                            : []
                    }
                />
                <UserReport
                    title="Total Reports"
                    value={viewMode === 'monthly' ? current.reports : current.totalReports}
                    description="Issues reported by users"
                />
            </div>

            {viewMode === 'monthly' && <RevenueChart analyticsData={analyticsData} />}
        </div>
    );
};

export default Dashboard;
