import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  instrument: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsInt()
  teacherId: number;
}
