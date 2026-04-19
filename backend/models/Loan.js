class Loan {
  constructor({
    loanId,
    userId,
    copyId,
    issueDate,
    dueDate,
    returnDate,
  }) {
    this.loanId = loanId;
    this.userId = userId;
    this.copyId = copyId;
    this.issueDate = issueDate;
    this.dueDate = dueDate;
    this.returnDate = returnDate;
  }
}

export default Loan;
