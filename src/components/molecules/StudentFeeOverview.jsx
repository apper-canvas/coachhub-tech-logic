import React from 'react';
import ProgressBar from '@/components/atoms/ProgressBar';

const StudentFeeOverview = ({ paidAmount, totalFees, className = '' }) => {
    const progress = (paidAmount / totalFees) * 100;
    return (
        &lt;div className={`text-right ${className}`}&gt;
            &lt;p className="text-lg font-semibold text-surface-900"&gt;
                ₹{paidAmount.toLocaleString()} / ₹{totalFees.toLocaleString()}
            &lt;/p&gt;
            &lt;ProgressBar progress={progress} className="w-32 mt-2" /&gt;
            &lt;p className="text-xs text-surface-500 mt-1"&gt;
                {Math.round(progress)}% paid
            &lt;/p&gt;
        &lt;/div&gt;
    );
};

export default StudentFeeOverview;