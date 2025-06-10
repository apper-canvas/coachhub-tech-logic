import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import StudentAvatar from '@/components/atoms/StudentAvatar';
import StatusBadge from '@/components/atoms/StatusBadge';
import StudentFeeOverview from '@/components/molecules/StudentFeeOverview';
import Button from '@/components/atoms/Button';

const StudentListItem = ({
    student,
    index,
    batchName,
    onToggleFeeStatus,
    onDelete,
    onAddPayment,
    showFeeDetails = true,
    showBatchName = true,
    showActions = true,
    className = ''
}) => {
    return (
        &lt;motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-6 hover:bg-surface-50 transition-colors ${className}`}
        &gt;
            &lt;div className="flex items-center justify-between"&gt;
                &lt;div className="flex items-center space-x-4"&gt;
                    &lt;StudentAvatar name={student.name} /&gt;
                    &lt;div&gt;
                        &lt;h3 className="font-medium text-surface-900"&gt;{student.name}&lt;/h3&gt;
                        &lt;div className="flex items-center space-x-4 mt-1"&gt;
                            &lt;p className="text-sm text-surface-600"&gt;{student.phone}&lt;/p&gt;
                            {student.email &amp;&amp; &lt;p className="text-sm text-surface-600"&gt;{student.email}&lt;/p&gt;}
                            {showBatchName &amp;&amp; batchName &amp;&amp; &lt;p className="text-sm text-surface-500"&gt;{batchName}&lt;/p&gt;}
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;

                {showActions &amp;&amp; (
                    &lt;div className="flex items-center space-x-3"&gt;
                        {showFeeDetails &amp;&amp; (
                            &lt;StudentFeeOverview
                                paidAmount={student.paidAmount}
                                totalFees={student.totalFees}
                                className="w-24 md:w-32"
                            /&gt;
                        )}

                        {student.feeStatus &amp;&amp; (
                            &lt;StatusBadge status={student.feeStatus} className="hidden md:block" /&gt;
                        )}

                        &lt;div className="flex space-x-2"&gt;
                            {onToggleFeeStatus &amp;&amp; (
                                &lt;Button
                                    onClick={() => onToggleFeeStatus(student.id, student.feeStatus === 'paid' ? 'pending' : 'paid')}
                                    className="p-2 text-surface-400 hover:text-primary hover:bg-primary/10 rounded-lg"
                                    title="Toggle fee status"
                                    isAnimated={false}
                                &gt;
                                    &lt;ApperIcon name="CreditCard" size={16} /&gt;
                                &lt;/Button&gt;
                            )}
                            {onAddPayment &amp;&amp; student.feeStatus === 'pending' &amp;&amp; (
                                &lt;Button
                                    onClick={() => onAddPayment(student)}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center text-sm"
                                    isAnimated={true}
                                &gt;
                                    &lt;ApperIcon name="Plus" size={16} className="mr-2" /&gt;
                                    Add Payment
                                &lt;/Button&gt;
                            )}
                            {onDelete &amp;&amp; (
                                &lt;Button
                                    onClick={() => onDelete(student.id)}
                                    className="p-2 text-surface-400 hover:text-error hover:bg-error/10 rounded-lg"
                                    title="Delete student"
                                    isAnimated={false}
                                &gt;
                                    &lt;ApperIcon name="Trash2" size={16} /&gt;
                                &lt;/Button&gt;
                            )}
                        &lt;/div&gt;
                    &lt;/div&gt;
                )}
            &lt;/div&gt;
        &lt;/motion.div&gt;
    );
};

export default StudentListItem;