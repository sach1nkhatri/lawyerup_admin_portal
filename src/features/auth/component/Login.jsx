import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'; // You can customize this

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple auth simulation (add real logic later)
        if (formData.email === 'admin@lawyerup.com' && formData.password === 'admin123') {
            localStorage.setItem('lawyerup_user', JSON.stringify({ fullName: 'Admin', email: formData.email, plan: 'Admin' }));
            navigate('/admin');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
