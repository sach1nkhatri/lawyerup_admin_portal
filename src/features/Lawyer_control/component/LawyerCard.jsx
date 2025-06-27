import React from 'react';
import defaultAvatar from '../../../app/assets/avatar.png';
import { getImageUrl } from '../utils/getImageUrl';
import { getFileUrl } from '../utils/getFileUrl';

const LawyerCard = ({ lawyer, onUpdateStatus, onReject }) => {
    const photoURL = getImageUrl(lawyer.profilePhoto);
    const licenseURL = getFileUrl(lawyer.licenseFile);

    return (
        <div className="lawyer-card">
            <div className="card-header">
                <img
                    src={photoURL}
                    alt={lawyer.fullName}
                    className="lawyer-avatar"
                    onError={(e) => (e.target.src = defaultAvatar)}
                />
                <div>
                    <h3>{lawyer.fullName}</h3>
                    <p><strong>Specialization:</strong> {lawyer.specialization}</p>
                    <p><strong>Qualification:</strong> {lawyer.qualification}</p>
                    <p><strong>Experience:</strong> {lawyer.experience} years</p>
                    <p><strong>Bar Reg. No:</strong> {lawyer.barRegNumber}</p>
                    <p><strong>Email:</strong> {lawyer.email}</p>
                    <p><strong>Contact:</strong> {lawyer.phone}</p>
                    <p><strong>Address:</strong> {lawyer.address}</p>
                </div>
            </div>

            <div className="card-body">
                <p><strong>Status:</strong> <span className={`status-badge ${lawyer.status}`}>{lawyer.status}</span></p>
                <p><strong>License:</strong>{' '}
                    {lawyer.licenseFile ? (
                        <a href={licenseURL} target="_blank" rel="noreferrer">📄 View License PDF</a>
                    ) : (
                        <span style={{ color: 'red' }}>Not Uploaded</span>
                    )}
                </p>

                <div className="action-buttons">
                    {lawyer.status === 'pending' && (
                        <>
                            <button className="approve" onClick={() => onUpdateStatus(lawyer._id, 'listed')}>✅ Approve</button>
                            <button className="hold" onClick={() => onUpdateStatus(lawyer._id, 'hold')}>✋ Hold</button>
                            <button className="disable" onClick={() => onUpdateStatus(lawyer._id, 'disabled')}>❌ Disable</button>
                            <button className="reject" onClick={() => onReject(lawyer)}>🗑 Reject</button>
                        </>
                    )}
                    {lawyer.status === 'listed' && (
                        <>
                            <button className="disable" onClick={() => onUpdateStatus(lawyer._id, 'disabled')}>🛑 Disable</button>
                            <button className="hold" onClick={() => onUpdateStatus(lawyer._id, 'hold')}>✋ Hold</button>
                        </>
                    )}
                    {lawyer.status === 'hold' && (
                        <>
                            <button className="approve" onClick={() => onUpdateStatus(lawyer._id, 'listed')}>✅ Resume</button>
                            <button className="disable" onClick={() => onUpdateStatus(lawyer._id, 'disabled')}>❌ Disable</button>
                        </>
                    )}
                    {lawyer.status === 'disabled' && (
                        <>
                            <button className="approve" onClick={() => onUpdateStatus(lawyer._id, 'listed')}>✅ Re-Approve</button>
                            <button className="reject" onClick={() => onReject(lawyer)}>🗑 Reject</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LawyerCard;
