import React from 'react';
import FormField from '@/components/molecules/FormField';
import Select from '@/components/atoms/Select';
import Input from '@/components/atoms/Input';

const AttendanceFiltersSection = ({ classes, selectedClass, onClassChange, selectedDate, onDateChange }) => {
    return (
        &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200 p-4"&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
                &lt;FormField label="Select Class"&gt;
                    &lt;Select
                        value={selectedClass}
                        onChange={onClassChange}
                        options={[{ value: '', label: 'Choose a class...' }, ...classes.map(cls => ({ value: cls.id, label: cls.batchName }))]}
                        placeholder="Choose a class..."
                    /&gt;
                &lt;/FormField&gt;

                &lt;FormField label="Date"&gt;
                    &lt;Input
                        type="date"
                        value={selectedDate}
                        onChange={onDateChange}
                    /&gt;
                &lt;/FormField&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    );
};

export default AttendanceFiltersSection;