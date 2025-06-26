import React, { useState, useEffect } from 'react';
import NewsForm from './NewsForm';
import NewsList from './NewsList';
import { useModal } from '../../context/ModalContext';
import axios from 'axios';
import '../css/NewsAdmin.css';

const API_URL = 'http://localhost:5000/api/news'; // Update if hosted elsewhere

const NewsAdmin = () => {
    const [news, setNews] = useState([]);
    const [editData, setEditData] = useState(null);
    const { showModal } = useModal();

    // 🔃 Fetch on mount
    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        const res = await axios.get(API_URL);
        setNews(res.data);
    };

    const handleCreate = async (formData) => {
        await axios.post(API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        fetchNews();
        showModal({
            title: "News Created",
            message: "News has been added successfully!",
            confirmText: "Close",
        });
    };

    const handleUpdate = async (formData) => {
        await axios.put(`${API_URL}/${editData._id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        fetchNews();
        setEditData(null);
        showModal({
            title: "News Updated",
            message: "News has been updated.",
            confirmText: "Got it",
        });
    };


    const handleDelete = (id) => {
        const item = news.find(n => n.id === id);
        showModal({
            title: "Confirm Deletion",
            message: `Are you sure you want to delete "${item.title}"?`,
            confirmText: "Delete",
            cancelText: "Cancel",
            onConfirm: async () => {
                await axios.delete(`${API_URL}/${id}`);
                fetchNews();
                showModal({
                    title: "Deleted",
                    message: `"${item.title}" has been removed.`,
                    confirmText: "Close",
                });
            },
        });
    };

    const handleEdit = (item) => setEditData(item);

    return (
        <div className="admin-news-container">
            <div className="news-form-section">
                <NewsForm
                    onSubmit={editData ? handleUpdate : handleCreate}
                    initialData={editData}
                    onCancel={() => setEditData(null)}
                />
            </div>

            <NewsList newsItems={news} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default NewsAdmin;
