import React, { useEffect, useState } from 'react';
import '../../user_control/css/PaymentTab.css';
import PaymentCard from './PaymentCard';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';

const PaymentTab = () => {
    const [payments, setPayments] = useState([]);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem('lawyerup_token');
            const res = await axios.get(`${API.MANUAL_PAYMENT}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const pending = res.data.filter((p) => p.status === 'pending');
            setPayments(pending);
        } catch (err) {
            console.error('Failed to fetch payments:', err);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <div className="payment-tab-wrapper">
            <h3>🧾 Pending Payment Confirmations</h3>
            {payments.length === 0 ? (
                <p>No pending payments.</p>
            ) : (
                <div className="payment-list">
                    {payments.map((payment) => (
                        <PaymentCard key={payment._id} payment={payment} onAction={fetchPayments} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PaymentTab;
