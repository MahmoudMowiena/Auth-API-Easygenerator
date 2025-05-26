import { Injectable, NotFoundException } from '@nestjs/common';
import { UserOutput } from '../dtos/user.output';
import { IUser } from '../interfaces/user.interface';
import { UsersRepository } from '../repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { ErrorMessages } from 'src/common/errors/error-messages';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getById(userId: string): Promise<UserOutput> {
    const user: IUser | null = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    return UserMapper.toOutput(user);
  }
}
