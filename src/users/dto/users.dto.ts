import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsersDto {
  @IsNotEmpty({ message: 'user name is required' })
  @ApiProperty({ description: 'User name', default: 'John Doe' })
  name: string

  @IsNotEmpty({ message: 'user password is required' })
  @ApiProperty({ description: 'User password', default: '123456' })
  password: string

  @IsNotEmpty({ message: 'user role is required' })
  @ApiProperty({ description: 'User role', default: 'admin' })
  role: string
}
