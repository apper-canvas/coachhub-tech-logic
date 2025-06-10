import React from 'react';

const FormField = ({ label, children, className = '' }) => {
    return (
        &lt;div className={className}&gt;
            &lt;label className="block text-sm font-medium text-surface-700 mb-2"&gt;{label}&lt;/label&gt;
            {children}
        &lt;/div&gt;
    );
};

export default FormField;