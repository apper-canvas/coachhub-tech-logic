import React from 'react';

const ProgressBar = ({ progress, className = '' }) => {
    const clampedProgress = Math.min(Math.max(progress || 0, 0), 100);
    return (
        &lt;div className={`w-full bg-surface-200 rounded-full h-2 ${className}`}&gt;
            &lt;div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${clampedProgress}%` }}
            &gt;&lt;/div&gt;
        &lt;/div&gt;
    );
};

export default ProgressBar;