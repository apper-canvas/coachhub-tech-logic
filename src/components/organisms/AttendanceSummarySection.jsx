import React from 'react';
import StatCard from '@/components/molecules/StatCard';
import { motion } from 'framer-motion';

const AttendanceSummarySection = ({ classStudentsLength, presentCount, absentCount, lateCount, attendanceStats, selectedClassData }) => {
    return (
        &lt;&gt;
            &lt;div className="grid grid-cols-1 md:grid-cols-4 gap-6"&gt;
                &lt;StatCard
                    title="Total Students"
                    value={classStudentsLength}
                    icon="Users"
                    color="bg-primary/10 text-primary"
                    delay={0}
                    className="[&gt;div&gt;div&gt;p.text-surface-900]:!text-surface-900"
                /&gt;
                &lt;StatCard
                    title="Present"
                    value={presentCount}
                    icon="UserCheck"
                    color="bg-success/10 text-success"
                    delay={0.1}
                    className="[&gt;div&gt;div&gt;p.text-surface-900]:!text-success"
                /&gt;
                &lt;StatCard
                    title="Absent"
                    value={absentCount}
                    icon="UserX"
                    color="bg-error/10 text-error"
                    delay={0.2}
                    className="[&gt;div&gt;div&gt;p.text-surface-900]:!text-error"
                /&gt;
                &lt;StatCard
                    title="Late"
                    value={lateCount}
                    icon="Clock"
                    color="bg-warning/10 text-warning"
                    delay={0.3}
                    className="[&gt;div&gt;div&gt;p.text-surface-900]:!text-warning"
                /&gt;
            &lt;/div&gt;

            {selectedClassData &amp;&amp; (
                &lt;div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white"&gt;
                    &lt;div className="flex items-center justify-between"&gt;
                        &lt;div&gt;
                            &lt;h3 className="text-xl font-heading font-bold"&gt;{selectedClassData.batchName}&lt;/h3&gt;
                            &lt;p className="text-primary-100 mt-1"&gt;{selectedClassData.subject}&lt;/p&gt;
                            &lt;p className="text-primary-100 text-sm mt-2"&gt;
                                {selectedClassData.timing} • Room {selectedClassData.roomNumber}
                            &lt;/p&gt;
                        &lt;/div&gt;
                        {attendanceStats &amp;&amp; (
                            &lt;div className="text-right"&gt;
                                &lt;p className="text-3xl font-bold"&gt;{attendanceStats.presentPercentage}%&lt;/p&gt;
                                &lt;p className="text-primary-100 text-sm"&gt;Average Attendance&lt;/p&gt;
                                &lt;p className="text-primary-100 text-xs"&gt;Last 30 days&lt;/p&gt;
                            &lt;/div&gt;
                        )}
                    &lt;/div&gt;
                &lt;/div&gt;
            )}
        &lt;/&gt;
    );
};

export default AttendanceSummarySection;