import React from 'react';
import FormField from '@/components/molecules/FormField';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';

const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AddClassForm = ({ formData, setFormData, handleSubmit, onCancel, toggleDay, loading }) => {
    return (
        &lt;form onSubmit={handleSubmit} className="space-y-4"&gt;
            &lt;FormField label="Batch Name"&gt;
                &lt;Input
                    type="text"
                    required
                    value={formData.batchName}
                    onChange={(e) => setFormData(prev => ({ ...prev, batchName: e.target.value }))}
                    placeholder="JEE Advanced 2024"
                /&gt;
            &lt;/FormField&gt;

            &lt;FormField label="Subject"&gt;
                &lt;Input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Physics &amp; Mathematics"
                /&gt;
            &lt;/FormField&gt;

            &lt;FormField label="Teacher ID"&gt;
                &lt;Input
                    type="text"
                    required
                    value={formData.teacherId}
                    onChange={(e) => setFormData(prev => ({ ...prev, teacherId: e.target.value }))}
                    placeholder="T001"
                /&gt;
            &lt;/FormField&gt;

            &lt;FormField label="Timing"&gt;
                &lt;Input
                    type="text"
                    required
                    value={formData.timing}
                    onChange={(e) => setFormData(prev => ({ ...prev, timing: e.target.value }))}
                    placeholder="09:00 AM - 12:00 PM"
                /&gt;
            &lt;/FormField&gt;

            &lt;FormField label="Schedule Days"&gt;
                &lt;div className="grid grid-cols-2 gap-2"&gt;
                    {dayOptions.map(day => (
                        &lt;Checkbox
                            key={day}
                            label={day}
                            checked={formData.days.includes(day)}
                            onChange={() => toggleDay(day)}
                        /&gt;
                    ))}
                &lt;/div&gt;
            &lt;/FormField&gt;

            &lt;div className="grid grid-cols-2 gap-4"&gt;
                &lt;FormField label="Room Number"&gt;
                    &lt;Input
                        type="text"
                        required
                        value={formData.roomNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, roomNumber: e.target.value }))}
                        placeholder="A101"
                    /&gt;
                &lt;/FormField&gt;

                &lt;FormField label="Max Students"&gt;
                    &lt;Input
                        type="number"
                        required
                        value={formData.maxStudents}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: e.target.value }))}
                        placeholder="30"
                    /&gt;
                &lt;/FormField&gt;
            &lt;/div&gt;

            &lt;div className="flex justify-end space-x-3 pt-4"&gt;
                &lt;Button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                    isAnimated={false}
                &gt;
                    Cancel
                &lt;/Button&gt;
                &lt;Button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    disabled={loading}
                &gt;
                    {loading ? 'Creating...' : 'Create Class'}
                &lt;/Button&gt;
            &lt;/div&gt;
        &lt;/form&gt;
    );
};

export default AddClassForm;