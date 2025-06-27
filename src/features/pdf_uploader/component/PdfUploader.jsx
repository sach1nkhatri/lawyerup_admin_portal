import React from 'react';
import { usePdfManager } from '../hooks/usePdfManager';
import '../css/PdfUploader.css';

const PdfUploader = () => {
    const {
        title,
        setTitle,
        file,
        setFile,
        pdfs,
        handleUpload,
        handleDelete
    } = usePdfManager();

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
                                    href={`${process.env.REACT_APP_SERVER_URL}${pdf.url}`}
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
