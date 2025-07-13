import React from 'react';
import '../css/LawyerCard.css';

const LawyerCard = ({ lawyer }) => {
    return (
        <div className="lawyer-card">
            <h4>{lawyer.fullName}</h4>
            <p>{lawyer.email}</p>
            <p><strong>Specialization:</strong> {lawyer.specialization}</p>
            <p><strong>Status:</strong> {lawyer.status}</p>
        </div>
    );
};

export default LawyerCard;
