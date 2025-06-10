import React from 'react';
import StatCard from '@/components/molecules/StatCard';

const DashboardStatsSection = ({ stats }) => {
    return (
        &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"&gt;
            &lt;StatCard
                title="Total Students"
                value={stats.totalStudents}
                icon="Users"
                color="bg-primary"
                change="12"
                delay={0}
            /&gt;
            &lt;StatCard
                title="Active Classes"
                value={stats.totalClasses}
                icon="BookOpen"
                color="bg-secondary"
                change="8"
                delay={0.1}
            /&gt;
            &lt;StatCard
                title="Today's Attendance"
                value={stats.todaysAttendance}
                icon="UserCheck"
                color="bg-success"
                change="5"
                delay={0.2}
            /&gt;
            &lt;StatCard
                title="Pending Fees"
                value={stats.pendingFees}
                icon="AlertCircle"
                color="bg-warning"
                delay={0.3}
            /&gt;
        &lt;/div&gt;
    );
};

export default DashboardStatsSection;