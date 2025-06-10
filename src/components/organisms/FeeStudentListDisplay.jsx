import React from 'react';
import EmptyState from '@/components/molecules/EmptyState';
import StudentListItem from '@/components/molecules/StudentListItem';
import FilterGroup from '@/components/molecules/FilterGroup';
import ApperIcon from '@/components/ApperIcon';

const FeeStudentListDisplay = ({ students, classes, filter, onFilterChange, onAddPayment, loading }) => {
    const getBatchName = (batchId) => {
        const batch = classes.find(c => c.id === batchId);
        return batch ? batch.batchName : 'Unknown Batch';
    };

    const filteredStudents = students.filter(student => {
        if (filter === 'all') return true;
        return student.feeStatus === filter;
    });

    const filterOptions = [
        { value: 'all', label: 'All Students' },
        { value: 'pending', label: 'Pending' },
        { value: 'paid', label: 'Paid' }
    ];

    if (loading) {
        return (
            &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
                &lt;div className="space-y-4"&gt;
                    {[...Array(5)].map((_, i) => (
                        &lt;div key={i} className="animate-pulse h-20 bg-surface-200 rounded"&gt;&lt;/div&gt;
                    ))}
                &lt;/div&gt;
            &lt;/div&gt;
        );
    }

    return (
        &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200"&gt;
            &lt;FilterGroup
                options={filterOptions}
                selectedValue={filter}
                onSelect={onFilterChange}
                className="!bg-transparent !shadow-none !border-none"
            /&gt;

            {filteredStudents.length === 0 ? (
                &lt;EmptyState
                    icon="CreditCard"
                    title={filter === 'all' ? 'No students found' : `No ${filter} payments found`}
                    message={filter === 'all'
                        ? 'Students will appear here once enrolled'
                        : `No students with ${filter} fee status`
                    }
                    className="!bg-transparent !shadow-none !border-none"
                &gt;
                    &lt;ApperIcon name="CreditCard" size={48} className="text-surface-300 mx-auto mb-4" /&gt;
                &lt;/EmptyState&gt;
            ) : (
                &lt;div className="divide-y divide-surface-100"&gt;
                    {filteredStudents.map((student, index) => (
                        &lt;StudentListItem
                            key={student.id}
                            student={student}
                            index={index}
                            batchName={getBatchName(student.batchId)}
                            onAddPayment={onAddPayment}
                            showFeeDetails={true}
                            showBatchName={true}
                            showActions={true}
                            onToggleFeeStatus={null} // Handled by add payment flow for fees page
                            onDelete={null} // Deletion on Students page
                        /&gt;
                    ))}
                &lt;/div&gt;
            )}
        &lt;/div&gt;
    );
};

export default FeeStudentListDisplay;