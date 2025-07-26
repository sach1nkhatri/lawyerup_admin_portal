import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';
import Swal from 'sweetalert2';
import '../css/reportViewer.css';

const ReportViewer = () => {
    const [reports, setReports] = useState([]);
    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pending' | 'fixed'

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await axios.get(API.REPORTS.GET_ALL);
            setReports(res.data);
        } catch (err) {
            console.error('Failed to load reports:', err);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(API.REPORTS.UPDATE_STATUS(id), { status: newStatus });
            fetchReports();
        } catch (err) {
            console.error('Status update failed:', err);
        }
    };

    const handleStatusConfirm = (id, newStatus) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You are about to mark this report as "${newStatus}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, mark as ${newStatus}`
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus(id, newStatus);
                Swal.fire({
                    title: 'Updated!',
                    text: `Report marked as "${newStatus}".`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const filteredReports = reports.filter(r => {
        if (activeTab === 'all') return true;
        return r.status === activeTab;
    });

    return (
        <div className="report-view-container">
            <h2>📋 User Reports</h2>

            <div className="report-view-tabs">
                {['all', 'pending', 'fixed'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={activeTab === tab ? 'active-tab' : ''}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {filteredReports.length === 0 ? (
                <p className="report-view-empty">No reports to show.</p>
            ) : (
                <div className="report-view-list">
                    {filteredReports.map((r) => (
                        <div key={r._id} className={`report-view-card ${r.status}`}>
                            <div className="report-view-meta">
                                <p><strong>User:</strong> {r.user?.fullName || 'Unknown'}</p>
                                <p><strong>Email:</strong> {r.user?.email || 'N/A'}</p>
                                <p><strong>Status:</strong> {r.status}</p>
                            </div>
                            <p className="report-view-msg">📝 {r.message}</p>
                            <div className="report-view-actions">
                                {r.status === 'pending' ? (
                                    <button onClick={() => handleStatusConfirm(r._id, 'fixed')}>
                                        Mark as Fixed
                                    </button>
                                ) : (
                                    <button onClick={() => handleStatusConfirm(r._id, 'pending')}>
                                        Revert to Pending
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReportViewer;
