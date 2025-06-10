import React from 'react';

const getStatusColorClass = (status) => {
    switch (status) {
        case 'paid': return 'bg-success text-white';
        case 'pending': return 'bg-warning text-white';
        case 'overdue': return 'bg-error text-white';
        case 'present': return 'bg-success text-white';
        case 'absent': return 'bg-error text-white';
        case 'late': return 'bg-warning text-white';
        default: return 'bg-surface-200 text-surface-700';
    }
};

const StatusBadge = ({ status, className = '' }) => {
    if (!status) return null;
    const colorClass = getStatusColorClass(status);
    return (
        &lt;span className={`px-3 py-1 rounded-md text-sm font-medium ${colorClass} ${className}`}&gt;
            {status.charAt(0).toUpperCase() + status.slice(1)}
        &lt;/span&gt;
    );
};

export default StatusBadge;