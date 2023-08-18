import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/module/users.module';
import { AuthModule } from './auth/module/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
      "host": "gateway01.us-west-2.prod.aws.tidbcloud.com",
    "port": 4000,
    "username": "2MFseJq3FzQ2u4J.root",
    "password": "BpqGQllyVdF9s7X3",
    "database": "test",
    "logging": true,
    "ssl": {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    },
    // synchronize: true,
    "entities": ["dist/**/*.entity.js"],
  }) ,UsersModule, AuthModule]
})
export class AppModule {}
