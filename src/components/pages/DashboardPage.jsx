import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DashboardHeader from '@/components/organisms/DashboardHeader';
import DashboardStatsSection from '@/components/organisms/DashboardStatsSection';
import QuickActionsSection from '@/components/organisms/QuickActionsSection';
import RecentActivitiesSection from '@/components/organisms/RecentActivitiesSection';
import studentService from '@/services/api/studentService';
import classService from '@/services/api/classService';
import attendanceService from '@/services/api/attendanceService';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    todaysAttendance: 0,
    pendingFees: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [students, classes, attendance] = await Promise.all([
        studentService.getAll(),
        classService.getAll(),
        attendanceService.getAll()
      ]);

      const today = new Date().toISOString().split('T')[0];
      const todaysAttendance = attendance.filter(a => a.date === today);
      const pendingStudents = students.filter(s => s.feeStatus === 'pending');

      setStats({
        totalStudents: students.length,
        totalClasses: classes.length,
        todaysAttendance: todaysAttendance.length,
        pendingFees: pendingStudents.length
      });

      // Mock recent activities
      setRecentActivities([
        {
          id: 1,
          type: 'attendance',
          message: 'Attendance marked for JEE Advanced 2024',
          time: '2 hours ago',
          icon: 'UserCheck'
        },
        {
          id: 2,
          type: 'payment',
          message: 'Fee payment received from Arjun Sharma',
          time: '4 hours ago',
          icon: 'CreditCard'
        },
        {
          id: 3,
          type: 'student',
          message: 'New student enrolled in NEET Biology batch',
          time: '1 day ago',
          icon: 'UserPlus'
        }
      ]);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      &lt;div className="space-y-6"&gt;
        &lt;div className="flex items-center justify-between"&gt;
          &lt;div&gt;
            &lt;div className="h-8 bg-surface-200 rounded w-48 animate-pulse"&gt;&lt;/div&gt;
            &lt;div className="h-4 bg-surface-200 rounded w-64 mt-2 animate-pulse"&gt;&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"&gt;
          {[...Array(4)].map((_, i) => (
            &lt;div key={i} className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
              &lt;div className="animate-pulse"&gt;
                &lt;div className="h-4 bg-surface-200 rounded w-24 mb-4"&gt;&lt;/div&gt;
                &lt;div className="h-8 bg-surface-200 rounded w-16 mb-2"&gt;&lt;/div&gt;
                &lt;div className="h-3 bg-surface-200 rounded w-20"&gt;&lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          ))}
        &lt;/div&gt;

        &lt;div className="grid grid-cols-1 lg:grid-cols-3 gap-6"&gt;
          &lt;div className="lg:col-span-2"&gt;
            &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
              &lt;div className="animate-pulse space-y-4"&gt;
                {[...Array(3)].map((_, i) => (
                  &lt;div key={i} className="h-16 bg-surface-200 rounded"&gt;&lt;/div&gt;
                ))}&lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;div&gt;
            &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
              &lt;div className="animate-pulse space-y-4"&gt;
                {[...Array(3)].map((_, i) => (
                  &lt;div key={i} className="h-12 bg-surface-200 rounded"&gt;&lt;/div&gt;
                ))}&lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }

  return (
    &lt;div className="space-y-6 max-w-full overflow-hidden"&gt;
      &lt;DashboardHeader /&gt;
      &lt;DashboardStatsSection stats={stats} /&gt;

      &lt;div className="grid grid-cols-1 lg:grid-cols-3 gap-6"&gt;
        &lt;div className="lg:col-span-2"&gt;
          &lt;QuickActionsSection /&gt;
        &lt;/div&gt;
        &lt;RecentActivitiesSection activities={recentActivities} /&gt;
      &lt;/div&gt;

      {/* Quick Stats */}
      &lt;div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white"&gt;
        &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-6"&gt;
          &lt;div className="text-center"&gt;
            &lt;p className="text-3xl font-bold"&gt;85%&lt;/p&gt;
            &lt;p className="text-primary-100 mt-1"&gt;Average Attendance&lt;/p&gt;
          &lt;/div&gt;
          &lt;div className="text-center"&gt;
            &lt;p className="text-3xl font-bold"&gt;₹2.4L&lt;/p&gt;
            &lt;p className="text-primary-100 mt-1"&gt;Monthly Revenue&lt;/p&gt;
          &lt;/div&gt;
          &lt;div className="text-center"&gt;
            &lt;p className="text-3xl font-bold"&gt;96%&lt;/p&gt;
            &lt;p className="text-primary-100 mt-1"&gt;Fee Collection Rate&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

export default DashboardPage;