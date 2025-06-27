import React from 'react';
import '../css/UserReport.css';

const UserReport = ({ title, value, description }) => (
    <div className="report-card">
        <h4>{title}</h4>
        <p className="value">{value}</p>
        <p className="desc">{description}</p>
    </div>
);

export default UserReport;