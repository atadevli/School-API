import { IsInt } from 'class-validator';

export class AssignStudentDto {
  @IsInt()
  studentId: number;
  @IsInt()
  teacherId: number;
}
