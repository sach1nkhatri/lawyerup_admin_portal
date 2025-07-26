import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import PlanCard from '../component/PlanCard';
import RegisteredUser from '../component/RegisteredUser';
import UserReport from '../component/UserReport';
import RevenueChart from '../component/RevenueChart';
import calculateRevenue from '../utils/calculateRevenue';
import '../css/dashboard.css';

const Dashboard = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [latest, setLatest] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:5000'); // update if deployed

        socket.on('analyticsUpdate', (data) => {
            console.log('📊 Real-time analytics:', data);
            setAnalyticsData(data.months);

            const latestMonth = data.months[data.months.length - 1];
            setLatest(latestMonth);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    if (!latest) return <p>Loading dashboard...</p>;

    const revenueData = calculateRevenue({
        basic: latest.basic,
        premium: latest.premium
    });

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">LawyerUp Overview - {latest.month}</h2>

            <div className="dashboard-row">
                <PlanCard title="Free Users" value={latest.free} trend="↑" bg="blue" icon="👤" />
                <PlanCard
                    title="Basic Plan Users"
                    value={latest.basic.total}
                    trend="↑"
                    bg="yellow"
                    icon="📘"
                    tiers={latest.basic}
                    revenue={revenueData.basic}
                />
                <PlanCard
                    title="Premium Plan Users"
                    value={latest.premium.total}
                    trend="↑"
                    bg="purple"
                    icon="⚖️"
                    tiers={latest.premium}
                    revenue={revenueData.premium}
                />
            </div>

            <div className="dashboard-row">
                <RegisteredUser
                    title="User Registrations"
                    value={latest.registeredUsers}
                    description="Total registered users"
                />
                <RegisteredUser
                    title="Lawyer Registrations"
                    value={latest.lawyers.total}
                    description="Verified legal professionals"
                    breakdown={[
                        { label: 'Junior Lawyers', value: latest.lawyers.junior },
                        { label: 'Senior Lawyers', value: latest.lawyers.senior }
                    ]}
                />
                <UserReport
                    title="Total Reports"
                    value={latest.reports}
                    description="Issues reported by users"
                />
            </div>

            <RevenueChart analyticsData={analyticsData} />
        </div>
    );
};

export default Dashboard;
