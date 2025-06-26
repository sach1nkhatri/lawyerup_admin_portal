import React, { useState, useEffect } from 'react';
import '../css/NewsForm.css';

const NewsForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        summary: '',
        date: '',
        image: null, // now stores file
        preview: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                preview: initialData.image || '',
                image: null,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            alert("Image must be less than 2MB.");
            return;
        }

        setFormData(prev => ({
            ...prev,
            image: file,
            preview: URL.createObjectURL(file), // blob preview
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

        onSubmit(data); // pass FormData
        setFormData({
            title: '',
            author: '',
            summary: '',
            date: '',
            image: null,
            preview: '',
        });
    };


    return (
        <form className="news-form" onSubmit={handleSubmit}>
            <h3>{initialData ? 'Edit News' : 'Add News'}</h3>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange}
                   required/>
            <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange}
                   required/>
            <textarea name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange} required/>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required/>

            <label className="upload-label">Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange}/>
            <img
                src={formData.preview}
                alt="Preview"
                className="image-preview"
                style={{display: formData.preview ? 'block' : 'none'}}
            />
            <div className="form-buttons">
                <button type="submit">{initialData ? 'Update' : 'Create'}</button>
                {initialData && <button type="button" onClick={onCancel}>Cancel</button>}
            </div>
        </form>
    );
};

export default NewsForm;
