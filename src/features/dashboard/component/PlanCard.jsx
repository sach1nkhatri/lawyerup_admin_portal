import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import '../css/plancard.css';

const COLORS = ['#3b82f6', '#facc15', '#a855f7', ]; // Daily, Weekly, Monthly

const PlanCard = ({ title, value, trend, bg, icon, tiers }) => {
    const pieData = tiers
        ? Object.entries(tiers)
            .filter(([label]) => label !== 'total') // ⛔️ exclude 'total'
            .map(([label, val]) => ({
                name: label.charAt(0).toUpperCase() + label.slice(1),
                value: val
            }))
        : [];


    const tierKeys = ['Daily', 'Weekly', 'Monthly'];

    return (
        <div className={`plan-card ${bg}`}>
            <div className="plan-header">
                <span className="plan-icon">{icon}</span>
                <div>
                    <h4>{title}</h4>
                    <p className="value">{value}</p>
                    {trend && <span className="trend">{trend}</span>}
                </div>
            </div>

            {tiers && (
                <div className="tier-and-pie">
                    <div className="tiers">
                        {tierKeys.map((key, index) => (
                            <p key={key} className="tier-line">
                                <span className="color-dot" style={{ backgroundColor: COLORS[index] }}></span>
                                {key}: <strong>{tiers[key.toLowerCase()]}</strong>
                            </p>
                        ))}
                    </div>
                    <div className="pie-wrapper-inline">
                        <ResponsiveContainer width={120} height={120}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={50}
                                    innerRadius={20}
                                    labelLine={true}
                                    // label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanCard;