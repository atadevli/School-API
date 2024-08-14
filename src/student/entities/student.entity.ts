import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  instrument: string;

  @Column()
  email: string;

  @Column()
  userId: number;

  @Column({
    nullable: true,
  })
  teacherId: number;
}
