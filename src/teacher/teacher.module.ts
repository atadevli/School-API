import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { User } from '../user/entities/user.entity';
import { Student } from '../student/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Student]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
