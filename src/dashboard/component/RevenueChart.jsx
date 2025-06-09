import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const rates = {
    basic: { daily: 50, weekly: 180, monthly: 300 },
    premium: { daily: 100, weekly: 400, monthly: 600 }
};

const RevenueChart = ({ analyticsData }) => {
    const [type, setType] = useState('daily');
    const [monthIndex, setMonthIndex] = useState(analyticsData.length - 1);
    const [mode, setMode] = useState('monthly'); // 'monthly' or 'lifetime'

    const selectedMonth = analyticsData[monthIndex];
    const isLifetime = mode === 'lifetime';

    const simulateChartData = () => {
        const data = [];
        const label = type === 'daily' ? 'Day' : type === 'weekly' ? 'Week' : 'Month';
        const count = type === 'daily' ? 7 : 4;

        for (let i = 1; i <= count; i++) {
            data.push({
                [type]: `${label} ${i}`,
                basic: selectedMonth.basic[type] * rates.basic[type],
                premium: selectedMonth.premium[type] * rates.premium[type]
            });
        }
        return data;
    };

    let chartData = [];
    if (isLifetime) {
        chartData = analyticsData.map((month) => ({
            name: month.month,
            basic: month.basic.daily * rates.basic.daily +
                month.basic.weekly * rates.basic.weekly +
                month.basic.monthly * rates.basic.monthly,
            premium: month.premium.daily * rates.premium.daily +
                month.premium.weekly * rates.premium.weekly +
                month.premium.monthly * rates.premium.monthly
        }));
    } else {
        chartData = simulateChartData();
    }

    const totals = chartData.reduce(
        (acc, item) => {
            acc.basic += item.basic;
            acc.premium += item.premium;
            return acc;
        },
        { basic: 0, premium: 0 }
    );

    const avgRevenue = {
        basic: Math.round(totals.basic / chartData.length),
        premium: Math.round(totals.premium / chartData.length)
    };

    const topPlan = totals.basic > totals.premium ? 'Basic Plan 🏆' : 'Premium Plan 🏆';

    return (
        <div className="chart-container">
            <h3>
                📈 Revenue Overview - {isLifetime ? 'Lifetime' : selectedMonth.month} ({type.charAt(0).toUpperCase() + type.slice(1)})
            </h3>

            {/* View mode toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <div>
                    <strong style={{ marginRight: '10px' }}>View Mode:</strong>
                    <button
                        onClick={() => setMode('monthly')}
                        style={{
                            marginRight: '5px',
                            backgroundColor: mode === 'monthly' ? '#3b82f6' : '#f3f4f6',
                            color: mode === 'monthly' ? '#fff' : '#000',
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setMode('lifetime')}
                        style={{
                            backgroundColor: mode === 'lifetime' ? '#3b82f6' : '#f3f4f6',
                            color: mode === 'lifetime' ? '#fff' : '#000',
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Lifetime
                    </button>
                </div>
            </div>

            {/* Month selector (only for monthly mode) */}
            {!isLifetime && (
                <div style={{ marginBottom: '10px' }}>
                    <strong style={{ marginRight: '10px' }}>Month:</strong>
                    {analyticsData.map((month, idx) => (
                        <button
                            key={month.month}
                            onClick={() => setMonthIndex(idx)}
                            style={{
                                marginRight: '5px',
                                backgroundColor: monthIndex === idx ? '#3b82f6' : '#e5e7eb',
                                color: monthIndex === idx ? '#fff' : '#000',
                                padding: '6px 10px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {month.month}
                        </button>
                    ))}
                </div>
            )}

            {/* Revenue type selector */}
            {!isLifetime && (
                <div style={{ marginBottom: '10px' }}>
                    {['daily', 'weekly', 'monthly'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setType(t)}
                            style={{
                                marginRight: '10px',
                                backgroundColor: t === type ? '#3b82f6' : '#e5e7eb',
                                color: t === type ? '#fff' : '#000',
                                padding: '6px 12px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
            )}

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <XAxis dataKey={isLifetime ? 'name' : type} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="basic" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="premium" stroke="#a855f7" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>

            {/* Summary */}
            <div style={{ marginTop: '20px' }}>
                <p><strong>{isLifetime ? 'Lifetime' : 'Average'} Revenue:</strong></p>
                <ul>
                    <li>🟦 Basic: Rs. {avgRevenue.basic}</li>
                    <li>🟪 Premium: Rs. {avgRevenue.premium}</li>
                </ul>
                <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#16a34a' }}>
                    💰 Highest Revenue Generator: {topPlan}
                </p>
            </div>
        </div>
    );
};

export default RevenueChart;
