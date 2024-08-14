import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  instrument: string;

  @Column()
  email: string;

  @Column()
  experience: number;

  @Column()
  userId: number;
}
