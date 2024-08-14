import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sirius_user',
      password: 'sirius_password',
      database: 'sirius',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
