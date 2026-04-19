import LoanService from '../services/LoanService.js';

class LoanController {
  async issueLoan(req, res) {
    try {
      const { bookId } = req.body;
      const userId = req.user.userId;
      const result = await LoanService.issueLoan(userId, bookId);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async returnLoan(req, res) {
    try {
      const { loanId } = req.params;
      const userId = req.user.userId;
      const result = await LoanService.returnLoan(loanId, userId);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getMyLoans(req, res) {
    try {
      const userId = req.user.userId;
      const loans = await LoanService.getUserLoans(userId);
      res.status(200).json(loans);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAllActiveLoans(req, res) {
    try {
      const loans = await LoanService.getAllActiveLoans();
      res.status(200).json(loans);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new LoanController();
