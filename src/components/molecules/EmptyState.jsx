import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const EmptyState = ({ icon, title, message, actionButton, className = '' }) => {
    return (
        &lt;div className={`bg-white rounded-lg shadow-sm border border-surface-200 p-12 text-center ${className}`}&gt;
            &lt;motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="mb-4"
            &gt;
                &lt;ApperIcon name={icon} size={48} className="text-surface-300 mx-auto" /&gt;
            &lt;/motion.div&gt;
            &lt;h3 className="text-lg font-medium text-surface-700 mb-2"&gt;{title}&lt;/h3&gt;
            &lt;p className="text-surface-600 mb-4"&gt;{message}&lt;/p&gt;
            {actionButton &amp;&amp; (
                &lt;Button
                    onClick={actionButton.onClick}
                    className="px-4 py-2 bg-primary text-white rounded-lg"
                    isAnimated={true}
                &gt;
                    {actionButton.label}
                &lt;/Button&gt;
            )}
        &lt;/div&gt;
    );
};

export default EmptyState;