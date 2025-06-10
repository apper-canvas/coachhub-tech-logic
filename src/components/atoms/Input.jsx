import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className = '', ...rest }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...rest}
        />
    );
};

export default Input;