import React, { useEffect, useState } from 'react';
import '../../user_control/css/PaymentTab.css';
import PaymentCard from './PaymentCard';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';

const PaymentTab = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [statusFilter, setStatusFilter] = useState('pending');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPayments = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('lawyerup_token');
            const res = await axios.get(API.PAYMENTS.GET_ALL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(res.data);
        } catch (err) {
            console.error('❌ Failed to fetch payments:', err);
            setError('Failed to load payments.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    useEffect(() => {
        const now = new Date();
        const filtered = payments.filter(p => {
            if (statusFilter === 'pending') return p.status === 'pending';
            if (statusFilter === 'approved') return p.status === 'approved';
            if (statusFilter === 'expired') return p.status === 'expired' && new Date(p.validUntil) < now;
            return true;
        });
        setFilteredPayments(filtered);
    }, [statusFilter, payments]);

    return (
        <div className="payment-tab-wrapper">
            <h3>🧾 Payment Management</h3>

            <div className="status-tabs">
                {['pending', 'approved', 'expired'].map((status) => (
                    <button
                        key={status}
                        className={`status-tab-btn ${statusFilter === status ? 'active' : ''}`}
                        onClick={() => setStatusFilter(status)}
                    >
                        {status === 'pending' && '⏳ Pending'}
                        {status === 'approved' && '✅ Approved'}
                        {status === 'expired' && '❌ Expired'}
                    </button>
                ))}
            </div>

            {loading && <p>Loading payments...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && filteredPayments.length === 0 ? (
                <p>No {statusFilter} payments found.</p>
            ) : (
                <div className="payment-list">
                    {filteredPayments.map((payment) => (
                        <PaymentCard
                            key={payment._id}
                            payment={payment}
                            onAction={fetchPayments}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PaymentTab;
