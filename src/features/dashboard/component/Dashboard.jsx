import React from 'react';
import PlanCard from './PlanCard';
import RegisteredUser from './RegisteredUser';
import UserReport from './UserReport';
import RevenueChart from './RevenueChart';
import { userData } from '../data/data';  // now has `.months`
import calculateRevenue from '../utils/calculateRevenue';
import '../css/dashboard.css';

const Dashboard = () => {
    const latest = userData.months[userData.months.length - 1]; // June or latest month
    const revenueData = calculateRevenue({
        basic: {
            daily: latest.basic.daily,
            weekly: latest.basic.weekly,
            monthly: latest.basic.monthly
        },
        premium: {
            daily: latest.premium.daily,
            weekly: latest.premium.weekly,
            monthly: latest.premium.monthly
        }
    });

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">LawyerUp Overview - {latest.month}</h2>

            <div className="dashboard-row">
                <PlanCard title="Free Users" value={latest.free} trend="↑ 12%" bg="blue" icon="👤" />
                <PlanCard
                    title="Basic Plan Users"
                    value={latest.basic.total}
                    trend="↑ 6%"
                    bg="yellow"
                    icon="📘"
                    tiers={latest.basic}
                    revenue={revenueData.basic}
                />
                <PlanCard
                    title="Premium Plan Users"
                    value={latest.premium.total}
                    trend="↑ 8%"
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

            <RevenueChart analyticsData={userData.months} />
        </div>
    );
};

export default Dashboard;
