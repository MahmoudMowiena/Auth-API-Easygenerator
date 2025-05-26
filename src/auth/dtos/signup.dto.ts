import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Match } from 'src/common/validators/match.validator';
import { StrongPassword } from 'src/common/validators/strong-password.validator';

export class SignUpDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  name: string;

  @ApiProperty({ example: 'StrongPass1!' })
  @IsString()
  @StrongPassword()
  password: string;

  @ApiProperty({ example: 'StrongPass1!' })
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
