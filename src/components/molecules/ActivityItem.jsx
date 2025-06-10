import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ActivityItem = ({ icon, message, time, delay = 0 }) => {
    return (
        &lt;motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-50 transition-colors"
        &gt;
            &lt;div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"&gt;
                &lt;ApperIcon name={icon} size={14} className="text-primary" /&gt;
            &lt;/div&gt;
            &lt;div className="flex-1 min-w-0"&gt;
                &lt;p className="text-sm text-surface-900 break-words"&gt;{message}&lt;/p&gt;
                &lt;p className="text-xs text-surface-500 mt-1"&gt;{time}&lt;/p&gt;
            &lt;/div&gt;
        &lt;/motion.div&gt;
    );
};

export default ActivityItem;