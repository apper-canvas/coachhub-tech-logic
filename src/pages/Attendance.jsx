import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import attendanceService from '../services/api/attendanceService';
import classService from '../services/api/classService';
import studentService from '../services/api/studentService';

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceStats, setAttendanceStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      loadAttendanceData();
    }
  }, [selectedClass, selectedDate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [classesData, studentsData, attendanceData] = await Promise.all([
        classService.getAll(),
        studentService.getAll(),
        attendanceService.getAll()
      ]);
      setClasses(classesData);
      setStudents(studentsData);
      setAttendanceRecords(attendanceData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadAttendanceData = async () => {
    if (!selectedClass) return;
    
    try {
      const records = await attendanceService.getByClass(selectedClass, selectedDate);
      setAttendanceRecords(records);
      
      // Calculate stats for the last 30 days
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const stats = await attendanceService.getAttendanceStats(selectedClass, startDate, endDate);
      setAttendanceStats(stats);
    } catch (error) {
      toast.error('Failed to load attendance data');
    }
  };

  const getClassStudents = () => {
    if (!selectedClass) return [];
    return students.filter(student => student.batchId === selectedClass);
  };

  const getAttendanceStatus = (studentId) => {
    const record = attendanceRecords.find(r => 
      r.studentId === studentId && r.date === selectedDate
    );
    return record ? record.status : null;
  };

  const getAttendanceCount = (status) => {
    return attendanceRecords.filter(r => 
      r.date === selectedDate && r.status === status
    ).length;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-success';
      case 'absent': return 'text-error';
      case 'late': return 'text-warning';
      default: return 'text-surface-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'present': return 'bg-success';
      case 'absent': return 'bg-error';
      case 'late': return 'bg-warning';
      default: return 'bg-surface-200';
    }
  };

  const selectedClassData = classes.find(c => c.id === selectedClass);
  const classStudents = getClassStudents();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-surface-200 rounded w-32 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
              <div className="animate-pulse">
                <div className="h-8 bg-surface-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-surface-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse h-16 bg-surface-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-surface-900">Attendance</h1>
          <p className="text-surface-600 mt-1">Track and manage student attendance records</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Choose a class...</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.batchName}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {selectedClass ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-surface-600">Total Students</p>
                  <p className="text-2xl font-bold text-surface-900 mt-2">{classStudents.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Users" size={24} className="text-primary" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-surface-600">Present</p>
                  <p className="text-2xl font-bold text-success mt-2">{getAttendanceCount('present')}</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="UserCheck" size={24} className="text-success" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-surface-600">Absent</p>
                  <p className="text-2xl font-bold text-error mt-2">{getAttendanceCount('absent')}</p>
                </div>
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="UserX" size={24} className="text-error" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-surface-600">Late</p>
                  <p className="text-2xl font-bold text-warning mt-2">{getAttendanceCount('late')}</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Clock" size={24} className="text-warning" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Class Info */}
          {selectedClassData && (
            <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-bold">{selectedClassData.batchName}</h3>
                  <p className="text-primary-100 mt-1">{selectedClassData.subject}</p>
                  <p className="text-primary-100 text-sm mt-2">
                    {selectedClassData.timing} • Room {selectedClassData.roomNumber}
                  </p>
                </div>
                {attendanceStats && (
                  <div className="text-right">
                    <p className="text-3xl font-bold">{attendanceStats.presentPercentage}%</p>
                    <p className="text-primary-100 text-sm">Average Attendance</p>
                    <p className="text-primary-100 text-xs">Last 30 days</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Attendance List */}
          <div className="bg-white rounded-lg shadow-sm border border-surface-200">
            <div className="p-6 border-b border-surface-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-surface-900">
                  Attendance for {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <div className="text-sm text-surface-600">
                  {classStudents.length} students
                </div>
              </div>
            </div>

            {classStudents.length === 0 ? (
              <div className="text-center py-12">
                <ApperIcon name="Users" size={48} className="text-surface-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-surface-700 mb-2">No students enrolled</h4>
                <p className="text-surface-600">This class doesn't have any enrolled students yet</p>
              </div>
            ) : (
              <div className="divide-y divide-surface-100">
                {classStudents.map((student, index) => {
                  const status = getAttendanceStatus(student.id);
                  return (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 hover:bg-surface-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-surface-900">{student.name}</h4>
                            <p className="text-sm text-surface-600">{student.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            {status ? (
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${getStatusBg(status)}`}></div>
                                <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-surface-400">Not marked</span>
                            )}
                          </div>
                          
                          <div className="flex items-center text-sm text-surface-500">
                            <ApperIcon name="Calendar" size={14} className="mr-1" />
                            {new Date(selectedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-12 text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="UserCheck" size={48} className="text-surface-300 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-surface-700 mb-2">Select a class to view attendance</h3>
          <p className="text-surface-600">Choose a class from the dropdown above to manage attendance records</p>
        </div>
      )}
    </div>
  );
};

export default Attendance;