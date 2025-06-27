import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import API from '../../../app/api/api_endpoints';
import { startLoader, stopLoader } from '../utils/loader';

export const useLawyerApprovalPanel = () => {
    const [lawyers, setLawyers] = useState([]);
    const [view, setView] = useState('pending');
    const [targetLawyer, setTargetLawyer] = useState(null);
    const [showRejectPopup, setShowRejectPopup] = useState(false);

    useEffect(() => {
        fetchLawyers();
    }, []);

    const fetchLawyers = async () => {
        try {
            startLoader();
            const res = await fetch(API.GET_ALL_LAWYERS);
            const data = await res.json();
            setLawyers(data);
        } catch (err) {
            toast.error('Error fetching lawyers.');
        } finally {
            stopLoader();
        }
    };

    const updateStatus = async (id, status) => {
        try {
            startLoader();
            await fetch(API.UPDATE_LAWYER_STATUS(id), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            toast.success(`Status updated to ${status}`);
            fetchLawyers();
        } catch (err) {
            toast.error('Status update failed.');
        } finally {
            stopLoader();
        }
    };

    const confirmRejection = async () => {
        if (!targetLawyer) return;
        try {
            startLoader();
            const res = await fetch(API.DELETE_LAWYER(targetLawyer._id), {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error();
            toast.warn(`${targetLawyer.fullName}'s application rejected and deleted.`);
            setTargetLawyer(null);
            setShowRejectPopup(false);
            fetchLawyers();
        } catch (err) {
            toast.error('Failed to reject application.');
        } finally {
            stopLoader();
        }
    };

    return {
        lawyers,
        view,
        setView,
        targetLawyer,
        setTargetLawyer,
        showRejectPopup,
        setShowRejectPopup,
        updateStatus,
        confirmRejection,
    };
};

