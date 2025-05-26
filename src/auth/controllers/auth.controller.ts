import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dtos/signup.dto';
import { SignInDto } from '../dtos/signin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthTokenOutput } from '../dtos/auth-token.output';
import { ErrorResponse } from 'src/common/errors/error-response';

@ApiTags('Auth')
@ApiResponse({
  status: 400,
  description: 'Bad Request - Validation failed',
  type: ErrorResponse,
})
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login a user and receive a JWT token' })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns JWT access token.',
    type: AuthTokenOutput,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    type: ErrorResponse,
  })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({
    status: 409,
    description: 'Email already exists',
    type: ErrorResponse,
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password, signUpDto.name);
  }
}
