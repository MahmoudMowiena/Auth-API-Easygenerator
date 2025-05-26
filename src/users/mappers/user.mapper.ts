import { IUser } from '../interfaces/user.interface';
import { UserOutput } from '../dtos/user.output';

export class UserMapper {
  static toOutput(user: IUser): UserOutput {
    if (!user.id) {
      throw new Error('User is missing id');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
