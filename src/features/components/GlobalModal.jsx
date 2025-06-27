import React from 'react';
import '../css/GlobalModal.css';

const GlobalModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancel' }) => {
    if (!isOpen) return null;

    return (
        <div className="global-modal-backdrop">
            <div className="global-modal">
                <h3 className="modal-title">{title}</h3>
                <p className="modal-message">{message}</p>
                <div className="modal-buttons">
                    {onCancel && (
                        <button className="cancel-btn" onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}
                    <button className="confirm-btn" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GlobalModal;
