import FineStrategy from './FineStrategy.js';

class FacultyFineStrategy extends FineStrategy {
  calculateFine(daysLate) {
    return daysLate * 2;
  }
}

export default FacultyFineStrategy;
