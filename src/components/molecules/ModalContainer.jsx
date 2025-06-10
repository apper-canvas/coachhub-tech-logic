import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ModalContainer = ({ isOpen, onClose, title, children }) => {
    return (
        &lt;AnimatePresence&gt;
            {isOpen &amp;&amp; (
                &lt;&gt;
                    &lt;motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={onClose}
                    /&gt;
                    &lt;motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    &gt;
                        &lt;div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"&gt;
                            &lt;div className="flex items-center justify-between mb-6"&gt;
                                &lt;h3 className="text-lg font-heading font-semibold text-surface-900"&gt;{title}&lt;/h3&gt;
                                &lt;button
                                    onClick={onClose}
                                    className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
                                &gt;
                                    &lt;ApperIcon name="X" size={20} /&gt;
                                &lt;/button&gt;
                            &lt;/div&gt;
                            {children}
                        &lt;/div&gt;
                    &lt;/motion.div&gt;
                &lt;/&gt;
            )}
        &lt;/AnimatePresence&gt;
    );
};

export default ModalContainer;