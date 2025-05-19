import React, { useState, useEffect } from 'react';
import NewsForm from '../components/NewsForm';
import NewsList from '../components/NewsList';
import { useModal } from '../context/ModalContext';
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

    const handleCreate = async (newItem) => {
        await axios.post(API_URL, newItem);
        fetchNews(); // refresh
        showModal({
            title: "News Created",
            message: `"${newItem.title}" has been added successfully!`,
            confirmText: "Close",
        });
    };

    const handleUpdate = async (updatedItem) => {
        await axios.put(`${API_URL}/${updatedItem._id}`, updatedItem);
        await fetchNews();
        setEditData(null);
        showModal({
            title: "News Updated",
            message: `"${updatedItem.title}" has been updated.`,
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
