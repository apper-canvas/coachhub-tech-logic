import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import ActivityItem from '@/components/molecules/ActivityItem';
import Button from '@/components/atoms/Button';

const RecentActivitiesSection = ({ activities }) => {
    return (
        &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
            &lt;div className="flex items-center mb-4"&gt;
                &lt;ApperIcon name="Activity" size={20} className="text-primary mr-2" /&gt;
                &lt;h3 className="text-lg font-heading font-semibold text-surface-900"&gt;Recent Activities&lt;/h3&gt;
            &lt;/div&gt;

            &lt;div className="space-y-4"&gt;
                {activities.map((activity, index) => (
                    &lt;ActivityItem
                        key={activity.id}
                        icon={activity.icon}
                        message={activity.message}
                        time={activity.time}
                        delay={index * 0.1}
                    /&gt;
                ))}
            &lt;/div&gt;

            &lt;Button
                onClick={() => console.log('View All Activities')} // Placeholder for actual navigation
                className="w-full mt-4 px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                isAnimated={true}
            &gt;
                View All Activities
            &lt;/Button&gt;
        &lt;/div&gt;
    );
};

export default RecentActivitiesSection;
import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import ActivityItem from '@/components/molecules/ActivityItem';
import Button from '@/components/atoms/Button';

const RecentActivitiesSection = ({ activities }) => {
    return (
        &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
            &lt;div className="flex items-center mb-4"&gt;
                &lt;ApperIcon name="Activity" size={20} className="text-primary mr-2" /&gt;
                &lt;h3 className="text-lg font-heading font-semibold text-surface-900"&gt;Recent Activities&lt;/h3&gt;
            &lt;/div&gt;

            &lt;div className="space-y-4"&gt;
                {activities.map((activity, index) => (
                    &lt;ActivityItem
                        key={activity.id}
                        icon={activity.icon}
                        message={activity.message}
                        time={activity.time}
                        delay={index * 0.1}
                    /&gt;
                ))}
            &lt;/div&gt;

            &lt;Button
                onClick={() => console.log('View All Activities')} // Placeholder for actual navigation
                className="w-full mt-4 px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                isAnimated={true}
            &gt;
                View All Activities
            &lt;/Button&gt;
        &lt;/div&gt;
    );
};

export default RecentActivitiesSection;