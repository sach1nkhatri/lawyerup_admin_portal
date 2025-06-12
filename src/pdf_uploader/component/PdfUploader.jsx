import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/PdfUploader.css';

const PdfUploader = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [pdfs, setPdfs] = useState([]);

    const fetchPdfs = async () => {
        const res = await axios.get('http://localhost:5000/api/pdfs');
        setPdfs(res.data);
    };

    const handleUpload = async () => {
        if (!file || !title) {
            Swal.fire('Missing Input', 'Please provide both title and a PDF file.', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('pdf', file);

        try {
            await axios.post('http://localhost:5000/api/pdfs/upload', formData);
            Swal.fire('Success', 'PDF uploaded successfully!', 'success');
            setTitle('');
            setFile(null);
            fetchPdfs();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'PDF upload failed.', 'error');
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the PDF.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/pdfs/${id}`);
                Swal.fire('Deleted!', 'The PDF has been deleted.', 'success');
                fetchPdfs();
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to delete the PDF.', 'error');
            }
        }
    };

    useEffect(() => {
        fetchPdfs();
    }, []);

    return (
        <div className="pdf-uploader">
            <h2>📄 PDF Uploader</h2>

            <input
                type="text"
                placeholder="PDF title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
            />

            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="input"
            />

            <button className="upload-btn" onClick={handleUpload}>Upload PDF</button>

            <h3>📚 Uploaded PDFs</h3>
            {pdfs.length === 0 ? (
                <p className="empty">No PDFs uploaded yet.</p>
            ) : (
                <ul className="pdf-list">
                    {pdfs.map((pdf) => (
                        <li key={pdf._id} className="pdf-item">
                            <span>{pdf.title}</span>
                            <div className="actions">
                                <a
                                    href={`http://localhost:5000${pdf.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="view-btn"
                                >
                                    View
                                </a>
                                <button className="delete-btn" onClick={() => handleDelete(pdf._id)}>
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

export default PdfUploader;
