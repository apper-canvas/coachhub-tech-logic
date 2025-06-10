import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/molecules/PageHeader';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import ModalContainer from '@/components/molecules/ModalContainer';
import AddStudentForm from '@/components/organisms/AddStudentForm';
import StudentsListDisplay from '@/components/organisms/StudentsListDisplay';
import studentService from '@/services/api/studentService';
import classService from '@/services/api/classService';

const StudentsPage = () => {
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
    setLoading(true);
    try {
      const newStudent = await studentService.create(formData);
      setStudents(prev => [...prev, newStudent]);
      setFormData({ name: '', phone: '', email: '', batchId: '', totalFees: '' });
      setShowAddForm(false);
      toast.success('Student added successfully!');
    } catch (error) {
      toast.error('Failed to add student');
    } finally {
        setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    setLoading(true);
    try {
      await studentService.delete(id);
      setStudents(prev => prev.filter(s => s.id !== id));
      toast.success('Student deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete student');
    } finally {
        setLoading(false);
    }
  };

  const updateFeeStatus = async (studentId, status) => {
    setLoading(true);
    try {
      const updatedStudent = await studentService.update(studentId, { feeStatus: status });
      setStudents(prev => prev.map(s => s.id === studentId ? updatedStudent : s));
      toast.success('Fee status updated successfully!');
    } catch (error) {
      toast.error('Failed to update fee status');
    } finally {
        setLoading(false);
    }
  };

  return (
    &lt;div className="space-y-6 max-w-full overflow-hidden"&gt;
      &lt;PageHeader
        title="Students"
        subtitle="Manage student enrollment and information"
        actionButton={
          &lt;Button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
          &gt;
            &lt;ApperIcon name="UserPlus" size={16} className="mr-2" /&gt;
            Add Student
          &lt;/Button&gt;
        }
      /&gt;

      &lt;StudentsListDisplay
        students={students}
        classes={classes}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        selectedBatch={selectedBatch}
        onBatchChange={(e) => setSelectedBatch(e.target.value)}
        onDeleteStudent={handleDeleteStudent}
        onToggleFeeStatus={updateFeeStatus}
        onAddStudentClick={() => setShowAddForm(true)}
        loading={loading}
      /&gt;

      &lt;ModalContainer
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        title="Add New Student"
      &gt;
        &lt;AddStudentForm
          formData={formData}
          setFormData={setFormData}
          classes={classes}
          handleSubmit={handleAddStudent}
          onCancel={() => setShowAddForm(false)}
          loading={loading}
        /&gt;
      &lt;/ModalContainer&gt;
    &lt;/div&gt;
  );
};

export default StudentsPage;