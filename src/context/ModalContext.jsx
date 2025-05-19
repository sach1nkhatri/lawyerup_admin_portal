import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({ isOpen: false });

    const showModal = ({ title, message, onConfirm, onCancel, confirmText = "OK", cancelText = "Cancel" }) => {
        setModal({
            isOpen: true,
            title,
            message,
            onConfirm,
            onCancel,
            confirmText,
            cancelText,
        });
    };

    const hideModal = () => setModal({ isOpen: false });

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            {modal.isOpen && (
                <div className="global-modal-backdrop">
                    <div className="global-modal">
                        <h3>{modal.title}</h3>
                        <p>{modal.message}</p>
                        <div className="modal-buttons">
                            {modal.onCancel && (
                                <button className="cancel" onClick={() => { modal.onCancel(); hideModal(); }}>
                                    {modal.cancelText}
                                </button>
                            )}
                            <button className="confirm" onClick={() => { modal.onConfirm(); hideModal(); }}>
                                {modal.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};
