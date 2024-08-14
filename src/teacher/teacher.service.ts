import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Teacher } from './entities/teacher.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    let user: User = await this.userRepository.findOneBy({
      username: createTeacherDto.username,
    });

    if (!user) {
      const newUser: User = new User();
      newUser.username = createTeacherDto.username;
      newUser.role = 'teacher';
      newUser.active = true;
      user = await this.userRepository.save(newUser);
    }

    const teacher = await this.teacherRepository.findOneBy({
      userId: user.id,
    });

    if (teacher) {
      throw new ConflictException('Teacher already exist');
    }

    if (user.active === false) {
      await this.userRepository.update(user.id, { active: true });
    }

    const newTeacher = new Teacher();
    newTeacher.email = createTeacherDto.email;
    newTeacher.instrument = createTeacherDto.instrument;
    newTeacher.experience = createTeacherDto.experience;
    newTeacher.userId = user.id;

    return this.teacherRepository.save(newTeacher);
  }

  findAll() {
    return this.teacherRepository.find();
  }

  findOne(id: number) {
    return this.teacherRepository.findOneBy({ id });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = new Teacher();
    teacher.email = updateTeacherDto.email;
    teacher.experience = updateTeacherDto.experience;
    teacher.instrument = updateTeacherDto.instrument;

    const updateResult = await this.teacherRepository.update(id, teacher);

    if (updateTeacherDto.username) {
      const updatedTeacher = await this.teacherRepository.findOneBy({ id });

      const userId = updatedTeacher.userId;
      const user: User = new User();
      user.username = updateTeacherDto.username;

      await this.userRepository.update(userId, user);
    }

    return updateResult;
  }

  remove(id: number) {
    return this.teacherRepository.delete(id);
  }

  getStudents(id: number) {
    return this.studentRepository.findBy({ teacherId: id });
  }
}
