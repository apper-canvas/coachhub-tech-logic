import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ProgressBar from '@/components/atoms/ProgressBar';
import Button from '@/components/atoms/Button';

const ClassCard = ({ classData, enrolledCount, onDelete, delay = 0 }) => {
    const getScheduleDisplay = (days) => {
        if (days.length === 0) return 'No schedule';
        if (days.length === 7) return 'Daily';
        if (days.length === 5 &amp;&amp; !days.includes('Saturday') &amp;&amp; !days.includes('Sunday')) return 'Weekdays';
        if (days.length === 2 &amp;&amp; days.includes('Saturday') &amp;&amp; days.includes('Sunday')) return 'Weekends';
        return days.join(', ');
    };

    const enrollmentProgress = (enrolledCount / classData.maxStudents) * 100;

    return (
        &lt;motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-sm border border-surface-200 p-6 hover:border-primary/30 hover:shadow-md transition-all"
        &gt;
            &lt;div className="flex items-start justify-between mb-4"&gt;
                &lt;div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"&gt;
                    &lt;ApperIcon name="BookOpen" size={20} className="text-primary" /&gt;
                &lt;/div&gt;
                &lt;div className="flex space-x-2"&gt;
                    &lt;Button
                        onClick={() => onDelete(classData.id)}
                        className="p-2 text-surface-400 hover:text-error hover:bg-error/10 rounded-lg"
                        isAnimated={false}
                    &gt;
                        &lt;ApperIcon name="Trash2" size={16} /&gt;
                    &lt;/Button&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;h3 className="font-heading font-semibold text-surface-900 mb-2"&gt;{classData.batchName}&lt;/h3&gt;
            &lt;p className="text-sm text-surface-600 mb-4"&gt;{classData.subject}&lt;/p&gt;

            &lt;div className="space-y-3"&gt;
                &lt;div className="flex items-center text-sm text-surface-600"&gt;
                    &lt;ApperIcon name="Clock" size={14} className="mr-2" /&gt;
                    {classData.timing}
                &lt;/div&gt;

                &lt;div className="flex items-center text-sm text-surface-600"&gt;
                    &lt;ApperIcon name="Calendar" size={14} className="mr-2" /&gt;
                    &lt;span className="break-words"&gt;{getScheduleDisplay(classData.days)}&lt;/span&gt;
                &lt;/div&gt;

                &lt;div className="flex items-center text-sm text-surface-600"&gt;
                    &lt;ApperIcon name="MapPin" size={14} className="mr-2" /&gt;
                    Room {classData.roomNumber}
                &lt;/div&gt;

                &lt;div className="flex items-center justify-between pt-3 border-t border-surface-100"&gt;
                    &lt;div className="flex items-center text-sm"&gt;
                        &lt;ApperIcon name="Users" size={14} className="mr-2 text-primary" /&gt;
                        &lt;span className="text-surface-900 font-medium"&gt;
                            {enrolledCount}/{classData.maxStudents}
                        &lt;/span&gt;
                    &lt;/div&gt;

                    &lt;ProgressBar progress={enrollmentProgress} className="w-16" /&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/motion.div&gt;
    );
};

export default ClassCard;