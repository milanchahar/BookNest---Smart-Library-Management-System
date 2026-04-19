/**
 * Base member: borrowing rules via maxBooks / maxDays.
 * Student and Faculty extend this class.
 */
class Member {
  constructor(id, name, email, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.maxBooks = 0;
    this.maxDays = 0;
  }

  canBorrow(currentLoansCount) {
    return currentLoansCount < this.maxBooks;
  }

  getDueDate(fromDate = new Date()) {
    const due = new Date(fromDate);
    due.setDate(due.getDate() + this.maxDays);
    return due;
  }

  /**
   * Placeholders for OOP completeness; actual issue/return flows use services + DB.
   */
  borrowBook() {
    throw new Error('borrowBook() is orchestrated by LoanService');
  }

  returnBook() {
    throw new Error('returnBook() is orchestrated by LoanService');
  }
}

export default Member;
