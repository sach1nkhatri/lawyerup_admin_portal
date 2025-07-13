import React from 'react';
import '../css/UserCard.css';

const UserCard = ({ user }) => {
    const { fullName, email, plan, status, validUntil } = user;

    const isPremium = plan === 'Premium' && validUntil;
    const remainingDays = isPremium
        ? Math.ceil((new Date(validUntil) - new Date()) / (1000 * 60 * 60 * 24))
        : null;

    const handleHoldToggle = () => {
        // TODO: API to toggle hold/active
        alert(`Toggling status for ${email}`);
    };

    const handleUpgrade = () => {
        // TODO: Open plan upgrade modal
        alert(`Upgrade plan for ${email}`);
    };

    const handleOverride = () => {
        // TODO: Open override validity modal
        alert(`Override validity for ${email}`);
    };

    return (
        <div className="user-card">
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
                <button onClick={handleUpgrade}>Upgrade Plan</button>
                <button onClick={handleOverride}>Override Validity</button>
            </div>
        </div>
    );
};

export default UserCard;
