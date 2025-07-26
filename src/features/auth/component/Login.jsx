import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/login.css';

const Toast = withReactContent(
    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#1f2937',
        color: '#f3f4f6'
    })
);

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        secretKey: ''
    });
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('lawyerup_token');
        if (token) {
            axios
                .get(API.VERIFY_ADMIN, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(() => navigate('/admin'))
                .catch(() => {
                    localStorage.removeItem('lawyerup_token');
                    localStorage.removeItem('lawyerup_user');
                });
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isRegistering
                ? `${API.BASE_URL}auth/admin/register`
                : API.ADMIN_LOGIN;

            const data = isRegistering
                ? {
                    fullName: formData.fullName || 'Admin',
                    email: formData.email,
                    password: formData.password,
                    secretKey: formData.secretKey
                }
                : {
                    email: formData.email,
                    password: formData.password
                };

            const res = await axios.post(url, data);

            // ✅ Save token and user to localStorage
            localStorage.setItem('lawyerup_token', res.data.token);
            localStorage.setItem('lawyerup_user', JSON.stringify(res.data.user));

            Toast.fire({
                icon: 'success',
                title: isRegistering ? 'Admin registered' : 'Login successful'
            });

            setTimeout(() => navigate('/admin'), 600);
        } catch (err) {
            Toast.fire({
                icon: 'error',
                title: err.response?.data?.message || 'Login failed'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>{isRegistering ? 'Admin Sign Up' : 'Admin Login'}</h2>

                {isRegistering && (
                    <>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="secretKey"
                            placeholder="Secret Admin Code"
                            value={formData.secretKey}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading
                        ? isRegistering
                            ? 'Registering...'
                            : 'Logging in...'
                        : isRegistering
                            ? 'Sign Up as Admin'
                            : 'Login'}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                    {isRegistering ? 'Already an admin?' : 'Want to register new admin?'}{' '}
                    <span
                        style={{ color: '#10b981', cursor: 'pointer' }}
                        onClick={() => setIsRegistering(!isRegistering)}
                    >
            {isRegistering ? 'Sign In' : 'Sign Up'}
          </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
