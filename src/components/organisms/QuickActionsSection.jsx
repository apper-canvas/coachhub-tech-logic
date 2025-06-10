import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import studentService from '@/services/api/studentService';
import classService from '@/services/api/classService';
import attendanceService from '@/services/api/attendanceService';
import MarkAttendancePanel from '@/components/organisms/MarkAttendancePanel';

const QuickActionsSection = () => {
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
            &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
                &lt;div className="animate-pulse space-y-4"&gt;
                    {[...Array(3)].map((_, i) => (
                        &lt;div key={i} className="h-16 bg-surface-200 rounded-lg"&gt;&lt;/div&gt;
                    ))}
                &lt;/div&gt;
            &lt;/div&gt;
        );
    }

    if (selectedClass) {
        return (
            &lt;MarkAttendancePanel
                selectedClass={selectedClass}
                students={students}
                attendance={attendance}
                loading={loading}
                updateAttendance={updateAttendance}
                submitAttendance={submitAttendance}
                onClose={() => setSelectedClass(null)}
            /&gt;
        );
    }

    return (
        &lt;div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6"&gt;
            &lt;div className="flex items-center mb-4"&gt;
                &lt;ApperIcon name="Calendar" size={20} className="text-primary mr-2" /&gt;
                &lt;h3 className="text-lg font-heading font-semibold text-surface-900"&gt;Today's Classes&lt;/h3&gt;
            &lt;/div&gt;

            {todaysClasses.length === 0 ? (
                &lt;div className="text-center py-8"&gt;
                    &lt;motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="mb-4"
                    &gt;
                        &lt;ApperIcon name="Calendar" size={48} className="text-surface-300 mx-auto" /&gt;
                    &lt;/motion.div&gt;
                    &lt;h4 className="text-lg font-medium text-surface-700 mb-2"&gt;No classes scheduled today&lt;/h4&gt;
                    &lt;p className="text-surface-600"&gt;Check back tomorrow or view all classes&lt;/p&gt;
                &lt;/div&gt;
            ) : (
                &lt;div className="space-y-3"&gt;
                    {todaysClasses.map((classData, index) => (
                        &lt;motion.div
                            key={classData.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 border border-surface-200 rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
                            onClick={() => selectClass(classData)}
                        &gt;
                            &lt;div className="flex items-center space-x-4"&gt;
                                &lt;div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"&gt;
                                    &lt;ApperIcon name="BookOpen" size={20} className="text-primary" /&gt;
                                &lt;/div&gt;
                                &lt;div&gt;
                                    &lt;h4 className="font-medium text-surface-900"&gt;{classData.batchName}&lt;/h4&gt;
                                    &lt;p className="text-sm text-surface-600"&gt;{classData.subject}&lt;/p&gt;
                                    &lt;p className="text-xs text-surface-500"&gt;{classData.timing} • Room {classData.roomNumber}&lt;/p&gt;
                                &lt;/div&gt;
                            &lt;/div&gt;

                            &lt;div className="flex items-center space-x-3"&gt;
                                &lt;span className="text-sm text-surface-600"&gt;Mark Attendance&lt;/span&gt;
                                &lt;ApperIcon name="ChevronRight" size={16} className="text-surface-400" /&gt;
                            &lt;/div&gt;
                        &lt;/motion.div&gt;
                    ))}
                &lt;/div&gt;
            )}
        &lt;/div&gt;
    );
};

export default QuickActionsSection;