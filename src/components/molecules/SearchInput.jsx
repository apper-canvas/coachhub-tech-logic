import React from 'react';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const SearchInput = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
    return (
        &lt;div className={`flex-1 relative ${className}`}&gt;
            &lt;Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-10 pr-4"
            /&gt;
            &lt;ApperIcon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400"
            /&gt;
        &lt;/div&gt;
    );
};

export default SearchInput;