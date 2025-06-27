import React from 'react';
import '../css/NewsList.css';

const NewsList = ({ newsItems, onEdit, onDelete }) => {
    return (
        <div className="news-admin-list">
            <h3>📚 Published News</h3>
            {newsItems.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888' }}>No news articles added yet.</p>
            ) : (
                <div className="news-list-grid">
                    {newsItems.map((item) => (
                        <div className="news-list-card" key={item._id}>
                            <img src={`http://localhost:5000${item.image}`} alt={item.title} onError={(e) => (e.target.style.display = 'none')} />
                            <div className="news-list-content">
                                <h4>{item.title}</h4>
                                <p className="news-meta">🖋 {item.author} | 📅 {item.date}</p>
                                <p className="news-summary">{item.summary}</p>
                                <div className="news-list-buttons">
                                    <button className="edit-btn" onClick={() => onEdit(item)}>Edit</button>
                                    <button className="delete-btn" onClick={() => onDelete(item._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsList;
