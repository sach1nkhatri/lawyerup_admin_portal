import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API from '../../../app/api/api_endpoints';

export const useFaqManager = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [faqs, setFaqs] = useState([]);

    const fetchFaqs = async () => {
        try {
            const res = await axios.get(API.FAQ.GET);
            setFaqs(res.data);
        } catch (err) {
            console.error('Failed to fetch FAQs:', err);
        }
    };

    const handleAdd = async () => {
        if (!question || !answer) {
            Swal.fire('Missing Input', 'Please provide both question and answer.', 'warning');
            return;
        }

        try {
            await axios.post(API.FAQ.CREATE, { question, answer });
            Swal.fire('Success', 'FAQ added successfully!', 'success');
            setQuestion('');
            setAnswer('');
            fetchFaqs();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to add FAQ.', 'error');
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the FAQ.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(API.FAQ.DELETE(id));
                Swal.fire('Deleted!', 'FAQ has been deleted.', 'success');
                fetchFaqs();
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to delete FAQ.', 'error');
            }
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    return {
        question,
        setQuestion,
        answer,
        setAnswer,
        faqs,
        handleAdd,
        handleDelete,
    };
};
