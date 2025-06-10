import React from 'react';
import ClassCard from '@/components/molecules/ClassCard';
import EmptyState from '@/components/molecules/EmptyState';

const ClassesDisplayGrid = ({ classes, students, onDeleteClass, onAddClassClick, loading }) => {
    const getEnrolledCount = (classId) => {
        return students.filter(s => s.batchId === classId).length;
    };

    if (loading) {
        return (
            &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
                {[...Array(6)].map((_, i) => (
                    &lt;div key={i} className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
                        &lt;div className="animate-pulse"&gt;
                            &lt;div className="h-6 bg-surface-200 rounded w-3/4 mb-4"&gt;&lt;/div&gt;
                            &lt;div className="h-4 bg-surface-200 rounded w-1/2 mb-2"&gt;&lt;/div&gt;
                            &lt;div className="h-4 bg-surface-200 rounded w-2/3 mb-4"&gt;&lt;/div&gt;
                            &lt;div className="flex justify-between"&gt;
                                &lt;div className="h-4 bg-surface-200 rounded w-16"&gt;&lt;/div&gt;
                                &lt;div className="h-4 bg-surface-200 rounded w-20"&gt;&lt;/div&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                ))}
            &lt;/div&gt;
        );
    }

    return (
        &lt;div&gt;
            {classes.length === 0 ? (
                &lt;EmptyState
                    icon="BookOpen"
                    title="No classes created yet"
                    message="Start by creating your first batch to organize students"
                    actionButton={{ label: 'Create First Class', onClick: onAddClassClick }}
                /&gt;
            ) : (
                &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
                    {classes.map((classData, index) => (
                        &lt;ClassCard
                            key={classData.id}
                            classData={classData}
                            enrolledCount={getEnrolledCount(classData.id)}
                            onDelete={onDeleteClass}
                            delay={index * 0.1}
                        /&gt;
                    ))}
                &lt;/div&gt;
            )}
        &lt;/div&gt;
    );
};

export default ClassesDisplayGrid;