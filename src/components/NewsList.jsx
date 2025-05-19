import React from 'react';
import '../css/NewsList.css';

const NewsList = ({ newsItems, onEdit, onDelete }) => {
    return (
        <div className="news-admin-list">
            <h3>Published News</h3>
            <div className="news-list-grid">
                {newsItems.map((item) => (
                    <div className="news-list-card" key={item.id}>
                        <img src={item.image} alt="news" />
                        <div className="news-list-content">
                            <h4>{item.title}</h4>
                            <p className="news-meta">By {item.author} on {item.date}</p>
                            <p className="news-summary">{item.summary}</p>
                            <div className="news-list-buttons">
                                <button className="edit-btn" onClick={() => onEdit(item)}>Edit</button>
                                <button className="delete-btn" onClick={() => onDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
