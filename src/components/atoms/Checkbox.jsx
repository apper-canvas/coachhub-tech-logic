import React from 'react';

const Checkbox = ({ label, checked, onChange, className = '', ...rest }) => {
    return (
        &lt;label className={`flex items-center ${className}`}&gt;
            &lt;input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-primary border-surface-300 rounded focus:ring-primary"
                {...rest}
            /&gt;
            &lt;span className="ml-2 text-sm text-surface-700"&gt;{label}&lt;/span&gt;
        &lt;/label&gt;
    );
};

export default Checkbox;