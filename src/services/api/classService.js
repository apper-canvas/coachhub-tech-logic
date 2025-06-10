import classesData from '../mockData/classes.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ClassService {
  constructor() {
    this.classes = [...classesData];
  }

  async getAll() {
    await delay(300);
    return [...this.classes];
  }

  async getById(id) {
    await delay(200);
    const classData = this.classes.find(c => c.id === id);
    return classData ? { ...classData } : null;
  }

  async create(classData) {
    await delay(400);
    const newClass = {
      ...classData,
      id: Date.now().toString()
    };
    this.classes.push(newClass);
    return { ...newClass };
  }

  async update(id, updateData) {
    await delay(350);
    const index = this.classes.findIndex(c => c.id === id);
    if (index !== -1) {
      this.classes[index] = { ...this.classes[index], ...updateData };
      return { ...this.classes[index] };
    }
    throw new Error('Class not found');
  }

  async delete(id) {
    await delay(300);
    const index = this.classes.findIndex(c => c.id === id);
    if (index !== -1) {
      const deleted = this.classes.splice(index, 1)[0];
      return { ...deleted };
    }
    throw new Error('Class not found');
  }

  async getTodaysClasses() {
    await delay(250);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return this.classes
      .filter(cls => cls.days.includes(today))
      .map(c => ({ ...c }));
  }
}

export default new ClassService();