import React, { useEffect, useState } from 'react';
import '../css/LawyerTab.css';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';
import LawyerCard from './LawyerCard';

const LawyerTab = () => {
    const [lawyers, setLawyers] = useState([]);
    const [filter, setFilter] = useState('All');

    const fetchLawyers = async () => {
        try {
            const token = localStorage.getItem('lawyerup_token');
            const res = await axios.get(API.LAWYERS, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLawyers(res.data);
        } catch (err) {
            console.error('Failed to load lawyers', err);
        }
    };

    useEffect(() => {
        fetchLawyers();
    }, []);

    const filteredLawyers = filter === 'All'
        ? lawyers
        : lawyers.filter(lawyer => lawyer.plan === filter);

    return (
        <div className="lawyer-tab-wrapper">
            <h3>👨‍⚖️ Registered Lawyers</h3>

            <div className="sub-tabs">
                {['All', 'Free', 'Basic', 'Premium'].map((type) => (
                    <button
                        key={type}
                        className={filter === type ? 'active' : ''}
                        onClick={() => setFilter(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="lawyer-list">
                {filteredLawyers.length === 0 ? (
                    <p>No lawyers under "{filter}"</p>
                ) : (
                    filteredLawyers.map((lawyer) => (
                        <LawyerCard key={lawyer._id} lawyer={lawyer} />
                    ))
                )}
            </div>
        </div>
    );
};

export default LawyerTab;
