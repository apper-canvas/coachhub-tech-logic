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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-surface-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-surface-200 rounded w-64 mt-2 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-surface-200 rounded w-24 mb-4"></div>
                <div className="h-8 bg-surface-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-surface-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-surface-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-surface-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <DashboardHeader />
      <DashboardStatsSection stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickActionsSection />
        </div>
        <RecentActivitiesSection activities={recentActivities} />
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold">85%</p>
            <p className="text-primary-100 mt-1">Average Attendance</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">₹2.4L</p>
            <p className="text-primary-100 mt-1">Monthly Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">96%</p>
            <p className="text-primary-100 mt-1">Fee Collection Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;