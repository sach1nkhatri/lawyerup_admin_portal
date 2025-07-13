import React from 'react';
import '../css/PaymentCard.css';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';

const PaymentCard = ({ payment, onAction }) => {
    const {
        _id,
        user,
        plan,
        amount,
        method,
        screenshot,
        validUntil,
        paymentDate
    } = payment;

    const handleAction = async (type) => {
        const endpoint = `${API.MANUAL_PAYMENT}/${_id}/${type}`;
        const token = localStorage.getItem('lawyerup_token');
        try {
            await axios.patch(endpoint, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onAction(); // refresh list
        } catch (err) {
            console.error('Action failed:', err);
        }
    };

    return (
        <div className="payment-card">
            <div>
                <p><strong>User:</strong> {user?.fullName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Plan:</strong> {plan}</p>
                <p><strong>Method:</strong> {method}</p>
                <p><strong>Amount:</strong> Rs {amount}</p>
                <p><strong>Valid Until:</strong> {new Date(validUntil).toDateString()}</p>
                <p><strong>Paid On:</strong> {new Date(paymentDate).toDateString()}</p>
            </div>
            <div className="screenshot-preview">
                <img src={`${process.env.REACT_APP_SERVER_URL}/${screenshot}`} alt="payment ss" />
            </div>
            <div className="action-buttons">
                <button className="approve" onClick={() => handleAction('approve')}>Approve</button>
                <button className="reject" onClick={() => handleAction('reject')}>Reject</button>
                <button className="hold" onClick={() => alert('Hold: feature coming soon')}>Hold</button>
            </div>
        </div>
    );
};

export default PaymentCard;
