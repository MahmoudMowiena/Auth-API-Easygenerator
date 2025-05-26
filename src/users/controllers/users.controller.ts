import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserOutput } from '../dtos/user.output';
import { ErrorResponse } from 'src/common/errors/error-response';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiResponse({
  status: 400,
  description: 'Bad Request - Validation failed',
  type: ErrorResponse,
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized - JWT token missing or invalid',
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user details' })
  @ApiResponse({
    status: 200,
    description: 'Current user details',
    type: UserOutput,
  })
  async getMe(@CurrentUser('userId') userId: string) {
    return this.usersService.getById(userId);
  }
}
