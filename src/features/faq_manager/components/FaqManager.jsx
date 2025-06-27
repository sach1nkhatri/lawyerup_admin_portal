import React from 'react';
import '../../pdf_uploader/css/PdfUploader.css';
import { useFaqManager } from '../hooks/useFaqManager';

const FaqManager = () => {
    const {
        question, setQuestion,
        answer, setAnswer,
        faqs,
        handleAdd,
        handleDelete
    } = useFaqManager();

    return (
        <div className="pdf-uploader">
            <h2>❓ FAQ Uploader</h2>

            <input
                type="text"
                placeholder="Enter Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="input"
            />
            <textarea
                placeholder="Enter Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="input"
                rows={4}
            />

            <button className="upload-btn" onClick={handleAdd}>Add FAQ</button>

            <h3>📘 Existing FAQs</h3>
            {faqs.length === 0 ? (
                <p className="empty">No FAQs added yet.</p>
            ) : (
                <ul className="pdf-list">
                    {faqs.map((faq) => (
                        <li key={faq._id} className="pdf-item">
                            <div>
                                <strong>Q:</strong> {faq.question} <br />
                                <strong>A:</strong> {faq.answer}
                            </div>
                            <div className="actions">
                                <button className="delete-btn" onClick={() => handleDelete(faq._id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FaqManager;
