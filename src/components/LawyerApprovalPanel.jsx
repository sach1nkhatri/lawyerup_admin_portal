
import React, { useEffect, useState } from 'react';
import '../css/LawyerApprovalPanel.css';
import defaultAvatar from '../assets/avatar.png';
import { toast } from 'react-toastify';
import { startLoader, stopLoader } from '../utils/loader';
import 'react-toastify/dist/ReactToastify.css';

const LawyerApprovalPanel = () => {
    const [lawyers, setLawyers] = useState([]);
    const [view, setView] = useState('pending');
    const [targetLawyer, setTargetLawyer] = useState(null);
    const [showRejectPopup, setShowRejectPopup] = useState(false);

    useEffect(() => {
        fetchLawyers();
    }, []);

    const fetchLawyers = async () => {
        try {
            startLoader();
            const res = await fetch('http://localhost:5000/api/lawyers');
            const data = await res.json();
            setLawyers(data);
        } catch (err) {
            toast.error('Error fetching lawyers.');
        } finally {
            stopLoader();
        }
    };

    const updateStatus = async (id, status) => {
        try {
            startLoader();
            await fetch(`http://localhost:5000/api/lawyers/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            toast.success(`Status updated to ${status}`);
            fetchLawyers();
        } catch (err) {
            toast.error('Status update failed.');
        } finally {
            stopLoader();
        }
    };

    const handleReject = (lawyer) => {
        setTargetLawyer(lawyer);
        setShowRejectPopup(true);
    };

    const confirmRejection = async () => {
        if (!targetLawyer) return;
        try {
            startLoader();
            const res = await fetch(`http://localhost:5000/api/lawyers/${targetLawyer._id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error();
            toast.warn(`${targetLawyer.fullName}'s application rejected and deleted.`);
            setShowRejectPopup(false);
            setTargetLawyer(null);
            fetchLawyers();
        } catch (err) {
            toast.error('Failed to reject application.');
        } finally {
            stopLoader();
        }
    };

    const filtered = lawyers.filter(l => l.status === view);

    const renderLawyerCard = (lawyer) => {
        const licenseURL = lawyer.licenseFile?.startsWith('http')
            ? lawyer.licenseFile
            : lawyer.licenseFile?.startsWith('data:application/pdf')
                ? lawyer.licenseFile
                : `http://localhost:5000/uploads/${lawyer.licenseFile || ''}`;


        const photoURL = lawyer.profilePhoto?.startsWith('data:image')
            ? lawyer.profilePhoto
            : `http://localhost:5000/uploads/${lawyer.profilePhoto || ''}`;

        return (
            <div key={lawyer._id} className="lawyer-card">
                <div className="card-header">
                    <img src={photoURL} alt="Lawyer" className="lawyer-avatar" onError={(e) => e.target.src = defaultAvatar} />
                    <div>
                        <h3>{lawyer.fullName}</h3>
                        <p><strong>Specialization:</strong> {lawyer.specialization}</p>
                        <p><strong>Qualification:</strong> {lawyer.qualification}</p>
                        <p><strong>Email:</strong> {lawyer.email}</p>
                        <p><strong>Contact:</strong> {lawyer.phone}</p>
                        <p><strong>Address:</strong> {lawyer.address}</p>
                    </div>
                </div>

                <div className="card-body">
                    <p><strong>Status:</strong> <span className={`status-badge ${lawyer.status}`}>{lawyer.status}</span>
                    </p>
                    <p><strong>License:</strong>{' '}
                        {lawyer.licenseFile ? (
                            <a href={licenseURL} target="_blank" rel="noreferrer">📄 View License PDF</a>
                        ) : (
                            <span style={{color: 'red'}}>Not Uploaded</span>
                        )}
                    </p>

                    <div className="action-buttons">
                        {lawyer.status === 'pending' && (
                            <>
                                <button className="approve" onClick={() => updateStatus(lawyer._id, 'listed')}>✅
                                    Approve
                                </button>
                                <button className="hold" onClick={() => updateStatus(lawyer._id, 'hold')}>✋ Hold
                                </button>
                                <button className="disable" onClick={() => updateStatus(lawyer._id, 'disabled')}>❌
                                    Disable
                                </button>
                                <button className="reject" onClick={() => handleReject(lawyer)}>🗑 Reject</button>
                            </>
                        )}
                        {lawyer.status === 'listed' && (
                            <>
                                <button className="disable" onClick={() => updateStatus(lawyer._id, 'disabled')}>🛑
                                    Disable
                                </button>
                                <button className="hold" onClick={() => updateStatus(lawyer._id, 'hold')}>✋ Hold
                                </button>
                            </>
                        )}
                        {lawyer.status === 'hold' && (
                            <>
                                <button className="approve" onClick={() => updateStatus(lawyer._id, 'listed')}>✅
                                    Resume
                                </button>
                                <button className="disable" onClick={() => updateStatus(lawyer._id, 'disabled')}>❌
                                    Disable
                                </button>
                            </>
                        )}
                        {lawyer.status === 'disabled' && (
                            <>
                                <button className="approve" onClick={() => updateStatus(lawyer._id, 'listed')}>✅
                                    Re-Approve
                                </button>
                                <button className="reject" onClick={() => handleReject(lawyer)}>🗑 Reject</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

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
                    {filtered.map(renderLawyerCard)}
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
