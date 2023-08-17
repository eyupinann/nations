import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/module/users.module';
import { AuthModule } from './auth/module/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "9c2.h.filess.io",
    "port": 3306,
    "username": "New_sangslave",
    "password": "f124192272eb46268f06841395b6cebf637b0868",
    "database": "New_sangslave",
    "logging": true,
    // synchronize: true,
    "entities": ["dist/**/*.entity.js"],
  }) ,UsersModule, AuthModule]
})
export class AppModule {}
