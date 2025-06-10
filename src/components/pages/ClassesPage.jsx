import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/molecules/PageHeader';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import ModalContainer from '@/components/molecules/ModalContainer';
import AddClassForm from '@/components/organisms/AddClassForm';
import ClassesDisplayGrid from '@/components/organisms/ClassesDisplayGrid';
import classService from '@/services/api/classService';
import studentService from '@/services/api/studentService';

const ClassesPage = () => {
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
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClass = async (id) => {
        if (!window.confirm('Are you sure you want to delete this class?')) return;

        setLoading(true);
        try {
            await classService.delete(id);
            setClasses(prev => prev.filter(c => c.id !== id));
            toast.success('Class deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete class');
        } finally {
            setLoading(false);
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

return (
        <div className="space-y-6 max-w-full overflow-hidden">
            <PageHeader
                title="Classes"
                subtitle="Manage batch schedules and class information"
                actionButton={
                    <Button
                        onClick={() => setShowAddForm(true)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                    >
                        <ApperIcon name="Plus" size={16} className="mr-2" />
                        Create Class
                    </Button>
                }
            />

            <ClassesDisplayGrid
                classes={classes}
                students={students}
                onDeleteClass={handleDeleteClass}
                onAddClassClick={() => setShowAddForm(true)}
                loading={loading}
            />

            <ModalContainer
                isOpen={showAddForm}
                onClose={() => setShowAddForm(false)}
                title="Create New Class"
            >
                <AddClassForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleAddClass}
                    onCancel={() => setShowAddForm(false)}
                    toggleDay={toggleDay}
                    loading={loading}
                />
            </ModalContainer>
        </div>
    );
};

export default ClassesPage;