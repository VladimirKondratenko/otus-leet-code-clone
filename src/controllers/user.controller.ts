import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface UserDTO {
  id: number;
  username: string;
  email: string;
}

export class UserController {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await User.findAll();
    return users.map(user => this.toDTO(user));
  }

  async getUserById(id: number): Promise<UserDTO | null> {
    const user = await User.findByPk(id);
    return user ? this.toDTO(user) : null;
  }

  async createUser(username: string, email: string, password: string): Promise<UserDTO> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    return this.toDTO(user);
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return jwt.sign({ userId: user.id }, this.JWT_SECRET, { expiresIn: '24h' });
  }

  private toDTO(user: User): UserDTO {
    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  }
} 