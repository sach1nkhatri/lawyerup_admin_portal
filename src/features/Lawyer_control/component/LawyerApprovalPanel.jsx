import React from 'react';
import '../css/LawyerApprovalPane.css';
import { useLawyerApprovalPanel } from '../hooks/useLawyerApprovalPanel';
import LawyerCard from './LawyerCard';

const LawyerApprovalPanel = () => {
    const {
        lawyers, view, setView,
        targetLawyer, setTargetLawyer,
        showRejectPopup, setShowRejectPopup,
        updateStatus, confirmRejection
    } = useLawyerApprovalPanel();

    const filtered = lawyers.filter(l => l.status === view);

    return (
        <div className="admin-lawyer-panel">
            <h2>⚖️ Lawyer Management Panel</h2>

            <div className="tab-bar">
                {['pending', 'listed', 'hold', 'disabled'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setView(tab)}
                        className={view === tab ? 'active-tab' : ''}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <p className="empty-state">No {view} applications.</p>
            ) : (
                <div className="lawyer-card-grid">
                    {filtered.map(lawyer => (
                        <LawyerCard
                            key={lawyer._id}
                            lawyer={lawyer}
                            onUpdateStatus={updateStatus}
                            onReject={setTargetLawyer}
                        />
                    ))}
                </div>
            )}

            {showRejectPopup && (
                <div className="reject-modal-overlay">
                    <div className="reject-modal">
                        <h3>Reject Application</h3>
                        <p>Are you sure you want to reject and delete <strong>{targetLawyer?.fullName}</strong>'s application?</p>
                        <div className="modal-actions">
                            <button onClick={() => setShowRejectPopup(false)}>Cancel</button>
                            <button onClick={confirmRejection}>Confirm Reject</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LawyerApprovalPanel;
