import studentsData from '../mockData/students.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class StudentService {
  constructor() {
    this.students = [...studentsData];
  }

  async getAll() {
    await delay(300);
    return [...this.students];
  }

  async getById(id) {
    await delay(200);
    const student = this.students.find(s => s.id === id);
    return student ? { ...student } : null;
  }

  async getByBatch(batchId) {
    await delay(250);
    return this.students.filter(s => s.batchId === batchId).map(s => ({ ...s }));
  }

  async create(studentData) {
    await delay(400);
    const newStudent = {
      ...studentData,
      id: Date.now().toString(),
      enrollmentDate: new Date().toISOString().split('T')[0],
      feeStatus: 'pending',
      paidAmount: 0
    };
    this.students.push(newStudent);
    return { ...newStudent };
  }

  async update(id, updateData) {
    await delay(350);
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updateData };
      return { ...this.students[index] };
    }
    throw new Error('Student not found');
  }

  async delete(id) {
    await delay(300);
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      const deleted = this.students.splice(index, 1)[0];
      return { ...deleted };
    }
    throw new Error('Student not found');
  }

  async search(query) {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return this.students
      .filter(student => 
        student.name.toLowerCase().includes(searchTerm) ||
        student.phone.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
      )
      .map(s => ({ ...s }));
  }
}

export default new StudentService();