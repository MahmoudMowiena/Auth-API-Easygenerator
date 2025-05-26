import { ApiProperty } from '@nestjs/swagger';

export class UserOutput {
  @ApiProperty({ example: '6833abcde1234567890fghij' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}
