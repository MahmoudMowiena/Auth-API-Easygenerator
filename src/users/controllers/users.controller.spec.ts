import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { UserOutput } from '../dtos/user.output';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    getById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMe', () => {
    it('should return the current user details', async () => {
      const mockUser: UserOutput = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
      };

      mockUsersService.getById.mockResolvedValue(mockUser);

      const result = await usersController.getMe('123');

      expect(result).toEqual(mockUser);
      expect(usersService.getById).toHaveBeenCalledWith('123');
    });
  });
});
