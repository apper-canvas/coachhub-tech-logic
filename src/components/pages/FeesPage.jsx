import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/molecules/PageHeader';
import FeesOverviewStats from '@/components/organisms/FeesOverviewStats';
import FeeStudentListDisplay from '@/components/organisms/FeeStudentListDisplay';
import ModalContainer from '@/components/molecules/ModalContainer';
import RecordPaymentForm from '@/components/organisms/RecordPaymentForm';
import studentService from '@/services/api/studentService';
import feePaymentService from '@/services/api/feePaymentService';
import classService from '@/services/api/classService';

const FeesPage = () => {
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

        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const handleAddPaymentClick = (student) => {
        setSelectedStudent(student);
        setPaymentData({
            amount: (student.totalFees - student.paidAmount).toString(),
            paymentMode: 'cash'
        });
        setShowPaymentForm(true);
    };

    const totalCollected = students.reduce((sum, student) => sum + student.paidAmount, 0);
    const totalPending = students.reduce((sum, student) =>
        sum + (student.totalFees - student.paidAmount), 0
    );
    const pendingStudentsCount = students.filter(s => s.feeStatus === 'pending').length;

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
            <PageHeader
                title="Fee Management"
                subtitle="Track payments and manage student fees"
            />

            <FeesOverviewStats
                totalCollected={totalCollected}
                totalPending={totalPending}
                pendingStudents={pendingStudentsCount}
            />

            <FeeStudentListDisplay
                students={students}
                classes={classes}
                filter={filter}
                onFilterChange={setFilter}
                onAddPayment={handleAddPaymentClick}
            />

            <ModalContainer
                isOpen={showPaymentForm}
                onClose={() => setShowPaymentForm(false)}
                title="Record Payment"
            >
                <RecordPaymentForm
                    selectedStudent={selectedStudent}
                    paymentData={paymentData}
                    setPaymentData={setPaymentData}
                    handleSubmit={handlePaymentSubmit}
                    onCancel={() => setShowPaymentForm(false)}
                    loading={loading}
                />
            </ModalContainer>
        </div>
    );
};

export default FeesPage;