import React from 'react';
import '../css/RegisterUser.css';

const RegisteredUser = ({ title, value, description, breakdown }) => (
    <div className="register-card">
        <h4>{title}</h4>
        <p className="value">{value}</p>
        <p className="desc">{description}</p>

        {breakdown && (
            <div className="tiers">
                {breakdown.map((b, i) => (
                    <p key={i} className="tier-line">{b.label}: <strong>{b.value}</strong></p>
                ))}
            </div>
        )}
    </div>
);

export default RegisteredUser;