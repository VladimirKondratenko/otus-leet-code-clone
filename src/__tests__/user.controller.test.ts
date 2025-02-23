import { UserController } from '../controllers/user.controller';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock the User model
jest.mock('../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('UserController', () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController();
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users as DTOs', async () => {
      const mockUsers = [
        {
          id: 1,
          username: 'test1',
          email: 'test1@example.com',
          password: 'hashedPassword1'
        },
        {
          id: 2,
          username: 'test2',
          email: 'test2@example.com',
          password: 'hashedPassword2'
        }
      ];

      (User.findAll as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userController.getAllUsers();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 1,
        username: 'test1',
        email: 'test1@example.com'
      });
      expect(User.findAll).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return JWT token for valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword'
      };

      const mockToken = 'mock-jwt-token';

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const result = await userController.login('test@example.com', 'password123');

      expect(result).toBe(mockToken);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    });

    it('should return null for invalid credentials', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await userController.login('wrong@example.com', 'wrongpassword');

      expect(result).toBeNull();
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'wrong@example.com' } });
    });
  });
}); 