import AuthService from '../services/AuthService.js';

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const token = await AuthService.register(name, email, password, role);
      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  async getMe(req, res) {
    try {
      // req.user is attached by authMiddleware
      res.status(200).json(req.user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new AuthController();
