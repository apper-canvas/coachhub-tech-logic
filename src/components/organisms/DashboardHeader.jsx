import React from 'react';

const DashboardHeader = () => {
    return (
        &lt;div className="flex items-center justify-between"&gt;
            &lt;div&gt;
                &lt;h1 className="text-2xl font-heading font-bold text-surface-900"&gt;Dashboard&lt;/h1&gt;
                &lt;p className="text-surface-600 mt-1"&gt;Welcome back! Here's what's happening at your coaching center today.&lt;/p&gt;
            &lt;/div&gt;
            &lt;div className="text-right"&gt;
                &lt;p className="text-sm text-surface-600"&gt;Today&lt;/p&gt;
                &lt;p className="text-lg font-semibold text-surface-900"&gt;
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                &lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    );
};

export default DashboardHeader;