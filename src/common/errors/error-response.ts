import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;
  @ApiProperty({ example: 'Invalid input' })
  message: string;
}
