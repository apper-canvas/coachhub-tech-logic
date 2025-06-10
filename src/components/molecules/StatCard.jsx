import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ title, value, icon, color, change, delay = 0 }) => {
    return (
        &lt;motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
        &gt;
            &lt;div className="flex items-center justify-between"&gt;
                &lt;div&gt;
                    &lt;p className="text-sm font-medium text-surface-600"&gt;{title}&lt;/p&gt;
                    &lt;p className="text-2xl font-bold text-surface-900 mt-2"&gt;{value}&lt;/p&gt;
                    {change && (
                        &lt;p className="text-xs text-success mt-1"&gt;
                            +{change}% from last month
                        &lt;/p&gt;
                    )}
                &lt;/div&gt;
                &lt;div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}&gt;
                    &lt;ApperIcon name={icon} size={24} className="text-white" /&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/motion.div&gt;
    );
};

export default StatCard;