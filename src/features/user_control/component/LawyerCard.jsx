import React from 'react';
import '../css/LawyerCard.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import API from '../../../app/api/api_endpoints';

const LawyerCard = ({ lawyer }) => {
    const { _id, fullName, email, plan, status, validUntil } = lawyer;

    const token = localStorage.getItem('lawyerup_token');

    const isPremium = plan === 'Premium' && validUntil;
    const remainingDays = isPremium
        ? Math.ceil((new Date(validUntil) - new Date()) / (1000 * 60 * 60 * 24))
        : null;

    const handleStatusUpdate = async (newStatus) => {
        try {
            await axios.patch(API.USER_STATUS_UPDATE(_id), { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('Success', `Status updated to ${newStatus}`, 'success').then(() => {
                window.location.reload();
            });
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to update status', 'error');
        }
    };

    const handleHoldToggle = () => {
        const newStatus = status === 'hold' ? 'verified' : 'hold';
        Swal.fire({
            title: `Change status to ${newStatus}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: `Yes, ${newStatus}`,
        }).then((result) => {
            if (result.isConfirmed) {
                handleStatusUpdate(newStatus);
            }
        });
    };

    const handleReject = () => {
        Swal.fire({
            title: 'Reject Lawyer?',
            text: 'This will disable the account.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Reject',
        }).then((result) => {
            if (result.isConfirmed) {
                handleStatusUpdate('disabled');
            }
        });
    };

    return (
        <div className="lawyer-card">
            <div className="user-top">
                <div>
                    <h4>{fullName}</h4>
                    <p>{email}</p>
                </div>
                <span className={`plan-badge ${plan.toLowerCase()}`}>{plan}</span>
            </div>

            <div className="user-meta">
                <p>Status: <strong>{status}</strong></p>
                {validUntil && (
                    <p>Valid Until: <strong>{new Date(validUntil).toDateString()}</strong></p>
                )}
                {isPremium && (
                    <p>Days Remaining: <strong>{remainingDays} days</strong></p>
                )}
            </div>

            <div className="user-actions">
                <button onClick={handleHoldToggle}>
                    {status === 'hold' ? 'Activate' : 'Hold'}
                </button>
                <button onClick={handleReject}>Reject</button>
            </div>
        </div>
    );
};

export default LawyerCard;
