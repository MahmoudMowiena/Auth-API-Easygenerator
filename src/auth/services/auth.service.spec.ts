import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repositories/user.repository';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: Partial<JwtService>;
  let usersRepository: Partial<UsersRepository>;

  beforeEach(() => {
    jwtService = {
      signAsync: jest.fn().mockResolvedValue('mocked.jwt.token'),
    };

    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    authService = new AuthService(jwtService as JwtService, usersRepository as UsersRepository);
  });

  describe('signIn', () => {
    it('should return access_token if credentials are valid', async () => {
      const mockUser = { id: '1', email: 'test@example.com', password: 'hashed' };
      (usersRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await authService.signIn('test@example.com', 'password123');

      expect(result).toEqual({ access_token: 'mocked.jwt.token' });
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: '1', email: 'test@example.com' });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      (usersRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(authService.signIn('notfound@example.com', 'pass')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const mockUser = { id: '1', email: 'test@example.com', password: 'hashed' };
      (usersRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(authService.signIn('test@example.com', 'wrong')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signUp', () => {
    it('should create a new user if email is not taken', async () => {
      (usersRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (usersRepository.create as jest.Mock).mockResolvedValue(undefined);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

      await expect(authService.signUp('new@example.com', 'Password123!', 'John')).resolves.toBeUndefined();
      expect(usersRepository.create).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'hashedPassword',
        name: 'John',
      });
    });

    it('should throw ConflictException if email is already taken', async () => {
      (usersRepository.findByEmail as jest.Mock).mockResolvedValue({ id: '1', email: 'exists@example.com' });

      await expect(authService.signUp('exists@example.com', 'pass', 'Name')).rejects.toThrow(ConflictException);
    });

    it('should throw InternalServerErrorException if something goes wrong', async () => {
      (usersRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);
      (usersRepository.create as jest.Mock).mockRejectedValue(new Error('DB error'));

      await expect(authService.signUp('fail@example.com', 'pass', 'Name')).rejects.toThrow(InternalServerErrorException);
    });
  });
});
