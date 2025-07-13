// hooks/usePayments.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';

const usePayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem('lawyerup_token');
            const res = await axios.get(`${API.MANUAL_PAYMENT}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(res.data.filter(p => p.status === 'pending'));
        } catch (err) {
            console.error('Failed to fetch payments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return { payments, loading, refetch: fetchPayments };
};

export default usePayments;
