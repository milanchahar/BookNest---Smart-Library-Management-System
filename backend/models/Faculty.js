import Member from './Member.js';

class Faculty extends Member {
  constructor(id, name, email) {
    super(id, name, email, 'faculty');
    this.maxBooks = 10;
    this.maxDays = 90;
  }
}

export default Faculty;
