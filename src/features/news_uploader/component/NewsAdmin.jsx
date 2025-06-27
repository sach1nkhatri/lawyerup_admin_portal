import React, { useState } from 'react';
import NewsForm from './NewsForm';
import NewsList from './NewsList';
import { useNewsManager } from '../hooks/useNewsManager';
import '../css/NewsAdmin.css';

const NewsAdmin = () => {
    const {
        news,
        handleCreate,
        handleUpdate,
        handleDelete
    } = useNewsManager();

    const [editData, setEditData] = useState(null);

    const handleFormSubmit = (formData) => {
        if (editData) {
            handleUpdate(formData, editData._id);
            setEditData(null);
        } else {
            handleCreate(formData);
        }
    };

    return (
        <div className="admin-news-container">
            <div className="news-form-section">
                <NewsForm
                    onSubmit={handleFormSubmit}
                    initialData={editData}
                    onCancel={() => setEditData(null)}
                />
            </div>

            <NewsList newsItems={news} onEdit={setEditData} onDelete={handleDelete} />
        </div>
    );
};

export default NewsAdmin;
