import React from 'react';

const PageHeader = ({ title, subtitle, actionButton }) => {
    return (
        &lt;div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"&gt;
            &lt;div&gt;
                &lt;h1 className="text-2xl font-heading font-bold text-surface-900"&gt;{title}&lt;/h1&gt;
                &lt;p className="text-surface-600 mt-1"&gt;{subtitle}&lt;/p&gt;
            &lt;/div&gt;
            {actionButton}
        &lt;/div&gt;
    );
};

export default PageHeader;