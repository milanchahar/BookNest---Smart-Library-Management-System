import FineService from '../services/FineService.js';

class FineController {
  async getMyFines(req, res) {
    try {
      const userId = req.user.userId;
      const fines = await FineService.getMyFines(userId);
      res.status(200).json(fines);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async payFine(req, res) {
    try {
      const { fineId } = req.params;
      const result = await FineService.payFine(fineId);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new FineController();
