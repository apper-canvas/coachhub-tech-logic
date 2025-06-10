import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import Classes from '../pages/Classes';
import Attendance from '../pages/Attendance';
import Fees from '../pages/Fees';

export const routes = {
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: 'LayoutDashboard',
    component: Dashboard
  },
  students: {
    id: 'students',
    label: 'Students',
    path: '/students',
    icon: 'Users',
    component: Students
  },
  classes: {
    id: 'classes',
    label: 'Classes',
    path: '/classes',
    icon: 'BookOpen',
    component: Classes
  },
  attendance: {
    id: 'attendance',
    label: 'Attendance',
    path: '/attendance',
    icon: 'UserCheck',
    component: Attendance
  },
  fees: {
    id: 'fees',
    label: 'Fees',
    path: '/fees',
    icon: 'CreditCard',
    component: Fees
  }
};

export const routeArray = Object.values(routes);