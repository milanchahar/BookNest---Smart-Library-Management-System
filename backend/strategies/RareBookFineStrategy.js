import FineStrategy from './FineStrategy.js';

class RareBookFineStrategy extends FineStrategy {
  calculateFine(daysLate) {
    return daysLate * 50;
  }
}

export default RareBookFineStrategy;
