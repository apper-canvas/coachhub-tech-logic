import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import studentService from '../services/api/studentService';
import classService from '../services/api/classService';
import attendanceService from '../services/api/attendanceService';

const MainFeature = () => {
  const [todaysClasses, setTodaysClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTodaysClasses();
  }, []);

  const loadTodaysClasses = async () => {
    setLoading(true);
    try {
      const classes = await classService.getAll();
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const filtered = classes.filter(cls => cls.days.includes(today));
      setTodaysClasses(filtered);
    } catch (error) {
      toast.error('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const selectClass = async (classData) => {
    setSelectedClass(classData);
    setLoading(true);
    
    try {
      const allStudents = await studentService.getAll();
      const classStudents = allStudents.filter(student => student.batchId === classData.id);
      setStudents(classStudents);
      
      // Initialize attendance state
      const initialAttendance = {};
      classStudents.forEach(student => {
        initialAttendance[student.id] = 'present';
      });
      setAttendance(initialAttendance);
    } catch (error) {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const submitAttendance = async () => {
    if (!selectedClass) return;
    
    setLoading(true);
    try {
      const promises = Object.entries(attendance).map(([studentId, status]) =>
        attendanceService.create({
          classId: selectedClass.id,
          studentId,
          date: new Date().toISOString().split('T')[0],
          status,
          markedAt: new Date().toISOString()
        })
      );
      
      await Promise.all(promises);
      toast.success('Attendance marked successfully!');
      setSelectedClass(null);
      setStudents([]);
      setAttendance({});
    } catch (error) {
      toast.error('Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !selectedClass) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-surface-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedClass) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-surface-900">
              Mark Attendance - {selectedClass.batchName}
            </h3>
            <p className="text-sm text-surface-600">{selectedClass.subject} • {selectedClass.timing}</p>
          </div>
          <button
            onClick={() => setSelectedClass(null)}
            className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4">
                <div className="w-10 h-10 bg-surface-200 rounded-full"></div>
                <div className="flex-1 h-4 bg-surface-200 rounded"></div>
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="w-16 h-8 bg-surface-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {students.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 border border-surface-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-surface-900">{student.name}</p>
                      <p className="text-sm text-surface-600">{student.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {['present', 'absent', 'late'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateAttendance(student.id, status)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                          attendance[student.id] === status
                            ? status === 'present'
                              ? 'bg-success text-white'
                              : status === 'absent'
                              ? 'bg-error text-white'
                              : 'bg-warning text-white'
                            : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {students.length === 0 ? (
              <div className="text-center py-8">
                <ApperIcon name="Users" size={48} className="text-surface-300 mx-auto mb-4" />
                <p className="text-surface-600">No students enrolled in this batch</p>
              </div>
            ) : (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedClass(null)}
                  className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitAttendance}
                  disabled={loading}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Attendance'
                  )}
                </motion.button>
              </div>
            )}
          </>
        )}
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
      <div className="flex items-center mb-4">
        <ApperIcon name="Calendar" size={20} className="text-primary mr-2" />
        <h3 className="text-lg font-heading font-semibold text-surface-900">Today's Classes</h3>
      </div>

      {todaysClasses.length === 0 ? (
        <div className="text-center py-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Calendar" size={48} className="text-surface-300 mx-auto mb-4" />
          </motion.div>
          <h4 className="text-lg font-medium text-surface-700 mb-2">No classes scheduled today</h4>
          <p className="text-surface-600">Check back tomorrow or view all classes</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todaysClasses.map((classData, index) => (
            <motion.div
              key={classData.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-surface-200 rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
              onClick={() => selectClass(classData)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="BookOpen" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-surface-900">{classData.batchName}</h4>
                  <p className="text-sm text-surface-600">{classData.subject}</p>
                  <p className="text-xs text-surface-500">{classData.timing} • Room {classData.roomNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-surface-600">Mark Attendance</span>
                <ApperIcon name="ChevronRight" size={16} className="text-surface-400" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainFeature;