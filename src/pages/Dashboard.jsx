import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import MainFeature from '../components/MainFeature';
import studentService from '../services/api/studentService';
import classService from '../services/api/classService';
import attendanceService from '../services/api/attendanceService';

const Dashboard = () => {
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

  const StatCard = ({ title, value, icon, color, change }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-surface-600">{title}</p>
          <p className="text-2xl font-bold text-surface-900 mt-2">{value}</p>
          {change && (
            <p className="text-xs text-success mt-1">
              +{change}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <ApperIcon name={icon} size={24} className="text-white" />
        </div>
      </div>
    </motion.div>
  );

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-surface-900">Dashboard</h1>
          <p className="text-surface-600 mt-1">Welcome back! Here's what's happening at your coaching center today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-surface-600">Today</p>
          <p className="text-lg font-semibold text-surface-900">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon="Users"
          color="bg-primary"
          change="12"
        />
        <StatCard
          title="Active Classes"
          value={stats.totalClasses}
          icon="BookOpen"
          color="bg-secondary"
          change="8"
        />
        <StatCard
          title="Today's Attendance"
          value={stats.todaysAttendance}
          icon="UserCheck"
          color="bg-success"
          change="5"
        />
        <StatCard
          title="Pending Fees"
          value={stats.pendingFees}
          icon="AlertCircle"
          color="bg-warning"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions & Today's Classes */}
        <div className="lg:col-span-2">
          <MainFeature />
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
          <div className="flex items-center mb-4">
            <ApperIcon name="Activity" size={20} className="text-primary mr-2" />
            <h3 className="text-lg font-heading font-semibold text-surface-900">Recent Activities</h3>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-50 transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <ApperIcon name={activity.icon} size={14} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-surface-900 break-words">{activity.message}</p>
                  <p className="text-xs text-surface-500 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            View All Activities
          </motion.button>
        </div>
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

export default Dashboard;