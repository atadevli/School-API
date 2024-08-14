import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AssignStudentDto } from './dto/assign-student.dto';
import { Student } from './entities/student.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    let user: User = await this.userRepository.findOneBy({
      username: createStudentDto.username,
    });

    if (!user) {
      const newUser: User = new User();
      newUser.username = createStudentDto.username;
      newUser.role = 'student';
      newUser.active = true;
      user = await this.userRepository.save(newUser);
    }

    const student = await this.studentRepository.findOneBy({
      userId: user.id,
    });

    if (student) {
      throw new ConflictException('Student already exist');
    }

    const newStudent = new Student();
    newStudent.email = createStudentDto.email;
    newStudent.userId = user.id;
    newStudent.teacherId = createStudentDto.teacherId;
    newStudent.instrument = createStudentDto.instrument;

    return this.studentRepository.save(newStudent);
  }

  async findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    return this.studentRepository.findOneBy({ id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = new Student();
    student.email = updateStudentDto.email;
    student.teacherId = updateStudentDto.teacherId;
    student.instrument = updateStudentDto.instrument;

    const updateResult = await this.studentRepository.update(id, student);

    if (updateResult.affected === 0) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Teacher could not found!',
      });
    }

    if (updateStudentDto.username) {
      const updatedStudent = await this.studentRepository.findOneBy({ id });

      const userId = updatedStudent.userId;
      const user: User = new User();
      user.username = updateStudentDto.username;

      await this.userRepository.update(userId, user);
    }

    return updateResult;
  }

  async remove(id: number) {
    return this.studentRepository.delete(id);
  }

  async assign(assignStudentDto: AssignStudentDto) {
    const student = new Student();
    student.teacherId = assignStudentDto.teacherId;

    return this.studentRepository.update(assignStudentDto.studentId, student);
  }
}
