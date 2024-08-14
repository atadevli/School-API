import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  instrument: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsInt({ message: 'Please provide valid Email.' })
  experience: number;

  @IsString()
  userId: string;
}
