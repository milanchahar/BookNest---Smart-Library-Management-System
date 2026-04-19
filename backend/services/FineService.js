import StudentFineStrategy from '../strategies/StudentFineStrategy.js';
import FacultyFineStrategy from '../strategies/FacultyFineStrategy.js';
import RareBookFineStrategy from '../strategies/RareBookFineStrategy.js';
import FineRepository from '../repositories/FineRepository.js';

class FineService {
  constructor() {
    this.strategies = {
      student: new StudentFineStrategy(),
      faculty: new FacultyFineStrategy(),
      rare: new RareBookFineStrategy(),
    };
  }

  calculateFine(role, dueDate, returnDate, isRare) {
    const due = new Date(dueDate);
    const returned = new Date(returnDate);

    // If returned on time or before, fine is 0
    if (returned <= due) {
      return 0;
    }

    const diffTime = Math.abs(returned - due);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let strategy;
    if (isRare) {
      strategy = this.strategies.rare;
    } else if (role === 'student') {
      strategy = this.strategies.student;
    } else if (role === 'faculty') {
      strategy = this.strategies.faculty;
    } else {
      // Default to student strategy if role is unknown (like admin borrowing)
      strategy = this.strategies.student;
    }

    return strategy.calculateFine(diffDays);
  }

  async getMyFines(userId) {
    return await FineRepository.findByUserId(userId);
  }

  async payFine(fineId) {
    const fine = await FineRepository.findById(fineId);
    if (!fine) {
      throw new Error('Fine not found');
    }
    await FineRepository.updateStatus(fineId, 'paid');
    return { message: 'Fine paid successfully' };
  }
}

export default new FineService();
