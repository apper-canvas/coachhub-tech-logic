import React from 'react';
import StatCard from '@/components/molecules/StatCard';

const FeesOverviewStats = ({ totalCollected, totalPending, pendingStudents }) => {
    return (
        &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-6"&gt;
            &lt;StatCard
                title="Total Collected"
                value={`₹${totalCollected.toLocaleString()}`}
                icon="TrendingUp"
                color="bg-success/10 text-success"
                delay={0}
                className="[&gt;div&gt;div&gt;p.text-surface-900]:!text-success"
            /&gt;
            &lt;StatCard
                title="Pending Amount"
                value={`₹${totalPending.toLocaleString()}`}
                icon="Clock"
                color="bg-warning/10 text-warning"
                delay={0.1}
                className="[&gt;div&gt;div&gt;p.text-surface-900]:!text-warning"
            /&gt;
            &lt;StatCard
                title="Pending Students"
                value={pendingStudents}
                icon="Users"
                color="bg-error/10 text-error"
                delay={0.2}
                className="[&gt;div&gt;div&gt;p.text-surface-900]:!text-error"
            /&gt;
        &lt;/div&gt;
    );
};

export default FeesOverviewStats;