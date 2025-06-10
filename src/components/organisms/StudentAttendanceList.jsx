import React from 'react';
import StudentAttendanceRow from '@/components/molecules/StudentAttendanceRow';
import EmptyState from '@/components/molecules/EmptyState';
import ApperIcon from '@/components/ApperIcon';

const StudentAttendanceList = ({ classStudents, getAttendanceStatus, selectedDate, loading }) => {
    if (loading) {
        return (
            &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
                &lt;div className="space-y-4"&gt;
                    {[...Array(5)].map((_, i) => (
                        &lt;div key={i} className="animate-pulse h-16 bg-surface-200 rounded"&gt;&lt;/div&gt;
                    ))}
                &lt;/div&gt;
            &lt;/div&gt;
        );
    }

    return (
        &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200"&gt;
            &lt;div className="p-6 border-b border-surface-200"&gt;
                &lt;div className="flex items-center justify-between"&gt;
                    &lt;h3 className="text-lg font-heading font-semibold text-surface-900"&gt;
                        Attendance for {new Date(selectedDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    &lt;/h3&gt;
                    &lt;div className="text-sm text-surface-600"&gt;
                        {classStudents.length} students
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            {classStudents.length === 0 ? (
                &lt;EmptyState
                    icon="Users"
                    title="No students enrolled"
                    message="This class doesn't have any enrolled students yet"
                    className="!bg-transparent !shadow-none !border-none"
                /&gt;
            ) : (
                &lt;div className="divide-y divide-surface-100"&gt;
                    {classStudents.map((student, index) => {
                        const status = getAttendanceStatus(student.id);
                        return (
                            &lt;StudentAttendanceRow
                                key={student.id}
                                student={student}
                                status={status}
                                date={selectedDate}
                                index={index}
                            /&gt;
                        );
                    })}
                &lt;/div&gt;
            )}
        &lt;/div&gt;
    );
};

export default StudentAttendanceList;