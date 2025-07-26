import React, { useState } from 'react';
import '../css/PaymentCard.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import API from '../../../app/api/api_endpoints';

const PaymentCard = ({ payment, onAction }) => {
    const [showModal, setShowModal] = useState(false);
    const {
        _id,
        user,
        plan,
        amount,
        method,
        screenshot,
        validUntil,
        paymentDate,
        status
    } = payment;

    const handleAction = async (type) => {
        const confirm = await Swal.fire({
            title: `${type === 'approve' ? 'Approve' : 'Reject'} Payment`,
            text: `Are you sure you want to ${type} this payment?`,
            icon: type === 'approve' ? 'success' : 'warning',
            showCancelButton: true,
            confirmButtonColor: type === 'approve' ? '#28a745' : '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: `Yes, ${type}`,
        });

        if (!confirm.isConfirmed) return;

        const endpoint =
            type === 'approve'
                ? API.PAYMENTS.APPROVE(_id)
                : API.PAYMENTS.REJECT(_id);

        try {
            const token = localStorage.getItem('lawyerup_token');
            await axios.patch(endpoint, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            Swal.fire(
                `${type === 'approve' ? 'Approved' : 'Rejected'}!`,
                `Payment has been ${type}d.`,
                type === 'approve' ? 'success' : 'info'
            );
            onAction(); // refresh list
        } catch (err) {
            console.error('Action failed:', err);
            Swal.fire('Error', 'Something went wrong!', 'error');
        }
    };

    return (
        <>
            <div className="payment-card">
                <div>
                    <p><strong>User:</strong> {user?.fullName}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Plan:</strong> {plan}</p>
                    <p><strong>Method:</strong> {method}</p>
                    <p><strong>Amount:</strong> Rs {amount}</p>
                    <p><strong>Paid On:</strong> {new Date(paymentDate).toDateString()}</p>
                    <p><strong>Valid Until:</strong> {new Date(validUntil).toDateString()}</p>
                    <p>
                        <strong>Status:</strong>{' '}
                        <span className={`status-badge status-${status}`}>{status.toUpperCase()}</span>
                    </p>
                </div>

                <div className="screenshot-preview">
                    <img
                        src={`${process.env.REACT_APP_SERVER_URL}/${screenshot}`}
                        alt="payment screenshot"
                        loading="lazy"
                        onClick={() => setShowModal(true)}
                        style={{ cursor: 'pointer' }}
                    />
                    <p style={{ fontSize: '12px', marginTop: '6px' }}><em>Click to enlarge</em></p>
                </div>

                {status === 'pending' && (
                    <div className="action-buttons">
                        <button className="approve" onClick={() => handleAction('approve')}>Approve</button>
                        <button className="reject" onClick={() => handleAction('reject')}>Reject</button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-backdrop" onClick={() => setShowModal(false)}>
                    <img
                        src={`${process.env.REACT_APP_SERVER_URL}/${screenshot}`}
                        alt="fullscreen payment"
                        className="modal-image"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
};

export default PaymentCard;
