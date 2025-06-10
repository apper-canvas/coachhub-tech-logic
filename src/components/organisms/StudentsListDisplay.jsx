import React from 'react';
import SearchInput from '@/components/molecules/SearchInput';
import Select from '@/components/atoms/Select';
import StudentListItem from '@/components/molecules/StudentListItem';
import EmptyState from '@/components/molecules/EmptyState';
import Button from '@/components/atoms/Button';

const StudentsListDisplay = ({
    students,
    classes,
    searchTerm,
    onSearchChange,
    selectedBatch,
    onBatchChange,
    onDeleteStudent,
    onToggleFeeStatus,
    onAddStudentClick,
    loading
}) => {
    const getBatchName = (batchId) => {
        const batch = classes.find(c => c.id === batchId);
        return batch ? batch.batchName : 'Unknown Batch';
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.phone.includes(searchTerm) ||
                             student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBatch = selectedBatch === 'all' || student.batchId === selectedBatch;
        return matchesSearch &amp;&amp; matchesBatch;
    });

    if (loading) {
        return (
            &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
                &lt;div className="space-y-4"&gt;
                    {[...Array(5)].map((_, i) => (
                        &lt;div key={i} className="animate-pulse border-b border-surface-100 pb-4"&gt;
                            &lt;div className="flex items-center space-x-4"&gt;
                                &lt;div className="w-12 h-12 bg-surface-200 rounded-full"&gt;&lt;/div&gt;
                                &lt;div className="flex-1 space-y-2"&gt;
                                    &lt;div className="h-4 bg-surface-200 rounded w-48"&gt;&lt;/div&gt;
                                    &lt;div className="h-3 bg-surface-200 rounded w-32"&gt;&lt;/div&gt;
                                &lt;/div&gt;
                                &lt;div className="h-6 bg-surface-200 rounded w-16"&gt;&lt;/div&gt;
                                &lt;div className="h-8 bg-surface-200 rounded w-20"&gt;&lt;/div&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    ))}
                &lt;/div&gt;
            &lt;/div&gt;
        );
    }

    return (
        &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200"&gt;
            &lt;div className="p-4 border-b border-surface-200"&gt;
                &lt;div className="flex flex-col sm:flex-row gap-4"&gt;
                    &lt;SearchInput
                        value={searchTerm}
                        onChange={onSearchChange}
                        placeholder="Search students by name, phone, or email..."
                    /&gt;
                    &lt;Select
                        value={selectedBatch}
                        onChange={onBatchChange}
                        options={[{ value: 'all', label: 'All Batches' }, ...classes.map(cls => ({ value: cls.id, label: cls.batchName }))]}
                    /&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            {filteredStudents.length === 0 ? (
                &lt;EmptyState
                    icon="Users"
                    title={searchTerm || selectedBatch !== 'all' ? 'No students found' : 'No students yet'}
                    message={searchTerm || selectedBatch !== 'all' ? 'Try adjusting your search or filter criteria' : 'Get started by adding your first student'}
                    actionButton={!searchTerm &amp;&amp; selectedBatch === 'all' ? { label: 'Add First Student', onClick: onAddStudentClick } : null}
                    className="!bg-transparent !shadow-none !border-none"
                /&gt;
            ) : (
                &lt;div className="divide-y divide-surface-100"&gt;
                    {filteredStudents.map((student, index) => (
                        &lt;StudentListItem
                            key={student.id}
                            student={student}
                            index={index}
                            batchName={getBatchName(student.batchId)}
                            onToggleFeeStatus={onToggleFeeStatus}
                            onDelete={onDeleteStudent}
                            showAddPayment={false} // Only for Fees page
                        /&gt;
                    ))}
                &lt;/div&gt;
            )}
        &lt;/div&gt;
    );
};

export default StudentsListDisplay;