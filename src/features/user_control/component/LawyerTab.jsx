import React, { useState } from 'react';
import '../css/LawyerTab.css';
import useLawyers from '../hooks/useLawyers';
import LawyerCard from './LawyerCard';

const LawyerTab = () => {
    const { lawyers, loading } = useLawyers();
    const [planFilter, setPlanFilter] = useState('All');

    const filteredLawyers = lawyers.filter((lawyer) => {
        return planFilter === 'All' || lawyer.plan?.toLowerCase() === planFilter.toLowerCase();
    });

    return (
        <div className="lawyer-tab-wrapper">
            <h3>👨‍⚖️ Lawyer Control Panel</h3>

            <div className="sub-tabs">
                <strong>Plan: </strong>
                {['All', 'Free Trial', 'Basic Plan', 'Premium Plan'].map((type) => (
                    <button
                        key={type}
                        className={planFilter === type ? 'active' : ''}
                        onClick={() => setPlanFilter(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Loading lawyers...</p>
            ) : (
                <div className="lawyer-list">
                    {filteredLawyers.length === 0 ? (
                        <p>No lawyers match the filters</p>
                    ) : (
                        filteredLawyers.map((lawyer) => (
                            <LawyerCard key={lawyer._id} lawyer={lawyer} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default LawyerTab;
