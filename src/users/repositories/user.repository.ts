import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';
import { CreateUserInput } from '../dtos/create-user.input';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ email }).lean().exec();

    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
      name: user.name,
    };
  }

  async findById(userId: string): Promise<IUser | null> {
    const user = await this.userModel.findById(userId).lean().exec();

    if (!user) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
      name: user.name,
    };
  }

  async create(data: CreateUserInput): Promise<IUser> {
    const createdUser = await this.userModel.create(data);

    return {
      id: createdUser._id.toString(),
      email: createdUser.email,
      password: createdUser.password,
      name: createdUser.name,
    };
  }
}
