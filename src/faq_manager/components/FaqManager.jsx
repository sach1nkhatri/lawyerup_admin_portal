import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../pdf_uploader/css/PdfUploader.css'; // Reuse styling

const FaqManager = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [faqs, setFaqs] = useState([]);

    const fetchFaqs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/faqs');
            setFaqs(res.data);
        } catch (err) {
            console.error('Failed to fetch FAQs:', err);
        }
    };

    const handleAdd = async () => {
        if (!question || !answer) {
            Swal.fire('Missing Input', 'Please provide both question and answer.', 'warning');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/faqs', { question, answer });
            Swal.fire('Success', 'FAQ added successfully!', 'success');
            setQuestion('');
            setAnswer('');
            fetchFaqs();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to add FAQ.', 'error');
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the FAQ.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/faqs/${id}`);
                Swal.fire('Deleted!', 'FAQ has been deleted.', 'success');
                fetchFaqs();
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to delete FAQ.', 'error');
            }
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

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
