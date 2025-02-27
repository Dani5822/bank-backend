import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John'
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe'
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'StrongP@ssw0rd!'
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
