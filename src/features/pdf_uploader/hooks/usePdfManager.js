import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';
import Swal from 'sweetalert2';

export const usePdfManager = () => {
    const [pdfs, setPdfs] = useState([]);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const fetchPdfs = async () => {
        const res = await axios.get(API.PDFS.GET_ALL);
        setPdfs(res.data);
    };

    const handleUpload = async () => {
        if (!file || !title) {
            Swal.fire('Missing Input', 'Please provide both title and a PDF file.', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('pdf', file);

        try {
            await axios.post(API.PDFS.UPLOAD, formData);
            Swal.fire('Success', 'PDF uploaded successfully!', 'success');
            setTitle('');
            setFile(null);
            fetchPdfs();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'PDF upload failed.', 'error');
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the PDF.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(API.PDFS.DELETE(id));
                Swal.fire('Deleted!', 'The PDF has been deleted.', 'success');
                fetchPdfs();
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to delete the PDF.', 'error');
            }
        }
    };

    useEffect(() => {
        fetchPdfs();
    }, []);

    return {
        title,
        setTitle,
        file,
        setFile,
        pdfs,
        handleUpload,
        handleDelete
    };
};
