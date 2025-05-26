import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dtos/signup.dto';
import { SignInDto } from '../dtos/signin.dto';
import { AuthTokenOutput } from '../dtos/auth-token.output';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
    signUp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should return a JWT access token on successful login', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };

      const token: AuthTokenOutput = {
        access_token: 'mocked.jwt.token',
      };

      mockAuthService.signIn.mockResolvedValue(token);

      const result = await authController.signIn(signInDto);

      expect(result).toEqual(token);
      expect(authService.signIn).toHaveBeenCalledWith(signInDto.email, signInDto.password);
    });
  });

  describe('signUp', () => {
    it('should call signUp with correct values and return void', async () => {
      const signUpDto: SignUpDto = {
        email: 'new@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        name: 'New User',
      };

      mockAuthService.signUp.mockResolvedValue(undefined);

      await expect(authController.signUp(signUpDto)).resolves.toBeUndefined();
      expect(authService.signUp).toHaveBeenCalledWith(
        signUpDto.email,
        signUpDto.password,
        signUpDto.name,
      );
    });
  });
});
