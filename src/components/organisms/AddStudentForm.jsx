import React from 'react';
import FormField from '@/components/molecules/FormField';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';

const AddStudentForm = ({ formData, setFormData, classes, handleSubmit, onCancel, loading }) => {
return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Full Name">
                <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter student's full name"
                />
            </FormField>

            <FormField label="Phone Number">
                <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 9876543210"
                />
            </FormField>

            <FormField label="Email Address">
                <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="student@email.com"
                />
            </FormField>

            <FormField label="Batch">
                <Select
                    required
                    value={formData.batchId}
                    onChange={(e) => setFormData(prev => ({ ...prev, batchId: e.target.value }))}
                    options={classes.map(cls => ({ value: cls.id, label: cls.batchName }))}
                    placeholder="Select a batch"
                />
            </FormField>

            <FormField label="Total Fees">
                <Input
                    type="number"
                    required
                    value={formData.totalFees}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalFees: e.target.value }))}
                    placeholder="15000"
                />
            </FormField>

            <div className="flex justify-end space-x-3 pt-4">
                <Button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                    isAnimated={false}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Student'}
                </Button>
            </div>
        </form>
    );
};

export default AddStudentForm;