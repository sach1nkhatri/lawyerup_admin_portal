import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';
import { useModal } from '../../context/ModalContext';

export const useNewsManager = () => {
    const [news, setNews] = useState([]);
    const { showModal } = useModal();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        const res = await axios.get(API.NEWS.GET_ALL);
        setNews(res.data);
    };

    const handleCreate = async (formData) => {
        await axios.post(API.NEWS.CREATE, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        fetchNews();
        showModal({
            title: 'News Created',
            message: 'News has been added successfully!',
            confirmText: 'Close',
        });
    };


    const handleUpdate = async (formData, newsId) => {
        if (!newsId) {
            console.error('❌ Missing newsId in handleUpdate');
            return;
        }

        await axios.put(API.NEWS.UPDATE(newsId), formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        fetchNews();
        showModal({
            title: 'News Updated',
            message: 'News has been updated.',
            confirmText: 'Got it',
        });
    };

    const handleDelete = (id) => {
        const item = news.find((n) => n.id === id || n._id === id);
        showModal({
            title: 'Confirm Deletion',
            message: `Are you sure you want to delete "${item.title}"?`,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: async () => {
                await axios.delete(API.NEWS.DELETE(id));
                fetchNews();
                showModal({
                    title: 'Deleted',
                    message: `"${item.title}" has been removed.`,
                    confirmText: 'Close',
                });
            },
        });
    };

    return {
        news,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
};
