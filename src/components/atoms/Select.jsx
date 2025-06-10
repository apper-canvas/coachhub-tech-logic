import React from 'react';

const Select = ({ value, onChange, options = [], className = '', placeholder = '', ...rest }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...rest}
        >
            {placeholder && &lt;option value="" disabled&gt;{placeholder}&lt;/option&gt;}
            {options.map((option) => (
                &lt;option key={option.value} value={option.value}&gt;
                    {option.label}
                &lt;/option&gt;
            ))}
        </select>
    );
};

export default Select;