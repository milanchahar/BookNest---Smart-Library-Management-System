import FineStrategy from './FineStrategy.js';

class StudentFineStrategy extends FineStrategy {
  calculateFine(daysLate) {
    return daysLate * 10;
  }
}

export default StudentFineStrategy;
