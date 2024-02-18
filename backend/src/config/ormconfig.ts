import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  autoLoadEntities: true,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'poll_user',
  password: 'poll_password',
  database: 'poll_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production!
};
