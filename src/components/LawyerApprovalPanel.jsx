// src/components/LawyerApprovalPanel.jsx
import React, { useEffect, useState } from 'react';
import '../css/LawyerApprovalPanel.css';

const LawyerApprovalPanel = () => {
    const [lawyers, setLawyers] = useState([]);

    useEffect(() => {
        fetchLawyers();
    }, []);

    const fetchLawyers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/lawyers');
            const data = await res.json();
            setLawyers(data.filter(l => l.status === 'pending')); // ✅ show only pending
        } catch (err) {
            console.error('Failed to fetch lawyers:', err);
        }
    };

    const updateStatus = async (id, status) => {
        await fetch(`http://localhost:5000/api/lawyers/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        fetchLawyers(); // refresh list
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/lawyers')
            .then(res => res.json())
            .then(data => {
                console.log('Lawyers from backend:', data);
                setLawyers(data);
            })
            .catch(err => {
                console.error('Error fetching lawyers:', err);
            });
    }, []);


    return (
        <div className="lawyer-approval-panel">
            <h2>Lawyer Applications</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {lawyers.map((lawyer) => (
                    <tr key={lawyer._id}>
                        <td>{lawyer.fullName}</td>
                        <td>{lawyer.specialization}</td>
                        <td>{lawyer.email}</td>
                        <td>{lawyer.status}</td>
                        <td>
                            <button onClick={() => updateStatus(lawyer._id, 'verified')}>Approve</button>
                            <button onClick={() => updateStatus(lawyer._id, 'disabled')}>Disable</button>
                            <button onClick={() => updateStatus(lawyer._id, 'hold')}>Hold</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LawyerApprovalPanel;
