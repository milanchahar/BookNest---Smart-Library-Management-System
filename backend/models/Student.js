import Member from './Member.js';

class Student extends Member {
  constructor(id, name, email) {
    super(id, name, email, 'student');
    this.maxBooks = 3;
    this.maxDays = 14;
  }
}

export default Student;
