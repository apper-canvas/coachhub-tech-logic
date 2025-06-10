import React from 'react';
import Button from '@/components/atoms/Button';

const FilterGroup = ({ options, selectedValue, onSelect, className = '' }) => {
    return (
        &lt;div className={`bg-white rounded-lg shadow-sm border border-surface-200 p-4 ${className}`}&gt;
            &lt;div className="flex items-center space-x-4"&gt;
                &lt;label className="text-sm font-medium text-surface-700"&gt;Filter by status:&lt;/label&gt;
                &lt;div className="flex space-x-2"&gt;
                    {options.map(({ value, label }) => (
                        &lt;Button
                            key={value}
                            onClick={() => onSelect(value)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                selectedValue === value
                                    ? 'bg-primary text-white'
                                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                            }`}
                            isAnimated={false}
                        &gt;
                            {label}
                        &lt;/Button&gt;
                    ))}
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    );
};

export default FilterGroup;