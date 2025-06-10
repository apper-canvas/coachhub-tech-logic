import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import studentService from '../services/api/studentService';
import classService from '../services/api/classService';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    batchId: '',
    totalFees: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsData, classesData] = await Promise.all([
        studentService.getAll(),
        classService.getAll()
      ]);
      setStudents(studentsData);
      setClasses(classesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const newStudent = await studentService.create(formData);
      setStudents(prev => [...prev, newStudent]);
      setFormData({ name: '', phone: '', email: '', batchId: '', totalFees: '' });
      setShowAddForm(false);
      toast.success('Student added successfully!');
    } catch (error) {
      toast.error('Failed to add student');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      await studentService.delete(id);
      setStudents(prev => prev.filter(s => s.id !== id));
      toast.success('Student deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  const updateFeeStatus = async (studentId, status) => {
    try {
      const updatedStudent = await studentService.update(studentId, { feeStatus: status });
      setStudents(prev => prev.map(s => s.id === studentId ? updatedStudent : s));
      toast.success('Fee status updated successfully!');
    } catch (error) {
      toast.error('Failed to update fee status');
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch === 'all' || student.batchId === selectedBatch;
    return matchesSearch && matchesBatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      case 'overdue': return 'bg-error text-white';
      default: return 'bg-surface-200 text-surface-700';
    }
  };

  const getBatchName = (batchId) => {
    const batch = classes.find(c => c.id === batchId);
    return batch ? batch.batchName : 'Unknown Batch';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-surface-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-surface-200 rounded w-32 animate-pulse"></div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse border-b border-surface-100 pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-surface-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-surface-200 rounded w-48"></div>
                    <div className="h-3 bg-surface-200 rounded w-32"></div>
                  </div>
                  <div className="h-6 bg-surface-200 rounded w-16"></div>
                  <div className="h-8 bg-surface-200 rounded w-20"></div>
                </div>
              </div>
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
          <h1 className="text-2xl font-heading font-bold text-surface-900">Students</h1>
          <p className="text-surface-600 mt-1">Manage student enrollment and information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          <ApperIcon name="UserPlus" size={16} className="mr-2" />
          Add Student
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search students by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <ApperIcon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" 
            />
          </div>
          
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Batches</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.batchName}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow-sm border border-surface-200">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="Users" size={48} className="text-surface-300 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-medium text-surface-700 mb-2">
              {searchTerm || selectedBatch !== 'all' ? 'No students found' : 'No students yet'}
            </h3>
            <p className="text-surface-600 mb-4">
              {searchTerm || selectedBatch !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first student'
              }
            </p>
            {!searchTerm && selectedBatch === 'all' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Add First Student
              </motion.button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-surface-100">
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
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
                      <h3 className="font-medium text-surface-900">{student.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-surface-600">{student.phone}</p>
                        <p className="text-sm text-surface-600">{student.email}</p>
                        <p className="text-sm text-surface-500">{getBatchName(student.batchId)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-surface-900">
                        ₹{student.paidAmount.toLocaleString()} / ₹{student.totalFees.toLocaleString()}
                      </p>
                      <div className="w-24 bg-surface-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(student.paidAmount / student.totalFees) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(student.feeStatus)}`}>
                      {student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
                    </span>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateFeeStatus(student.id, student.feeStatus === 'paid' ? 'pending' : 'paid')}
                        className="p-2 text-surface-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Toggle fee status"
                      >
                        <ApperIcon name="CreditCard" size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-2 text-surface-400 hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                        title="Delete student"
                      >
                        <ApperIcon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Student Modal */}
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
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-heading font-semibold text-surface-900">Add New Student</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                </div>

                <form onSubmit={handleAddStudent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter student's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="student@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Batch</label>
                    <select
                      required
                      value={formData.batchId}
                      onChange={(e) => setFormData(prev => ({ ...prev, batchId: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a batch</option>
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.batchName}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Total Fees</label>
                    <input
                      type="number"
                      required
                      value={formData.totalFees}
                      onChange={(e) => setFormData(prev => ({ ...prev, totalFees: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="15000"
                    />
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
                      Add Student
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

export default Students;