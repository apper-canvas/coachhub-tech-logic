import attendanceData from '../mockData/attendance.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class AttendanceService {
  constructor() {
    this.attendance = [...attendanceData];
  }

  async getAll() {
    await delay(300);
    return [...this.attendance];
  }

  async getById(id) {
    await delay(200);
    const record = this.attendance.find(a => a.id === id);
    return record ? { ...record } : null;
  }

  async getByClass(classId, date = null) {
    await delay(250);
    let filtered = this.attendance.filter(a => a.classId === classId);
    if (date) {
      filtered = filtered.filter(a => a.date === date);
    }
    return filtered.map(a => ({ ...a }));
  }

  async getByStudent(studentId) {
    await delay(250);
    return this.attendance
      .filter(a => a.studentId === studentId)
      .map(a => ({ ...a }));
  }

  async create(attendanceData) {
    await delay(400);
    const newRecord = {
      ...attendanceData,
      id: Date.now().toString(),
      markedAt: new Date().toISOString()
    };
    this.attendance.push(newRecord);
    return { ...newRecord };
  }

  async update(id, updateData) {
    await delay(350);
    const index = this.attendance.findIndex(a => a.id === id);
    if (index !== -1) {
      this.attendance[index] = { ...this.attendance[index], ...updateData };
      return { ...this.attendance[index] };
    }
    throw new Error('Attendance record not found');
  }

  async delete(id) {
    await delay(300);
    const index = this.attendance.findIndex(a => a.id === id);
    if (index !== -1) {
      const deleted = this.attendance.splice(index, 1)[0];
      return { ...deleted };
    }
    throw new Error('Attendance record not found');
  }

  async getAttendanceStats(classId, startDate, endDate) {
    await delay(300);
    const records = this.attendance.filter(a => 
      a.classId === classId && 
      a.date >= startDate && 
      a.date <= endDate
    );
    
    const stats = {
      total: records.length,
      present: records.filter(r => r.status === 'present').length,
      absent: records.filter(r => r.status === 'absent').length,
      late: records.filter(r => r.status === 'late').length
    };
    
    stats.presentPercentage = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
    
    return stats;
  }
}

export default new AttendanceService();