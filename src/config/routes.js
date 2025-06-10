import HomePage from '@/components/pages/HomePage';
import DashboardPage from '@/components/pages/DashboardPage';
import StudentsPage from '@/components/pages/StudentsPage';
import ClassesPage from '@/components/pages/ClassesPage';
import AttendancePage from '@/components/pages/AttendancePage';
import FeesPage from '@/components/pages/FeesPage';

export const routes = {
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: 'LayoutDashboard',
component: DashboardPage
  },
  home: {
    id: 'home',
    label: 'Home (Redirect)',
    path: '/home',
    icon: 'Home',
    component: HomePage
  },
  students: {
    id: 'students',
    label: 'Students',
    path: '/students',
    icon: 'Users',
    component: StudentsPage
  },
  classes: {
    id: 'classes',
    label: 'Classes',
    path: '/classes',
    icon: 'BookOpen',
    component: ClassesPage
  },
  attendance: {
    id: 'attendance',
    label: 'Attendance',
    path: '/attendance',
    icon: 'UserCheck',
    component: AttendancePage
  },
  fees: {
    id: 'fees',
    label: 'Fees',
    path: '/fees',
    icon: 'CreditCard',
    component: FeesPage
  }
};

export const routeArray = Object.values(routes);