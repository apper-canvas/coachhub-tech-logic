import feePaymentsData from '../mockData/feePayments.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class FeePaymentService {
  constructor() {
    this.payments = [...feePaymentsData];
  }

  async getAll() {
    await delay(300);
    return [...this.payments];
  }

  async getById(id) {
    await delay(200);
    const payment = this.payments.find(p => p.id === id);
    return payment ? { ...payment } : null;
  }

  async getByStudent(studentId) {
    await delay(250);
    return this.payments
      .filter(p => p.studentId === studentId)
      .map(p => ({ ...p }));
  }

  async create(paymentData) {
    await delay(400);
    const newPayment = {
      ...paymentData,
      id: Date.now().toString(),
      paymentDate: new Date().toISOString().split('T')[0],
      receiptNumber: `RCP${Date.now()}`
    };
    this.payments.push(newPayment);
    return { ...newPayment };
  }

  async update(id, updateData) {
    await delay(350);
    const index = this.payments.findIndex(p => p.id === id);
    if (index !== -1) {
      this.payments[index] = { ...this.payments[index], ...updateData };
      return { ...this.payments[index] };
    }
    throw new Error('Payment not found');
  }

  async delete(id) {
    await delay(300);
    const index = this.payments.findIndex(p => p.id === id);
    if (index !== -1) {
      const deleted = this.payments.splice(index, 1)[0];
      return { ...deleted };
    }
    throw new Error('Payment not found');
  }

  async getPendingPayments() {
    await delay(250);
    // This would typically be calculated by comparing student fees with payments
    return this.payments
      .filter(p => p.amount < 5000) // Mock logic for pending
      .map(p => ({ ...p }));
  }
}

export default new FeePaymentService();