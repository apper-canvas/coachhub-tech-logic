import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import studentService from '../services/api/studentService';
import feePaymentService from '../services/api/feePaymentService';
import classService from '../services/api/classService';

const Fees = () => {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMode: 'cash'
  });
  const [filter, setFilter] = useState('all'); // all, pending, paid

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsData, paymentsData, classesData] = await Promise.all([
        studentService.getAll(),
        feePaymentService.getAll(),
        classService.getAll()
      ]);
      setStudents(studentsData);
      setPayments(paymentsData);
      setClasses(classesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      const newPayment = await feePaymentService.create({
        studentId: selectedStudent.id,
        amount: parseFloat(paymentData.amount),
        paymentMode: paymentData.paymentMode
      });

      // Update student's paid amount and fee status
      const newPaidAmount = selectedStudent.paidAmount + parseFloat(paymentData.amount);
      const newFeeStatus = newPaidAmount >= selectedStudent.totalFees ? 'paid' : 'pending';
      
      const updatedStudent = await studentService.update(selectedStudent.id, {
        paidAmount: newPaidAmount,
        feeStatus: newFeeStatus
      });

      setStudents(prev => prev.map(s => s.id === selectedStudent.id ? updatedStudent : s));
      setPayments(prev => [...prev, newPayment]);
      
      setShowPaymentForm(false);
      setSelectedStudent(null);
      setPaymentData({ amount: '', paymentMode: 'cash' });
      
      toast.success('Payment recorded successfully!');
    } catch (error) {
      toast.error('Failed to record payment');
    }
  };

  const getBatchName = (batchId) => {
    const batch = classes.find(c => c.id === batchId);
    return batch ? batch.batchName : 'Unknown Batch';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      case 'overdue': return 'bg-error text-white';
      default: return 'bg-surface-200 text-surface-700';
    }
  };

  const filteredStudents = students.filter(student => {
    if (filter === 'all') return true;
    return student.feeStatus === filter;
  });

  const totalCollected = students.reduce((sum, student) => sum + student.paidAmount, 0);
  const totalPending = students.reduce((sum, student) => 
    sum + (student.totalFees - student.paidAmount), 0
  );
  const pendingStudents = students.filter(s => s.feeStatus === 'pending').length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-surface-200 rounded w-32 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
              <div className="animate-pulse">
                <div className="h-8 bg-surface-200 rounded w-20 mb-2"></div>
                <div className="h-4 bg-surface-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse h-20 bg-surface-200 rounded"></div>
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
          <h1 className="text-2xl font-heading font-bold text-surface-900">Fee Management</h1>
          <p className="text-surface-600 mt-1">Track payments and manage student fees</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-600">Total Collected</p>
              <p className="text-2xl font-bold text-success mt-2">₹{totalCollected.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="TrendingUp" size={24} className="text-success" />
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
              <p className="text-sm font-medium text-surface-600">Pending Amount</p>
              <p className="text-2xl font-bold text-warning mt-2">₹{totalPending.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" size={24} className="text-warning" />
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
              <p className="text-sm font-medium text-surface-600">Pending Students</p>
              <p className="text-2xl font-bold text-error mt-2">{pendingStudents}</p>
            </div>
            <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
              <ApperIcon name="Users" size={24} className="text-error" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-surface-700">Filter by status:</label>
          <div className="flex space-x-2">
            {[
              { value: 'all', label: 'All Students' },
              { value: 'pending', label: 'Pending' },
              { value: 'paid', label: 'Paid' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filter === value
                    ? 'bg-primary text-white'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Students Fee List */}
      <div className="bg-white rounded-lg shadow-sm border border-surface-200">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="CreditCard" size={48} className="text-surface-300 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-medium text-surface-700 mb-2">
              {filter === 'all' ? 'No students found' : `No ${filter} payments found`}
            </h3>
            <p className="text-surface-600">
              {filter === 'all' 
                ? 'Students will appear here once enrolled'
                : `No students with ${filter} fee status`
              }
            </p>
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
                        <p className="text-sm text-surface-500">{getBatchName(student.batchId)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-surface-900">
                        ₹{student.paidAmount.toLocaleString()} / ₹{student.totalFees.toLocaleString()}
                      </p>
                      <div className="w-32 bg-surface-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${Math.min((student.paidAmount / student.totalFees) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-surface-500 mt-1">
                        {Math.round((student.paidAmount / student.totalFees) * 100)}% paid
                      </p>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusColor(student.feeStatus)}`}>
                      {student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
                    </span>
                    
                    {student.feeStatus === 'pending' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedStudent(student);
                          setPaymentData({
                            amount: (student.totalFees - student.paidAmount).toString(),
                            paymentMode: 'cash'
                          });
                          setShowPaymentForm(true);
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                      >
                        <ApperIcon name="Plus" size={16} className="mr-2" />
                        Add Payment
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentForm && selectedStudent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowPaymentForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-heading font-semibold text-surface-900">Record Payment</h3>
                  <button
                    onClick={() => setShowPaymentForm(false)}
                    className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                </div>

                <div className="mb-6 p-4 bg-surface-50 rounded-lg">
                  <h4 className="font-medium text-surface-900">{selectedStudent.name}</h4>
                  <p className="text-sm text-surface-600 mt-1">
                    Outstanding: ₹{(selectedStudent.totalFees - selectedStudent.paidAmount).toLocaleString()}
                  </p>
                  <div className="w-full bg-surface-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(selectedStudent.paidAmount / selectedStudent.totalFees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Payment Amount</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={selectedStudent.totalFees - selectedStudent.paidAmount}
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Payment Mode</label>
                    <select
                      value={paymentData.paymentMode}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, paymentMode: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="cash">Cash</option>
                      <option value="online">Online Transfer</option>
                      <option value="card">Card Payment</option>
                      <option value="cheque">Cheque</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowPaymentForm(false)}
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
                      Record Payment
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

export default Fees;