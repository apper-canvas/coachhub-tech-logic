import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import StudentAvatar from '@/components/atoms/StudentAvatar';

const MarkAttendancePanel = ({
    selectedClass,
    students,
    attendance,
    loading,
    updateAttendance,
    submitAttendance,
    onClose
}) => {
    return (
        &lt;motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
        &gt;
            &lt;div className="flex items-center justify-between mb-6"&gt;
                &lt;div&gt;
                    &lt;h3 className="text-lg font-heading font-semibold text-surface-900"&gt;
                        Mark Attendance - {selectedClass.batchName}
                    &lt;/h3&gt;
                    &lt;p className="text-sm text-surface-600"&gt;{selectedClass.subject} • {selectedClass.timing}&lt;/p&gt;
                &lt;/div&gt;
                &lt;button
                    onClick={onClose}
                    className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
                &gt;
                    &lt;ApperIcon name="X" size={20} /&gt;
                &lt;/button&gt;
            &lt;/div&gt;

            {loading ? (
                &lt;div className="space-y-3"&gt;
                    {[...Array(5)].map((_, i) => (
                        &lt;div key={i} className="animate-pulse flex items-center space-x-4"&gt;
                            &lt;div className="w-10 h-10 bg-surface-200 rounded-full"&gt;&lt;/div&gt;
                            &lt;div className="flex-1 h-4 bg-surface-200 rounded"&gt;&lt;/div&gt;
                            &lt;div className="flex space-x-2"&gt;
                                {[...Array(3)].map((_, j) => (
                                    &lt;div key={j} className="w-16 h-8 bg-surface-200 rounded"&gt;&lt;/div&gt;
                                ))}&lt;/div&gt;
                        &lt;/div&gt;
                    ))}
                &lt;/div&gt;
            ) : (
                &lt;&gt;
                    &lt;div className="space-y-3 mb-6 max-h-64 overflow-y-auto"&gt;
                        {students.map((student, index) => (
                            &lt;motion.div
                                key={student.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center justify-between p-3 border border-surface-200 rounded-lg"
                            &gt;
                                &lt;div className="flex items-center space-x-3"&gt;
                                    &lt;StudentAvatar name={student.name} /&gt;
                                    &lt;div&gt;
                                        &lt;p className="font-medium text-surface-900"&gt;{student.name}&lt;/p&gt;
                                        &lt;p className="text-sm text-surface-600"&gt;{student.phone}&lt;/p&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div className="flex space-x-2"&gt;
                                    {['present', 'absent', 'late'].map((status) => (
                                        &lt;Button
                                            key={status}
                                            onClick={() => updateAttendance(student.id, status)}
                                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                                                attendance[student.id] === status
                                                    ? status === 'present'
                                                        ? 'bg-success text-white'
                                                        : status === 'absent'
                                                            ? 'bg-error text-white'
                                                            : 'bg-warning text-white'
                                                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                                            }`}
                                            isAnimated={false}
                                        &gt;
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        &lt;/Button&gt;
                                    ))}
                                &lt;/div&gt;
                            &lt;/motion.div&gt;
                        ))}
                    &lt;/div&gt;

                    {students.length === 0 ? (
                        &lt;div className="text-center py-8"&gt;
                            &lt;ApperIcon name="Users" size={48} className="text-surface-300 mx-auto mb-4" /&gt;
                            &lt;p className="text-surface-600"&gt;No students enrolled in this batch&lt;/p&gt;
                        &lt;/div&gt;
                    ) : (
                        &lt;div className="flex justify-end space-x-3"&gt;
                            &lt;Button
                                onClick={onClose}
                                className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                            &gt;
                                Cancel
                            &lt;/Button&gt;
                            &lt;Button
                                onClick={submitAttendance}
                                disabled={loading}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                            &gt;
                                {loading ? (
                                    &lt;div className="flex items-center space-x-2"&gt;
                                        &lt;div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"&gt;&lt;/div&gt;
                                        &lt;span&gt;Submitting...&lt;/span&gt;
                                    &lt;/div&gt;
                                ) : (
                                    'Submit Attendance'
                                )}
                            &lt;/Button&gt;
                        &lt;/div&gt;
                    )}
                &lt;/&gt;
            )}
        &lt;/motion.div&gt;
    );
};

export default MarkAttendancePanel;