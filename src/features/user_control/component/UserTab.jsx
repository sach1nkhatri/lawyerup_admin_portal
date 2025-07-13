import React, { useState, useEffect } from 'react';
import '../../user_control/css/UserTab.css';
import UserCard from './UserCard'; // placeholder for actual user display

const mockUsers = [
    {
        _id: '1',
        fullName: 'Ram Patel',
        email: 'ram@gmail.com',
        plan: 'Free',
        status: 'active',
        validUntil: null,
    },
    {
        _id: '2',
        fullName: 'Anisha Sharma',
        email: 'anisha@lawyerup.com',
        plan: 'Premium',
        status: 'active',
        validUntil: '2025-07-30',
    },
    {
        _id: '3',
        fullName: 'Sita Lama',
        email: 'sita@gmail.com',
        plan: 'Basic',
        status: 'hold',
        validUntil: '2025-07-20',
    },
];

const UserTab = () => {
    const [filter, setFilter] = useState('All');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Replace this with actual API call
        setUsers(mockUsers);
    }, []);

    const filteredUsers = filter === 'All'
        ? users
        : users.filter(user => user.plan === filter);

    return (
        <div className="user-tab-wrapper">
            <div className="sub-tabs">
                {['All', 'Free', 'Basic', 'Premium'].map((type) => (
                    <button
                        key={type}
                        className={filter === type ? 'active' : ''}
                        onClick={() => setFilter(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="user-list">
                {filteredUsers.length === 0 ? (
                    <p>No users found for "{filter}"</p>
                ) : (
                    filteredUsers.map((user) => (
                        <UserCard key={user._id} user={user} />
                    ))
                )}
            </div>
        </div>
    );
};

export default UserTab;
