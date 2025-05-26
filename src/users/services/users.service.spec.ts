import { UsersService } from './users.service';
import { UsersRepository } from '../repositories/user.repository';
import { NotFoundException } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';
import { UserOutput } from '../dtos/user.output';
import { UserMapper } from '../mappers/user.mapper';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Partial<UsersRepository>;

  beforeEach(() => {
    usersRepository = {
      findById: jest.fn(),
    };

    usersService = new UsersService(usersRepository as UsersRepository);
  });

  describe('getById', () => {
    it('should return UserOutput when user is found', async () => {
      const mockUser: IUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedpass',
        name: 'John Doe',
      };

      const mappedUser: UserOutput = {
        id: '1',
        email: 'test@example.com',
        name: 'John Doe',
      };

      (usersRepository.findById as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(UserMapper, 'toOutput').mockReturnValue(mappedUser);

      const result = await usersService.getById('1');

      expect(result).toEqual(mappedUser);
      expect(usersRepository.findById).toHaveBeenCalledWith('1');
      expect(UserMapper.toOutput).toHaveBeenCalledWith(mockUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      (usersRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(usersService.getById('2')).rejects.toThrow(NotFoundException);
    });
  });
});
