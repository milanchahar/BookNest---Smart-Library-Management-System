import LoanRepository from '../repositories/LoanRepository.js';
import BookCopyRepository from '../repositories/BookCopyRepository.js';
import UserRepository from '../repositories/UserRepository.js';
import FineService from './FineService.js';
import FineRepository from '../repositories/FineRepository.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';

class LoanService {
  async issueLoan(userId, bookId) {
    // 1. Get user and instantiate appropriate Member class
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error('User not found');

    let member;
    if (user.role === 'student') {
      member = new Student(user.user_id, user.name, user.email);
    } else if (user.role === 'faculty') {
      member = new Faculty(user.user_id, user.name, user.email);
    } else {
      // Admins might not have borrowing rules defined in models, but let's default to student for safety or throw
      throw new Error('Only students and faculty can borrow books');
    }

    // 2. Check borrowing limit
    const activeLoansCount = await LoanRepository.countActiveByUser(userId);
    if (!member.canBorrow(activeLoansCount)) {
      throw new Error(`Borrowing limit reached (${member.maxBooks} books)`);
    }

    // 3. Find available copy
    const copy = await BookCopyRepository.findAvailableByBookId(bookId);
    if (!copy) {
      throw new Error('No available copies for this book');
    }

    // 4. Calculate due date
    const dueDate = member.getDueDate();

    // 5. Create loan and update copy status
    const loanId = await LoanRepository.create({
      user_id: userId,
      copy_id: copy.copy_id,
      issue_date: new Date(),
      due_date: dueDate,
    });

    await BookCopyRepository.updateStatus(copy.copy_id, 'issued');

    return { loanId, dueDate };
  }

  async returnLoan(loanId, userId) {
    const loan = await LoanRepository.findById(loanId);
    if (!loan) throw new Error('Loan not found');
    
    // Safety check: ensure the loan belongs to the user or user is admin
    const user = await UserRepository.findById(userId);
    if (loan.user_id !== userId && user.role !== 'admin') {
      throw new Error('Unauthorized return');
    }

    if (loan.return_date) {
      throw new Error('Book already returned');
    }

    const returnDate = new Date();

    // 1. Calculate fine
    const fineAmount = FineService.calculateFine(
      loan.role,
      loan.due_date,
      returnDate,
      loan.is_rare === 1 // MySQL boolean handling
    );

    // 2. If fine exists, create fine record
    if (fineAmount > 0) {
      await FineRepository.create({
        loan_id: loanId,
        amount: fineAmount,
        status: 'pending',
      });
    }

    // 3. Mark copy as available
    await BookCopyRepository.updateStatus(loan.copy_id, 'available');

    // 4. Update loan return date
    await LoanRepository.updateReturnDate(loanId, returnDate);

    return { message: 'Book returned successfully', fine: fineAmount };
  }

  async getUserLoans(userId) {
    return await LoanRepository.findActiveByUser(userId);
  }

  async getAllActiveLoans() {
    return await LoanRepository.getAllActive();
  }
}

export default new LoanService();
