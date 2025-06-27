import React, { useState, useEffect, useRef } from 'react';
import '../css/NewsForm.css';

const NewsForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        summary: '',
        date: '',
        image: null,
        preview: '',
    });

    const formRef = useRef(null);

    useEffect(() => {
        if (initialData) {
            const imgUrl = initialData.image?.startsWith('http')
                ? initialData.image
                : `${process.env.REACT_APP_SERVER_URL}${initialData.image}`;
            setFormData({
                title: initialData.title,
                author: initialData.author,
                summary: initialData.summary,
                date: initialData.date,
                image: null,
                preview: imgUrl || '',
            });

            setTimeout(() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 200);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert('Image must be less than 2MB');
            return;
        }

        setFormData(prev => ({
            ...prev,
            image: file,
            preview: URL.createObjectURL(file),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('author', formData.author);
        data.append('summary', formData.summary);
        data.append('date', formData.date);
        if (formData.image) data.append('image', formData.image);
        onSubmit(data);
        setFormData({ title: '', author: '', summary: '', date: '', image: null, preview: '' });
    };

    return (
        <form className="news-form" onSubmit={handleSubmit} ref={formRef}>
            <h3>{initialData ? '✏️ Editing News' : '➕ Add New Article'}</h3>

            <input autoFocus type="text" name="title" placeholder="e.g. Legal breakthrough in..." value={formData.title} onChange={handleChange} required />
            <input type="text" name="author" placeholder="Author name" value={formData.author} onChange={handleChange} required />
            <textarea name="summary" placeholder="Write a compelling summary..." value={formData.summary} onChange={handleChange} required />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />

            <label className="upload-label">Image (Max 2MB):</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {formData.preview && (
                <img src={formData.preview} alt="preview" className="image-preview" onError={(e) => e.target.style.display = 'none'} />
            )}

            <div className="form-buttons">
                <button type="submit" className="submit-btn">
                    {initialData ? '💾 Save Changes' : '📤 Publish News'}
                </button>
                {initialData && (
                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default NewsForm;
