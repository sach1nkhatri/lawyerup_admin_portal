import React, { useState } from 'react';
import '../../user_control/css/UserTab.css';
import UserCard from './UserCard';
import useUsers from '../hooks/useUsers';

const UserTab = () => {
    const { users, loading } = useUsers();
    const [planFilter, setPlanFilter] = useState('All');

    const filteredUsers = users.filter(user =>
        planFilter === 'All' || user.plan?.toLowerCase() === planFilter.toLowerCase()
    );

    return (
        <div className="user-tab-wrapper">
            <h3>🧑‍💼 User Control Panel</h3>

            <div className="sub-tabs">
                <strong>Plan: </strong>
                {['All', 'Free Trial', 'Basic Plan', 'Premium Plan'].map((type) => (
                    <button
                        key={type}
                        className={planFilter === type ? 'active' : ''}
                        onClick={() => setPlanFilter(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="user-list">
                    {filteredUsers.length === 0 ? (
                        <p>No users match the filters</p>
                    ) : (
                        filteredUsers.map((user) => (
                            <UserCard key={user._id} user={user} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default UserTab;
