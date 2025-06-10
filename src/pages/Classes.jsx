import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import classService from '../services/api/classService';
import studentService from '../services/api/studentService';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    batchName: '',
    subject: '',
    teacherId: '',
    timing: '',
    days: [],
    roomNumber: '',
    maxStudents: ''
  });

  const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [classesData, studentsData] = await Promise.all([
        classService.getAll(),
        studentService.getAll()
      ]);
      setClasses(classesData);
      setStudents(studentsData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      const newClass = await classService.create(formData);
      setClasses(prev => [...prev, newClass]);
      setFormData({
        batchName: '',
        subject: '',
        teacherId: '',
        timing: '',
        days: [],
        roomNumber: '',
        maxStudents: ''
      });
      setShowAddForm(false);
      toast.success('Class created successfully!');
    } catch (error) {
      toast.error('Failed to create class');
    }
  };

  const handleDeleteClass = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    
    try {
      await classService.delete(id);
      setClasses(prev => prev.filter(c => c.id !== id));
      toast.success('Class deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete class');
    }
  };

  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const getEnrolledCount = (classId) => {
    return students.filter(s => s.batchId === classId).length;
  };

  const getScheduleDisplay = (days) => {
    if (days.length === 0) return 'No schedule';
    if (days.length === 7) return 'Daily';
    if (days.length === 5 && !days.includes('Saturday') && !days.includes('Sunday')) return 'Weekdays';
    if (days.length === 2 && days.includes('Saturday') && days.includes('Sunday')) return 'Weekends';
    return days.join(', ');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-surface-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-surface-200 rounded w-32 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-surface-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-surface-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-surface-200 rounded w-2/3 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-surface-200 rounded w-16"></div>
                  <div className="h-4 bg-surface-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-surface-900">Classes</h1>
          <p className="text-surface-600 mt-1">Manage batch schedules and class information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Create Class
        </motion.button>
      </div>

      {/* Classes Grid */}
      {classes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-12 text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="BookOpen" size={48} className="text-surface-300 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-surface-700 mb-2">No classes created yet</h3>
          <p className="text-surface-600 mb-4">Start by creating your first batch to organize students</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Create First Class
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classData, index) => (
            <motion.div
              key={classData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-sm border border-surface-200 p-6 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name="BookOpen" size={20} className="text-primary" />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeleteClass(classData.id)}
                    className="p-2 text-surface-400 hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </button>
                </div>
              </div>

              <h3 className="font-heading font-semibold text-surface-900 mb-2">{classData.batchName}</h3>
              <p className="text-sm text-surface-600 mb-4">{classData.subject}</p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-surface-600">
                  <ApperIcon name="Clock" size={14} className="mr-2" />
                  {classData.timing}
                </div>
                
                <div className="flex items-center text-sm text-surface-600">
                  <ApperIcon name="Calendar" size={14} className="mr-2" />
                  <span className="break-words">{getScheduleDisplay(classData.days)}</span>
                </div>
                
                <div className="flex items-center text-sm text-surface-600">
                  <ApperIcon name="MapPin" size={14} className="mr-2" />
                  Room {classData.roomNumber}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                  <div className="flex items-center text-sm">
                    <ApperIcon name="Users" size={14} className="mr-2 text-primary" />
                    <span className="text-surface-900 font-medium">
                      {getEnrolledCount(classData.id)}/{classData.maxStudents}
                    </span>
                  </div>
                  
                  <div className="w-16 bg-surface-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ 
                        width: `${Math.min((getEnrolledCount(classData.id) / classData.maxStudents) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Class Modal */}
      <AnimatePresence>
        {showAddForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowAddForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-heading font-semibold text-surface-900">Create New Class</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                </div>

                <form onSubmit={handleAddClass} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Batch Name</label>
                    <input
                      type="text"
                      required
                      value={formData.batchName}
                      onChange={(e) => setFormData(prev => ({ ...prev, batchName: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="JEE Advanced 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Physics & Mathematics"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Teacher ID</label>
                    <input
                      type="text"
                      required
                      value={formData.teacherId}
                      onChange={(e) => setFormData(prev => ({ ...prev, teacherId: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="T001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Timing</label>
                    <input
                      type="text"
                      required
                      value={formData.timing}
                      onChange={(e) => setFormData(prev => ({ ...prev, timing: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="09:00 AM - 12:00 PM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Schedule Days</label>
                    <div className="grid grid-cols-2 gap-2">
                      {dayOptions.map(day => (
                        <label key={day} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.days.includes(day)}
                            onChange={() => toggleDay(day)}
                            className="w-4 h-4 text-primary border-surface-300 rounded focus:ring-primary"
                          />
                          <span className="ml-2 text-sm text-surface-700">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Room Number</label>
                      <input
                        type="text"
                        required
                        value={formData.roomNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, roomNumber: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="A101"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Max Students</label>
                      <input
                        type="number"
                        required
                        value={formData.maxStudents}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Create Class
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Classes;