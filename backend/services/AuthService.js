import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';

class AuthService {
  async register(name, email, password, role) {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await UserRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return this.generateToken({ userId, email, role });
  }

  async login(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return this.generateToken({
      userId: user.user_id,
      email: user.email,
      role: user.role,
    });
  }

  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET || 'booknest_secret', {
      expiresIn: '7d',
    });
  }
}

export default new AuthService();
