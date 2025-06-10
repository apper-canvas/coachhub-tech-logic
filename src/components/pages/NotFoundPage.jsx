import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    &lt;div className="min-h-screen flex items-center justify-center bg-surface-50 px-4"&gt;
      &lt;motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      &gt;
        &lt;motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="mb-8"
        &gt;
          &lt;ApperIcon name="BookX" size={80} className="text-primary mx-auto" /&gt;
        &lt;/motion.div&gt;

        &lt;h1 className="text-4xl font-heading font-bold text-surface-900 mb-4"&gt;
          Page Not Found
        &lt;/h1&gt;

        &lt;p className="text-surface-600 mb-8"&gt;
          Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
        &lt;/p&gt;

        &lt;div className="space-y-4"&gt;
          &lt;Button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          &gt;
            Go to Dashboard
          &lt;/Button&gt;

          &lt;Button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors font-medium"
          &gt;
            Go Back
          &lt;/Button&gt;
        &lt;/div&gt;
      &lt;/motion.div&gt;
    &lt;/div&gt;
  );
};

export default NotFoundPage;