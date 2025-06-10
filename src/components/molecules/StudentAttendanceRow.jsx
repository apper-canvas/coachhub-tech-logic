import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import StudentAvatar from '@/components/atoms/StudentAvatar';

const getStatusColor = (status) => {
    switch (status) {
        case 'present': return 'text-success';
        case 'absent': return 'text-error';
        case 'late': return 'text-warning';
        default: return 'text-surface-400';
    }
};

const getStatusBg = (status) => {
    switch (status) {
        case 'present': return 'bg-success';
        case 'absent': return 'bg-error';
        case 'late': return 'bg-warning';
        default: return 'bg-surface-200';
    }
};

const StudentAttendanceRow = ({ student, status, date, index }) => {
    return (
        &lt;motion.div
            key={student.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:bg-surface-50 transition-colors"
        &gt;
            &lt;div className="flex items-center justify-between"&gt;
                &lt;div className="flex items-center space-x-4"&gt;
                    &lt;StudentAvatar name={student.name} /&gt;
                    &lt;div&gt;
                        &lt;h4 className="font-medium text-surface-900"&gt;{student.name}&lt;/h4&gt;
                        &lt;p className="text-sm text-surface-600"&gt;{student.phone}&lt;/p&gt;
                    &lt;/div&gt;
                &lt;/div&gt;

                &lt;div className="flex items-center space-x-4"&gt;
                    &lt;div className="text-right"&gt;
                        {status ? (
                            &lt;div className="flex items-center space-x-2"&gt;
                                &lt;div className={`w-3 h-3 rounded-full ${getStatusBg(status)}`}&gt;&lt;/div&gt;
                                &lt;span className={`text-sm font-medium ${getStatusColor(status)}`}&gt;
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                &lt;/span&gt;
                            &lt;/div&gt;
                        ) : (
                            &lt;span className="text-sm text-surface-400"&gt;Not marked&lt;/span&gt;
                        )}
                    &lt;/div&gt;

                    &lt;div className="flex items-center text-sm text-surface-500"&gt;
                        &lt;ApperIcon name="Calendar" size={14} className="mr-1" /&gt;
                        {new Date(date).toLocaleDateString()}
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/motion.div&gt;
    );
};

export default StudentAttendanceRow;