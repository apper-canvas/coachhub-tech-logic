import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/molecules/PageHeader';
import AttendanceFiltersSection from '@/components/organisms/AttendanceFiltersSection';
import AttendanceSummarySection from '@/components/organisms/AttendanceSummarySection';
import StudentAttendanceList from '@/components/organisms/StudentAttendanceList';
import EmptyState from '@/components/molecules/EmptyState';
import ApperIcon from '@/components/ApperIcon';
import attendanceService from '@/services/api/attendanceService';
import classService from '@/services/api/classService';
import studentService from '@/services/api/studentService';

const AttendancePage = () => {
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
            const [classesData, studentsData] = await Promise.all([
                classService.getAll(),
                studentService.getAll()
            ]);
            setClasses(classesData);
            setStudents(studentsData);
        } catch (error) {
            toast.error('Failed to load initial data');
        } finally {
            setLoading(false);
        }
    };

    const loadAttendanceData = async () => {
        setLoading(true);
        try {
            const records = await attendanceService.getByClass(selectedClass, selectedDate);
            setAttendanceRecords(records);

            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const stats = await attendanceService.getAttendanceStats(selectedClass, startDate, endDate);
            setAttendanceStats(stats);
        } catch (error) {
            toast.error('Failed to load attendance data');
            setAttendanceRecords([]);
            setAttendanceStats(null);
        } finally {
            setLoading(false);
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

    const selectedClassData = classes.find(c => c.id === selectedClass);
    const classStudents = getClassStudents();

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            <PageHeader
                title="Attendance"
                subtitle="Track and manage student attendance records"
            />

            <AttendanceFiltersSection
                classes={classes}
                selectedClass={selectedClass}
                onClassChange={(e) => setSelectedClass(e.target.value)}
                selectedDate={selectedDate}
                onDateChange={(e) => setSelectedDate(e.target.value)}
            />

            {selectedClass ? (
                <>
                    <AttendanceSummarySection
                        classStudentsLength={classStudents.length}
                        presentCount={getAttendanceCount('present')}
                        absentCount={getAttendanceCount('absent')}
                        lateCount={getAttendanceCount('late')}
                        attendanceStats={attendanceStats}
                        selectedClassData={selectedClassData}
                    />

                    <StudentAttendanceList
                        classStudents={classStudents}
                        getAttendanceStatus={getAttendanceStatus}
                        selectedDate={selectedDate}
                        loading={loading}
                    />
                </>
            ) : (
                <EmptyState
                    icon="UserCheck"
                    title="Select a class to view attendance"
                    message="Choose a class from the dropdown above to manage attendance records"
                />
            )}
        </div>
    );
};

export default AttendancePage;