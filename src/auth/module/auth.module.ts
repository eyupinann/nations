import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../../users/module/users.module';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../jwt/constants';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    }),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, TypeOrmModule]
})
export class AuthModule {}
