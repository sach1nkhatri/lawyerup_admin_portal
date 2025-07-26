import React from 'react';
import '../css/UserCard.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import API from '../../../app/api/api_endpoints';

const UserCard = ({ user }) => {
    const { _id, fullName, email, plan, status, validUntil } = user;

    const token = localStorage.getItem('lawyerup_token');

    const isPremium = plan === 'Premium' && validUntil;
    const remainingDays = isPremium
        ? Math.ceil((new Date(validUntil) - new Date()) / (1000 * 60 * 60 * 24))
        : null;

    const updateStatus = async (newStatus) => {
        try {
            await axios.patch(API.USER_STATUS_UPDATE(_id), { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('✅ Success', `User status updated to "${newStatus}"`, 'success')
                .then(() => window.location.reload()); // reload data
        } catch (err) {
            console.error(err);
            Swal.fire('❌ Error', 'Failed to update status', 'error');
        }
    };

    const handleStatusChange = async (action) => {
        const nextStatus = action === 'toggle'
            ? (status === 'hold' ? 'verified' : 'hold')
            : 'disabled';

        const confirmText = action === 'toggle'
            ? `Are you sure you want to ${status === 'hold' ? 'activate' : 'hold'} this user?`
            : 'Are you sure you want to reject (disable) this user?';

        const result = await Swal.fire({
            title: 'Confirm Action',
            text: confirmText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, proceed',
        });

        if (result.isConfirmed) {
            updateStatus(nextStatus);
        }
    };

    return (
        <div className="user-card">
            <div className="user-top">
                <div>
                    <h4>{fullName}</h4>
                    <p>{email}</p>
                </div>
                <span className={`plan-badge ${plan?.toLowerCase()}`}>{plan}</span>
            </div>

            <div className="user-meta">
                <p>Status: <strong>{status.charAt(0).toUpperCase() + status.slice(1)}</strong></p>
                {validUntil && (
                    <p>Valid Until: <strong>{new Date(validUntil).toDateString()}</strong></p>
                )}
                {isPremium && (
                    <p>Days Remaining: <strong>{remainingDays} days</strong></p>
                )}
            </div>

            <div className="user-actions">
                <button onClick={() => handleStatusChange('toggle')}>
                    {status === 'hold' ? 'Activate' : 'Hold'}
                </button>
                <button onClick={() => handleStatusChange('reject')} className="danger-btn">
                    Reject
                </button>
            </div>
        </div>
    );
};

export default UserCard;
