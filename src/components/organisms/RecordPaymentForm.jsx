import React from 'react';
import FormField from '@/components/molecules/FormField';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import ProgressBar from '@/components/atoms/ProgressBar';

const RecordPaymentForm = ({ selectedStudent, paymentData, setPaymentData, handleSubmit, onCancel, loading }) => {
    if (!selectedStudent) return null;

    const outstandingAmount = selectedStudent.totalFees - selectedStudent.paidAmount;
    const progress = (selectedStudent.paidAmount / selectedStudent.totalFees) * 100;

    return (
        &lt;form onSubmit={handleSubmit} className="space-y-4"&gt;
            &lt;div className="mb-6 p-4 bg-surface-50 rounded-lg"&gt;
                &lt;h4 className="font-medium text-surface-900"&gt;{selectedStudent.name}&lt;/h4&gt;
                &lt;p className="text-sm text-surface-600 mt-1"&gt;
                    Outstanding: ₹{outstandingAmount.toLocaleString()}
                &lt;/p&gt;
                &lt;ProgressBar progress={progress} className="w-full mt-2" /&gt;
            &lt;/div&gt;

            &lt;FormField label="Payment Amount"&gt;
                &lt;Input
                    type="number"
                    required
                    min="1"
                    max={outstandingAmount}
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="Enter amount"
                /&gt;
            &lt;/FormField&gt;

            &lt;FormField label="Payment Mode"&gt;
                &lt;Select
                    value={paymentData.paymentMode}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, paymentMode: e.target.value }))}
                    options={[
                        { value: 'cash', label: 'Cash' },
                        { value: 'online', label: 'Online Transfer' },
                        { value: 'card', label: 'Card Payment' },
                        { value: 'cheque', label: 'Cheque' }
                    ]}
                /&gt;
            &lt;/FormField&gt;

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
                    {loading ? 'Recording...' : 'Record Payment'}
                &lt;/Button&gt;
            &lt;/div&gt;
        &lt;/form&gt;
    );
};

export default RecordPaymentForm;